"use client";
import Link from "next/link";
import { useState } from "react";

const tabs = [
  { id: "international", label: "अंतर्राष्ट्रीय सम्मान", shortLabel: "अंतर्राष्ट्रीय", amount: "₹1 करोड़ 1 लाख" },
  { id: "national", label: "राष्ट्रीय सम्मान", shortLabel: "राष्ट्रीय", amount: "₹21 लाख" },
  { id: "shikhar", label: "शिखर सम्मान", shortLabel: "शिखर", amount: "₹5-5 लाख" },
];

const internationalRules = [
  { num: "1", title: "सम्मान का नाम", text: "यह सम्मान सम्राट विक्रमादित्य अंतर्राष्ट्रीय सम्मान के नाम से जाना जावेगा।" },
  { num: "2", title: "उद्देश्य", text: "यह सम्मान सम्राट विक्रमादित्य के बहुविध गुणों - न्याय, दानशीलता, सुशासन, खगोल एवं ज्योतिष विज्ञान, कला, शौर्य, राजनय, आध्यात्म, युग निर्माण, विश्व मानव कल्याण, समाज अभ्युदय, अंतर्राष्ट्रीय भाई-चारा, सर्वधर्म समन्वय, भारतीय संस्कृति के उत्थान, सामाजिक नवोन्मेष, भारतीय दर्शन, धर्म, परम्परा, वेदांत के व्यापक प्रचार-प्रसार, रचनात्मक एवं जनकल्याणकारी कार्य के क्षेत्र में श्रेष्ठतम उपलब्धियों एवं उल्लेखनीय योगदान करने वाले साधनारत व्यक्ति / संस्था को सम्मानित करने के उद्देश्य से स्थापित किया गया।" },
  { num: "3", title: "संख्या", text: "यह सम्मान प्रति वर्ष प्रदान किया जायेगा। यह एकल सम्मान होगा अर्थात् यह सम्मान संयुक्त रूप से नहीं दिया जायेगा।" },
  { num: "4", title: "सम्मान की राशि", text: "इस सम्मान के अंतर्गत पुरस्कार के रूप में रुपये 101.00 लाख (रुपये एक करोड एक लाख) की राशि के साथ प्रशस्ति पत्र एवं सम्मान पट्टिका प्रदान की जायेगी।", highlight: true },
  { num: "5", title: "पात्रता", text: "यह सम्मान युग निर्माण, विश्व मानव कल्याण, समाज अभ्युदय, अंतर्राष्ट्रीय भाई-चारा, सर्वधर्म समन्वय, भारतीय संस्कृति के उत्थान, सामाजिक नवोन्मेष, भारतीय दर्शन, धर्म, न्याय, परम्परा एवं वेदांत के व्यापक प्रचार-प्रसार, श्रेष्ठतम उपलब्धियों एवं उल्लेखनीय योगदान करने वाले साधनारत व्यक्ति/संस्था को दिया जायेगा।" },
  { num: "6", title: "अन्य शर्ते", text: "सम्मान के लिए देश-विदेश के युग निर्माण विश्व कल्याण एवं न्याय के क्षेत्र में कार्य करने वाले विभिन्न व्यक्तियों, संस्थाओं, समाजशास्त्रियों, बुद्धिजीवियों, लेखकों, समीक्षकों, पत्रकारों से सम्मान हेतु अनुशंसा/नामांकन की प्रविष्टियाँ आमंत्रित की जाएंगी।" },
  {
    num: "7", title: "चयन प्रक्रिया",
    text: "सम्मान के चयन के लिए प्रति वर्ष उच्च स्तरीय निर्णायक मंडल का गठन महाराजा विक्रमादित्य शोधपीठ के प्रस्ताव पर माननीय मुख्यमंत्री जी के अनुमोदन से मध्यप्रदेश शासन, संस्कृति विभाग द्वारा किया जावेगा। निर्णायक मंडल में माननीय मुख्यमंत्री जी अध्यक्ष, एवं संस्कृति मंत्री, मध्यप्रदेश शासन, मुख्य सचिव, मध्यप्रदेश शासन स्थायी सदस्य के रूप में सम्मिलित रहेंगे। निर्णायक मंडल में देश-प्रदेश के प्रतिष्ठित समाजसेवी, बुद्धिजीवियों, समाजशास्त्रियों, लेखकों, पत्रकारों, उद्योगपतियों, न्यायाधीशों, पुरातत्वविद्, चिकित्सक एवं विशेषज्ञों को सम्मिलित किया जायेगा। सदस्यों को आमंत्रण तथा बैठक के संयोजन की कार्यवाही निदेशक, महाराजा विक्रमादित्य शोधपीठ द्वारा की जावेगी।",
    bullets: [
      "सम्मान चयन के लिए न्यूनतम दस सदस्यीय निर्णायक मंडल का गठन किया जायेगा। कोरम के लिए सात सदस्यों की उपस्थिति एवं निर्णय में सहभागिता आवश्यक होगी।",
      "सम्मान के चयन का मापदण्ड सम्बन्धित क्षेत्र में उच्च कोटि की सृजनात्मकता, विशिष्ट उपलब्धि, अनवरत साधना तथा असंदिग्ध एवं निरपवाद योगदान रहेगा। चयन के समय अनुशंसित व्यक्ति / संस्था का सृजनात्मक रूप से सक्रिय होना अनिवार्य है।",
      "निर्णायक मंडल के समक्ष प्रस्तुत प्रविष्टियों/अनुशंसाओं के अतिरिक्त निर्णायक मंडल स्वविवेक से अन्य नामों पर विचार करने हेतु स्वतंत्र होगा।",
      "यदि निर्णायक मंडल सम्मान के लिए किसी भी व्यक्ति/संस्था को उपयुक्त नहीं पाता है तो उस वर्ष यह सम्मान किसी को नहीं दिया जा सकेगा।",
      "इस सम्मान से एक बार सम्मानित व्यक्ति/संस्था को पुनः यह सम्मान प्रदान नहीं किया जायेगा।",
      "निर्णायक मंडल सर्वसम्मति से निर्णय लेकर अपनी अनुशंसा राज्य शासन को प्रस्तुत करेगा। निर्णायक मंडल का निर्णय शासन के लिए बंधनकारी होगा।",
      "निर्णायक मंडल की अनुशंसा पर शासन की स्वीकृति प्राप्त होने के पश्चात ही यह सम्मान घोषित किया जावेगा।",
      "सम्मान घोषित हो जाने के बाद, सम्मानित व्यक्ति/संस्था द्वारा इसे स्वीकार न किये जाने पर उस वर्ष किसी अन्य को यह सम्मान नहीं दिया जा सकेगा।",
      "विशिष्ट परिस्थितियों में यदि निर्णायक मंडल सर्वसम्मति से निर्णय लेने में असमर्थ रहता है और एक से अधिक अनुशंसाएं प्रस्तुत करता है तो ऐसी स्थिति में शासन को निर्णायक मंडल की अनुशंसा अस्वीकार करने का अधिकार होगा।",
    ],
  },
  { num: "8", title: "संवितरण अधिकारी", text: "यह सम्मान प्रति वर्ष सचिव, महाराजा विक्रमादित्य शोधपीठ मध्यप्रदेश द्वारा वितरित किया जायेगा।" },
];

