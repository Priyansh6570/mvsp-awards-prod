"use client";

import { useFieldArray } from "react-hook-form";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import Tooltip from "@/components/ui/Tooltip";
import FileUpload from "@/components/ui/FileUpload";
import { languages } from "@/lib/languages";
import { categories } from "@/lib/categories";

const CharCounter = ({ watch, name, max }) => {
  const val = watch(name);
  const len = val ? val.toString().length : 0;
  return (
    <div className="text-right mt-1">
      <span className={`text-xs font-medium ${len >= max ? 'text-rose-500' : 'text-slate-400'}`}>
        {len} / {max}
      </span>
    </div>
  );
};

const inputClass = (errors, name) => `w-full p-3 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${errors[name] ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500'}`;
const labelClass = "block text-sm font-semibold text-slate-700";

export function Step1BasicInfo({ register, watch, setValue, errors }) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>Award Type <span className="text-rose-500">*</span></label>
        <select {...register("awardType", { required: true })} className={inputClass(errors, "awardType")}>
          <option value="International">International</option>
          <option value="National">National</option>
          <option value="Shikhar">Shikhar</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Nomination Type <span className="text-rose-500">*</span></label>
        <select {...register("nominationType", { required: true })} className={inputClass(errors, "nominationType")}>
          <option value="Self">Self</option>
          <option value="Other">Other</option>
          <option value="Institution">Institution</option>
        </select>
      </div>
      
      <div>
        <label className={labelClass}>First Name <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="e.g. Vikram" {...register("firstName", { required: true })} className={inputClass(errors, "firstName")} />
      </div>
      <div>
        <label className={labelClass}>Middle Name</label>
        <input type="text" placeholder="e.g. Chandra" {...register("middleName")} className={inputClass(errors, "middleName")} />
      </div>
      <div className="md:col-span-2">
        <label className={labelClass}>Last Name <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="e.g. Sharma" {...register("lastName", { required: true })} className={inputClass(errors, "lastName")} />
      </div>

      <div>
        <label className={labelClass}>Gender <span className="text-rose-500">*</span></label>
        <select {...register("gender", { required: true })} className={inputClass(errors, "gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Date of Birth / Establishment <span className="text-rose-500">*</span></label>
        <input type="date" {...register("dateOfBirth", { required: true })} className={inputClass(errors, "dateOfBirth")} />
      </div>
      
      <div>
        <label className={labelClass}>City <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="e.g. Ujjain" {...register("city", { required: true })} className={inputClass(errors, "city")} />
      </div>
      <div>
        <div className="flex items-center mb-1">
           <label className={labelClass}>District</label>
           <span className="ml-2 text-[10px] text-amber-600 font-bold uppercase tracking-tighter">(Indians only)</span>
        </div>
        <input type="text" placeholder="e.g. Ujjain District" {...register("district")} className={inputClass(errors, "district")} />
      </div>

      <div>
        <label className={labelClass}>Pincode <span className="text-rose-500">*</span></label>
        <input type="text" inputMode="numeric" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} placeholder="e.g. 456001" {...register("pincode", { required: true })} className={inputClass(errors, "pincode")} />
      </div>
      <div>
        <label className={labelClass}>State <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="e.g. Madhya Pradesh" {...register("state", { required: true })} className={inputClass(errors, "state")} />
      </div>

      <div>
        <label className={labelClass}>Country <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="e.g. India" {...register("country", { required: true })} className={inputClass(errors, "country")} />
      </div>
      <div>
        <label className={labelClass}>Nationality <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="e.g. Indian" {...register("nationality", { required: true })} className={inputClass(errors, "nationality")} />
      </div>

      <div>
        <label className={labelClass}>Preferred Language <span className="text-rose-500">*</span></label>
        <SearchableDropdown options={languages} value={watch("preferredLanguage")} onChange={(val) => setValue("preferredLanguage", val)} isOther={watch("isPreferredLanguageOther")} setIsOther={(val) => setValue("isPreferredLanguageOther", val)} placeholder="Select Language" isLanguage={true} />
      </div>
      <div>
        <label className={labelClass} translate="no">Mobile Number <span className="text-rose-500">*</span></label>
        <input type="tel" placeholder="+91 00000 00000" {...register("mobileNumber", { required: true })} className={inputClass(errors, "mobileNumber")} />
      </div>

      <div>
        <label className={labelClass} translate="no">Alternate Mobile Number</label>
        <input type="tel" placeholder="+91 00000 00000" {...register("alternateMobileNumber")} className={inputClass(errors, "alternateMobileNumber")} />
      </div>
      <div>
        <label className={labelClass}>Email ID <span className="text-rose-500">*</span></label>
        <input type="email" placeholder="e.g. vikram@example.com" {...register("emailId", { required: true, pattern: emailRegex })} className={inputClass(errors, "emailId")} />
      </div>

      <div className="md:col-span-2">
        <label className={labelClass}>Address <span className="text-rose-500">*</span></label>
        <textarea placeholder="House No, Street, Landmark, Area..." {...register("address", { required: true })} rows="3" className={inputClass(errors, "address")}></textarea>
      </div>
    </div>
  );
}

