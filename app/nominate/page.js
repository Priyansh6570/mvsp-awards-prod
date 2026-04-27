"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Step1BasicInfo, Step2Professional, Step3CategoryDetails, Step4Documents, Step5Nominator, Step6Declaration } from "@/components/form/NominationSteps";
import DevFillButton from "@/components/dev/DevFillButton";

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

// ─── localStorage keys (persist across tab close & browser restart) ───
const STORAGE_KEY = "svs_nomination_draft_v1";
const STORAGE_STEP_KEY = "svs_nomination_step_v1";
const STORAGE_TIMESTAMP_KEY = "svs_nomination_saved_at_v1";

// ─── Default form values (kept identical to original) ───
const DEFAULT_VALUES = {
  awardType: "National",
  nominationType: "Self",
  isPreferredLanguageOther: false,
  isCategoryDomainOther: false,
  keySuccesses: [""],
  awardsReceivedList: [""],
  workAffiliationType: "Individual",
};

export default function NominatePage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [stepError, setStepError] = useState("");

  // ─── Persistence-related state ───
  const [showResetModal, setShowResetModal] = useState(false);
  const [showRestoredToast, setShowRestoredToast] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const formTopRef = useRef(null);
  const totalSteps = 6;

  const { register, handleSubmit, watch, setValue, trigger, control, reset, getValues, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
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

  // ════════════════════════════════════════════════════════════════
  //  RESTORE FROM localStorage ON MOUNT
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STORAGE_STEP_KEY);
      const savedAt = localStorage.getItem(STORAGE_TIMESTAMP_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults so that any new fields added later don't break
        reset({ ...DEFAULT_VALUES, ...parsed });

        if (savedStep) {
          const stepNum = parseInt(savedStep, 10);
          if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= totalSteps) {
            setStep(stepNum);
          }
        }

        if (savedAt) {
          setLastSavedAt(parseInt(savedAt, 10));
        }

        // Show "data restored" toast briefly
        setShowRestoredToast(true);
        setTimeout(() => setShowRestoredToast(false), 4500);
      }
    } catch (err) {
      console.warn("Could not restore form draft:", err);
    } finally {
      setIsHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ════════════════════════════════════════════════════════════════
  //  AUTO-SAVE TO localStorage (debounced via watch subscription)
  // ════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!isHydrated) return;

    let saveTimer = null;

    const subscription = watch((data) => {
      if (submitError) setSubmitError("");
      // Debounce 400ms so we don't write on every keystroke
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          const now = Date.now();
          localStorage.setItem(STORAGE_TIMESTAMP_KEY, String(now));
          setLastSavedAt(now);
        } catch (err) {
          console.warn("Could not save form draft:", err);
        }
      }, 400);
    });

    return () => {
      if (saveTimer) clearTimeout(saveTimer);
      subscription.unsubscribe();
    };
  }, [watch, submitError, isHydrated]);

  // Save current step number whenever it changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_STEP_KEY, String(step));
    } catch (err) {
      console.warn("Could not save step:", err);
    }
  }, [step, isHydrated]);

  // ════════════════════════════════════════════════════════════════

  const scrollToFormTop = () => {
    if (formTopRef.current) {
      const yOffset = -100;
      const y = formTopRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const clearStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
      localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
    } catch (err) {
      console.warn("Could not clear storage:", err);
    }
  };

  const handleResetConfirm = () => {
    clearStorage();
    setShowResetModal(false);
    // Brief delay so the modal close animation plays before reload.
    // Reload ensures all field values, file upload component state, and
    // any internal state in child components is wiped cleanly.
    setTimeout(() => window.location.reload(), 150);
  };

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

      // ─── Clear saved draft on successful submit ───
      clearStorage();

      setIsSuccess(true);
      scrollToFormTop();
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
    setTimeout(scrollToFormTop, 50);
  };

  const handlePrevStep = () => {
    setStepError("");
    setDirection(-1);
    setStep((p) => Math.max(p - 1, 1));
    setTimeout(scrollToFormTop, 50);
  };

  const progress = Math.round(((step - 1) / (totalSteps - 1)) * 100);

  // Format saved-at into a readable Hindi label
  const savedAtLabel = (() => {
    if (!lastSavedAt) return null;
    const diff = Math.floor((Date.now() - lastSavedAt) / 1000);
    if (diff < 5) return "अभी सहेजा गया";
    if (diff < 60) return `${diff} सेकंड पहले सहेजा गया`;
    if (diff < 3600) return `${Math.floor(diff / 60)} मिनट पहले सहेजा गया`;
    const d = new Date(lastSavedAt);
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} पर सहेजा गया`;
  })();

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#fffdf7] flex items-center justify-center p-5" ref={formTopRef}>
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
        {/* ─────────── RESTORED-DATA TOAST ─────────── */}
        <AnimatePresence>
          {showRestoredToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-[90vw]"
            >
              <div className="flex items-start gap-3 bg-white border border-[#86efac] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-4 py-3 pr-5">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#1a0800]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    आपका सहेजा गया डेटा पुनः लोड हो गया
                  </p>
                  <p className="text-[11.5px] text-[#6a4010] mt-0.5" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    जहाँ छोड़ा था वहीं से जारी रखें
                  </p>
                </div>
                <button
                  onClick={() => setShowRestoredToast(false)}
                  className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 flex-shrink-0 transition-colors"
                  aria-label="बंद करें"
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─────────── RESET CONFIRMATION MODAL ─────────── */}
        <AnimatePresence>
          {showResetModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-5"
              onClick={() => setShowResetModal(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 12 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.2)] max-w-md w-full overflow-hidden border border-[rgba(200,134,10,0.15)]"
              >
                {/* Top accent strip */}
                <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #dc2626, #f87171, #dc2626)' }} />

                <div className="p-7">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg, #fee2e2, #fecaca)' }}>
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>

                  {/* Heading */}
                  <h3 className="text-center text-[19px] font-bold text-[#1a0800] mb-2" style={{ fontFamily: 'Noto Serif Devanagari, serif', paddingTop: '0.04em' }}>
                    क्या आप फ़ॉर्म रीसेट करना चाहते हैं?
                  </h3>

                  {/* Body */}
                  <p className="text-center text-[13.5px] text-[#6a4010] leading-relaxed mb-6" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                    इससे आपके द्वारा भरी गई सभी जानकारी एवं अपलोड किए गए दस्तावेज़ हटा दिए जाएँगे। यह क्रिया वापस नहीं की जा सकती।
                  </p>

                  {/* Warning chip */}
                  <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5 mb-6">
                    <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-[12px] text-red-700 leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                      सहेजा गया मसौदा (draft) भी पूरी तरह हट जाएगा।
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col-reverse sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setShowResetModal(false)}
                      className="flex-1 px-5 py-3 rounded-2xl border-2 font-semibold text-[13.5px] text-[#7a4010] hover:bg-[rgba(200,134,10,0.04)] transition-colors"
                      style={{ borderColor: 'rgba(200,134,10,0.3)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      रद्द करें
                    </button>
                    <button
                      type="button"
                      onClick={handleResetConfirm}
                      className="flex-1 px-5 py-3 rounded-2xl text-white font-bold text-[13.5px] shadow-[0_4px_16px_rgba(220,38,38,0.28)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                      style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      हाँ, रीसेट करें
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── MOBILE PROGRESS HEADER ── */}
        <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-[rgba(200,134,10,0.15)] shadow-[0_2px_12px_rgba(0,0,0,0.06)] px-5 py-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="min-w-0 flex-1">
              <p className="text-[9.5px] font-bold uppercase text-[#b8700a]">चरण {step} / {totalSteps}</p>
              <p className="text-[14px] font-semibold text-[#1a0800] leading-tight truncate" style={{ fontFamily: 'Noto Serif Devanagari, serif', paddingTop: '0.04em' }}>
                {STEPS[step - 1].label}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[20px] font-bold" style={{ color: '#c8860a', fontFamily: 'Noto Serif Devanagari, serif' }}>{progress}%</span>
              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                aria-label="फ़ॉर्म रीसेट करें"
                title="फ़ॉर्म रीसेट करें"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 11-7-7m0 0V2m0 3l3-3m-3 3l-3-3" />
                </svg>
              </button>
            </div>
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
                <p className="text-[9.5px] font-bold uppercase text-[#b8700a] mb-1">महाराजा विक्रमादित्य शोधपीठ</p>
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

              {/* ── Auto-save status row ── */}
              {savedAtLabel && (
                <div className="px-7 py-3 border-t border-[rgba(200,134,10,0.08)] bg-[#f0fdf4]/50">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    <span className="text-[10.5px] font-medium text-green-700" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                      {savedAtLabel}
                    </span>
                  </div>
                </div>
              )}

              <div className="px-7 py-4 border-t border-[rgba(200,134,10,0.08)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
                <p className="text-[10.5px] text-[#b8a060] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  <span className="text-red-400 font-bold">*</span> चिह्नित फ़ील्ड अनिवार्य हैं।<br />भरे फ़ील्ड हरे रंग में दिखेंगे।
                </p>
              </div>
            </div>
          </div>

          {/* ── FORM CARD ── */}
          <div className="flex-1 min-w-0" ref={formTopRef}>
            <div className="bg-white rounded-3xl border border-[rgba(200,134,10,0.12)] shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden">

              <div className="px-6 sm:px-8 md:px-10 pt-7 pb-6 border-b border-[rgba(200,134,10,0.1)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-[9.5px] font-bold uppercase text-[#b8700a] mb-1.5">चरण {step} / {totalSteps}</p>
                    <h3 className="text-[#1a0800] font-bold leading-snug" style={{ fontFamily: 'Noto Serif Devanagari, serif', fontSize: 'clamp(18px, 3vw, 24px)', paddingTop: '0.04em' }}>
                      {STEPS[step - 1].label}
                    </h3>
                    <p className="text-[12.5px] text-[#9a6030] mt-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{STEPS[step - 1].sublabel}</p>
                  </div>

                  <div className="flex items-start gap-3 flex-shrink-0">
                    <div className="hidden sm:flex items-center gap-1.5 mt-1">
                      {STEPS.map((s) => (
                        <div key={s.id} className="rounded-full transition-all duration-300"
                          style={{ width: s.id === step ? 22 : 7, height: 7, background: s.id < step ? '#22c55e' : s.id === step ? '#c8860a' : 'rgba(200,134,10,0.13)' }}
                        />
                      ))}
                    </div>

                    {/* ── Desktop reset button ── */}
                    <button
                      type="button"
                      onClick={() => setShowResetModal(true)}
                      className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11.5px] font-semibold text-red-600 hover:bg-red-50 border border-red-200/60 hover:border-red-300 transition-all"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                      title="फ़ॉर्म रीसेट करें"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12a7 7 0 11-7-7m0 0V2m0 3l3-3m-3 3l-3-3" />
                      </svg>
                      रीसेट
                    </button>
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

            {/* ── Mobile auto-save status (below form card) ── */}
            {savedAtLabel && (
              <div className="lg:hidden mt-4 flex items-center justify-center gap-2 text-center px-4 py-2.5 bg-[#f0fdf4] border border-[#86efac]/60 rounded-xl">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="text-[11.5px] font-medium text-green-700" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                  {savedAtLabel} · आपका डेटा सुरक्षित है
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <DevFillButton setValue={setValue} setStep={setStep} reset={reset} />
    </>
  );
}