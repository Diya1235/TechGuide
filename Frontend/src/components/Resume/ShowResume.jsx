import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { Button } from '../ui/button';
import TemplateA from '../TemplatePreviewsResume/TemplateA';
import Navbar from '../shared/Navbar';

const ShowResume = () => {
    const { currentResume } = useSelector((store) => store.templates);

    const formatDate = (date) => {
        if (date) {
            return new Date(date).toLocaleDateString();
        }
        return '';
    };

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
    const navigate = useNavigate();
    const handleBack=()=>{
        navigate("/")
    }

    return (
        <>
            <Navbar />
            <div className="flex justify-between items-center max-w-4xl mx-auto mt-6 px-4">
                    <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md" onClick={handleBack}>
                      Back
                    </Button>
                    </div>

            <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto h-[100%] border border-gray-400 overflow-y-auto mt-5">
                <div id="resume-content">
                    {currentResume.templateId === '678ce2a2288255c4511dfc2c' ? (
                        <>
                            <TemplateA formData={currentResume} />
                        </>
                    ) : (
                        <p className="text-center text-gray-700">No preview available for this template.</p>
                    )}
                </div>

                {/* Action Buttons */}

            </div>
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

export default ShowResume;