export function Step2Professional({ register, watch, setValue, control, errors }) {
  const affiliation = watch("workAffiliationType");
  const { fields: successFields, append: appendSuccess, remove: removeSuccess } = useFieldArray({ control, name: "keySuccesses" });
  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({ control, name: "awardsReceivedList" });

  const validateYears = (e) => {
    let val = parseInt(e.target.value);
    if (val > 80) e.target.value = 80;
    if (val < 1 && e.target.value !== "") e.target.value = "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>Do you work alone or with an organisation? <span className="text-rose-500">*</span></label>
        <select {...register("workAffiliationType", { required: true })} className={inputClass(errors, "workAffiliationType")}>
          <option value="Individual">Individual</option>
          <option value="Organisation">Organisation</option>
        </select>
      </div>
      {affiliation === "Organisation" && (
        <div>
          <label className={labelClass}>Organisation Name <span className="text-rose-500">*</span></label>
          <input type="text" placeholder="Enter name of organization" {...register("organizationName", { required: true })} className={inputClass(errors, "organizationName")} />
        </div>
      )}

      <div>
        <label className={labelClass}>Occupation / Designation</label>
        <input type="text" placeholder="e.g. Senior Scientist" {...register("occupationDesignation")} className={inputClass(errors, "occupationDesignation")} />
      </div>
      <div>
        <label className={labelClass}>Category / Domain <span className="text-rose-500">*</span></label>
        <SearchableDropdown options={categories} value={watch("categoryDomain")} onChange={(val) => setValue("categoryDomain", val)} isOther={watch("isCategoryDomainOther")} setIsOther={(val) => setValue("isCategoryDomainOther", val)} placeholder="Select Domain" isLanguage={false} />
      </div>

      <div>
        <label className={labelClass}>Field of Excellence <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="e.g. Vedic Mathematics" {...register("fieldOfExcellence", { required: true })} className={inputClass(errors, "fieldOfExcellence")} />
      </div>
      <div>
        <label className={labelClass}>Years of Contribution (1-80) <span className="text-rose-500">*</span></label>
        <input type="number" placeholder="Enter number between 1 and 80" {...register("experienceYears", { required: true, min: 1, max: 80 })} onInput={validateYears} className={inputClass(errors, "experienceYears")} />
      </div>

      <div>
        <label className={labelClass}>Impact Level</label>
        <select {...register("impactLevel")} className={inputClass(errors, "impactLevel")}>
          <option value="District">District</option>
          <option value="State">State</option>
          <option value="National">National</option>
          <option value="International">International</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Beneficiaries Count</label>
        <input type="number" placeholder="e.g. 5000" {...register("beneficiariesCount")} className={inputClass(errors, "beneficiariesCount")} />
      </div>

      <div className="md:col-span-2">
        <label className={labelClass}>Work Description</label>
        <textarea style={{ whiteSpace: "pre-wrap" }} placeholder="Describe your career achievements and professional journey..." {...register("workDescription")} rows="5" className={inputClass(errors, "workDescription")}></textarea>
      </div>

      <div className="md:col-span-2 space-y-4">
        <label className={labelClass}>Key Successes</label>
        {successFields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <span className="font-bold text-amber-600 w-6">{index + 1}.</span>
            <input {...register(`keySuccesses.${index}`)} className={inputClass(errors, `keySuccesses.${index}`)} placeholder="Enter a specific success or milestone..." />
            <button type="button" onClick={() => removeSuccess(index)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => appendSuccess("")} className="flex items-center text-sm font-bold text-amber-600 hover:text-amber-700">
          <span className="w-6 h-6 border-2 border-amber-600 rounded-full flex items-center justify-center mr-2">+</span> Add Success
        </button>
      </div>

      <div className="md:col-span-2 space-y-4 border-t pt-6">
        <label className={labelClass}>Awards Received</label>
        {awardFields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <span className="font-bold text-amber-600 w-6">{index + 1}.</span>
            <input {...register(`awardsReceivedList.${index}`)} className={inputClass(errors, `awardsReceivedList.${index}`)} placeholder="e.g. National Award 2022" />
            <button type="button" onClick={() => removeAward(index)} className="text-rose-500 p-2 hover:bg-rose-50 rounded-lg">✕</button>
          </div>
        ))}
        <button type="button" onClick={() => appendAward("")} className="flex items-center text-sm font-bold text-amber-600 hover:text-amber-700">
          <span className="w-6 h-6 border-2 border-amber-600 rounded-full flex items-center justify-center mr-2">+</span> Add Award
        </button>
      </div>

      <div className="md:col-span-2 border-t pt-6">
        <label className={labelClass}>Innovation Description</label>
        <textarea style={{ whiteSpace: "pre-wrap" }} placeholder="Describe unique methodologies, innovations or creative works..." {...register("innovationDescription")} rows="4" className={inputClass(errors, "innovationDescription")}></textarea>
      </div>
    </div>
  );
}