const nationalRules = [
  { num: "1", title: "सम्मान का नाम", text: "यह सम्मान सम्राट विक्रमादित्य राष्ट्रीय सम्मान के नाम से जाना जायेगा।" },
  { num: "2", title: "उद्देश्य", text: "यह सम्राट विक्रमादित्य के बहुविध गुणों न्याय, दानशीलता, वीरता सुशासन, खगोल एवं ज्योतिष विज्ञान, कला शौर्य, प्राच्य वांग्मय, राजनय, आध्यात्मिक क्षेत्र, रचनात्मक एवं जनकल्याणकारी कार्य के क्षेत्र में श्रेष्ठतम उपलब्धियों एवं उल्लेखनीय योगदान के लिए सम्मानित करने के उद्देश्य से स्थापित किया गया।" },
  { num: "3", title: "संख्या", text: "यह सम्मान प्रतिवर्ष प्रदान किया जायेगा। यह 'एकल' सम्मान होगा अर्थात् यह सम्मान संयुक्त रूप से नहीं दिया जायेगा।" },
  { num: "4", title: "सम्मान की राशि", text: "इस सम्मान के अंतर्गत पुरस्कार के रूप में रुपये 21 लाख (इक्कीस लाख रुपये) की राशि के साथ प्रशस्ति पत्र एवं सम्मान पट्टिका प्रदान की जायेगी।", highlight: true },
  { num: "5", title: "पात्रता", text: "यह सम्राट विक्रमादित्य के बहुविध गुणों न्याय, दानशीलता, वीरता, सुशासन, खगोल एवं ज्योतिष विज्ञान, कला, शौर्य, प्राच्य वांग्मय, राजनय, आध्यात्मिक क्षेत्र, रचनात्मक एवं जनकल्याणकारी कार्य के क्षेत्र में श्रेष्ठतम उपलब्धियों एवं उल्लेखनीय योगदान करने वाले साधनारत व्यक्ति/संस्था को दिया जायेगा।" },
  { num: "6", title: "अन्य शर्ते", text: "सम्मान के लिए सम्राट विक्रमादित्य के बहुविध गुणों न्याय, दानशीलता, वीरता, सुशासन, खगोल एवं ज्योतिष विज्ञान, कला, शौर्य, प्राच्य वांग्मय, राजनय, आध्यात्मिक क्षेत्र, रचनात्मक एवं जनकल्याणकारी कार्य के क्षेत्र में कार्य करने वाले विभिन्न व्यक्तियों, संस्थाओं, समाजशास्त्रियों, बुद्धिजीवियों, लेखकों, समीक्षकों, पत्रकारों से सम्मान हेतु अनुशंसा/नामांकन की प्रविष्टियाँ आमंत्रित की जाएंगी।" },
  {
    num: "7", title: "चयन प्रक्रिया",
    text: "सम्मान के चयन के लिए प्रतिवर्ष उच्च स्तरीय निर्णायक मंडल का गठन महाराजा विक्रमादित्य शोधपीठ के प्रस्ताव पर मध्यप्रदेश शासन, संस्कृति विभाग द्वारा किया जायेगा। निर्णायक मंडल के देश-प्रदेश के प्रतिष्ठित समाजसेवी, बुद्धिजीवियों, समाजशास्त्रियों, लेखकों, पत्रकारों एवं विशेषज्ञों को सम्मिलित किया जायेगा।",
    bullets: [
      "सम्मान चयन के लिए न्यूनतम पाँच सदस्यीय निर्णायक मंडल का गठन किया जायेगा, जबकि कोरम के लिए तीन सदस्यों की उपस्थिति एवं निर्णय में सहभागिता आवश्यक होगी।",
      "सम्मान के चयन का मापदण्ड संबंधित क्षेत्र में उच्च कोटि की सृजनात्मकता, विशिष्ट उपलब्धि, अनवरत साधना तथा असंदिग्ध एवं निरपवाद योगदान रहेगा।",
      "निर्णायक मंडल के समक्ष प्रस्तुत प्रविष्टियों/अनुशंसाओं के अतिरिक्त निर्णायक मंडल स्वविवेक से अन्य नामों पर विचार करने हेतु स्वतंत्र होगा।",
      "यदि निर्णायक मंडल सम्मान के लिए किसी भी व्यक्ति/संस्था को उपयुक्त नहीं पाता है तो उस वर्ष यह सम्मान किसी अन्य को नहीं दिया जा सकेगा।",
      "इस सम्मान से एक बार सम्मानित व्यक्ति/संस्था को पुनः यह सम्मान प्रदान नहीं किया जायेगा।",
      "निर्णायक मंडल सर्वसम्मति से निर्णय लेकर अपनी अनुशंसा राज्य शासन को प्रस्तुत करेगा। निर्णायक मंडल का निर्णय शासन के लिए बंधनकारी होगा।",
      "निर्णायक मंडल की अनुशंसा पर शासन की स्वीकृति प्राप्त होने के पश्चात ही यह सम्मान घोषित किया जावेगा।",
      "सम्मान घोषित हो जाने के बाद, सम्मानित व्यक्ति/संस्था द्वारा इसे स्वीकार न किये जाने पर उस वर्ष किसी अन्य को यह सम्मान नहीं दिया जा सकेगा।",
      "विशिष्ट परिस्थितियों में यदि निर्णायक मंडल सर्वसम्मति से निर्णय लेने में असमर्थ रहता है तो ऐसी स्थिति में शासन को निर्णायक मंडल की अनुशंसा अस्वीकार करने का अधिकार होगा।",
    ],
  },
  { num: "8", title: "संवितरण अधिकारी", text: "यह सम्मान प्रति वर्ष सचिव, महाराजा विक्रमादित्य शोधपीठ, मध्यप्रदेश द्वारा वितरीत किया जायेगा।" },
];

