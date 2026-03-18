"use client";

import { useFieldArray } from "react-hook-form";
import SearchableDropdown from "@/components/ui/SearchableDropdown";
import FileUpload from "@/components/ui/FileUpload";
import { languages } from "@/lib/languages";
import { categories } from "@/lib/categories";

const CharCounter = ({ watch, name, max }) => {
  const val = watch(name);
  const len = val ? val.toString().length : 0;
  return (
    <div className="text-right mt-1">
      <span className={`text-xs font-medium ${len >= max ? 'text-red-500' : 'text-[#9a6030]'}`}>
        {len} / {max}
      </span>
    </div>
  );
};

const isFilled = (val) => {
  if (val === null || val === undefined) return false;
  if (typeof val === 'string') return val.trim().length > 0;
  if (typeof val === 'boolean') return val === true;
  if (Array.isArray(val)) return val.length > 0 && val[0] !== '';
  if (typeof val === 'number') return !isNaN(val);
  return !!val;
};

const fieldCls = (err, val) => {
  const base = 'w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-[14px] placeholder:text-[#c8a878] bg-white';
  if (err) return `${base} border-red-400 focus:border-red-500 focus:ring-red-100 text-[#2a1000]`;
  if (isFilled(val)) return `${base} border-[#22c55e] focus:border-[#16a34a] focus:ring-green-100 bg-[#f0fdf4] text-[#2a1000]`;
  return `${base} border-[rgba(200,134,10,0.25)] focus:border-[#c8860a] focus:ring-[rgba(200,134,10,0.15)] text-[#2a1000]`;
};

const LabelRow = ({ children, required, tooltip }) => (
  <div className="flex items-center gap-1.5 mb-1.5">
    <label className="block text-[13px] font-semibold text-[#3a2000]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {tooltip && (
      <div className="group relative flex-shrink-0">
        <button type="button" className="w-4 h-4 rounded-full bg-[rgba(200,134,10,0.15)] text-[#b8700a] text-[10px] font-bold flex items-center justify-center hover:bg-[rgba(200,134,10,0.28)] transition-colors">
          ?
        </button>
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#1a0800] text-white text-[11.5px] leading-relaxed rounded-xl px-3 py-2.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a0800]" />
        </div>
      </div>
    )}
  </div>
);

const ErrMsg = ({ msg }) => msg ? (
  <p className="text-[11px] text-red-500 mt-1 font-medium" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{msg}</p>
) : null;

const SectionDivider = ({ title }) => (
  <div className="col-span-full flex items-center gap-3 mt-2">
    <div className="h-px flex-1 bg-gradient-to-r from-[rgba(200,134,10,0.2)] to-transparent" />
    <span className="text-[10px] font-bold uppercase text-[#b8700a] flex-shrink-0" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>{title}</span>
    <div className="h-px flex-1 bg-gradient-to-l from-[rgba(200,134,10,0.2)] to-transparent" />
  </div>
);

