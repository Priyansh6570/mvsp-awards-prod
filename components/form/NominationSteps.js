"use client";

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

export function Step1BasicInfo({ register, watch, setValue, errors }) {
  const inputClass = (name) => `w-full p-3 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${errors[name] ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500'}`;
  const labelClass = "block text-sm font-semibold text-slate-700";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Award Type <span className="text-rose-500">*</span></label>
          <Tooltip text="Select the category of the award you are applying or nominating for." />
        </div>
        <select {...register("awardType", { required: true })} className={inputClass("awardType")}>
          <option value="International">International</option>
          <option value="National">National</option>
          <option value="Shikhar">Shikhar</option>
        </select>
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Nomination Type <span className="text-rose-500">*</span></label>
          <Tooltip text="Are you nominating yourself or someone else?" />
        </div>
        <select {...register("nominationType", { required: true })} className={inputClass("nominationType")}>
          <option value="Self">Self</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Full Name of Nominee <span className="text-rose-500">*</span></label>
          <Tooltip text="Enter the legal full name of the person or organization being nominated." />
        </div>
        <input type="text" placeholder="e.g., Vikram Sharma" maxLength={100} {...register("fullName", { required: true })} className={inputClass("fullName")} />
        <CharCounter watch={watch} name="fullName" max={100} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Gender <span className="text-rose-500">*</span></label>
          <Tooltip text="Select the gender identity of the nominee." />
        </div>
        <select defaultValue="" {...register("gender", { required: true })} className={inputClass("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Date of Birth / Establishment <span className="text-rose-500">*</span></label>
          <Tooltip text="Enter the birth date or establishment date if it is an organization." />
        </div>
        <input type="date" {...register("dateOfBirth", { required: true })} className={inputClass("dateOfBirth")} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Nationality <span className="text-rose-500">*</span></label>
          <Tooltip text="The legal nationality or registration country of the nominee." />
        </div>
        <input type="text" placeholder="e.g., Indian" maxLength={50} {...register("nationality", { required: true })} className={inputClass("nationality")} />
        <CharCounter watch={watch} name="nationality" max={50} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Preferred Language <span className="text-rose-500">*</span></label>
          <Tooltip text="The language the nominee prefers for official communication." />
        </div>
        <SearchableDropdown 
          options={languages} 
          value={watch("preferredLanguage")} 
          onChange={(val) => setValue("preferredLanguage", val)} 
          isOther={watch("isPreferredLanguageOther")} 
          setIsOther={(val) => setValue("isPreferredLanguageOther", val)} 
          placeholder="Select Language" 
          isLanguage={true} 
        />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Mobile Number <span className="text-rose-500">*</span></label>
          <Tooltip text="Primary contact number including country code." />
        </div>
        <input type="tel" placeholder="+91 9876543210" maxLength={15} pattern="[\+]?[0-9]*" {...register("mobileNumber", { required: true })} className={inputClass("mobileNumber")} />
        <CharCounter watch={watch} name="mobileNumber" max={15} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Alternate Mobile Number</label>
          <Tooltip text="Secondary contact number if the primary is unreachable." />
        </div>
        <input type="tel" placeholder="+91 9876543211" maxLength={15} pattern="[\+]?[0-9]*" {...register("alternateMobileNumber")} className={inputClass("alternateMobileNumber")} />
        <CharCounter watch={watch} name="alternateMobileNumber" max={15} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Email ID <span className="text-rose-500">*</span></label>
          <Tooltip text="Active email address for all official correspondence." />
        </div>
        <input type="email" placeholder="vikram@example.com" maxLength={100} {...register("emailId", { required: true, pattern: emailRegex })} className={inputClass("emailId")} />
        {errors.emailId?.type === "pattern" && <span className="text-xs text-rose-500 mt-1 block">Please enter a valid email format.</span>}
        <CharCounter watch={watch} name="emailId" max={100} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Address <span className="text-rose-500">*</span></label>
          <Tooltip text="Complete residential or official operational address." />
        </div>
        <textarea placeholder="Enter complete address details..." maxLength={300} {...register("address", { required: true })} rows="3" className={inputClass("address")}></textarea>
        <CharCounter watch={watch} name="address" max={300} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>City <span className="text-rose-500">*</span></label>
          <Tooltip text="Current city of residence or operation." />
        </div>
        <input type="text" placeholder="e.g., Ujjain" maxLength={50} {...register("city", { required: true })} className={inputClass("city")} />
        <CharCounter watch={watch} name="city" max={50} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Pincode / Zipcode <span className="text-rose-500">*</span></label>
          <Tooltip text="Postal code or ZIP code of the address." />
        </div>
        <input type="text" inputMode="numeric" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} placeholder="456001" maxLength={15} {...register("pincode", { required: true })} className={inputClass("pincode")} />
        <CharCounter watch={watch} name="pincode" max={15} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>State / Province <span className="text-rose-500">*</span></label>
          <Tooltip text="State or province of the address." />
        </div>
        <input type="text" placeholder="e.g., Madhya Pradesh" maxLength={50} {...register("state", { required: true })} className={inputClass("state")} />
        <CharCounter watch={watch} name="state" max={50} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Country <span className="text-rose-500">*</span></label>
          <Tooltip text="Country of the address." />
        </div>
        <input type="text" placeholder="e.g., India" maxLength={50} {...register("country", { required: true })} className={inputClass("country")} />
        <CharCounter watch={watch} name="country" max={50} />
      </div>
    </div>
  );
}

