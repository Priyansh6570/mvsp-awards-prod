"use client";

import { useState, useRef, useEffect } from "react";

export default function SearchableDropdown({ options, value, onChange, isOther, setIsOther, placeholder, isLanguage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) => {
    if (isLanguage) {
      return opt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
             opt.nativeName.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return opt.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSelect = (selectedVal) => {
    if (selectedVal === "Other") {
      setIsOther(true);
      if (!isOther) onChange("");
    } else {
      setIsOther(false);
      onChange(selectedVal);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayValue = () => {
    if (isOther) return "Other";
    if (!value) return placeholder;
    if (isLanguage) {
      const lang = options.find((l) => l.nativeName === value || l.name === value);
      return lang ? lang.nativeName : value;
    }
    return value;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-slate-300 rounded-xl bg-white cursor-pointer flex justify-between items-center transition-shadow hover:border-amber-500 focus:ring-2 focus:ring-amber-500"
      >
        <span className={value || isOther ? "text-slate-900" : "text-slate-400"}>
          {displayValue()}
        </span>
        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl max-h-60 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-100 bg-slate-50">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="overflow-y-auto">
            {filteredOptions.map((opt, idx) => {
              const val = isLanguage ? opt.nativeName : opt;
              const display = isLanguage ? opt.nativeName : opt;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(val)}
                  className="p-3 hover:bg-amber-50 cursor-pointer flex justify-between items-center text-sm font-medium text-slate-800"
                >
                  {display}
                </div>
              );
            })}
            <div
              onClick={() => handleSelect("Other")}
              className="p-3 hover:bg-amber-50 cursor-pointer text-sm font-bold text-amber-700 border-t border-slate-100"
            >
              Other...
            </div>
          </div>
        </div>
      )}

      {isOther && (
        <div className="mt-3 relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Please specify"
            maxLength={50}
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:border-amber-500 focus:ring-amber-500 outline-none transition-all"
          />
          <div className="text-right mt-1">
            <span className={`text-xs font-medium ${value?.length >= 50 ? 'text-rose-500' : 'text-slate-400'}`}>
              {value?.length || 0} / 50
            </span>
          </div>
        </div>
      )}
    </div>
  );
}