const shikharRules = [
  { num: "1", title: "सम्मान का नाम", text: "यह सम्मान सम्राट विक्रमादित्य शिखर सम्मान के नाम से जाना जायेगा।" },
  { num: "2", title: "उद्देश्य", text: "यह सम्राट विक्रमादित्य के बहुविध गुणों न्याय-विधि, खगोल एवं ज्योतिष विज्ञान, कला, शौर्य, प्राच्य वांग्मय, राजनय, आध्यात्मिक क्षेत्र, रचनात्मक एवं जनकल्याणकारी कार्य के क्षेत्र में श्रेष्ठतम उपलब्धियों एवं उल्लेखनीय योगदान के लिए सम्मानित करने के उद्देश्य से स्थापित किया गया।" },
  {
    num: "3", title: "संख्या",
    text: "यह सम्मान प्रादेशिक होगा। यह सम्मान प्रतिवर्ष तीन प्रतिष्ठित संस्था एवं व्यक्तियों को प्रदान किये जायेंगे।",
    categories: [
      { label: "पहली श्रेणी", text: "न्याय, दानशीलता, वीरता, सुशासन, राजनय, शौर्य होगी।" },
      { label: "दूसरी श्रेणी", text: "खगोल विज्ञान, ज्योतिष विज्ञान तथा प्राच्य वांग्मय विषय को सम्मिलित किया गया है।" },
      { label: "तीसरी श्रेणी", text: "रचनात्मक एवं जनकल्याणकारी कार्य करने वाली संस्था या व्यक्ति को सम्मान से अलंकृत किया जायेगा।" },
    ],
  },
  { num: "4", title: "सम्मान की राशि", text: "इस सम्मान के अंतर्गत पुरस्कार के रूप में रुपये 5.00 लाख (पाँच लाख रुपये) की राशि के साथ प्रशस्ति पत्र एवं सम्मान पट्टिका प्रदान की जायेगी।", highlight: true },
  { num: "5", title: "पात्रता", text: "यह सम्राट विक्रमादित्य के बहुविध गुणों न्याय, दानशीलता, वीरता, सुशासन, खगोल एवं ज्योतिष विज्ञान, कला, शौर्य, प्राच्य वांग्मय, राजनय, आध्यात्मिक क्षेत्र, रचनात्मक एवं जनकल्याणकारी कार्य के क्षेत्र में श्रेष्ठतम उपलब्धियों एवं उल्लेखनीय योगदान करने वाले साधनारत व्यक्ति/संस्था को दिया जायेगा।" },
  { num: "6", title: "अन्य शर्ते", text: "सम्मान के लिए सम्राट विक्रमादित्य के बहुविध गुणों न्याय, दानशीलता, वीरता, सुशासन, खगोल एवं ज्योतिष विज्ञान, कला, शौर्य, प्राच्य वांग्मय, राजनय, आध्यात्मिक क्षेत्र, रचनात्मक एवं जनकल्याणकारी कार्य के क्षेत्र में कार्य करने वाले विभिन्न व्यक्तियों, संस्थाओं से अनुशंसा/नामांकन की प्रविष्टियाँ आमंत्रित की जाएंगी।" },
  {
    num: "7", title: "चयन प्रक्रिया",
    text: "सम्मान के चयन के लिए प्रतिवर्ष उच्च स्तरीय निर्णायक मंडल का गठन महाराजा विक्रमादित्य शोधपीठ के प्रस्ताव पर मध्यप्रदेश शासन, संस्कृति विभाग द्वारा किया जायेगा।",
    bullets: [
      "सम्मान चयन के लिए न्यूनतम पाँच सदस्यीय निर्णायक मंडल का गठन किया जायेगा, जबकि कोरम के लिए तीन सदस्यों की उपस्थिति एवं निर्णय में सहभागिता आवश्यक होगी।",
      "सम्मान के चयन का मापदण्ड संबंधित क्षेत्र में उच्च कोटि की सृजनात्मकता, विशिष्ट उपलब्धि, अनवरत साधना तथा असंदिग्ध एवं निरपवाद योगदान रहेगा।",
      "निर्णायक मंडल के समक्ष प्रस्तुत प्रविष्टियों/अनुशंसाओं के अतिरिक्त निर्णायक मंडल स्वविवेक से अन्य नामों पर विचार करने हेतु स्वतंत्र होगा।",
      "यदि निर्णायक मंडल सम्मान के लिए किसी भी व्यक्ति/संस्था को उपयुक्त नहीं पाता है तो उस वर्ष यह सम्मान किसी अन्य को नहीं दिया जा सकेगा।",
      "इस सम्मान से एक बार सम्मानित व्यक्ति/संस्था को पुनः यह सम्मान प्रदान नहीं किया जायेगा।",
      "निर्णायक मंडल सर्वसम्मति से निर्णय लेकर अपनी अनुशंसा राज्य शासन को प्रस्तुत करेगा। निर्णायक मंडल का निर्णय शासन के लिए बंधनकारी होगा।",
      "निर्णायक मंडल की अनुशंसा पर शासन की स्वीकृति प्राप्त होने के पश्चात ही यह सम्मान घोषित किया जावेगा।",
      "सम्मान घोषित हो जाने के बाद, सम्मानित व्यक्ति/संस्था द्वारा इसे स्वीकार न किये जाने पर उस वर्ष किसी अन्य को यह सम्मान नहीं दिया जा सकेगा।",
      "विशिष्ट परिस्थितियों में यदि निर्णायक मंडल सर्वसम्मति से निर्णय लेने में असमर्थ रहता है तो ऐसी स्थिति में शासन को अनुशंसा अस्वीकार करने का अधिकार होगा।",
    ],
  },
  { num: "8", title: "संवितरण अधिकारी", text: "यह सम्मान प्रति वर्ष सचिव, महाराजा विक्रमादित्य शोधपीठ, मध्यप्रदेश द्वारा वितरीत किया जायेगा।" },
];

