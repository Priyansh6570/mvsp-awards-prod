"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    num: "01",
    title: "मूल जानकारी",
    subtitle: "नाम, पता, संपर्क विवरण",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    sections: [
      {
        title: "सम्मान का प्रकार",
        fields: [
          { name: "सम्मान का प्रकार", required: true, example: "राष्ट्रीय सम्मान (₹21 लाख)", desc: "तीन विकल्पों में से एक चुनें: अंतर्राष्ट्रीय (₹1 करोड़ 1 लाख), राष्ट्रीय (₹21 लाख), या शिखर सम्मान (₹5 लाख)। यदि आपका कार्य राष्ट्रीय स्तर पर प्रभावशाली है तो राष्ट्रीय सम्मान चुनें।" },
          { name: "नामांकन का प्रकार", required: true, example: "स्व-नामांकन (Self)", desc: "स्व-नामांकन यदि आप स्वयं के लिए भर रहे हैं। 'अन्य' यदि आप किसी अन्य व्यक्ति के लिए, और 'संस्था' यदि किसी संगठन के लिए नामांकन कर रहे हैं।" },
        ]
      },
      {
        title: "व्यक्तिगत जानकारी",
        fields: [
          { name: "प्रथम नाम", required: true, example: "रमेश", desc: "आधार कार्ड या पासपोर्ट में जैसा नाम है, वैसा ही लिखें।" },
          { name: "मध्य नाम", required: false, example: "कुमार", desc: "यदि आपका मध्य नाम हो तो भरें, अन्यथा खाली छोड़ सकते हैं।" },
          { name: "अंतिम नाम", required: true, example: "शर्मा", desc: "परिवार का नाम या सरनेम। सरकारी दस्तावेज़ों के अनुसार भरें।" },
          { name: "लिंग", required: true, example: "पुरुष", desc: "पुरुष, महिला, या अन्य में से चुनें।" },
          { name: "जन्म तिथि / स्थापना तिथि", required: true, example: "15/08/1975", desc: "व्यक्ति के लिए जन्म तिथि और संस्था के लिए स्थापना तिथि भरें। DD/MM/YYYY प्रारूप में।" },
        ]
      },
      {
        title: "संपर्क जानकारी",
        fields: [
          { name: "मोबाइल नंबर", required: true, example: "+91 00000 00000", desc: "सक्रिय मोबाइल नंबर जिस पर आपसे संपर्क किया जा सके। देश कोड सहित भरें।" },
          { name: "वैकल्पिक मोबाइल", required: false, example: "+91 00000 00000", desc: "कोई दूसरा नंबर जिस पर भी संपर्क हो सके। यह भरना अनिवार्य नहीं है।" },
          { name: "ईमेल पता", required: true, example: "ramesh.sharma@gmail.com", desc: "वह ईमेल जो आप नियमित रूप से देखते हों। सम्मान से संबंधित सूचनाएँ इसी पर आएंगी।" },
          { name: "पसंदीदा भाषा", required: true, example: "हिंदी", desc: "वह भाषा जिसमें आप संवाद करना पसंद करते हैं। सूचनाएँ इसी भाषा में भेजी जाएंगी।" },
        ]
      },
      {
        title: "पता",
        fields: [
          { name: "पूरा पता", required: true, example: "मकान नंबर 12, गांधी नगर, नीलकंठ रोड के पास", desc: "पूरा डाक पता जिसमें मकान नंबर, गली, मोहल्ला और प्रमुख स्थान का उल्लेख हो।" },
          { name: "शहर", required: true, example: "उज्जैन", desc: "जिस शहर में आप निवास करते हैं या संस्था स्थित है।" },
          { name: "जिला", required: false, example: "उज्जैन", desc: "केवल भारतीय नामांकनकर्ताओं के लिए। जिले का नाम भरें।" },
          { name: "पिनकोड", required: true, example: "456001", desc: "6 अंकों का पोस्टल कोड। केवल अंक भरें।" },
          { name: "राज्य", required: true, example: "मध्यप्रदेश", desc: "राज्य का पूरा नाम हिंदी या अंग्रेज़ी में।" },
          { name: "देश", required: true, example: "India", desc: "अपने देश का नाम। अंतर्राष्ट्रीय नामांकनकर्ता अपने देश का नाम भरें।" },
          { name: "राष्ट्रीयता", required: true, example: "Indian", desc: "आपकी नागरिकता। जैसे: Indian, American, British आदि।" },
        ]
      }
    ]
  },
  {
    id: 2,
    num: "02",
    title: "कार्यक्षेत्र का विवरण",
    subtitle: "क्षेत्र, अनुभव, उपलब्धियाँ",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    sections: [
      {
        title: "कार्य संबंधी जानकारी",
        fields: [
          { name: "कार्य का स्वरूप", required: true, example: "व्यक्तिगत (Individual)", desc: "यदि आप अकेले कार्य करते हैं तो 'Individual' और किसी संस्था के माध्यम से कार्य करते हैं तो 'Organisation' चुनें।" },
          { name: "संस्था का नाम", required: false, example: "विक्रम शिक्षा फाउंडेशन, उज्जैन", desc: "केवल तभी भरें जब आपने कार्य का स्वरूप 'Organisation' चुना हो। संस्था का पूरा पंजीकृत नाम लिखें।" },
          { name: "पद / व्यवसाय", required: false, example: "समाजसेवी, शिक्षाविद्", desc: "आपका वर्तमान पद या व्यवसाय। जैसे: डॉक्टर, शिक्षक, लेखक, समाजसेवी आदि।" },
          { name: "श्रेणी / क्षेत्र", required: true, example: "शिक्षा एवं साक्षरता", desc: "वह मुख्य क्षेत्र जिसमें आपका सबसे महत्वपूर्ण योगदान है। सूची में से चुनें या 'अन्य' भरें।" },
          { name: "उत्कृष्टता का क्षेत्र", required: true, example: "ग्रामीण बालिका शिक्षा", desc: "श्रेणी के भीतर आपका विशिष्ट कार्यक्षेत्र। जितना विशिष्ट होगा उतना बेहतर।" },
          { name: "योगदान के वर्ष", required: true, example: "18", desc: "इस क्षेत्र में आप कितने वर्षों से सक्रिय रूप से कार्य कर रहे हैं। 1 से 80 के बीच अंक भरें।" },
        ]
      },
      {
        title: "प्रभाव एवं उपलब्धि",
        fields: [
          { name: "प्रभाव स्तर", required: false, example: "राष्ट्रीय", desc: "आपके कार्य का प्रभाव किस स्तर पर है: जिला, राज्य, राष्ट्रीय या अंतर्राष्ट्रीय। यह वैकल्पिक है।" },
          { name: "लाभार्थियों की संख्या", required: false, example: "12000", desc: "अनुमानित संख्या कि आपके कार्य से कितने लोगों को प्रत्यक्ष या अप्रत्यक्ष रूप से लाभ हुआ है।" },
          { name: "कार्यक्षेत्र का विवरण", required: false, example: "पिछले 18 वर्षों से मध्यप्रदेश के 5 जिलों में 200 से अधिक विद्यालयों में निःशुल्क शिक्षा अभियान चला रहे हैं...", desc: "अपनी कार्ययात्रा का संक्षिप्त विवरण। क्या किया, कहाँ किया, कितने लोगों तक पहुँचे — ये सब बताएँ।" },
          { name: "प्रमुख उपलब्धि", required: false, example: "2019 में 500 बालिकाओं को छात्रवृत्ति दिलवाई", desc: "तीन से पाँच प्रमुख उपलब्धियाँ जो आपके कार्य को सिद्ध करती हों। प्रत्येक अलग पंक्ति में लिखें।" },
          { name: "प्राप्त पुरस्कार एवं सम्मान", required: false, example: "मध्यप्रदेश शिक्षा गौरव पुरस्कार 2021", desc: "यदि पहले कोई पुरस्कार या सम्मान मिला हो तो उसका नाम और वर्ष लिखें।" },
          { name: "नवाचार / विशिष्टता", required: false, example: "डिजिटल पाठशाला मॉडल जिसे 3 राज्यों ने अपनाया", desc: "आपके कार्य की वह विशेषता जो दूसरों से अलग करती है। कोई नई पद्धति, तकनीक या दृष्टिकोण।" },
        ]
      }
    ]
  },
  {
    id: 3,
    num: "03",
    title: "सम्मान की पात्रता का मुख्य आधार",
    subtitle: "हृदय से लिखा विवरण",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    sections: [
      {
        title: "मुख्य आधार",
        fields: [
          {
            name: "सम्मान की पात्रता का मुख्य आधार",
            required: true,
            example: `रमेश कुमार शर्मा पिछले 18 वर्षों से मध्यप्रदेश के आदिवासी अंचलों में निःशुल्क शिक्षा का अभियान चला रहे हैं। उन्होंने 200 से अधिक विद्यालय स्थापित किए हैं जिनसे 12,000 से अधिक बालिकाओं को शिक्षा मिली है।

सम्राट विक्रमादित्य के दानशीलता और जनकल्याण के आदर्शों की तरह, वे बिना किसी सरकारी सहायता के अपनी संचित पूंजी और सामाजिक सहयोग से यह कार्य कर रहे हैं। उनका 'डिजिटल पाठशाला' मॉडल तीन राज्यों में अपनाया जा चुका है।

उनके कार्य से न केवल साक्षरता बढ़ी है बल्कि बाल विवाह में भी उल्लेखनीय कमी आई है। यह योगदान सम्राट विक्रमादित्य के युग निर्माण और समाज अभ्युदय के गुणों का आधुनिक प्रतिबिंब है।`,
            desc: "यह सबसे महत्वपूर्ण भाग है। यहाँ आप खुलकर और हृदय से बताएँ कि यह व्यक्ति या संस्था सम्राट विक्रमादित्य के किन आदर्शों को जीवंत करती है। उनके योगदान, प्रभाव और विशिष्टता का विस्तृत विवरण दें।",
            tips: [
              "विक्रमादित्य के गुणों (न्याय, दानशीलता, शौर्य आदि) से जोड़कर लिखें",
              "संख्याओं और तथ्यों का उपयोग करें — जैसे '5000 लोगों को लाभ हुआ'",
              "कम से कम 200 शब्द लिखें, अधिक होने पर और अच्छा",
              "सरल, स्पष्ट और हृदयस्पर्शी भाषा उपयोग करें",
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    num: "04",
    title: "दस्तावेज़",
    subtitle: "प्रमाण पत्र एवं फ़ाइलें",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    sections: [
      {
        title: "अपलोड करने योग्य दस्तावेज़",
        fields: [
          { name: "फ़ोटोग्राफ़", required: false, example: "nominee_photo.jpg (JPG/PNG, स्पष्ट चेहरे की फ़ोटो)", desc: "नामांकित व्यक्ति की स्पष्ट, हालिया फ़ोटो। JPG या PNG प्रारूप में। यह वैकल्पिक है।" },
          { name: "कार्य का प्रमाण", required: true, example: "work_certificate.pdf (पुरस्कार प्रमाण पत्र, समाचार पत्र की कटिंग, सरकारी पत्र)", desc: "यह एकमात्र अनिवार्य दस्तावेज़ है। प्रमाण पत्र, सरकारी पत्र, समाचार रिपोर्ट, या कोई भी साक्ष्य जो आपके कार्य को सिद्ध करे। PDF, JPG या PNG।" },
          { name: "अनुशंसा पत्र", required: false, example: "recommendation.pdf (किसी प्रतिष्ठित व्यक्ति का पत्र)", desc: "किसी प्रतिष्ठित व्यक्ति, जनप्रतिनिधि, या संस्था का अनुशंसा पत्र। यह वैकल्पिक है लेकिन नामांकन को मजबूत बनाता है।" },
          { name: "मीडिया कवरेज", required: false, example: "news_clipping.pdf (अखबार की खबर, न्यूज़ चैनल की रिपोर्ट)", desc: "समाचार पत्र, पत्रिका या डिजिटल मीडिया में छपी खबरें। PDF या इमेज प्रारूप में।" },
          { name: "पुरस्कार प्रमाण पत्र", required: false, example: "awards.pdf (पूर्व में प्राप्त पुरस्कारों के प्रमाण)", desc: "यदि पहले कोई पुरस्कार मिला हो तो उसके प्रमाण पत्र अपलोड करें।" },
        ]
      }
    ]
  },
  {
    id: 5,
    num: "05",
    title: "नामांकनकर्ता विवरण",
    subtitle: "अनुशंसाकर्ता की जानकारी",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    sections: [
      {
        title: "यह चरण किनके लिए है?",
        note: "यदि आपने 'स्व-नामांकन' चुना है तो यह चरण स्वतः छोड़ दिया जाएगा। यह केवल 'अन्य' या 'संस्था' नामांकन के लिए भरना है।",
        fields: [
          { name: "नामांकनकर्ता का नाम", required: true, example: "सुरेश पाण्डेय", desc: "वह व्यक्ति जो यह नामांकन प्रस्तुत कर रहा है उसका पूरा नाम (प्रथम + अंतिम)।" },
          { name: "मोबाइल नंबर", required: true, example: "+91 00000 00000", desc: "नामांकनकर्ता का संपर्क नंबर।" },
          { name: "ईमेल", required: true, example: "suresh.pandey@email.com", desc: "नामांकनकर्ता का ईमेल पता।" },
          { name: "पता", required: true, example: "45, विद्यानगर, इंदौर, मध्यप्रदेश", desc: "नामांकनकर्ता का पूरा डाक पता।" },
          { name: "अनुशंसा नोट", required: true, example: "मैं रमेश जी के कार्य को पिछले 10 वर्षों से जानता हूँ। उनके शिक्षा अभियान ने हमारे जिले में साक्षरता दर 30% बढ़ाई है...", desc: "आप इस उम्मीदवार को क्यों अनुशंसित कर रहे हैं, यह अपने शब्दों में लिखें। व्यक्तिगत जानकारी और अनुभव साझा करें।" },
        ]
      }
    ]
  },
  {
    id: 6,
    num: "06",
    title: "घोषणा",
    subtitle: "सहमति एवं डिजिटल हस्ताक्षर",
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    sections: [
      {
        title: "अंतिम चरण",
        fields: [
          { name: "सहमति एवं घोषणा", required: true, example: "चेकबॉक्स पर टिक करें", desc: "आप घोषित करते हैं कि भरी गई सभी जानकारी सत्य है। इस पर सहमति देना अनिवार्य है।" },
          { name: "डिजिटल हस्ताक्षर", required: true, example: "रमेश कुमार शर्मा", desc: "अपना पूरा कानूनी नाम टाइप करें। यही आपके आधिकारिक हस्ताक्षर के रूप में स्वीकार किया जाएगा।" },
        ]
      }
    ]
  }
];

const tips = [
  { icon: "📋", title: "पहले से तैयारी करें", desc: "फ़ॉर्म भरने से पहले सभी दस्तावेज़ तैयार रखें — प्रमाण पत्र, फ़ोटो और अनुशंसा पत्र।" },
  { icon: "✍️", title: "हृदय से लिखें", desc: "पात्रता का आधार (चरण 3) जितना विस्तार से और भावपूर्ण तरीके से लिखेंगे, उतना बेहतर।" },
  { icon: "📱", title: "मोबाइल पर भी भर सकते हैं", desc: "यह फ़ॉर्म मोबाइल पर भी पूरी तरह कार्य करता है। किसी भी डिवाइस से भरें।" },
  { icon: "🔒", title: "जानकारी सुरक्षित है", desc: "आपकी सभी जानकारी सुरक्षित रखी जाती है और केवल निर्णायक मंडल को उपलब्ध होती है।" },
  { icon: "📅", title: "समय सीमा", desc: "20 मई 2026 से पहले नामांकन जमा करना अनिवार्य है। अंतिम दिन तक प्रतीक्षा न करें।" },
  { icon: "✅", title: "हरा रंग = सही भरा", desc: "फ़ील्ड सही भरने पर वह हरे रंग की हो जाती है — यह पुष्टि है कि जानकारी सहेज ली गई।" },
];

export default function NominationGuidePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedField, setExpandedField] = useState(null);

  const currentStep = steps[activeStep];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@600;700&display=swap');
        .guide-sans { font-family: 'Noto Sans Devanagari', sans-serif; }
        .guide-serif { font-family: 'Noto Serif Devanagari', serif; }

        @keyframes guide-fadein {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .guide-fadein { animation: guide-fadein 0.3s ease forwards; }

        @keyframes guide-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.35; transform: scale(0.65); }
        }
        .guide-dot-pulse { animation: guide-pulse 2.2s ease-in-out infinite; }

        .guide-step-btn {
          transition: all 0.2s ease;
        }
        .guide-step-btn:hover:not(.active) {
          background: rgba(200,134,10,0.05);
          border-color: rgba(200,134,10,0.3);
        }
        .guide-field-card {
          transition: all 0.25s ease;
        }
        .guide-field-card:hover {
          box-shadow: 0 4px 20px rgba(200,134,10,0.1);
        }
      `}</style>

      <div className="guide-sans min-h-screen bg-[#fffdf7]">

        {/* ── HERO ─────────────────────────────────────── */}
        <div className="relative overflow-hidden pt-14 pb-12 px-5 text-center" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf4 60%, #fef4dc 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 26 L26 0 L52 26 L26 52Z' stroke='%23c8860a' stroke-width='0.5' fill='none' opacity='0.06'/%3E%3C/svg%3E")`, backgroundSize: '52px 52px' }} />

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-[rgba(200,134,10,0.28)] px-4 py-1.5 rounded-full mb-6 shadow-[0_2px_12px_rgba(200,134,10,0.07)]">
              <span className="guide-dot-pulse w-[5px] h-[5px] rounded-full bg-[#c8860a] inline-block flex-shrink-0" />
              <span className="text-[10.5px] font-bold uppercase text-[#8b5008]">नामांकन सहायिका</span>
            </div>

            <h1 className="guide-serif text-[#1a0800] leading-snug mb-4" style={{ fontSize: 'clamp(26px, 5vw, 46px)', paddingTop: '0.05em' }}>
              नामांकन प्रपत्र<br />
              <span style={{ background: 'linear-gradient(135deg, #b8600a, #e8a820)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>भरने की मार्गदर्शिका</span>
            </h1>

            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(200,134,10,0.4)]" />
              <div className="w-1.5 h-1.5 bg-[#c8860a] rotate-45 opacity-60" />
              <div className="w-1 h-1 bg-[#c8860a] rotate-45 opacity-40" />
              <div className="w-1.5 h-1.5 bg-[#c8860a] rotate-45 opacity-60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[rgba(200,134,10,0.4)]" />
            </div>

            <p className="text-[15px] text-[#6a4010] leading-relaxed max-w-xl mx-auto mb-8" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              इस मार्गदर्शिका में प्रत्येक फ़ील्ड का विवरण, उदाहरण और सुझाव दिए गए हैं ताकि आप आसानी से नामांकन भर सकें।
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/nominate"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#b8600a] via-[#cf7610] to-[#9a4c06] text-white text-[13px] font-bold px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(184,96,10,0.28)]"
                style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
              >
                <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                अभी नामांकन करें
              </Link>
              <span className="text-[12px] text-[#9a6030]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                अंतिम तिथि: <strong className="text-[#b8600a]">20 मई 2026</strong>
              </span>
            </div>
          </div>
        </div>

        {/* ── QUICK TIPS ─────────────────────────────────── */}
        {/* <div className="px-5 md:px-10 py-10 border-b border-[rgba(200,134,10,0.1)]" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-[10.5px] font-bold uppercase text-[#b8700a] mb-6" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              ध्यान रखने योग्य बातें
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {tips.map((tip, i) => (
                <div key={i} className="guide-field-card bg-[#fffdf7] border border-[rgba(200,134,10,0.1)] rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">{tip.icon}</div>
                  <p className="text-[12px] font-bold text-[#2a1000] mb-1.5 leading-snug" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{tip.title}</p>
                  <p className="text-[11px] text-[#8a5828] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* ── MAIN GUIDE ─────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
          <div className="flex flex-col lg:flex-row gap-7">

            {/* STEP SELECTOR — sidebar on desktop, horizontal scroll on mobile */}
            <div className="lg:w-64 flex-shrink-0">
              {/* Mobile: horizontal pill row */}
              <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => { setActiveStep(i); setExpandedField(null); }}
                    className={`guide-step-btn flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-200 ${activeStep === i ? 'border-[#c8860a] text-[#1a0800]' : 'border-[rgba(200,134,10,0.15)] text-[#9a7050]'}`}
                    style={{ background: activeStep === i ? 'rgba(200,134,10,0.08)' : 'white' }}
                  >
                    <span className="text-[11px] font-bold" style={{ color: activeStep === i ? '#c8860a' : '#c8a060', fontFamily: 'Noto Serif Devanagari, serif' }}>{s.num}</span>
                    <span className="text-[12px] font-semibold whitespace-nowrap" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{s.title}</span>
                  </button>
                ))}
              </div>

              {/* Desktop: vertical list */}
              <div className="hidden lg:block sticky top-8 bg-white border border-[rgba(200,134,10,0.14)] rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
                <div className="px-6 pt-6 pb-5 border-b border-[rgba(200,134,10,0.1)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
                  <p className="text-[9.5px] font-bold uppercase text-[#b8700a] mb-1">चरण-दर-चरण</p>
                  <p className="text-[16px] font-bold text-[#1a0800] leading-snug" style={{ fontFamily: 'Noto Serif Devanagari, serif', paddingTop: '0.04em' }}>मार्गदर्शिका</p>
                </div>
                <div className="p-4 space-y-1">
                  {steps.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => { setActiveStep(i); setExpandedField(null); }}
                      className={`guide-step-btn w-full flex items-center gap-3 px-3 py-3 rounded-xl border text-left transition-all duration-200 ${activeStep === i ? 'border-[rgba(200,134,10,0.25)] bg-[rgba(200,134,10,0.07)]' : 'border-transparent'}`}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] font-bold transition-all duration-200"
                        style={activeStep === i
                          ? { background: 'linear-gradient(135deg, #b8600a, #d4820a)', color: 'white', boxShadow: '0 3px 12px rgba(184,96,10,0.25)' }
                          : { background: 'rgba(200,134,10,0.07)', color: '#c8a060' }
                        }
                      >
                        {s.num}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-semibold leading-tight truncate" style={{ color: activeStep === i ? '#1a0800' : '#7a5030', fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{s.title}</p>
                        <p className="text-[10px] text-[#c8a060] leading-tight mt-0.5 truncate" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{s.subtitle}</p>
                      </div>
                      {activeStep === i && <div className="w-1.5 h-1.5 rounded-full bg-[#c8860a] flex-shrink-0" />}
                    </button>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <Link
                    href="/nominate"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white text-[12.5px] font-bold shadow-[0_4px_16px_rgba(184,96,10,0.25)] transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(135deg, #b8600a, #cf7610)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                  >
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                    नामांकन करें
                  </Link>
                </div>
              </div>
            </div>

            {/* STEP CONTENT */}
            <div className="flex-1 min-w-0">
              <div key={activeStep} className="guide-fadein">

                {/* Step header */}
                <div className="bg-white border border-[rgba(200,134,10,0.12)] rounded-3xl overflow-hidden mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <div className="px-7 py-6 border-b border-[rgba(200,134,10,0.1)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: 'linear-gradient(135deg, #b8600a, #d4820a)', boxShadow: '0 4px 16px rgba(184,96,10,0.28)' }}>
                        {currentStep.icon}
                      </div>
                      <div>
                        <p className="text-[9.5px] font-bold uppercase text-[#b8700a] mb-0.5">चरण {currentStep.id} / {steps.length}</p>
                        <h2 className="guide-serif text-[#1a0800] leading-snug" style={{ fontSize: 'clamp(18px, 3vw, 24px)', paddingTop: '0.04em' }}>{currentStep.title}</h2>
                      </div>
                    </div>
                  </div>

                  {/* Step nav */}
                  <div className="px-7 py-3 flex items-center justify-between" style={{ background: 'rgba(200,134,10,0.03)' }}>
                    <button
                      onClick={() => { setActiveStep(Math.max(0, activeStep - 1)); setExpandedField(null); }}
                      disabled={activeStep === 0}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-[#9a6030] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#b8600a] transition-colors"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" /></svg>
                      पिछला चरण
                    </button>
                    <div className="flex gap-1.5">
                      {steps.map((_, i) => (
                        <button key={i} onClick={() => { setActiveStep(i); setExpandedField(null); }}
                          className="rounded-full transition-all duration-200"
                          style={{ width: i === activeStep ? 20 : 7, height: 7, background: i === activeStep ? '#c8860a' : 'rgba(200,134,10,0.2)' }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => { setActiveStep(Math.min(steps.length - 1, activeStep + 1)); setExpandedField(null); }}
                      disabled={activeStep === steps.length - 1}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-[#9a6030] disabled:opacity-30 disabled:cursor-not-allowed hover:text-[#b8600a] transition-colors"
                      style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      अगला चरण
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>

                {/* Sections and fields */}
                {currentStep.sections.map((section, si) => (
                  <div key={si} className="mb-5">
                    {section.note && (
                      <div className="flex items-start gap-3 bg-[#eef3fd] border border-[rgba(60,100,200,0.2)] rounded-2xl px-5 py-4 mb-4">
                        <svg className="w-4 h-4 text-[#3060b8] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-[13px] text-[#2a4a8b] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{section.note}</p>
                      </div>
                    )}

                    <h3 className="text-[10.5px] font-bold uppercase text-[#b8700a] mb-3 flex items-center gap-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                      <span className="flex-1 h-px bg-gradient-to-r from-[rgba(200,134,10,0.2)] to-transparent" />
                      {section.title}
                      <span className="flex-1 h-px bg-gradient-to-l from-[rgba(200,134,10,0.2)] to-transparent" />
                    </h3>

                    <div className="flex flex-col gap-3">
                      {section.fields.map((field, fi) => {
                        const key = `${si}-${fi}`;
                        const isExpanded = expandedField === key;
                        return (
                          <div
                            key={fi}
                            className="guide-field-card bg-white border border-[rgba(200,134,10,0.1)] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)]"
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedField(isExpanded ? null : key)}
                              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-[rgba(200,134,10,0.025)] transition-colors"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-[14px] font-semibold text-[#1a0800]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{field.name}</span>
                                  {field.required
                                    ? <span className="text-[9.5px] font-bold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">अनिवार्य</span>
                                    : <span className="text-[9.5px] font-bold text-[#7a9070] bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">वैकल्पिक</span>
                                  }
                                </div>
                                {!isExpanded && (
                                  <p className="text-[11.5px] text-[#9a7050] mt-0.5 truncate" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{field.desc}</p>
                                )}
                              </div>
                              <svg
                                width="14" height="14" fill="none" stroke="#c8a060" strokeWidth="2.5" viewBox="0 0 24 24"
                                className={`flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {isExpanded && (
                              <div className="px-5 pb-5 border-t border-[rgba(200,134,10,0.08)]">
                                <p className="text-[13.5px] text-[#4a2a08] leading-loose mt-4 mb-4" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                                  {field.desc}
                                </p>

                                {field.tips && (
                                  <div className="bg-[#fdf8ee] border border-[rgba(200,134,10,0.15)] rounded-xl p-4 mb-4">
                                    <p className="text-[10.5px] font-bold uppercase text-[#b8700a] mb-2.5" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>सुझाव</p>
                                    <ul className="space-y-2">
                                      {field.tips.map((tip, ti) => (
                                        <li key={ti} className="flex items-start gap-2.5">
                                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #b8600a, #d4820a)' }}>
                                            <svg width="8" height="8" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                          </div>
                                          <span className="text-[12.5px] text-[#6a3a08] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{tip}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border border-[#86efac] rounded-xl p-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <svg width="12" height="12" fill="none" stroke="#16a34a" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                    <span className="text-[10.5px] font-bold uppercase text-[#15803d]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>उदाहरण</span>
                                  </div>
                                  <p className="text-[13px] text-[#166534] leading-relaxed whitespace-pre-wrap font-medium" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{field.example}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Bottom nav */}
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => { setActiveStep(Math.max(0, activeStep - 1)); setExpandedField(null); }}
                    disabled={activeStep === 0}
                    className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 text-[13px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[rgba(200,134,10,0.04)] transition-all"
                    style={{ borderColor: 'rgba(200,134,10,0.25)', color: '#7a4010', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" /></svg>
                    पिछला
                  </button>

                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() => { setActiveStep(activeStep + 1); setExpandedField(null); }}
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-[13px] font-bold transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(184,96,10,0.24)]"
                      style={{ background: 'linear-gradient(135deg, #b8600a, #cf7610)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      अगला चरण
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  ) : (
                    <Link
                      href="/nominate"
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-[13px] font-bold transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(123,30,30,0.24)]"
                      style={{ background: 'linear-gradient(135deg, #7b1e1e, #9c2a2a)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                      नामांकन करें
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CTA ─────────────────────────────────── */}
        <div className="px-5 py-16 text-center border-t border-[rgba(200,134,10,0.12)]" style={{ background: 'linear-gradient(160deg, #fdf8ee, #fffcf4)' }}>
          <div className="max-w-xl mx-auto">
            <p className="text-[10.5px] font-bold uppercase text-[#b8700a] mb-3" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>तैयार हैं?</p>
            <h3 className="guide-serif text-[#1a0800] mb-4" style={{ fontSize: 'clamp(22px, 4vw, 34px)', paddingTop: '0.04em' }}>अभी नामांकन भरें</h3>
            <p className="text-[14px] text-[#6a4010] leading-relaxed mb-7" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              मार्गदर्शिका पढ़ ली है? अब आत्मविश्वास के साथ नामांकन प्रपत्र भरें। अंतिम तिथि <strong className="text-[#b8600a]">20 मई 2026</strong> है।
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/nominate"
                className="inline-flex items-center gap-2.5 text-white text-[13.5px] font-bold px-9 py-4 rounded-full shadow-[0_6px_24px_rgba(123,30,30,0.28)] transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #7b1e1e, #9c2a2a)', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
              >
                <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                नामांकन प्रपत्र खोलें
              </Link>
              <Link
                href="/rules"
                className="inline-flex items-center gap-2 border border-[rgba(180,96,10,0.3)] text-[#7a4010] hover:border-[rgba(180,96,10,0.6)] hover:bg-[rgba(200,134,10,0.05)] text-[13px] font-semibold px-7 py-4 rounded-full transition-all"
                style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}
              >
                नियमावली पढ़ें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}