export function Step3CategoryDetails({ register, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>The main basis for deserving respect <span className="text-rose-500">*</span></label>
        <Tooltip text="Provide the core justification for why the nominee deserves this prestigious honor." />
        <textarea style={{ whiteSpace: "pre-wrap" }} placeholder="Write a detailed justification on why this nomination is deserving of the Samrat Vikramaditya Samman..." {...register("mainBasisForRespect", { required: true })} rows="8" className={inputClass(errors, "mainBasisForRespect")}></textarea>
      </div>
    </div>
  );
}

export function Step4Documents({ register, setValue, watch }) {
  const nomType = watch("nominationType");
  const fileAccept = "application/pdf, image/jpeg, image/png";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {nomType === "Self" && (
        <FileUpload name="documents.photograph" label="Photograph of Nominee" placeholder="Upload JPG/PNG" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      )}
      <FileUpload name="documents.proofOfWork" label="Proof of Work *" placeholder="Upload PDF/Images" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.recommendationLetter" label="Recommendation Letter" placeholder="Upload PDF" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.mediaCoverage" label="Media Coverage" placeholder="Upload PDF/Images" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.awardsCertificates" label="Awards Certificates" placeholder="Upload PDF/Images" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
    </div>
  );
}

export function Step5Nominator({ register, watch, errors }) {
  const watchNominationType = watch("nominationType");

  if (watchNominationType === "Self") {
    return (
      <div className="flex items-center justify-center p-10 bg-emerald-50 border border-emerald-200 rounded-2xl">
        <p className="text-emerald-800 font-medium text-lg text-center">Self Nomination selected. All required nominator info is already provided in Step 1.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className={labelClass}>First Name <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="Your first name" {...register("nominator.firstName", { required: true })} className={inputClass(errors, "nominator.firstName")} />
      </div>
      <div>
        <label className={labelClass}>Middle Name</label>
        <input type="text" placeholder="Your middle name" {...register("nominator.middleName")} className={inputClass(errors, "nominator.middleName")} />
      </div>
      <div className="md:col-span-2">
        <label className={labelClass}>Last Name <span className="text-rose-500">*</span></label>
        <input type="text" placeholder="Your last name" {...register("nominator.lastName", { required: true })} className={inputClass(errors, "nominator.lastName")} />
      </div>
      <div>
        <label className={labelClass} translate="no">Your Mobile <span className="text-rose-500">*</span></label>
        <input type="tel" placeholder="Your active mobile number" {...register("nominator.mobile", { required: true })} className={inputClass(errors, "nominator.mobile")} />
      </div>
      <div>
        <label className={labelClass}>Your Email <span className="text-rose-500">*</span></label>
        <input type="email" placeholder="Your active email address" {...register("nominator.email", { required: true })} className={inputClass(errors, "nominator.email")} />
      </div>
      <div className="md:col-span-2">
        <label className={labelClass}>Your Address <span className="text-rose-500">*</span></label>
        <textarea placeholder="Enter your full mailing address..." {...register("nominator.address", { required: true })} rows="2" className={inputClass(errors, "nominator.address")}></textarea>
      </div>
      <div className="md:col-span-2">
        <label className={labelClass}>Recommendation Note <span className="text-rose-500">*</span></label>
        <textarea style={{ whiteSpace: "pre-wrap" }} placeholder="Tell us why you are recommending this candidate..." {...register("nominator.recommendationNote", { required: true })} rows="4" className={inputClass(errors, "nominator.recommendationNote")}></textarea>
      </div>
    </div>
  );
}

export function Step6Declaration({ register, watch, errors }) {
  const inputClassCustom = (name) => `w-full p-3 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${errors[name] ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500'}`;
  
  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <input type="checkbox" {...register("consentCheckbox", { required: true })} className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500 cursor-pointer" />
          </div>
          <div className="ml-4 text-sm">
            <div className="flex items-center mb-1">
              <label className="font-bold text-slate-900 text-base">Consent & Agreement <span className="text-rose-500">*</span></label>
              <Tooltip text="You must agree to the terms to submit." />
            </div>
            <p className="text-slate-700 mt-1 leading-relaxed">I hereby declare that all the information provided in this nomination form is true and correct to the best of my knowledge. I understand that any false information may lead to disqualification from the Samrat Vikramaditya Samman.</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Digital Signature (Type Full Name) <span className="text-rose-500">*</span></label>
          <Tooltip text="Typing your full legal name serves as your official signature for this application." />
        </div>
        <input type="text" placeholder="Type your full legal name" maxLength={100} {...register("digitalSignature", { required: true })} className={inputClassCustom("digitalSignature")} />
        <CharCounter watch={watch} name="digitalSignature" max={100} />
      </div>
    </div>
  );
}