const rulesData = { international: internationalRules, national: nationalRules, shikhar: shikharRules };

const tabConfig = {
  international: {
    accentBg: 'bg-[#b8600a]',
    accentText: 'text-[#b8600a]',
    accentBorder: 'border-[#b8600a]',
    accentLight: 'bg-[rgba(184,96,10,0.07)]',
    amountColor: '#b8600a',
    numBg: 'linear-gradient(135deg, #b8600a, #d4820a)',
    bulletColor: '#c8860a',
    highlightBg: 'bg-gradient-to-r from-[#fdf4d8] to-[#fff8ee]',
    highlightBorder: 'border-[rgba(200,134,10,0.25)]',
  },
  national: {
    accentBg: 'bg-[#5a3a8a]',
    accentText: 'text-[#5a3a8a]',
    accentBorder: 'border-[#5a3a8a]',
    accentLight: 'bg-[rgba(90,58,138,0.07)]',
    amountColor: '#5a3a8a',
    numBg: 'linear-gradient(135deg, #5a3a8a, #7a52b0)',
    bulletColor: '#7a52b0',
    highlightBg: 'bg-gradient-to-r from-[#f0ebfc] to-[#f8f4ff]',
    highlightBorder: 'border-[rgba(90,58,138,0.2)]',
  },
  shikhar: {
    accentBg: 'bg-[#7b1e1e]',
    accentText: 'text-[#7b1e1e]',
    accentBorder: 'border-[#7b1e1e]',
    accentLight: 'bg-[rgba(123,30,30,0.07)]',
    amountColor: '#7b1e1e',
    numBg: 'linear-gradient(135deg, #7b1e1e, #9c2a2a)',
    bulletColor: '#9c2a2a',
    highlightBg: 'bg-gradient-to-r from-[#fdf0f0] to-[#fff8f8]',
    highlightBorder: 'border-[rgba(123,30,30,0.2)]',
  },
};

