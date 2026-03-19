"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Step1BasicInfo, Step2Professional, Step3CategoryDetails, Step4Documents, Step5Nominator, Step6Declaration } from "@/components/form/NominationSteps";

const formVariants = {
  hidden: (d) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: (d) => ({ opacity: 0, x: d > 0 ? -24 : 24, transition: { duration: 0.25, ease: "easeIn" } }),
};

const STEPS = [
  { id: 1, label: "मूल जानकारी", sublabel: "नाम, पता, संपर्क" },
  { id: 2, label: "कार्यक्षेत्र का विवरण", sublabel: "क्षेत्र, अनुभव, उपलब्धियाँ" },
  { id: 3, label: "सम्मान का आधार", sublabel: "मुख्य औचित्य" },
  { id: 4, label: "अभिलेख", sublabel: "प्रमाण पत्र अपलोड" },
  { id: 5, label: "नामांकनकर्ता", sublabel: "अनुशंसाकर्ता विवरण" },
  { id: 6, label: "घोषणा", sublabel: "सहमति एवं हस्ताक्षर" },
];

export default function NominatePage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stepError, setStepError] = useState("");

  const totalSteps = 6;

  const { register, handleSubmit, watch, setValue, trigger, control, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: {
      awardType: "National",
      nominationType: "Self",
      isPreferredLanguageOther: false,
      isCategoryDomainOther: false,
      keySuccesses: [""],
      awardsReceivedList: [""],
      workAffiliationType: "Individual",
    },
  });

  const watchNominationType = watch("nominationType");

  const stepsConfig = [
    { id: 1, reqFields: ["awardType","nominationType","firstName","lastName","gender","dateOfBirth","nationality","preferredLanguage","mobileNumber","emailId","address","city","pincode","state","country"] },
    { id: 2, reqFields: ["workAffiliationType","categoryDomain","fieldOfExcellence","experienceYears"] },
    { id: 3, reqFields: ["mainBasisForRespect"] },
    { id: 4, reqFields: ["documents.proofOfWork"] },
    { id: 5, reqFields: watchNominationType === "Self" ? [] : ["nominator.firstName","nominator.lastName","nominator.mobile","nominator.email","nominator.address","nominator.recommendationNote"] },
    { id: 6, reqFields: ["consentCheckbox","digitalSignature"] },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch('/api/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "नामांकन जमा करने में त्रुटि हुई");
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = async () => {
    setStepError("");
    const isStepValid = await trigger(stepsConfig[step - 1].reqFields);
    if (!isStepValid) {
      setStepError("कृपया सभी अनिवार्य फ़ील्ड (*) सही से भरें।");
      return;
    }
    setDirection(1);
    setStep((p) => Math.min(p + 1, totalSteps));
  };

  const handlePrevStep = () => {
    setStepError("");
    setDirection(-1);
    setStep((p) => Math.max(p - 1, 1));
  };

useEffect(() => {
  const subscription = watch(() => {
    if (submitError) setSubmitError("");
  });
  return () => subscription.unsubscribe();
}, [watch, submitError]);

  const progress = Math.round(((step - 1) / (totalSteps - 1)) * 100);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center p-5">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.1)] max-w-md w-full text-center border border-[rgba(200,134,10,0.15)] overflow-hidden"
        >
          <div className="h-2" style={{ background: 'linear-gradient(90deg, #c8860a, #f5c842, #c8860a)' }} />
          <div className="p-10">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)' }}>
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-[22px] font-bold text-[#1a0800] mb-3" style={{ fontFamily: 'Noto Serif Devanagari, serif', paddingTop: '0.04em' }}>
              नामांकन सफलतापूर्वक जमा हुआ
            </h2>
            <p className="text-[14px] text-[#6a4010] leading-relaxed mb-8" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              सम्राट विक्रमादित्य सम्मान के लिए आपका नामांकन सफलतापूर्वक प्राप्त हो गया है। हम आपसे शीघ्र संपर्क करेंगे।
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-br from-[#b8600a] to-[#9a4c06] text-white text-[13px] font-bold px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(184,96,10,0.28)]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              मुख्य पृष्ठ पर जाएँ
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@600;700&display=swap');
      `}</style>

      <div className="min-h-screen bg-[#fffdf7]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>

        {/* ── MOBILE PROGRESS HEADER ── */}
        <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-[rgba(200,134,10,0.15)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-5 py-3.5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[9.5px] font-bold uppercase text-[#b8700a]">चरण {step} / {totalSteps}</p>
              <p className="text-[14px] font-semibold text-[#1a0800] leading-tight" style={{ fontFamily: 'Noto Serif Devanagari, serif', paddingTop: '0.04em' }}>
                {STEPS[step - 1].label}
              </p>
            </div>
            <span className="text-[20px] font-bold" style={{ color: '#c8860a', fontFamily: 'Noto Serif Devanagari, serif' }}>{progress}%</span>
          </div>
          <div className="w-full bg-[rgba(200,134,10,0.1)] rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 rounded-full"
              style={{ background: 'linear-gradient(90deg, #b8600a, #f5c842)' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <div className="flex items-center gap-1.5 mt-2.5 justify-center">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className="rounded-full transition-all duration-300"
                style={{
                  width: s.id === step ? 22 : 7,
                  height: 7,
                  background: s.id < step ? '#22c55e' : s.id === step ? '#c8860a' : 'rgba(200,134,10,0.15)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-7 px-4 sm:px-6 lg:px-8 py-7 pb-16">

          {/* ── SIDEBAR ── */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-8 bg-white border border-[rgba(200,134,10,0.14)] rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.07)]">

              <div className="px-7 pt-7 pb-5 border-b border-[rgba(200,134,10,0.1)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
                <p className="text-[9.5px] font-bold  uppercase text-[#b8700a] mb-1">महाराजा विक्रमादित्य शोधपीठ</p>
                <h2 className="text-[18px] font-bold text-[#1a0800] leading-snug" style={{ fontFamily: 'Noto Serif Devanagari, serif', paddingTop: '0.04em' }}>नामांकन प्रपत्र</h2>
                <p className="text-[11px] text-[#9a6030] mt-0.5">सम्राट विक्रमादित्य सम्मान 2026</p>
              </div>

              <div className="px-7 py-3.5 border-b border-[rgba(200,134,10,0.08)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10.5px] font-semibold text-[#9a6030]">प्रगति</span>
                  <span className="text-[12px] font-bold text-[#b8600a]">{progress}%</span>
                </div>
                <div className="w-full bg-[rgba(200,134,10,0.1)] rounded-full h-1.5 overflow-hidden">
                  <motion.div className="h-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #b8600a, #e8a820)' }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
                </div>
              </div>

              <div className="px-5 py-5 space-y-0.5">
                {STEPS.map((s, i) => {
                  const isActive = step === s.id;
                  const isPast = step > s.id;
                  return (
                    <div key={s.id} className="relative">
                      {i < STEPS.length - 1 && (
                        <div className="absolute left-[22px] top-10 w-px h-[calc(100%-8px)] transition-colors duration-500" style={{ background: isPast ? '#22c55e' : 'rgba(200,134,10,0.1)' }} />
                      )}
                      <div className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${isActive ? 'bg-[rgba(200,134,10,0.07)]' : 'hover:bg-[rgba(0,0,0,0.015)]'}`}>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] font-bold transition-all duration-300"
                          style={
                            isPast ? { background: '#22c55e', color: 'white' }
                            : isActive ? { background: 'linear-gradient(135deg, #b8600a, #d4820a)', color: 'white', boxShadow: '0 4px 14px rgba(184,96,10,0.28)' }
                            : { background: 'rgba(200,134,10,0.07)', color: '#c8a060' }
                          }
                        >
                          {isPast ? (
                            <svg width="13" height="13" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          ) : `0${s.id}`}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12.5px] font-semibold leading-tight truncate" style={{ color: isActive ? '#1a0800' : isPast ? '#4a2a08' : '#9a7040', fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{s.label}</p>
                          <p className="text-[10px] leading-tight mt-0.5 truncate" style={{ color: isActive ? '#9a6030' : '#c8a878', fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{s.sublabel}</p>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#c8860a' }} />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="px-7 py-4 border-t border-[rgba(200,134,10,0.08)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
                <p className="text-[10.5px] text-[#b8a060] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  <span className="text-red-400 font-bold">*</span> चिह्नित फ़ील्ड अनिवार्य हैं।<br />भरे फ़ील्ड हरे रंग में दिखेंगे।
                </p>
              </div>
            </div>
          </div>

          {/* ── FORM CARD ── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-3xl border border-[rgba(200,134,10,0.12)] shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">

              <div className="px-6 sm:px-8 md:px-10 pt-7 pb-6 border-b border-[rgba(200,134,10,0.1)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9.5px] font-bold uppercase text-[#b8700a] mb-1.5">चरण {step} / {totalSteps}</p>
                    <h3 className="text-[#1a0800] font-bold leading-snug" style={{ fontFamily: 'Noto Serif Devanagari, serif', fontSize: 'clamp(18px, 3vw, 24px)', paddingTop: '0.04em' }}>
                      {STEPS[step - 1].label}
                    </h3>
                    <p className="text-[12.5px] text-[#9a6030] mt-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{STEPS[step - 1].sublabel}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0 mt-1">
                    {STEPS.map((s) => (
                      <div key={s.id} className="rounded-full transition-all duration-300"
                        style={{ width: s.id === step ? 22 : 7, height: 7, background: s.id < step ? '#22c55e' : s.id === step ? '#c8860a' : 'rgba(200,134,10,0.13)' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 md:px-10 py-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div key={step} custom={direction} variants={formVariants} initial="hidden" animate="visible" exit="exit">
                      {step === 1 && <Step1BasicInfo register={register} watch={watch} setValue={setValue} errors={errors} />}
                      {step === 2 && <Step2Professional register={register} watch={watch} setValue={setValue} control={control} errors={errors} />}
                      {step === 3 && <Step3CategoryDetails register={register} errors={errors} watch={watch} />}
                      {step === 4 && <Step4Documents register={register} setValue={setValue} watch={watch} errors={errors} />}
                      {step === 5 && <Step5Nominator register={register} watch={watch} errors={errors} />}
                      {step === 6 && <Step6Declaration register={register} watch={watch} errors={errors} />}
                    </motion.div>
                  </AnimatePresence>

                  {(stepError || submitError) && (
                    <div className="mt-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      </svg>
                      <p className="text-[13px] font-medium text-red-700" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                        {stepError || `त्रुटि: ${submitError}`}
                      </p>
                    </div>
                  )}

                  <div className="mt-10 pt-6 border-t border-[rgba(200,134,10,0.1)] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={step === 1 || isSubmitting}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border-2 font-semibold text-[13.5px] transition-all duration-200 disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[rgba(200,134,10,0.04)]"
                      style={{ borderColor: 'rgba(200,134,10,0.28)', color: '#7a4010', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" /></svg>
                      पिछला चरण
                    </button>

                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-white font-bold text-[13.5px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] shadow-[0_4px_20px_rgba(184,96,10,0.26)]"
                        style={{ background: 'linear-gradient(135deg, #b8600a, #cf7610)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                      >
                        अगला चरण
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-[13.5px] text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #7b1e1e, #9c2a2a)', boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(123,30,30,0.28)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            जमा हो रहा है...
                          </>
                        ) : (
                          <>
                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            नामांकन जमा करें
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}