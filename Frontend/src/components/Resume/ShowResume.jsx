import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import html2canvas from 'html2canvas';
import { Button } from '../ui/button';
import TemplateA from '../TemplatePreviewsResume/TemplateA';
import Navbar from '../shared/Navbar';
import TemplateSlide from '../CoverLetter/TemplateSlide';
import TemplateB from '../TemplatePreviewsResume/TemplateB';
import TemplateC from '../TemplatePreviewsResume/TemplateC';
import TemplateD from '../TemplatePreviewsResume/TemplateD';
import TemplateE from '../TemplatePreviewsResume/TemplateE';
import TemplateF from '../TemplatePreviewsResume/TemplateF';
import TemplateG from '../TemplatePreviewsResume/TemplateG';
import TemplateH from '../TemplatePreviewsResume/TemplateH';
import TemplateI from '../TemplatePreviewsResume/TemplateI';
import TemplateJ from '../TemplatePreviewsResume/TemplateJ';
import TemplateK from '../TemplatePreviewsResume/Templatek';
import Templatek from '../TemplatePreviewsResume/Templatek';
import Templatel from '../TemplatePreviewsResume/Templatel';
import Templatem from '../TemplatePreviewsResume/Templatem';
import Templaten from '../TemplatePreviewsResume/Templaten';
import Templateo from '../TemplatePreviewsResume/Templateo';
import Templatep from '../TemplatePreviewsResume/Templatep';
import Templateq from '../TemplatePreviewsResume/Templateq';
import Templater from '../TemplatePreviewsResume/Templater';
import Templates from '../TemplatePreviewsResume/Templates';

const ShowResume = () => {
    const { currentResume } = useSelector((store) => store.templates);

    const formatDate = (date) => {
        if (date) {
            return new Date(date).toLocaleDateString();
        }
        return '';
    };
    const templateComponents = {
        "678ce2a2288255c4511dfc2c": TemplateA,
        "67d95d0e1e49c2a9af8f8987": TemplateB,
        "67d9878b5aade36a8318edb6": TemplateC,
        "67da0d908eb47ed93fdba593":TemplateD,
        "67da15548eb47ed93fdba65e" :TemplateE,
        "67da1e748eb47ed93fdba7cb":TemplateF,
        "67dabc3a1aff180c69b7d0de":TemplateG,
        "67dabcd11aff180c69b7d0e6":TemplateH,
        "67dabd3a1aff180c69b7d0ea":TemplateI,
        "67dac3121aff180c69b7d15a":TemplateJ,
        "68011030fad089b7b9c3b028":Templatek,
        "6801105efad089b7b9c3b02c":Templatel,
        "6801108efad089b7b9c3b030":Templatem,
        "680110e3fad089b7b9c3b03a":Templaten,
        "68011444fad089b7b9c3b040":Templateo,
        "680114bbfad089b7b9c3b044":Templatep,
        "680114f4fad089b7b9c3b048":Templateq,
        "6801150dfad089b7b9c3b04c":Templater,
        "68011525fad089b7b9c3b050":Templates
        

    };
    const SelectedTemplate = templateComponents[currentResume.templateId];


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
    const handleBack = () => {
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
                    {SelectedTemplate ? (
                        <SelectedTemplate formData={currentResume} />
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
