import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setResume } from "@/redux/templateSlice";
import { RESUME_API_END_POINT } from "@/utils/Constant";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TemplateA from "../TemplatePreviewsResume/TemplateA";
import { Pen } from "lucide-react";
import Navbar from "../shared/Navbar";

const DisplayResume = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { dispResume } = useSelector((store) => store.templates) || { dispResume: {} };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumeById = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${RESUME_API_END_POINT}/getResumeByResumeId/${id}`, {
          withCredentials: true,
        });

        if (res.data) {
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

    // Temporarily set fixed dimensions to ensure consistency
    const originalStyle = content.style.cssText;
    content.style.width = "794px"; // A4 width in pixels
    content.style.maxWidth = "none";
    content.style.height = "auto"; // Adjust height dynamically

    const pdf = new jsPDF("p", "mm", "a4");

    const canvas = await html2canvas(content, {
      scale: 2, // Lower scale for smaller file size
      useCORS: true,
      width: 794, 
      height: content.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.6); // Compress to JPEG with 60% quality
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (content.scrollHeight * imgWidth) / 794; // Maintain aspect ratio

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

    // Revert styles after capture
    content.style.cssText = originalStyle;

    pdf.save("resume.pdf");
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};

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
          {dispResume.templateId === '678ce2a2288255c4511dfc2c' ? (
            <TemplateA formData={dispResume} />
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