import React from "react";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import Navbar from "../shared/Navbar";
import TemplateA from "./TemplatesPreview/TemplateA";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ShowCoverletter = () => {
    const navigate = useNavigate();
    const { currentCoverletter } = useSelector((store) => store.templates);

    if (!currentCoverletter) {
        return (
            <p className="text-center text-gray-500">
                No cover letter data available.
            </p>
        );
    }

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

            pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

            content.style.cssText = originalStyle;

            pdf.save("cover_letter.pdf");
        } catch (err) {
            console.error("Error generating PDF:", err);
        }
    };
    const handleBack = ()=>{
        navigate("/coverletter");
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-between items-center max-w-4xl mx-auto mt-6 px-4">
                    <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md" onClick={handleBack}>
                      Back
                    </Button>
                    </div>

            <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-400 mt-5">
                <div id="cover-letter-content" className="p-6">
                
                    {currentCoverletter.templateId === '67c395edf7c10af554a40ef0' ? (
                        <>
                            <TemplateA formData={currentCoverletter} />
                        </>
                    ) : (
                        <p className="text-center text-gray-700">No preview available for this template.</p>
                    )}
                
                   </div>
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

export default ShowCoverletter;
