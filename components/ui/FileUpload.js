"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from "browser-image-compression";
import Tooltip from "./Tooltip";

export default function FileUpload({ name, label, tooltip, accept, register, setValue, watch }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  
  const fileUrl = watch(name);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5242880) {
      setError("File exceeds 5MB limit");
      e.target.value = "";
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      let fileToUpload = file;
      if (file.type.startsWith("image/")) {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        fileToUpload = await imageCompression(file, options);
      }

      const formData = new FormData();
      formData.append("file", fileToUpload);
      formData.append("fileType", file.type.startsWith("image/") ? "image" : "document");

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json();
      setValue(name, data.url, { shouldValidate: true });
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setValue(name, "", { shouldValidate: true });
    setError("");
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-1">
        <label className="block text-sm font-semibold text-slate-700">{label}</label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>

      <input type="hidden" {...register(name, { required: true })} />

      <AnimatePresence mode="wait">
        {!fileUrl && !isUploading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-slate-500"><span className="font-semibold text-amber-600">Click to upload</span></p>
                <p className="text-xs text-slate-400">PDF, JPG or PNG (MAX. 5MB)</p>
              </div>
              <input type="file" className="hidden" accept={accept} onChange={handleFileChange} />
            </label>
          </motion.div>
        )}

        {isUploading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center w-full h-32 border-2 border-amber-300 border-solid rounded-xl bg-amber-50">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mb-2"></motion.div>
            <p className="text-sm font-medium text-amber-700">Uploading securely...</p>
          </motion.div>
        )}

        {fileUrl && !isUploading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between w-full p-4 border-2 border-emerald-500 border-solid rounded-xl bg-emerald-50">
            <div className="flex items-center overflow-hidden">
              <svg className="w-6 h-6 text-emerald-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm font-medium text-emerald-800 truncate">File uploaded successfully</span>
            </div>
            <button type="button" onClick={removeFile} className="text-sm font-bold text-rose-600 hover:text-rose-800 transition-colors ml-4 flex-shrink-0">
              Change
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-2 text-sm font-medium text-rose-600">{error}</p>}
    </div>
  );
}