import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setResume, setresumetemplateId } from "@/redux/templateSlice";
import { RESUME_API_END_POINT } from "@/utils/Constant";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TemplateA from "../TemplatePreviewsResume/TemplateA";
import { Pen } from "lucide-react";
import Navbar from "../shared/Navbar";
import TemplateB from "../TemplatePreviewsResume/TemplateB";
import TemplateC from "../TemplatePreviewsResume/TemplateC";
import TemplateD from "../TemplatePreviewsResume/TemplateD";
import TemplateE from "../TemplatePreviewsResume/TemplateE";
import TemplateF from "../TemplatePreviewsResume/TemplateF";
import TemplateG from "../TemplatePreviewsResume/TemplateG";
import TemplateH from "../TemplatePreviewsResume/TemplateH";

const DisplayResume = () => {
  const { id, tempId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { dispResume } = useSelector((store) => store.templates) || { dispResume: {} };
  const navigate = useNavigate();
 
  useEffect(() => {
    dispatch(setresumetemplateId(tempId));
    const fetchResumeById = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${RESUME_API_END_POINT}/getResumeById/${id}`, {
          withCredentials: true,
        });
  console.log(res.data.data)
        if (res.data.success) {
          dispatch(setResume(res.data.data));
        } else {
          setError("Resume not found");
        }
      } catch (err) {
        setError("Failed to fetch resume");
        console.error("Error fetching resume:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResumeById();
    }
  }, [id, dispatch]);

  const handleDownload = async () => {
    try {
      const content = document.getElementById("resume-content");
      if (!content) return;
  
      const originalStyle = content.style.cssText;
  
      // Set content to fixed size (A4 ratio)
      const a4WidthPx = 794; // A4 width in pixels (approx 210mm @ 96dpi)
      const a4HeightPx = 1123; // A4 height in pixels (approx 297mm @ 96dpi)
  
      // Scale down content to fit within A4 height
      const scaleFactor = a4HeightPx / content.scrollHeight;
  
      content.style.transformOrigin = "top left";
      content.style.transform = `scale(${scaleFactor})`;
      content.style.width = `${a4WidthPx}px`;
      content.style.maxWidth = "none";
      content.style.height = "auto";
  
      // Wait for DOM changes to reflect
      await new Promise((resolve) => setTimeout(resolve, 300));
  
      const canvas = await html2canvas(content, {
        scale: 2, // Keeps good quality even when scaled
        useCORS: true,
      });
  
      const imgData = canvas.toDataURL("image/jpeg", 0.9); // 90% quality
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297); // Full A4 size in mm
  
      // Revert styles
      content.style.cssText = originalStyle;
  
      pdf.save("resume.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };
  
const templateComponents = {
        "678ce2a2288255c4511dfc2c": TemplateA,
        "67d95d0e1e49c2a9af8f8987": TemplateB,
        "67d9878b5aade36a8318edb6": TemplateC,
        "67da0d908eb47ed93fdba593":TemplateD,
        "67da15548eb47ed93fdba65e":TemplateE,
        "67da1e748eb47ed93fdba7cb":TemplateF,
        "67dabc3a1aff180c69b7d0de":TemplateG,
        "67dabcd11aff180c69b7d0e6":TemplateH

    };
    const SelectedTemplate = templateComponents[dispResume.templateId];



  const handleBack = () => {
    navigate("/profile");
  };

  const handleEdit = () => {
    navigate("/editResume");
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading resume...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!dispResume) {
    return <p className="text-center text-gray-600">No resume data available</p>;
  }
console.log(dispResume.templateId)
  return (
    <>
      <Navbar />

      {/* Buttons outside the resume content */}
      <div className="flex justify-between items-center max-w-4xl mx-auto mt-6 px-4">
        <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md" onClick={handleBack}>
          Back
        </Button>

        <button
          onClick={handleEdit}
          className="bg-black text-white py-2 px-4 rounded-lg shadow-md flex items-center gap-2 hover:bg-gray-800 transition"
        >
          <Pen size={16} />
          Edit
        </button>
      </div>

      {/* Resume Display */}
      <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-400 overflow-y-auto mt-4">
        <div id="resume-content">
        {SelectedTemplate ? (
                        <SelectedTemplate formData={dispResume} />
                    ) : (
                        <p className="text-center text-gray-700">No preview available for this template.</p>
                    )}
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-end mt-5 mb-10 max-w-4xl mx-auto px-4">
        <button
          onClick={handleDownload}
          className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Download as PDF
        </button>
      </div>
    </>
  );
};

export default DisplayResume;