export function Step2Professional({ register, watch, setValue, errors }) {
  const inputClass = (name) => `w-full p-3 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${errors[name] ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500'}`;
  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Occupation / Designation</label>
          <Tooltip text="Current job title or role of the nominee." />
        </div>
        <input type="text" placeholder="e.g., Lead Researcher" maxLength={100} {...register("occupationDesignation")} className={inputClass("occupationDesignation")} />
        <CharCounter watch={watch} name="occupationDesignation" max={100} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Organization Affiliation</label>
          <Tooltip text="Name of the company, NGO, or institution the nominee is associated with." />
        </div>
        <input type="text" placeholder="e.g., Institute of Astronomy" maxLength={150} {...register("organizationAffiliation")} className={inputClass("organizationAffiliation")} />
        <CharCounter watch={watch} name="organizationAffiliation" max={150} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Category / Domain <span className="text-rose-500">*</span></label>
          <Tooltip text="The primary sector or field in which the nominee operates." />
        </div>
        <SearchableDropdown 
          options={categories} 
          value={watch("categoryDomain")} 
          onChange={(val) => setValue("categoryDomain", val)} 
          isOther={watch("isCategoryDomainOther")} 
          setIsOther={(val) => setValue("isCategoryDomainOther", val)} 
          placeholder="Select Domain" 
          isLanguage={false} 
        />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Field of Excellence <span className="text-rose-500">*</span></label>
          <Tooltip text="The specific area where the nominee has achieved excellence." />
        </div>
        <input type="text" placeholder="e.g., Vedic Mathematics" maxLength={100} {...register("fieldOfExcellence", { required: true })} className={inputClass("fieldOfExcellence")} />
        <CharCounter watch={watch} name="fieldOfExcellence" max={100} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Years of Work <span className="text-rose-500">*</span></label>
          <Tooltip text="Total number of years dedicated to this specific field." />
        </div>
        <input type="text" inputMode="numeric" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} placeholder="e.g., 15" maxLength={3} {...register("yearsOfWork", { required: true })} className={inputClass("yearsOfWork")} />
        <CharCounter watch={watch} name="yearsOfWork" max={3} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Impact Level</label>
          <Tooltip text="The geographic scope of the nominee's impact." />
        </div>
        <select defaultValue="" {...register("impactLevel")} className={inputClass("impactLevel")}>
          <option value="District">District</option>
          <option value="State">State</option>
          <option value="National">National</option>
          <option value="International">International</option>
        </select>
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Beneficiaries Count</label>
          <Tooltip text="Estimated number of people positively affected by the work." />
        </div>
        <input type="text" inputMode="numeric" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} placeholder="e.g., 50000" maxLength={10} {...register("beneficiariesCount")} className={inputClass("beneficiariesCount")} />
        <CharCounter watch={watch} name="beneficiariesCount" max={10} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Work Description</label>
          <Tooltip text="A detailed summary of the core activities and initiatives undertaken." />
        </div>
        <textarea placeholder="Provide a summary of the core activities..." maxLength={1000} {...register("workDescription")} rows="4" className={inputClass("workDescription")}></textarea>
        <CharCounter watch={watch} name="workDescription" max={1000} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Key Achievements</label>
          <Tooltip text="List the most significant milestones reached. Bullet points recommended." />
        </div>
        <textarea placeholder="- Achievement 1&#10;- Achievement 2" maxLength={1000} {...register("keyAchievements")} rows="3" className={inputClass("keyAchievements")}></textarea>
        <CharCounter watch={watch} name="keyAchievements" max={1000} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Awards Received</label>
          <Tooltip text="List any notable past awards or recognitions received." />
        </div>
        <textarea placeholder="e.g., Padma Shri (2020), State Honor (2018)" maxLength={500} {...register("awardsReceived")} rows="2" className={inputClass("awardsReceived")}></textarea>
        <CharCounter watch={watch} name="awardsReceived" max={500} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Innovation Description</label>
          <Tooltip text="Describe any unique approaches or innovations introduced by the nominee." />
        </div>
        <textarea placeholder="Describe unique methodologies or models created..." maxLength={1000} {...register("innovationDescription")} rows="3" className={inputClass("innovationDescription")}></textarea>
        <CharCounter watch={watch} name="innovationDescription" max={1000} />
      </div>
    </div>
  );
}

