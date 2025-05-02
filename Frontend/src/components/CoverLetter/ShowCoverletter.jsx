import React from "react";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
import html2canvas from "html2canvas";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

// Import templates
import TemplateA from "./TemplatesPreview/TemplateA";
import TemplateB from "./TemplatesPreview/TemplateB"; // newly added
import TemplateC from "./TemplatesPreview/TemplateC";
import TemplateD from "./TemplatesPreview/TemplateD";
import TemplateE from "./TemplatesPreview/TemplateE";
import TemplateF from "./TemplatesPreview/TemplateF";
import TemplateG from "./TemplatesPreview/TemplateG";
import TemplateH from "./TemplatesPreview/TemplateH";
import TemplateI from "./TemplatesPreview/TemplateI";
import TemplateJ from "./TemplatesPreview/TemplateJ";

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

    // Template map
    const templateMap = {
        "67c395edf7c10af554a40ef0": TemplateA,
        "67c39617f7c10af554a40ef4": TemplateB,
        "68020648dc4d36d52a06d011":TemplateC,
        "6802066bdc4d36d52a06d017":TemplateD,
        "6802069cdc4d36d52a06d01d":TemplateE,
        "680206badc4d36d52a06d023":TemplateF,
        "680206cddc4d36d52a06d029":TemplateG,
        "680206e1dc4d36d52a06d02f":TemplateH,
        "68020703dc4d36d52a06d035":TemplateI,
        "68039c3c6ad039fe5b91c913":TemplateJ // replace with actual ID from backend
    };

    const SelectedTemplate = templateMap[currentCoverletter.templateId];

    const handleDownload = async () => {
        try {
            const content = document.getElementById("cover-letter-content");
            if (!content) return;

            const originalStyle = content.style.cssText;
            content.style.width = "794px";
            content.style.maxWidth = "none";
            content.style.height = "auto";

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

    const handleBack = () => {
        navigate("/coverletter");
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-between items-center max-w-4xl mx-auto mt-6 px-4">
                <Button
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md"
                    onClick={handleBack}
                >
                    Back
                </Button>
            </div>

            <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto border border-gray-400 mt-5">
                <div id="cover-letter-content" className="p-6">
                    {SelectedTemplate ? (
                        <SelectedTemplate formData={currentCoverletter} />
                    ) : (
                        <p className="text-center text-gray-700">
                            No preview available for this template.
                        </p>
                    )}
                </div>
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

export default ShowCoverletter;
