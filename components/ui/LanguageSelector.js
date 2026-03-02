"use client";

import { useState, useRef, useEffect } from "react";
import { languages } from "@/lib/languages";

export default function LanguageSelector({ onSelect, error }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isOther, setIsOther] = useState(false);
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

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (langName) => {
    if (langName === "Other") {
      setIsOther(true);
      setSelectedLanguage("Other");
      onSelect("");
    } else {
      setIsOther(false);
      setSelectedLanguage(langName);
      onSelect(langName);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 border rounded-lg bg-white cursor-pointer flex justify-between items-center transition-shadow ${
          error ? "border-red-500" : "border-gray-300 hover:border-orange-500 focus:ring-2 focus:ring-orange-500"
        }`}
      >
        <span className={selectedLanguage ? "text-gray-900" : "text-gray-400"}>
          {selectedLanguage || "Select preferred language"}
        </span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              placeholder="Search language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <div
                key={lang.iso639_1}
                onClick={() => handleSelect(lang.name)}
                className="p-3 hover:bg-orange-50 cursor-pointer flex justify-between items-center text-sm"
              >
                <span className="font-medium text-gray-800">{lang.name}</span>
                <span className="text-gray-500">{lang.nativeName}</span>
              </div>
            ))}
            <div
              onClick={() => handleSelect("Other")}
              className="p-3 hover:bg-orange-50 cursor-pointer text-sm font-medium text-orange-600 border-t border-gray-100"
            >
              Other...
            </div>
          </div>
        </div>
      )}

      {isOther && (
        <input
          type="text"
          placeholder="Please specify your language"
          onChange={(e) => onSelect(e.target.value)}
          className="w-full p-3 mt-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
        />
      )}
    </div>
  );
}