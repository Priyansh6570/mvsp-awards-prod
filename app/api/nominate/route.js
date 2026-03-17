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
    let errorMessage = "Submission failed. Please check all fields and try again.";
    
    if (error.name === 'ValidationError') {
      const fieldLabels = {
        awardType: "Award Type",
        nominationType: "Nomination Type",
        firstName: "First Name",
        lastName: "Last Name",
        gender: "Gender",
        dateOfBirth: "Date of Birth",
        nationality: "Nationality",
        mobileNumber: "Mobile Number",
        emailId: "Email ID",
        address: "Full Address",
        city: "City",
        pincode: "Pincode",
        state: "State",
        country: "Country",
        preferredLanguage: "Preferred Language",
        categoryDomain: "Domain",
        fieldOfExcellence: "Field of Excellence",
        experienceYears: "Years of Experience",
        mainBasisForRespect: "Basis for Respect",
        'documents.proofOfWork': "Proof of Work Document",
        'documents.photograph': "Nominee Photograph",
        'nominator.name': "Nominator Name",
        'nominator.mobile': "Nominator Mobile",
        'nominator.email': "Nominator Email",
        'nominator.address': "Nominator Address",
        'nominator.recommendationNote': "Recommendation Note",
        consentCheckbox: "Agreement Consent",
        digitalSignature: "Digital Signature"
      };

      const missingFields = Object.values(error.errors).map(err => {
        // Handle array paths like documents.proofOfWork.0
        let path = err.path;
        if (/\.\d+$/.test(path)) path = path.replace(/\.\d+$/, '');
        
        return fieldLabels[path] || path;
      });
      
      const uniqueFields = [...new Set(missingFields)];
      errorMessage = `The following required details are missing or invalid: ${uniqueFields.join(', ')}`;
    }

    return NextResponse.json({ success: false, error: errorMessage }, { status: 400 });
  }
}