export function Step3CategoryDetails({ register, watch, errors }) {
  const watchAwardType = watch("awardType");
  const inputClass = (name) => `w-full p-3 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${errors[name] ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500'}`;
  const labelClass = "block text-sm font-semibold text-slate-700";

  return (
    <div className="space-y-6">
      {watchAwardType === "International" && (
        <>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>Countries of Impact <span className="text-rose-500">*</span></label>
              <Tooltip text="List the specific countries where the nominee's work has made a direct impact." />
            </div>
            <input type="text" placeholder="e.g., India, Nepal, Sri Lanka" maxLength={200} {...register("countriesOfImpact", { required: true })} className={inputClass("countriesOfImpact")} />
            <CharCounter watch={watch} name="countriesOfImpact" max={200} />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>Why Deserving International Honor?</label>
              <Tooltip text="Explain why the nominee specifically merits international recognition." />
            </div>
            <textarea placeholder="Detail the global significance of the work..." maxLength={1000} {...register("whyDeservingInternational")} rows="4" className={inputClass("whyDeservingInternational")}></textarea>
            <CharCounter watch={watch} name="whyDeservingInternational" max={1000} />
          </div>
        </>
      )}

      {watchAwardType === "National" && (
        <>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>States Impacted <span className="text-rose-500">*</span></label>
              <Tooltip text="List the specific Indian states where the nominee's work has made a direct impact." />
            </div>
            <input type="text" placeholder="e.g., Madhya Pradesh, Gujarat, Maharashtra" maxLength={200} {...register("statesImpacted", { required: true })} className={inputClass("statesImpacted")} />
            <CharCounter watch={watch} name="statesImpacted" max={200} />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>Why Deserving National Honor?</label>
              <Tooltip text="Explain why the nominee specifically merits national level recognition." />
            </div>
            <textarea placeholder="Detail the national significance of the work..." maxLength={1000} {...register("whyDeservingNational")} rows="4" className={inputClass("whyDeservingNational")}></textarea>
            <CharCounter watch={watch} name="whyDeservingNational" max={1000} />
          </div>
        </>
      )}

      {watchAwardType === "Shikhar" && (
        <>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>Lifetime Contribution (years) <span className="text-rose-500">*</span></label>
              <Tooltip text="Total number of years dedicated to continuous service." />
            </div>
            <input type="text" inputMode="numeric" onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} placeholder="e.g., 30" maxLength={3} {...register("lifetimeContributionYears", { required: true })} className={inputClass("lifetimeContributionYears")} />
            <CharCounter watch={watch} name="lifetimeContributionYears" max={3} />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>Top 3 Major Contributions <span className="text-rose-500">*</span></label>
              <Tooltip text="Highlight the three most significant contributions made by the nominee." />
            </div>
            <textarea placeholder="1. ...&#10;2. ...&#10;3. ..." maxLength={1000} {...register("top3MajorContributions", { required: true })} rows="3" className={inputClass("top3MajorContributions")}></textarea>
            <CharCounter watch={watch} name="top3MajorContributions" max={1000} />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>Leadership Roles</label>
              <Tooltip text="List key leadership positions held." />
            </div>
            <input type="text" placeholder="e.g., President of Cultural Society" maxLength={200} {...register("leadershipRoles")} className={inputClass("leadershipRoles")} />
            <CharCounter watch={watch} name="leadershipRoles" max={200} />
          </div>
          <div>
            <div className="flex items-center mb-2">
              <label className={labelClass}>Why Deserving Shikhar Samman <span className="text-rose-500">*</span></label>
              <Tooltip text="Provide a detailed essay on why the nominee deserves the Shikhar Samman." />
            </div>
            <textarea placeholder="Provide detailed reasoning based on state-level impact..." maxLength={1500} {...register("whyDeservingShikhar", { required: true })} rows="5" className={inputClass("whyDeservingShikhar")}></textarea>
            <CharCounter watch={watch} name="whyDeservingShikhar" max={1500} />
          </div>
        </>
      )}
    </div>
  );
}

