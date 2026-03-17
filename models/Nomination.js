import mongoose from 'mongoose';

const nominationSchema = new mongoose.Schema({
  awardType: { 
    type: String, 
    required: true, 
    enum: ['International', 'National', 'Shikhar'] 
  },
  nominationType: { 
    type: String, 
    required: true, 
    enum: ['Self', 'Other', 'Institution'] 
  },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  gender: { 
    type: String, 
    required: true, 
    enum: ['male', 'female', 'other'] 
  },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  alternateMobileNumber: { type: String },
  emailId: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String },
  pincode: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  preferredLanguage: { type: String, required: true },
  isPreferredLanguageOther: { type: Boolean, required: true, default: false },
  occupationDesignation: { type: String },
  workAffiliationType: { 
    type: String, 
    required: true, 
    enum: ['Individual', 'Organisation'] 
  },
  organizationName: { type: String },
  categoryDomain: { type: String, required: true },
  isCategoryDomainOther: { type: Boolean, required: true, default: false },
  fieldOfExcellence: { type: String, required: true },
  experienceYears: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 80 
  },
  workDescription: { type: String },
  keySuccesses: [{ type: String }],
  awardsReceivedList: [{ type: String }],
  impactLevel: { type: String },
  beneficiariesCount: { type: Number },
  innovationDescription: { type: String },
  mainBasisForRespect: { type: String, required: true },
  documents: {
    photograph: { type: String }, 
    proofOfWork: [{ type: String, required: true }], 
    recommendationLetter: { type: String },
    mediaCoverage: { type: String },
    awardsCertificates: { type: String }
  },
  nominator: {
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    email: { type: String },
    address: { type: String },
    recommendationNote: { type: String }
  },
  consentCheckbox: { type: Boolean, required: true },
  digitalSignature: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Nomination || mongoose.model('Nomination', nominationSchema);