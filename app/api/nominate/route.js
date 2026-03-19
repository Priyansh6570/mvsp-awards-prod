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
    let errorMessage = "जमा करने में त्रुटि हुई। कृपया सभी फ़ील्ड जाँच कर पुनः प्रयास करें।";
    
    if (error.name === 'ValidationError') {
      const fieldLabels = {
  awardType: "सम्मान का प्रकार",
  nominationType: "नामांकन का प्रकार",
  firstName: "प्रथम नाम",
  lastName: "अंतिम नाम",
  gender: "लिंग",
  dateOfBirth: "जन्म तिथि",
  nationality: "राष्ट्रीयता",
  mobileNumber: "मोबाइल नंबर",
  emailId: "ईमेल पता",
  address: "पूरा पता",
  city: "शहर",
  pincode: "पिनकोड",
  state: "राज्य",
  country: "देश",
  preferredLanguage: "पसंदीदा भाषा",
  categoryDomain: "श्रेणी / क्षेत्र",
  fieldOfExcellence: "उत्कृष्टता का क्षेत्र",
  experienceYears: "योगदान के वर्ष",
  mainBasisForRespect: "सम्मान की पात्रता का मुख्य आधार",
  'documents.proofOfWork': "कार्य का प्रमाण",
  'documents.photograph': "फ़ोटोग्राफ़",
  'nominator.firstName': "नामांकनकर्ता का प्रथम नाम",
  'nominator.lastName': "नामांकनकर्ता का अंतिम नाम",
  'nominator.mobile': "नामांकनकर्ता का मोबाइल",
  'nominator.email': "नामांकनकर्ता का ईमेल",
  'nominator.address': "नामांकनकर्ता का पता",
  'nominator.recommendationNote': "अनुशंसा नोट",
  consentCheckbox: "सहमति एवं घोषणा",
  digitalSignature: "डिजिटल हस्ताक्षर",
  workAffiliationType: "कार्य का स्वरूप",
};

      const missingFields = Object.values(error.errors).map(err => {
        // Handle array paths like documents.proofOfWork.0
        let path = err.path;
        if (/\.\d+$/.test(path)) path = path.replace(/\.\d+$/, '');
        
        return fieldLabels[path] || path;
      });
      
      const uniqueFields = [...new Set(missingFields)];
      errorMessage = `निम्नलिखित अनिवार्य फ़ील्ड खाली या अमान्य हैं: ${uniqueFields.join(', ')}`;
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}