export function Step1BasicInfo({ register, watch, setValue, errors }) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const w = (n) => watch(n);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">

      <SectionDivider title="सम्मान का प्रकार" />

      <div>
        <LabelRow required tooltip="वह सम्मान चुनें जिसके लिए आप आवेदन कर रहे हैं  अंतर्राष्ट्रीय, राष्ट्रीय या शिखर।">सम्मान का प्रकार</LabelRow>
        <select {...register("awardType", { required: true })} className={fieldCls(errors.awardType, w("awardType"))}>
          <option value="International">अंतर्राष्ट्रीय सम्मान (₹1 करोड़ 1 लाख)</option>
          <option value="National">राष्ट्रीय सम्मान (₹21 लाख)</option>
          <option value="Shikhar">शिखर सम्मान (₹5 लाख)</option>
        </select>
        <ErrMsg msg={errors.awardType && 'सम्मान का प्रकार चुनें'} />
      </div>

      <div>
        <LabelRow required tooltip="स्व-नामांकन: आप स्वयं के लिए। अन्य: किसी अन्य व्यक्ति के लिए। संस्था: किसी संगठन के लिए।">नामांकन का प्रकार</LabelRow>
        <select {...register("nominationType", { required: true })} className={fieldCls(errors.nominationType, w("nominationType"))}>
          <option value="Self">स्व-नामांकन (Self)</option>
          <option value="Other">अन्य व्यक्ति के लिए (Other)</option>
          <option value="Institution">संस्था के लिए (Institution)</option>
        </select>
        <ErrMsg msg={errors.nominationType && 'नामांकन का प्रकार चुनें'} />
      </div>

      <SectionDivider title="व्यक्तिगत जानकारी" />

      <div>
        <LabelRow required>प्रथम नाम (First Name)</LabelRow>
        <input type="text" placeholder="जैसे: विक्रम" {...register("firstName", { required: true })} className={fieldCls(errors.firstName, w("firstName"))} />
        <ErrMsg msg={errors.firstName && 'प्रथम नाम आवश्यक है'} />
      </div>
      <div>
        <LabelRow>मध्य नाम (Middle Name)</LabelRow>
        <input type="text" placeholder="जैसे: चन्द्र (वैकल्पिक)" {...register("middleName")} className={fieldCls(null, w("middleName"))} />
      </div>
      <div className="sm:col-span-2">
        <LabelRow required>अंतिम नाम (Last Name)</LabelRow>
        <input type="text" placeholder="जैसे: शर्मा" {...register("lastName", { required: true })} className={fieldCls(errors.lastName, w("lastName"))} />
        <ErrMsg msg={errors.lastName && 'अंतिम नाम आवश्यक है'} />
      </div>

      <div>
        <LabelRow required>लिंग (Gender)</LabelRow>
        <select {...register("gender", { required: true })} className={fieldCls(errors.gender, w("gender"))}>
          <option value="">-- चुनें --</option>
          <option value="male">पुरुष (Male)</option>
          <option value="female">महिला (Female)</option>
          <option value="other">अन्य (Other)</option>
        </select>
        <ErrMsg msg={errors.gender && 'लिंग चुनें'} />
      </div>
      <div>
        <LabelRow required tooltip="व्यक्ति के लिए जन्म तिथि, संस्था के लिए स्थापना तिथि।">जन्म तिथि / स्थापना तिथि</LabelRow>
        <input type="date" {...register("dateOfBirth", { required: true })} className={fieldCls(errors.dateOfBirth, w("dateOfBirth"))} />
        <ErrMsg msg={errors.dateOfBirth && 'तिथि आवश्यक है'} />
      </div>

      <SectionDivider title="संपर्क जानकारी" />

      <div>
        <LabelRow required>मोबाइल नंबर</LabelRow>
        <input type="tel" placeholder="+91 00000 00000" {...register("mobileNumber", { required: true })} className={fieldCls(errors.mobileNumber, w("mobileNumber"))} />
        <ErrMsg msg={errors.mobileNumber && 'मोबाइल नंबर आवश्यक है'} />
      </div>
      <div>
        <LabelRow>वैकल्पिक मोबाइल नंबर</LabelRow>
        <input type="tel" placeholder="+91 00000 00000 (वैकल्पिक)" {...register("alternateMobileNumber")} className={fieldCls(null, w("alternateMobileNumber"))} />
      </div>

      <div>
        <LabelRow required>ईमेल पता</LabelRow>
        <input type="email" placeholder="जैसे: vikram@example.com" {...register("emailId", { required: true, pattern: emailRegex })} className={fieldCls(errors.emailId, w("emailId"))} />
        <ErrMsg msg={errors.emailId && 'मान्य ईमेल पता दर्ज करें'} />
      </div>
      <div>
        <LabelRow required tooltip="वह भाषा जिसमें आप संचार पसंद करते हैं।">पसंदीदा भाषा</LabelRow>
        <SearchableDropdown
          options={languages}
          value={watch("preferredLanguage")}
          onChange={(val) => setValue("preferredLanguage", val)}
          isOther={watch("isPreferredLanguageOther")}
          setIsOther={(val) => setValue("isPreferredLanguageOther", val)}
          placeholder="भाषा चुनें"
          isLanguage={true}
        />
        <ErrMsg msg={errors.preferredLanguage && 'भाषा चुनें'} />
      </div>

      <SectionDivider title="पता / Address" />

      <div className="sm:col-span-2">
        <LabelRow required>पूरा पता</LabelRow>
        <textarea placeholder="मकान नंबर, गली, मोहल्ला, क्षेत्र..." {...register("address", { required: true })} rows={3} className={fieldCls(errors.address, w("address"))} />
        <ErrMsg msg={errors.address && 'पता आवश्यक है'} />
      </div>

      <div>
        <LabelRow required>शहर (City)</LabelRow>
        <input type="text" placeholder="जैसे: उज्जैन" {...register("city", { required: true })} className={fieldCls(errors.city, w("city"))} />
        <ErrMsg msg={errors.city && 'शहर आवश्यक है'} />
      </div>
      <div>
        <LabelRow>जिला (District)</LabelRow>
        <input type="text" placeholder="जैसे: उज्जैन जिला (केवल भारतीय)" {...register("district")} className={fieldCls(null, w("district"))} />
      </div>

      <div>
        <LabelRow required>पिनकोड</LabelRow>
        <input type="text" inputMode="numeric" placeholder="जैसे: 456001" onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '') }} {...register("pincode", { required: true })} className={fieldCls(errors.pincode, w("pincode"))} />
        <ErrMsg msg={errors.pincode && 'पिनकोड आवश्यक है'} />
      </div>
      <div>
        <LabelRow required>राज्य (State)</LabelRow>
        <input type="text" placeholder="जैसे: मध्यप्रदेश" {...register("state", { required: true })} className={fieldCls(errors.state, w("state"))} />
        <ErrMsg msg={errors.state && 'राज्य आवश्यक है'} />
      </div>

      <div>
        <LabelRow required>देश (Country)</LabelRow>
        <input type="text" placeholder="जैसे: India" {...register("country", { required: true })} className={fieldCls(errors.country, w("country"))} />
        <ErrMsg msg={errors.country && 'देश आवश्यक है'} />
      </div>
      <div>
        <LabelRow required>राष्ट्रीयता (Nationality)</LabelRow>
        <input type="text" placeholder="जैसे: Indian" {...register("nationality", { required: true })} className={fieldCls(errors.nationality, w("nationality"))} />
        <ErrMsg msg={errors.nationality && 'राष्ट्रीयता आवश्यक है'} />
      </div>

    </div>
  );
}

