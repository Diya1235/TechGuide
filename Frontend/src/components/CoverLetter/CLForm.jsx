import React, { useState } from "react";
import Footer from "../Footer";
import Navbar from "../shared/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { COVERLETTER_API_END_POINT } from "@/utils/Constant";
import { setCurrentCL } from "@/redux/templateSlice";
import axios from "axios";
import { toast } from "sonner"; // Ensure you have react-hot-toast installed
import { Navigate, useNavigate } from "react-router-dom";
import PreviewA from "./Preview/PreviewA";

const CLForm = () => {
    const dispatch = useDispatch();
    const { cltemplateId } = useSelector((store) => store.templates);
    const { user } = useSelector((store) => store.auth);

    const [formData, setFormData] = useState({
        recipientName: "",
        recipientTitle: "",
        companyName: "",
        companyAddress: "",
        introduction: "",
        body: [""],
        closing: "",
        senderName: "",
        senderEmail: "",
        senderPhone: "",
        senderAddress: "",
        senderTitle:"",
        templateId: cltemplateId,
        userId: user ? user._id : "",
    });

    const [resumeFile, setResumeFile] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;
        if (index !== null) {
            setFormData((prev) => {
                const updatedBody = [...prev.body];
                updatedBody[index] = value;
                return { ...prev, body: updatedBody };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        setResumeFile(file);
        console.log("Resume uploaded: ", file);
    };

    const addParagraph = () => {
        setFormData((prev) => ({ ...prev, body: [...prev.body, ""] }));
    };
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form refresh

        try {
            const response = await axios.post(
                `${COVERLETTER_API_END_POINT}/createcoverletter`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Form Data:", formData);
            

            if (response.data.success) {
                toast.success("Cover Letter created successfully", {
                    style: {
                        backgroundColor: "#28a745",
                        color: "#fff",
                    },
                });
                dispatch(setCurrentCL(formData));
                navigate("/viewcoverletter");
            }
        } catch (error) {
            toast.error("Missing fields", {
                style: {
                    backgroundColor: "red",
                    color: "#fff",
                },
            });
            console.error("Error:", error);
        }
        
    };


    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-8">
                <button className="bg-black text-white py-2 px-6 rounded-lg mb-4">
                    Back
                </button>
                <h2 className="text-3xl font-bold text-center mb-6">Resume Builder</h2>

                {/* Step Indicator */}
                <div className="flex justify-center space-x-6 mb-6">
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                            ✔
                        </div>
                        <span className="text-blue-600">Template Selection</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                            2
                        </div>
                        <span className="text-blue-600">Form Filling</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-gray-300 text-gray-600 flex items-center justify-center rounded-full">
                            3
                        </div>
                        <span className="text-gray-600">Resume Ready</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Basic Details</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="recipientName"
                            placeholder="Recipient Name"
                            value={formData.recipientName}
                            onChange={handleChange}
                            className="p-3 border rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            name="recipientTitle"
                            placeholder="Recipient Title"
                            value={formData.recipientTitle}
                            onChange={handleChange}
                            className="p-3 border rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            name="companyName"
                            placeholder="Company Name"
                            value={formData.companyName}
                            onChange={handleChange}
                            className="p-3 border rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            name="companyAddress"
                            placeholder="Company Address"
                            value={formData.companyAddress}
                            onChange={handleChange}
                            className="p-3 border rounded-lg"
                            required
                        />
                    </div>
                    <textarea
                        name="introduction"
                        placeholder="Introduction"
                        value={formData.introduction}
                        onChange={handleChange}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />
                    {formData.body.map((paragraph, index) => (
                        <textarea
                            key={index}
                            placeholder={`Paragraph ${index + 1}`}
                            value={paragraph}
                            onChange={(e) => handleChange(e, index)}
                            className="p-3 border rounded-lg w-full mb-4"
                            required
                        />
                    ))}
                    <button
                        type="button"
                        onClick={addParagraph}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4"
                    >
                        + Add Paragraph
                    </button>
                    <textarea
                        name="closing"
                        placeholder="Closing"
                        value={formData.closing}
                        onChange={handleChange}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />
                    <input
                        type="text"
                        name="senderName"
                        placeholder="Your Name"
                        value={formData.senderName}
                        onChange={handleChange}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />
                     <input
                        type="text"
                        name="senderTitle"
                        placeholder="Your title"
                        value={formData.senderTitle}
                        onChange={handleChange}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />
                    <input
                        type="email"
                        name="senderEmail"
                        placeholder="Your Email"
                        value={formData.senderEmail}
                        onChange={handleChange}
                        className="p-3 border rounded-lg w-full mb-4"
                    />
                    <input
                        type="text"
                        name="senderPhone"
                        placeholder="Your Phone"
                        value={formData.senderPhone}
                        onChange={handleChange}
                        className="p-3 border rounded-lg w-full mb-4"
                    />
                    <input
                        type="text"
                        name="senderAddress"
                        placeholder="Your Address"
                        value={formData.senderAddress}
                        onChange={handleChange}
                        className="p-3 border rounded-lg w-full mb-4"
                    />
                     <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={() => setIsPreviewOpen(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        >
                            Preview
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
            {isPreviewOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[80vh] overflow-auto relative">
            <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-lg"
            >
                ✖
            </button>
            <PreviewA formData={formData} />
        </div>
    </div>
)}
        </>
    );
};

export default CLForm;