export function Step4Documents({ register, setValue, watch, errors }) {
  const fileAccept = "application/pdf, image/jpeg, image/png";
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FileUpload name="documents.photograph" label="Photograph of Nominee *" tooltip="Upload a clear, recent photograph." accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.proofOfWork" label="Proof of Work *" tooltip="Upload primary verification document." accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.recommendationLetter" label="Recommendation Letter" tooltip="Upload a formal letter of recommendation if available." accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.mediaCoverage" label="Media Coverage" tooltip="Upload news clippings or articles regarding the nominee." accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.awardsCertificates" label="Awards Certificates" tooltip="Upload scans of past awards or certificates." accept={fileAccept} register={register} setValue={setValue} watch={watch} />
      <FileUpload name="documents.additionalDocuments" label="Additional Documents" tooltip="Any other supporting material relevant to the nomination." accept={fileAccept} register={register} setValue={setValue} watch={watch} />
    </div>
  );
}

export function Step5Nominator({ register, watch, errors }) {
  const watchNominationType = watch("nominationType");
  const inputClass = (name) => `w-full p-3 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${name.includes('nominator.') && errors?.nominator?.[name.split('.')[1]] ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500'}`;
  const labelClass = "block text-sm font-semibold text-slate-700";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (watchNominationType === "Self") {
    return (
      <div className="flex items-center justify-center p-10 bg-emerald-50 border border-emerald-200 rounded-2xl">
        <p className="text-emerald-800 font-medium text-lg text-center">
          You selected <span className="font-bold">Self Nomination</span>.<br/>
          You may proceed to the final declaration step.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Nominator Name <span className="text-rose-500">*</span></label>
          <Tooltip text="Your full legal name as the person submitting this application." />
        </div>
        <input type="text" placeholder="e.g., Amit Singh" maxLength={100} {...register("nominator.name", { required: true })} className={inputClass("nominator.name")} />
        <CharCounter watch={watch} name="nominator.name" max={100} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Relation with Nominee <span className="text-rose-500">*</span></label>
          <Tooltip text="How are you connected to the nominee? (e.g., Colleague, Student, Manager)" />
        </div>
        <input type="text" placeholder="e.g., Research Assistant" maxLength={100} {...register("nominator.relationWithNominee", { required: true })} className={inputClass("nominator.relationWithNominee")} />
        <CharCounter watch={watch} name="nominator.relationWithNominee" max={100} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Mobile <span className="text-rose-500">*</span></label>
          <Tooltip text="Your contact number." />
        </div>
        <input type="tel" placeholder="+91 9876543210" maxLength={15} pattern="[\+]?[0-9]*" {...register("nominator.mobile", { required: true })} className={inputClass("nominator.mobile")} />
        <CharCounter watch={watch} name="nominator.mobile" max={15} />
      </div>
      <div>
        <div className="flex items-center mb-2">
          <label className={labelClass}>Email <span className="text-rose-500">*</span></label>
          <Tooltip text="Your contact email." />
        </div>
        <input type="email" placeholder="amit@example.com" maxLength={100} {...register("nominator.email", { required: true, pattern: emailRegex })} className={inputClass("nominator.email")} />
        {errors?.nominator?.email?.type === "pattern" && <span className="text-xs text-rose-500 mt-1 block">Please enter a valid email format.</span>}
        <CharCounter watch={watch} name="nominator.email" max={100} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Address <span className="text-rose-500">*</span></label>
          <Tooltip text="Your complete mailing address." />
        </div>
        <textarea placeholder="Enter your full address..." maxLength={300} {...register("nominator.address", { required: true })} rows="2" className={inputClass("nominator.address")}></textarea>
        <CharCounter watch={watch} name="nominator.address" max={300} />
      </div>
      <div className="md:col-span-2">
        <div className="flex items-center mb-2">
          <label className={labelClass}>Recommendation Note <span className="text-rose-500">*</span></label>
          <Tooltip text="A brief statement on why you are nominating this individual or organization." />
        </div>
        <textarea placeholder="Provide reasoning for your recommendation..." maxLength={1000} {...register("nominator.recommendationNote", { required: true })} rows="4" className={inputClass("nominator.recommendationNote")}></textarea>
        <CharCounter watch={watch} name="nominator.recommendationNote" max={1000} />
      </div>
    </div>
  );
}

export function Step6Declaration({ register, watch, errors }) {
  const inputClass = (name) => `w-full p-3 border rounded-xl focus:ring-2 outline-none transition-all placeholder:text-slate-400 ${errors[name] ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-200' : 'border-slate-300 focus:border-amber-500 focus:ring-amber-500'}`;
  
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
          <label className="block text-sm font-semibold text-slate-700">Digital Signature (Type Full Name) <span className="text-rose-500">*</span></label>
          <Tooltip text="Typing your full legal name serves as your official signature for this application." />
        </div>
        <input type="text" placeholder="e.g., Vikram Sharma" maxLength={100} {...register("digitalSignature", { required: true })} className={inputClass("digitalSignature")} />
        <CharCounter watch={watch} name="digitalSignature" max={100} />
      </div>
    </div>
  );
}