export function Step2Professional({ register, watch, setValue, control, errors }) {
  const affiliation = watch("workAffiliationType");
  const w = (n) => watch(n);
  const { fields: successFields, append: appendSuccess, remove: removeSuccess } = useFieldArray({ control, name: "keySuccesses" });
  const { fields: awardFields, append: appendAward, remove: removeAward } = useFieldArray({ control, name: "awardsReceivedList" });

  const validateYears = (e) => {
    let val = parseInt(e.target.value);
    if (val > 80) e.target.value = 80;
    if (val < 1 && e.target.value !== "") e.target.value = "";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">

      <SectionDivider title="कार्य संबंधी जानकारी" />

      <div>
        <LabelRow required tooltip="आप व्यक्तिगत रूप से काम करते हैं या किसी संस्था के साथ?">कार्य का स्वरूप</LabelRow>
        <select {...register("workAffiliationType", { required: true })} className={fieldCls(errors.workAffiliationType, w("workAffiliationType"))}>
          <option value="Individual">व्यक्तिगत (Individual)</option>
          <option value="Organisation">संस्था (Organisation)</option>
        </select>
        <ErrMsg msg={errors.workAffiliationType && 'कार्य का स्वरूप चुनें'} />
      </div>

      {affiliation === "Organisation" && (
        <div>
          <LabelRow required>संस्था का नाम (Organisation Name)</LabelRow>
          <input type="text" placeholder="संस्था का पूरा नाम दर्ज करें" {...register("organizationName", { required: affiliation === "Organisation" })} className={fieldCls(errors.organizationName, w("organizationName"))} />
          <ErrMsg msg={errors.organizationName && 'संस्था का नाम आवश्यक है'} />
        </div>
      )}

      <div>
        <LabelRow>पद / व्यवसाय (Occupation / Designation)</LabelRow>
        <input type="text" placeholder="जैसे: वरिष्ठ वैज्ञानिक, समाजसेवी" {...register("occupationDesignation")} className={fieldCls(null, w("occupationDesignation"))} />
      </div>

      <div>
        <LabelRow required tooltip="वह क्षेत्र जिसमें योगदान सर्वाधिक उल्लेखनीय है।">श्रेणी / क्षेत्र (Category / Domain)</LabelRow>
        <SearchableDropdown
          options={categories}
          value={watch("categoryDomain")}
          onChange={(val) => setValue("categoryDomain", val)}
          isOther={watch("isCategoryDomainOther")}
          setIsOther={(val) => setValue("isCategoryDomainOther", val)}
          placeholder="क्षेत्र चुनें"
          isLanguage={false}
        />
        <ErrMsg msg={errors.categoryDomain && 'क्षेत्र चुनें'} />
      </div>

      <div>
        <LabelRow required tooltip="आपकी विशेषज्ञता का विशिष्ट क्षेत्र।">उत्कृष्टता का क्षेत्र (Field of Excellence)</LabelRow>
        <input type="text" placeholder="जैसे: वैदिक गणित, आयुर्वेद" {...register("fieldOfExcellence", { required: true })} className={fieldCls(errors.fieldOfExcellence, w("fieldOfExcellence"))} />
        <ErrMsg msg={errors.fieldOfExcellence && 'उत्कृष्टता का क्षेत्र आवश्यक है'} />
      </div>

      <div>
        <LabelRow required tooltip="इस क्षेत्र में कितने वर्षों से कार्यरत हैं? (1 से 80 वर्ष)">योगदान के वर्ष (1-80)</LabelRow>
        <input type="number" placeholder="जैसे: 15" {...register("experienceYears", { required: true, min: 1, max: 80 })} onInput={validateYears} className={fieldCls(errors.experienceYears, w("experienceYears"))} />
        <ErrMsg msg={errors.experienceYears && 'योगदान के वर्ष (1-80) आवश्यक है'} />
      </div>

      <SectionDivider title="प्रभाव एवं उपलब्धि" />

      <div>
        <LabelRow tooltip="इस कार्य का प्रभाव किस स्तर तक है?">प्रभाव स्तर (Impact Level)</LabelRow>
        <select {...register("impactLevel")} className={fieldCls(null, w("impactLevel"))}>
          <option value="">-- चुनें (वैकल्पिक) --</option>
          <option value="District">जिला स्तर (District)</option>
          <option value="State">राज्य स्तर (State)</option>
          <option value="National">राष्ट्रीय (National)</option>
          <option value="International">अंतर्राष्ट्रीय (International)</option>
        </select>
      </div>

      <div>
        <LabelRow tooltip="कितने लोगों को आपके कार्य से लाभ हुआ है?">लाभार्थियों की संख्या</LabelRow>
        <input type="number" placeholder="जैसे: 5000" {...register("beneficiariesCount")} className={fieldCls(null, w("beneficiariesCount"))} />
      </div>

      <div className="sm:col-span-2">
        <LabelRow tooltip="अपनी कार्ययात्रा, उपलब्धियाँ और व्यावसायिक अनुभव का विवरण दें।">कार्यक्षेत्र का विवरण (Work Description)</LabelRow>
        <textarea style={{ whiteSpace: 'pre-wrap' }} placeholder="अपनी व्यावसायिक यात्रा, उपलब्धियाँ और योगदान का संक्षिप्त विवरण दें..." {...register("workDescription")} rows={4} className={fieldCls(null, w("workDescription"))} />
      </div>

      <SectionDivider title="प्रमुख सफलताएँ" />

      <div className="sm:col-span-2 space-y-3">
        <LabelRow tooltip="तीन से पाँच प्रमुख उपलब्धियाँ या मील के पत्थर जोड़ें।">प्रमुख उपलब्धि (Key Achievement)</LabelRow>
        {successFields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #b8600a, #d4820a)' }}>{index + 1}</span>
            <input {...register(`keySuccesses.${index}`)} className={fieldCls(null, w(`keySuccesses.${index}`))} placeholder={`सफलता ${index + 1}  उदाहरण: राष्ट्रीय पुरस्कार प्राप्त किया`} />
            <button type="button" onClick={() => removeSuccess(index)} className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendSuccess("")} className="flex items-center gap-2 text-[13px] font-semibold text-[#b8600a] hover:text-[#8b4008] transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
          <span className="w-6 h-6 border-2 border-[#c8860a] rounded-full flex items-center justify-center text-[#c8860a] font-bold text-sm">+</span>
          सफलता जोड़ें
        </button>
      </div>

      <SectionDivider title="प्राप्त पुरस्कार" />

      <div className="sm:col-span-2 space-y-3">
        <LabelRow tooltip="पहले प्राप्त पुरस्कार, सम्मान या मान्यताएँ सूचीबद्ध करें।">प्राप्त पुरस्कार एवं सम्मान</LabelRow>
        {awardFields.map((item, index) => (
          <div key={item.id} className="flex gap-2 items-center">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #7b1e1e, #9c2a2a)' }}>{index + 1}</span>
            <input {...register(`awardsReceivedList.${index}`)} className={fieldCls(null, w(`awardsReceivedList.${index}`))} placeholder={`जैसे: राष्ट्रीय पुरस्कार 2022`} />
            <button type="button" onClick={() => removeAward(index)} className="w-8 h-8 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0">
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
        <button type="button" onClick={() => appendAward("")} className="flex items-center gap-2 text-[13px] font-semibold text-[#b8600a] hover:text-[#8b4008] transition-colors" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
          <span className="w-6 h-6 border-2 border-[#c8860a] rounded-full flex items-center justify-center text-[#c8860a] font-bold text-sm">+</span>
          पुरस्कार जोड़ें
        </button>
      </div>

      <SectionDivider title="नवाचार विवरण" />

      <div className="sm:col-span-2">
        <LabelRow tooltip="आपके कार्य की विशिष्टता, नवीन पद्धतियाँ या रचनात्मक योगदान क्या है?">नवाचार / विशिष्टता (Innovation Description)</LabelRow>
        <textarea style={{ whiteSpace: 'pre-wrap' }} placeholder="अपनी अनूठी पद्धतियाँ, नवाचार या रचनात्मक कार्यों का विवरण दें..." {...register("innovationDescription")} rows={4} className={fieldCls(null, w("innovationDescription"))} />
      </div>

    </div>
  );
}

export function Step3CategoryDetails({ register, errors, watch }) {
  const w = (n) => watch(n);
  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-[#fdf8ee] to-[#fdf4d8] border border-[rgba(200,134,10,0.2)] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #b8600a, #d4820a)' }}>
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#6a3a08] mb-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>महत्वपूर्ण निर्देश</p>
            <p className="text-[12.5px] text-[#7a4a18] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              यह नामांकन का सबसे महत्वपूर्ण भाग है। कृपया विस्तार से बताएँ।
            </p>
          </div>
        </div>
      </div>

      <div>
        <LabelRow required tooltip="निर्णायक मंडल इसी विवरण के आधार पर चयन करेगा। कृपया विस्तार से और स्पष्ट रूप से लिखें।">
          सम्मान की पात्रता का मुख्य आधार
        </LabelRow>
        <textarea
          style={{ whiteSpace: 'pre-wrap' }}
          placeholder="विस्तार से बताएँ कि यह नामांकन सम्राट विक्रमादित्य सम्मान के योग्य क्यों है। उनके विशिष्ट योगदान, उपलब्धियाँ, समाज पर प्रभाव और विक्रमादित्य के गुणों से समानता का उल्लेख करें..."
          {...register("mainBasisForRespect", { required: true })}
          rows={10}
          className={fieldCls(errors.mainBasisForRespect, w("mainBasisForRespect"))}
        />
        <ErrMsg msg={errors.mainBasisForRespect && 'यह विवरण आवश्यक है'} />
      </div>
    </div>
  );
}

export function Step4Documents({ register, setValue, watch }) {
  const nomType = watch("nominationType");
  const fileAccept = "application/pdf, image/jpeg, image/png";

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#fdf8ee] to-[#fdf4d8] border border-[rgba(200,134,10,0.2)] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #b8600a, #d4820a)' }}>
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#6a3a08] mb-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>दस्तावेज़ अपलोड करें</p>
            <p className="text-[12.5px] text-[#7a4a18] leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              PDF, JPG या PNG प्रारूप में अपलोड करें। कार्य का प्रमाण (<strong>*</strong>) अनिवार्य है। फ़ोटोग्राफ़ वैकल्पिक है।
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {nomType === "Self" && (
          <div>
            <LabelRow tooltip="नामांकित व्यक्ति का स्पष्ट फ़ोटोग्राफ़ (वैकल्पिक)">फ़ोटोग्राफ़ (वैकल्पिक)</LabelRow>
            <FileUpload name="documents.photograph" label="" placeholder="JPG/PNG अपलोड करें" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
          </div>
        )}

        <div>
          <LabelRow required tooltip="कार्य का प्रमाण  प्रमाण पत्र, प्रकाशन, मीडिया रिपोर्ट आदि।">कार्य का प्रमाण (Proof of Work)</LabelRow>
          <FileUpload name="documents.proofOfWork" label="" placeholder="PDF/इमेज अपलोड करें" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
        </div>

        <div>
          <LabelRow tooltip="अनुशंसा पत्र यदि उपलब्ध हो (वैकल्पिक)।">अनुशंसा पत्र (वैकल्पिक)</LabelRow>
          <FileUpload name="documents.recommendationLetter" label="" placeholder="PDF अपलोड करें" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
        </div>

        <div>
          <LabelRow tooltip="समाचार पत्र, पत्रिका या डिजिटल मीडिया कवरेज (वैकल्पिक)।">मीडिया कवरेज (वैकल्पिक)</LabelRow>
          <FileUpload name="documents.mediaCoverage" label="" placeholder="PDF/इमेज अपलोड करें" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
        </div>

        <div>
          <LabelRow tooltip="पूर्व में प्राप्त पुरस्कारों के प्रमाण पत्र (वैकल्पिक)।">पुरस्कार प्रमाण पत्र (वैकल्पिक)</LabelRow>
          <FileUpload name="documents.awardsCertificates" label="" placeholder="PDF/इमेज अपलोड करें" accept={fileAccept} register={register} setValue={setValue} watch={watch} />
        </div>
      </div>
    </div>
  );
}

export function Step5Nominator({ register, watch, errors }) {
  const watchNominationType = watch("nominationType");
  const w = (n) => watch(n);

  if (watchNominationType === "Self") {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] border-2 border-[#86efac] rounded-2xl text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
        </div>
        <p className="text-[15px] font-semibold text-green-800 mb-1" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>स्व-नामांकन चुना गया है</p>
        <p className="text-[13px] text-green-700 leading-relaxed" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
          चरण 1 में प्रदान की गई जानकारी नामांकनकर्ता विवरण के रूप में उपयोग की जाएगी।<br />अगले चरण पर जाएँ।
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
      <div className="sm:col-span-2 bg-gradient-to-br from-[#fdf8ee] to-[#fdf4d8] border border-[rgba(200,134,10,0.2)] rounded-2xl p-4">
        <p className="text-[13px] font-semibold text-[#6a3a08]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
          नामांकन करने वाले व्यक्ति का विवरण  जो इस नामांकन को प्रस्तुत कर रहे हैं, उनकी जानकारी यहाँ भरें।
        </p>
      </div>

      <SectionDivider title="नामांकनकर्ता का नाम" />

      <div>
        <LabelRow required>प्रथम नाम (First Name)</LabelRow>
        <input type="text" placeholder="आपका प्रथम नाम" {...register("nominator.firstName", { required: watchNominationType !== "Self" })} className={fieldCls(errors?.nominator?.firstName, w("nominator.firstName"))} />
        <ErrMsg msg={errors?.nominator?.firstName && 'प्रथम नाम आवश्यक है'} />
      </div>
      <div>
        <LabelRow>मध्य नाम</LabelRow>
        <input type="text" placeholder="वैकल्पिक" {...register("nominator.middleName")} className={fieldCls(null, w("nominator.middleName"))} />
      </div>
      <div className="sm:col-span-2">
        <LabelRow required>अंतिम नाम (Last Name)</LabelRow>
        <input type="text" placeholder="आपका अंतिम नाम" {...register("nominator.lastName", { required: watchNominationType !== "Self" })} className={fieldCls(errors?.nominator?.lastName, w("nominator.lastName"))} />
        <ErrMsg msg={errors?.nominator?.lastName && 'अंतिम नाम आवश्यक है'} />
      </div>

      <SectionDivider title="संपर्क जानकारी" />

      <div>
        <LabelRow required>मोबाइल नंबर</LabelRow>
        <input type="tel" placeholder="आपका सक्रिय मोबाइल नंबर" {...register("nominator.mobile", { required: watchNominationType !== "Self" })} className={fieldCls(errors?.nominator?.mobile, w("nominator.mobile"))} />
        <ErrMsg msg={errors?.nominator?.mobile && 'मोबाइल नंबर आवश्यक है'} />
      </div>
      <div>
        <LabelRow required>ईमेल पता</LabelRow>
        <input type="email" placeholder="आपका सक्रिय ईमेल पता" {...register("nominator.email", { required: watchNominationType !== "Self" })} className={fieldCls(errors?.nominator?.email, w("nominator.email"))} />
        <ErrMsg msg={errors?.nominator?.email && 'ईमेल पता आवश्यक है'} />
      </div>
      <div className="sm:col-span-2">
        <LabelRow required>आपका पता</LabelRow>
        <textarea placeholder="आपका पूरा पता दर्ज करें..." {...register("nominator.address", { required: watchNominationType !== "Self" })} rows={2} className={fieldCls(errors?.nominator?.address, w("nominator.address"))} />
        <ErrMsg msg={errors?.nominator?.address && 'पता आवश्यक है'} />
      </div>

      <SectionDivider title="अनुशंसा नोट" />

      <div className="sm:col-span-2">
        <LabelRow required tooltip="आप इस उम्मीदवार को क्यों अनुशंसित कर रहे हैं? विस्तार से बताएँ।">अनुशंसा नोट</LabelRow>
        <textarea style={{ whiteSpace: 'pre-wrap' }} placeholder="बताएँ कि आप इस उम्मीदवार को सम्राट विक्रमादित्य सम्मान के लिए क्यों अनुशंसित कर रहे हैं..." {...register("nominator.recommendationNote", { required: watchNominationType !== "Self" })} rows={4} className={fieldCls(errors?.nominator?.recommendationNote, w("nominator.recommendationNote"))} />
        <ErrMsg msg={errors?.nominator?.recommendationNote && 'अनुशंसा नोट आवश्यक है'} />
      </div>
    </div>
  );
}

export function Step6Declaration({ register, watch, errors }) {
  const w = (n) => watch(n);
  const isSigned = w("digitalSignature") && w("digitalSignature").trim().length > 0;
  const isConsented = w("consentCheckbox");

  return (
    <div className="space-y-6">
      <div className={`rounded-2xl p-5 border-2 transition-all duration-300 ${isConsented ? 'bg-[#f0fdf4] border-[#86efac]' : 'bg-gradient-to-br from-[#fdf8ee] to-[#fdf4d8] border-[rgba(200,134,10,0.25)]'}`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <input type="checkbox" {...register("consentCheckbox", { required: true })} className="w-5 h-5 rounded text-[#c8860a] border-[rgba(200,134,10,0.4)] focus:ring-[rgba(200,134,10,0.3)] cursor-pointer" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <label className="text-[14px] font-bold text-[#1a0800]" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
                सहमति एवं घोषणा <span className="text-red-500">*</span>
              </label>
            </div>
            <p className="text-[13.5px] text-[#4a2a08] leading-loose" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
              मैं एतद् घोषित करता/करती हूँ कि इस नामांकन प्रपत्र में प्रदान की गई समस्त जानकारी मेरी जानकारी के अनुसार सत्य एवं सही है। मैं यह समझता/समझती हूँ कि किसी भी असत्य जानकारी के कारण सम्राट विक्रमादित्य सम्मान से अयोग्य घोषित किया जा सकता है।
            </p>
          </div>
        </div>
        <ErrMsg msg={errors.consentCheckbox && 'सहमति देना अनिवार्य है'} />
      </div>

      <div>
        <LabelRow required tooltip="अपना पूरा कानूनी नाम टाइप करें  यह आपके आधिकारिक हस्ताक्षर के रूप में कार्य करेगा।">
          डिजिटल हस्ताक्षर (पूरा नाम टाइप करें)
        </LabelRow>
        <input
          type="text"
          placeholder="अपना पूरा कानूनी नाम यहाँ टाइप करें"
          maxLength={100}
          {...register("digitalSignature", { required: true })}
          className={fieldCls(errors.digitalSignature, isSigned ? w("digitalSignature") : null)}
          style={{ fontFamily: isSigned ? 'Georgia, serif' : 'Noto Sans Devanagari, sans-serif', fontStyle: isSigned ? 'italic' : 'normal', fontSize: isSigned ? 18 : 14 }}
        />
        <CharCounter watch={watch} name="digitalSignature" max={100} />
        <ErrMsg msg={errors.digitalSignature && 'डिजिटल हस्ताक्षर आवश्यक है'} />
      </div>

      {isConsented && isSigned && (
        <div className="flex items-center gap-3 p-4 bg-[#f0fdf4] border border-[#86efac] rounded-xl">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <p className="text-[13px] font-semibold text-green-800" style={{ fontFamily: 'Noto Sans Devanagari, sans-serif' }}>
            सहमति और हस्ताक्षर दोनों प्राप्त हो गए हैं। आप नामांकन जमा कर सकते हैं।
          </p>
        </div>
      )}
    </div>
  );
}