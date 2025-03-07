import React, { useState } from "react";
import { color, motion } from "framer-motion";
import { Button } from "../ui/button";
import { UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";
import { toast } from "sonner";

const ResumeChecker = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.size <= 2 * 1024 * 1024) {
      setFile(uploadedFile);
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    } else {
      alert("File must be PDF or DOCX and under 2MB");
    }
  };

  const handleUpload = () => {
    if (file) {
      navigate("/score-results", { state: { file } });
    } else {
        toast.error("File must be PDF or DOCX and under 2MB", { position: "top-center" },{color:"red"});
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-5xl mt-5 mb-5 mx-auto bg-gradient-to-r from-white via-gray-100 to-purple-100 rounded-xl shadow-lg p-10 flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">Is your resume good enough?</h1>
        <p className="text-gray-600 mt-4 text-lg">A free and fast AI resume checker doing 16 crucial checks to ensure your resume is ready.</p>
        <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white flex flex-col items-center">
          <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" id="resume-upload" />
          <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center justify-center text-gray-500">
            <UploadCloud className="w-12 h-12 text-blue-500" />
            <span className="mt-2 text-sm">Drop your resume here or click to upload (PDF/DOCX, Max 2MB)</span>
          </label>
        </div>
        {isLoading && <p className="mt-4 text-gray-700 font-medium animate-pulse">Scanning your resume...</p>}
        {file && !isLoading && <p className="mt-4 text-gray-700 font-medium">Uploaded: {file.name}</p>}
        <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
          <Button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all" onClick={handleUpload} disabled={isLoading}>
            Check Score
          </Button>
        </motion.div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <motion.svg 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.8 }} 
          className="w-80 h-80"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="50" cy="50" r="30" fill="#3b82f6" filter="url(#glow)" />
          <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="18" fill="white">ATS</text>
        </motion.svg>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ResumeChecker;
