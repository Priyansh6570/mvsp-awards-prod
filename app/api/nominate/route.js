import dbConnect from '@/lib/dbConnect';
import Nomination from '@/models/Nomination';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const nomination = await Nomination.create(body);
    
    return NextResponse.json({ success: true, data: nomination }, { status: 201 });
  } catch (error) {
    let errorMessage = "Failed to submit nomination. Please try again.";
    
    if (error.name === 'ValidationError') {
      const missingFields = Object.values(error.errors).map(err => {
        let field = err.path.split('.').pop();
        if (!isNaN(field)) {
          field = err.path.split('.').slice(-2, -1)[0];
        }
        return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      });
      
      const uniqueFields = [...new Set(missingFields)];
      errorMessage = `Please complete the following required details: ${uniqueFields.join(', ')}`;
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}