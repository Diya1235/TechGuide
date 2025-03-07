import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import axios from "axios";
import html2canvas from "html2canvas";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import TemplateA from "./TemplatesPreview/TemplateA";
import { COVERLETTER_API_END_POINT } from "@/utils/Constant";
import { setCoverletter } from "@/redux/templateSlice";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";

const DisplayCoverletter = () => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { displetter } = useSelector((store) => store.templates) || { displetter: {} };
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchletterById = async () => {
            try {
                setLoading(true);
                
                const res = await axios.get(`${COVERLETTER_API_END_POINT}/getletterbycoverletterid/${id}`, {
                    withCredentials: true,
                });
               console.log(res.data)
                if (res.data) {
                    dispatch(setCoverletter(res.data.data));
                } else {
                    setError("Cover letter not found");
                }
            } catch (err) {
                setError("Failed to fetch Cover letter");
                console.error("Error fetching Cover letter:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchletterById();
        }
    }, [id, dispatch]);

    const handleDownload = async () => {
        try {
            const content = document.getElementById("cover-letter-content");
            if (!content) return;

            const originalStyle = content.style.cssText;
            content.style.width = "794px"; // A4 width in pixels
            content.style.maxWidth = "none";
            content.style.height = "auto"; // Adjust height dynamically

            const pdf = new jsPDF("p", "mm", "a4");
            const canvas = await html2canvas(content, {
                scale: 2,
                useCORS: true,
                width: 794,
                height: content.scrollHeight,
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.6);
            const imgWidth = 210;
            const imgHeight = (content.scrollHeight * imgWidth) / 794;

            // Handling multi-page PDFs
            let yPosition = 0;
            const pageHeight = 297; // A4 height in mm
            let remainingHeight = imgHeight;

            while (remainingHeight > 0) {
                pdf.addImage(imgData, "JPEG", 0, yPosition, imgWidth, Math.min(remainingHeight, pageHeight));
                remainingHeight -= pageHeight;
                yPosition -= pageHeight;

                if (remainingHeight > 0) pdf.addPage();
            }

            content.style.cssText = originalStyle;
            pdf.save("cover_letter.pdf");
        } catch (err) {
            console.error("Error generating PDF:", err);
        }
    };
    const handleBack = ()=>{
        navigate("/profile");
    }
    const handleEdit = ()=>{
        navigate("/editCoverletter")
    }

    return (
        <>
            <Navbar />
        
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
        
            <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-400 mt-5">
                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div id="cover-letter-content" className="p-6">
                        {displetter.templateId === "67c395edf7c10af554a40ef0" ? (
                            <TemplateA formData={displetter} />
                        ):<p>Not found</p>
                    }
                    </div>
                )}
            </div>

            {/* Download Button */}
            <div className="flex justify-end gap-5 mt-5 mb-5 mr-20">
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

export default DisplayCoverletter;