export default function RulesPage() {
  const [activeTab, setActiveTab] = useState("international");
  const cfg = tabConfig[activeTab];
  const rules = rulesData[activeTab];
  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@600;700&display=swap');

        .rl-sans { font-family: 'Noto Sans Devanagari', sans-serif; }
        .rl-serif { font-family: 'Noto Serif Devanagari', serif; }

        @keyframes rl-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rl-fadein { animation: rl-fadein 0.35s ease forwards; }

        .rl-rule-card {
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .rl-rule-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.07);
        }

        .rl-tab-btn {
          transition: all 0.2s ease;
        }
      `}</style>

      <div className="rl-sans min-h-screen bg-[#fffdf7]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>

        {/* ── PAGE HERO ─────────────────────────────────── */}
        <div className="relative overflow-hidden pt-14 pb-12 px-5 text-center" style={{ background: 'linear-gradient(160deg, #fdf8ee 0%, #fffcf4 60%, #fef4dc 100%)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 26 L26 0 L52 26 L26 52Z' stroke='%23c8860a' stroke-width='0.5' fill='none' opacity='0.06'/%3E%3C/svg%3E")`, backgroundSize: '52px 52px' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 80%, rgba(200,134,10,0.07) 0%, transparent 70%)' }} />

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-[rgba(200,134,10,0.28)] px-4 py-1.5 rounded-full mb-5 shadow-[0_2px_12px_rgba(200,134,10,0.07)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8860a] opacity-70" />
              <span className="text-[10.5px] font-bold uppercase text-[#8b5008]">मध्यप्रदेश शासन · संस्कृति विभाग</span>
            </div>

            <h1 className="rl-serif text-[#1a0800] leading-snug mb-4" style={{ fontSize: 'clamp(26px, 5vw, 44px)', paddingTop: '0.05em' }}>
              सम्राट विक्रमादित्य सम्मान
            </h1>

            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[rgba(200,134,10,0.4)]" />
              <div className="w-1.5 h-1.5 bg-[#c8860a] rotate-45 opacity-60" />
              <div className="w-1 h-1 bg-[#c8860a] rotate-45 opacity-40" />
              <div className="w-1.5 h-1.5 bg-[#c8860a] rotate-45 opacity-60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[rgba(200,134,10,0.4)]" />
            </div>

            <p className="text-[14.5px] text-[#6a4010] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              सम्राट विक्रमादित्य सम्मान के लिए निम्नलिखित नियम एवं प्रक्रिया निर्धारित है।
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT ──────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 pb-20">

          {/* TABS — fixed grid so all 3 always visible, no overflow */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-10 p-1.5 bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[rgba(200,134,10,0.1)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const c = tabConfig[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rl-tab-btn relative flex flex-col items-center justify-center py-3 px-2 sm:px-4 rounded-xl text-center focus:outline-none ${isActive ? `${c.accentLight} ${c.accentBorder} border` : 'border border-transparent hover:bg-[rgba(0,0,0,0.02)]'}`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" style={{ background: c.amountColor }} />
                  )}
                  <span
                    className="font-bold leading-none mb-1.5 block"
                    style={{ fontSize: 'clamp(12px, 2.5vw, 16px)', color: isActive ? c.amountColor : '#9a6030', fontFamily: 'Noto Serif Devanagari, serif' }}
                  >
                    {tab.amount}
                  </span>
                  <span
                    className="font-semibold leading-snug block"
                    style={{ fontSize: 'clamp(10px, 2vw, 13px)', color: isActive ? '#1a0800' : '#9a7050', fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* AWARD AMOUNT HIGHLIGHT BANNER */}
          <div className={`rl-fadein ${cfg.highlightBg} border ${cfg.highlightBorder} rounded-2xl px-6 py-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4`} key={activeTab}>
            <div className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center" style={{ background: cfg.numBg }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: cfg.amountColor, fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                पुरस्कार राशि
              </p>
              <p className="text-[14.5px] text-[#3a2000] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                {currentTab.label} के अंतर्गत पुरस्कार के रूप में{' '}
                <strong className="font-bold" style={{ color: cfg.amountColor }}>{currentTab.amount}</strong>{' '}
                की राशि के साथ प्रशस्ति पत्र एवं सम्मान पट्टिका प्रदान की जायेगी।
              </p>
            </div>
          </div>

          {/* RULES LIST */}
          <div className="rl-fadein flex flex-col gap-4" key={`${activeTab}-rules`}>
            {rules.map((rule, idx) => (
              <div
                key={idx}
                className={`rl-rule-card bg-white rounded-2xl border border-[rgba(200,134,10,0.1)] overflow-hidden ${rule.highlight ? `ring-1 ring-[rgba(200,134,10,0.2)]` : ''}`}
              >
                {/* Card header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-[rgba(0,0,0,0.05)]">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0"
                    style={{ background: cfg.numBg, fontFamily: 'Noto Serif Devanagari, serif' }}
                  >
                    {rule.num}
                  </div>
                  <h3
                    className="rl-serif font-bold text-[#1a0800] leading-snug"
                    style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', paddingTop: '0.04em' }}
                  >
                    {rule.title}
                  </h3>
                  {rule.highlight && (
                    <span
                      className="ml-auto flex-shrink-0 text-[9.5px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full border"
                      style={{ color: cfg.amountColor, background: cfg.highlightBg.replace('bg-gradient-to-r ', ''), borderColor: `${cfg.amountColor}30`, fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                    >
                      राशि
                    </span>
                  )}
                </div>

                {/* Card body */}
                <div className="px-6 py-5">
                  {rule.text && (
                    <p className="text-[14px] text-[#4a2a08] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                      {rule.text}
                    </p>
                  )}

                  {rule.categories && (
                    <div className="mt-4 flex flex-col gap-2.5">
                      {rule.categories.map((cat, ci) => (
                        <div key={ci} className="flex flex-col sm:flex-row gap-3 items-start p-4 rounded-xl bg-[rgba(0,0,0,0.02)] border border-[rgba(200,134,10,0.1)]">
                          <span
                            className="flex-shrink-0 text-[10.5px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-lg"
                            style={{ background: cfg.highlightBg.replace('bg-gradient-to-r ', ''), color: cfg.amountColor, border: `1px solid ${cfg.amountColor}25`, fontFamily: 'Noto Sans Devanagari, sans-serif', whiteSpace: 'nowrap' }}
                          >
                            {cat.label}
                          </span>
                          <p className="text-[13.5px] text-[#4a2a08] leading-relaxed pt-0.5" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                            {cat.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {rule.bullets && (
                    <ul className="mt-4 flex flex-col gap-3">
                      {rule.bullets.map((b, bi) => (
                        <li key={bi} className="flex gap-3 items-start">
                          <span className="flex-shrink-0 mt-[6px] w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: cfg.numBg, minWidth: 20 }}>
                            {bi + 1}
                          </span>
                          <span className="text-[13.5px] text-[#4a2a08] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM CTA */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-white border border-[rgba(200,134,10,0.15)] rounded-2xl px-8 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
              <p className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b8700a] mb-2" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>नामांकन की अंतिम तिथि</p>
              <p className="rl-serif text-[#1a0800] mb-4" style={{ fontSize: 'clamp(20px, 4vw, 30px)' }}>20 मई 2026</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/nominate"
                  className="inline-flex items-center gap-2 text-white text-[13px] font-bold px-7 py-3 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: cfg.numBg, fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                >
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0L10 5L5 10L0 5Z" /></svg>
                  नामांकन करें
                </Link>
                <a
                  href="mailto:samratvikramadityasamman@gmail.com"
                  className="inline-flex items-center gap-2 border text-[13px] font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:bg-[rgba(200,134,10,0.05)]"
                  style={{ borderColor: `${cfg.amountColor}40`, color: cfg.amountColor, fontFamily: 'Noto Sans Devanagari, sans-serif' }}
                >
                  ईमेल करें
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}