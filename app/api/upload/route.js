import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const fileType = formData.get('fileType'); 

    if (!file) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const MAX_FILE_SIZE = 5242880; 
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 5MB limit. Please compress your file.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadPromise = new Promise((resolve, reject) => {
      const options = {
        folder: 'samrat_vikramaditya_samman',
      };
      if (fileType === 'image') {
        options.quality = 'auto:eco';
        options.fetch_format = 'auto';
        options.width = 1000;
        options.crop = 'limit';
      } else {
        options.format = 'pdf';
      }

      const stream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });

    const result = await uploadPromise;
    return NextResponse.json({ url: result.secure_url }, { status: 200 });

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}