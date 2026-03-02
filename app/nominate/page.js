"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Step1BasicInfo, Step2Professional, Step3CategoryDetails, Step4Documents, Step5Nominator, Step6Declaration } from "@/components/form/NominationSteps";

const formVariants = {
  hidden: (direction) => ({ opacity: 0, x: direction > 0 ? 30 : -30 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -30 : 30, transition: { duration: 0.3, ease: "easeIn" } }),
};

export default function NominatePage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stepError, setStepError] = useState("");
  
  const totalSteps = 6;

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: { awardType: "", nominationType: "", isPreferredLanguageOther: false, isCategoryDomainOther: false },
  });

  const watchAwardType = watch("awardType");
  const watchNominationType = watch("nominationType");

  const stepsConfig = [
    { id: 1, title: "Basic Information", reqFields: [{ n: "awardType", l: "Award Type" }, { n: "nominationType", l: "Nomination Type" }, { n: "fullName", l: "Full Name" }, { n: "gender", l: "Gender" }, { n: "dateOfBirth", l: "Date of Birth" }, { n: "nationality", l: "Nationality" }, { n: "preferredLanguage", l: "Language" }, { n: "mobileNumber", l: "Mobile" }, { n: "emailId", l: "Email" }, { n: "address", l: "Address" }, { n: "city", l: "City" }, { n: "pincode", l: "Pincode" }, { n: "state", l: "State" }, { n: "country", l: "Country" }] },
    { id: 2, title: "Professional Details", reqFields: [{ n: "categoryDomain", l: "Domain" }, { n: "fieldOfExcellence", l: "Field" }, { n: "yearsOfWork", l: "Years of Work" }] },
    { id: 3, title: "Award Specifics", reqFields: watchAwardType === "International" ? [{ n: "countriesOfImpact", l: "Countries of Impact" }] : watchAwardType === "National" ? [{ n: "statesImpacted", l: "States Impacted" }] : [{ n: "lifetimeContributionYears", l: "Lifetime Yrs" }, { n: "top3MajorContributions", l: "Contributions" }, { n: "whyDeservingShikhar", l: "Reasoning" }] },
    { id: 4, title: "Documents", reqFields: [{ n: "documents.photograph", l: "Photograph" }, { n: "documents.proofOfWork", l: "Proof of Work" }] },
    { id: 5, title: "Nominator Details", reqFields: watchNominationType === "Self" ? [] : [{ n: "nominator.name", l: "Name" }, { n: "nominator.relationWithNominee", l: "Relation" }, { n: "nominator.mobile", l: "Mobile" }, { n: "nominator.email", l: "Email" }, { n: "nominator.address", l: "Address" }, { n: "nominator.recommendationNote", l: "Note" }] },
    { id: 6, title: "Declaration", reqFields: [{ n: "consentCheckbox", l: "Consent" }, { n: "digitalSignature", l: "Signature" }] }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");
    setStepError("");
    
    try {
      const response = await fetch('/api/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit nomination");
      }

      setIsSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    setStepError("");
    const fieldsToValidate = stepsConfig[step - 1].reqFields.map(f => f.n);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (!isStepValid) {
      setStepError("Please fill all required fields correctly before proceeding.");
      return;
    }

    setDirection(1);
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setStepError("");
    setSubmitError("");
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const isFieldFilled = (name) => {
    const val = watch(name);
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-slate-200">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Application Submitted</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">Thank you for submitting your nomination for the Samrat Vikramaditya Samman. We have received your details and documents successfully.</p>
          <Link href="/" className="inline-block px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-black transition-all">
            Return to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      <div className="lg:hidden bg-slate-900 text-white px-6 py-4 shadow-md sticky top-0 z-40">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-amber-500 mb-2">
          <span>Step {step} of {totalSteps}</span>
          <span>{Math.round(((step - 1) / (totalSteps - 1)) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <motion.div className="bg-amber-500 h-1.5 rounded-full" initial={{ width: 0 }} animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
        <div className="mt-2 text-sm font-medium">{stepsConfig[step - 1].title}</div>
      </div>

      <div className="flex-grow flex max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8 gap-8">
        <div className="hidden lg:flex flex-col w-80 flex-shrink-0">
          <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden sticky top-28 border border-slate-800">
            <div className="p-8 bg-gradient-to-br from-slate-900 to-slate-800">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Application</h2>
              <p className="text-amber-500 font-medium mt-1 text-sm">Samrat Vikramaditya Samman</p>
            </div>
            <div className="px-6 pb-8 pt-4 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
              {stepsConfig.map((s) => {
                const isActive = step === s.id;
                const isPast = step > s.id;
                return (
                  <div key={s.id} className="relative">
                    <div className="flex items-start">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 font-bold text-sm z-10 bg-slate-900 flex-shrink-0 transition-colors ${isActive ? 'border-amber-500 text-amber-500' : isPast ? 'border-emerald-500 text-emerald-500' : 'border-slate-700 text-slate-500'}`}>
                        {isPast ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg> : s.id}
                      </div>
                      <div className="ml-4 flex-grow">
                        <h4 className={`text-sm font-bold uppercase tracking-wider ${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>{s.title}</h4>
                        <AnimatePresence>
                          {isActive && s.reqFields.length > 0 && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-3 space-y-2 overflow-hidden">
                              {s.reqFields.map((field, idx) => {
                                const filled = isFieldFilled(field.n);
                                return (
                                  <div key={idx} className="flex items-center text-xs">
                                    <div className={`w-3 h-3 rounded-full mr-2 flex items-center justify-center transition-colors ${filled ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                                      {filled && <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>}
                                    </div>
                                    <span className={filled ? 'text-slate-300' : 'text-slate-500'}>{field.l}</span>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    {s.id !== totalSteps && <div className={`absolute left-4 top-8 w-0.5 h-full -ml-px bg-slate-800`} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-grow flex flex-col min-w-0">
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200 flex flex-col h-full min-h-[600px]">
            <div className="px-8 py-8 md:px-12 flex-grow relative">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 h-full flex flex-col justify-between">
                
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div key={step} custom={direction} variants={formVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6 w-full">
                    <div className="mb-8 border-b border-slate-100 pb-4">
                      <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">{stepsConfig[step - 1].title}</h3>
                      <p className="text-slate-500 mt-2 font-medium">Please provide accurate information for this section.</p>
                    </div>

                    {step === 1 && <Step1BasicInfo register={register} watch={watch} setValue={setValue} errors={errors} />}
                    {step === 2 && <Step2Professional register={register} watch={watch} setValue={setValue} errors={errors} />}
                    {step === 3 && <Step3CategoryDetails register={register} watch={watch} errors={errors} />}
                    {step === 4 && <Step4Documents register={register} setValue={setValue} watch={watch} errors={errors} />}
                    {step === 5 && <Step5Nominator register={register} watch={watch} errors={errors} />}
                    {step === 6 && <Step6Declaration register={register} watch={watch} errors={errors} />}
                  </motion.div>
                </AnimatePresence>

                <div className="flex flex-col gap-4 mt-12 pt-8 border-t border-slate-100">
                  {stepError && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-semibold">
                      {stepError}
                    </div>
                  )}
                  {submitError && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm font-semibold">
                      {submitError}
                    </div>
                  )}

                  <div className="flex justify-between w-full">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={step === 1 || isSubmitting}
                      className={`px-6 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-sm ${step === 1 || isSubmitting ? "bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100" : "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:scale-95"}`}
                    >
                      Back
                    </button>
                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-10 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-lg bg-amber-600 text-white hover:bg-amber-700 shadow-amber-600/20 active:scale-95"
                      >
                        Next Step
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-10 py-3.5 rounded-xl font-extrabold shadow-2xl transition-all duration-200 tracking-wide flex items-center ${isSubmitting ? "bg-slate-600 text-slate-300 cursor-not-allowed" : "bg-slate-900 text-amber-400 hover:bg-black shadow-slate-900/30 active:scale-95"}`}
                      >
                        {isSubmitting && (
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {isSubmitting ? "Processing..." : "Submit Application"}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}