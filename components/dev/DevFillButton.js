"use client";

/**
 * DevFillButton — Development-only floating button to populate the form
 * with test data instantly.
 *
 * Renders ONLY when process.env.NODE_ENV === 'development'.
 * In production builds, returns null and ships zero UI / zero handler code.
 *
 * Usage in app/nominate/page.js:
 *
 *   import DevFillButton from "@/components/dev/DevFillButton";
 *   ...
 *   <DevFillButton setValue={setValue} setStep={setStep} />
 */

import { useState } from "react";

// ─── Sample data sets (rotates so you can test variations) ───
const SAMPLE_NOMINEES = [
  {
    awardType: "National",
    nominationType: "Self",
    firstName: "Test",
    middleName: "Test",
    lastName: "Test",
    gender: "male",
    dateOfBirth: "1975-08-15",
    nationality: "Indian",
    preferredLanguage: "हिन्दी",
    isPreferredLanguageOther: false,
    mobileNumber: "9876543210",
    alternateMobileNumber: "9123456789",
    emailId: "ramesh.test@example.com",
    address: "मकान नंबर 12, गांधी नगर, नीलकंठ रोड के पास",
    city: "उज्जैन",
    district: "उज्जैन",
    pincode: "456001",
    state: "मध्यप्रदेश",
    country: "India",
    workAffiliationType: "Individual",
    organizationName: "",
    occupationDesignation: "समाजसेवी एवं शिक्षाविद्",
    categoryDomain: "सामाजिक उत्थान",
    isCategoryDomainOther: false,
    fieldOfExcellence: "ग्रामीण बालिका शिक्षा",
    experienceYears: 18,
    impactLevel: "National",
    beneficiariesCount: 12000,
    workDescription:
      "पिछले 18 वर्षों से मध्यप्रदेश के 5 जिलों में 200 से अधिक विद्यालयों में निःशुल्क शिक्षा अभियान चला रहे हैं। डिजिटल पाठशाला मॉडल विकसित किया जिसे 3 राज्यों ने अपनाया।",
    keySuccesses: [
      "2019 में 500 बालिकाओं को छात्रवृत्ति दिलवाई",
      "200+ विद्यालयों में निःशुल्क शिक्षा कार्यक्रम स्थापित किए",
      "12,000+ बालिकाओं को शिक्षा से जोड़ा",
    ],
    awardsReceivedList: [
      "मध्यप्रदेश शिक्षा गौरव पुरस्कार, 2021",
      "राष्ट्रीय सेवा पुरस्कार, 2023",
    ],
    innovationDescription:
      "डिजिटल पाठशाला मॉडल — दूरस्थ क्षेत्रों में टैबलेट-आधारित शिक्षा प्रणाली, जिसे मध्यप्रदेश, राजस्थान और छत्तीसगढ़ ने अपनाया।",
    mainBasisForRespect:
      "रमेश कुमार शर्मा पिछले 18 वर्षों से मध्यप्रदेश के आदिवासी अंचलों में निःशुल्क शिक्षा का अभियान चला रहे हैं। उन्होंने 200 से अधिक विद्यालय स्थापित किए जिनसे 12,000 से अधिक बालिकाओं को शिक्षा मिली। उनका डिजिटल पाठशाला मॉडल तीन राज्यों में अपनाया जा चुका है। सम्राट विक्रमादित्य के दानशीलता एवं न्याय के आदर्शों को अपने कार्य में जीवंत किया है — समाज के अंतिम व्यक्ति तक शिक्षा पहुँचाने का संकल्प इसका प्रत्यक्ष प्रमाण है। उनका कार्य न केवल शिक्षा के क्षेत्र में अग्रणी है, अपितु सामाजिक समरसता, बालिका सशक्तिकरण एवं डिजिटल समावेशन के क्षेत्र में भी अनुकरणीय है।",
    consentCheckbox: true,
    digitalSignature: "रमेश कुमार शर्मा",
  },
  {
    awardType: "Shikhar",
    nominationType: "Other",
    firstName: "Arjun",
    middleName: "",
    lastName: "Patel",
    gender: "male",
    dateOfBirth: "1980-03-22",
    nationality: "Indian",
    preferredLanguage: "English",
    isPreferredLanguageOther: false,
    mobileNumber: "9988776655",
    alternateMobileNumber: "",
    emailId: "arjun.test@example.com",
    address: "B-204, Surya Apartments, Vastrapur Road",
    city: "Ahmedabad",
    district: "Ahmedabad",
    pincode: "380015",
    state: "Gujarat",
    country: "India",
    workAffiliationType: "Organisation",
    organizationName: "Gujarat Heritage Foundation",
    occupationDesignation: "Founding Director",
    categoryDomain: "भारतीय संस्कृति",
    isCategoryDomainOther: false,
    fieldOfExcellence: "Classical Sanskrit Studies",
    experienceYears: 22,
    impactLevel: "International",
    beneficiariesCount: 35000,
    workDescription:
      "Established 14 Sanskrit research centres across Gujarat, trained over 800 scholars, and digitised 12,000+ Sanskrit manuscripts.",
    keySuccesses: [
      "Digitised 12,000+ Sanskrit manuscripts",
      "Trained 800+ scholars in Vedic studies",
    ],
    awardsReceivedList: ["Sahitya Akademi Sanskrit Award, 2020"],
    innovationDescription:
      "Pioneered AI-assisted Sanskrit manuscript digitisation methodology, now adopted by 4 universities.",
    mainBasisForRespect:
      "Shri Arjun Patel has dedicated 22 years to the preservation and revival of classical Sanskrit literature. As founder of Gujarat Heritage Foundation, he has built a network of 14 research centres and digitised over 12,000 manuscripts. His pioneering AI-assisted digitisation methodology has been adopted by four universities and has trained 800+ scholars worldwide. His work embodies the spirit of Samrat Vikramaditya's patronage of arts and learning — preserving India's intellectual heritage for future generations while making it globally accessible. The cultural diplomacy aspect of his work has fostered international academic collaboration with institutions in Germany, Japan, and the United States.",
    nominator: {
      firstName: "Suresh",
      middleName: "",
      lastName: "Pandey",
      mobile: "9123456780",
      email: "suresh.nominator@example.com",
      address: "45, Vidya Nagar, Indore, Madhya Pradesh - 452001",
      recommendationNote:
        "मैं अर्जुन पटेल जी के कार्य को पिछले 12 वर्षों से जानता हूँ। उनके संस्कृत संरक्षण अभियान ने हजारों युवा शोधार्थियों को प्रेरित किया है। उनकी डिजिटाइज़ेशन पद्धति ने प्राचीन ग्रंथों को आने वाली पीढ़ियों के लिए सुरक्षित कर दिया है।",
    },
    consentCheckbox: true,
    digitalSignature: "Suresh Pandey",
  },
];

let sampleIndex = 0;

export default function DevFillButton({ setValue, setStep, reset }) {
  // Hard guard — this component is a no-op in production builds
  if (process.env.NODE_ENV !== "development") return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const [status, setStatus] = useState("");

  // ─── Fill text fields only (no documents) ───
  const fillTextFields = (data) => {
    Object.entries(data).forEach(([key, value]) => {
      if (key === "nominator" && value && typeof value === "object") {
        Object.entries(value).forEach(([nKey, nVal]) => {
          setValue(`nominator.${nKey}`, nVal, { shouldValidate: false, shouldDirty: true });
        });
        return;
      }
      setValue(key, value, { shouldValidate: false, shouldDirty: true });
    });
  };

  // ─── Upload a fixture file via the real /api/upload route ───
  const uploadFixture = async (fixturePath, fileType) => {
    const res = await fetch(fixturePath);
    if (!res.ok) throw new Error(`Could not load fixture: ${fixturePath}`);
    const blob = await res.blob();
    const filename = fixturePath.split("/").pop();
    const file = new File([blob], filename, { type: blob.type });

    const fd = new FormData();
    fd.append("file", file);
    fd.append("fileType", fileType);

    const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
    if (!uploadRes.ok) throw new Error("Upload failed");
    const { url } = await uploadRes.json();
    return url;
  };

  // ─── Action: fill text only ───
  const handleFillTextOnly = () => {
    const data = SAMPLE_NOMINEES[sampleIndex % SAMPLE_NOMINEES.length];
    sampleIndex++;
    fillTextFields(data);
    setStatus(`✓ टेक्स्ट भरा गया (${sampleIndex}/${SAMPLE_NOMINEES.length})`);
    setTimeout(() => setStatus(""), 2500);
  };

  // ─── Action: fill text + upload required document ───
  const handleFillWithDocs = async () => {
    setIsFilling(true);
    setStatus("भर रहा है...");
    try {
      const data = SAMPLE_NOMINEES[sampleIndex % SAMPLE_NOMINEES.length];
      sampleIndex++;
      fillTextFields(data);

      setStatus("दस्तावेज़ अपलोड हो रहा है...");
      const proofUrl = await uploadFixture("/test-fixtures/test-proof.pdf", "document");
      setValue("documents.proofOfWork", proofUrl, { shouldValidate: true, shouldDirty: true });

      // Optional photo for self-nominations
      if (data.nominationType === "Self") {
        const photoUrl = await uploadFixture("/test-fixtures/test-photo.jpg", "image");
        setValue("documents.photograph", photoUrl, { shouldValidate: true, shouldDirty: true });
      }

      setStatus("✓ सब कुछ भर गया");
      setTimeout(() => setStatus(""), 2500);
    } catch (err) {
      console.error("[DevFill] Error:", err);
      setStatus(`✗ त्रुटि: ${err.message}`);
      setTimeout(() => setStatus(""), 4000);
    } finally {
      setIsFilling(false);
    }
  };

  // ─── Action: jump to a specific step ───
  const handleJumpToStep = (n) => {
    if (setStep) setStep(n);
    setStatus(`चरण ${n} पर पहुँच गए`);
    setTimeout(() => setStatus(""), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[300]" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Status pill */}
      {status && (
        <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap bg-black text-white text-[12px] px-3 py-2 rounded-lg shadow-xl">
          {status}
        </div>
      )}

      {/* Expanded panel */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-3 bg-white border-2 border-purple-500 rounded-2xl shadow-2xl p-4 min-w-[260px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider">
              🪄 Dev Tools
            </span>
            <span className="text-[10px] text-gray-400">DEV ONLY</span>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={handleFillWithDocs}
              disabled={isFilling}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-wait text-white text-[13px] font-semibold transition-colors"
            >
              {isFilling ? "⏳ Working..." : "✨ Fill all + upload docs"}
            </button>

            <button
              type="button"
              onClick={handleFillTextOnly}
              disabled={isFilling}
              className="w-full text-left px-3 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-800 text-[13px] font-medium transition-colors"
            >
              📝 Fill text only (no upload)
            </button>

            {setStep && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-[10px] text-gray-500 mb-1.5 px-1">Jump to step:</p>
                <div className="grid grid-cols-6 gap-1">
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleJumpToStep(n)}
                      className="px-2 py-1.5 rounded-md bg-gray-100 hover:bg-purple-100 text-gray-700 text-[12px] font-bold transition-colors"
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {reset && (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setStatus("फ़ॉर्म रीसेट");
                  setTimeout(() => setStatus(""), 1500);
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-[12px] font-medium transition-colors"
              >
                🗑️ Reset form (no reload)
              </button>
            )}
          </div>

          <p className="text-[9.5px] text-gray-400 mt-3 leading-tight">
            Test data rotates between {SAMPLE_NOMINEES.length} sample nominees.
            <br />Hidden in production builds.
          </p>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-2xl shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-xl"
        aria-label="Dev fill tools"
        title="Dev fill tools (development only)"
      >
        {isOpen ? "✕" : "🪄"}
      </button>
    </div>
  );
}