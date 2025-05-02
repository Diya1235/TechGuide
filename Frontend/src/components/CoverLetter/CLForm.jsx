import React, { useState } from "react";
import Footer from "../Footer";
import Navbar from "../shared/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { COVERLETTER_API_END_POINT } from "@/utils/Constant";
import { setCurrentCL } from "@/redux/templateSlice";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import RenderCoverletterPreview from "./RenderCoverletterPreview";

const CLForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cltemplateId } = useSelector((store) => store.templates);
    const { user } = useSelector((store) => store.auth);

    const [formData, setFormData] = useState({
        recipientName: "",
        recipientTitle: "",
       
        company: {
            name: "",
            address: "",
            introduction: ""
        },
        body: [{ paragraph: "" }],
        closing: "",
        senderName: "",
        senderTitle: "",
        senderContact: {
            email: "",
            phone: "",
            address: ""
        },
        date: new Date().toISOString().split("T")[0],
        templateId: cltemplateId,
        userId: user ? user._id : ""
    });

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleChange = (e, index = null, field = null) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (index !== null) {
                const updatedBody = [...prev.body];
                updatedBody[index] = { paragraph: value };
                return { ...prev, body: updatedBody };
            } else if (field === "company") {
                return { ...prev, company: { ...prev.company, [name]: value } };
            } else if (field === "senderContact") {
                return { ...prev, senderContact: { ...prev.senderContact, [name]: value } };
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    const handlePreview = () => {
        setIsPreviewOpen(true);
    };

    const addParagraph = () => {
        setFormData((prev) => ({
            ...prev,
            body: [...prev.body, { paragraph: "" }]
        }));
    };

    const deleteParagraph = (index) => {
        setFormData((prev) => {
            const updatedBody = prev.body.filter((_, i) => i !== index);
            return { ...prev, body: updatedBody };
        });
    };

    const validateForm = () => {
        const requiredFields = [
            formData.recipientName,
            formData.company.name,
            formData.date,
            formData.company.address,
            formData.company.introduction,
            ...formData.body.map((b) => b.paragraph),
            formData.closing,
            formData.senderName,
            formData.senderTitle,
            formData.senderContact.email,
            formData.senderContact.phone,
            formData.senderContact.address
        ];
        return requiredFields.every(Boolean);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill all required fields.");
            return;
        }

        try {
            const response = await axios.post(
                `${COVERLETTER_API_END_POINT}/createcoverletter`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (response.data.success) {
                toast.success("Cover Letter created successfully!");
                dispatch(setCurrentCL(formData));
                navigate("/viewcoverletter");
            }
        } catch (error) {
            toast.error("Error creating cover letter.");
            console.error("Error:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <button onClick={() => navigate(-1)} className="bg-black text-white py-2 px-6 rounded-lg mb-4">
                    Back
                </button>
                <h2 className="text-3xl font-bold text-center mb-6">Cover Letter Builder</h2>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Basic Details</h3>

                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" name="recipientName" placeholder="Recipient Name" value={formData.recipientName} onChange={handleChange} className="p-3 border rounded-lg" required />
                        <input type="text" name="recipientTitle" placeholder="Recipient Title" value={formData.recipientTitle} onChange={handleChange} className="p-3 border rounded-lg" />
                    </div>

                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" name="name" placeholder="Company Name" value={formData.company.name} onChange={(e) => handleChange(e, null, "company")} className="p-3 border rounded-lg" required />
                        <input type="text" name="address" placeholder="Company Address" value={formData.company.address} onChange={(e) => handleChange(e, null, "company")} className="p-3 border rounded-lg" required />
                    </div>

                    <textarea name="introduction" placeholder="Introduction" value={formData.company.introduction} onChange={(e) => handleChange(e, null, "company")} className="p-3 border rounded-lg w-full mb-4" required />

                    {formData.body.map((paragraph, index) => (
                        <div key={index} className="relative mb-4">
                            <textarea placeholder={`Paragraph ${index + 1}`} value={paragraph.paragraph} onChange={(e) => handleChange(e, index)} className="p-3 border rounded-lg w-full" required />
                            {formData.body.length > 1 && (
                                <button type="button" onClick={() => deleteParagraph(index)} className="absolute top-2 right-2 text-red-500 font-bold">×</button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addParagraph} className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">
                        + Add Paragraph
                    </button>

                    <textarea name="closing" placeholder="Closing" value={formData.closing} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />
                    <input type="text" name="senderName" placeholder="Your Name" value={formData.senderName} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />
                    <input type="text" name="senderTitle" placeholder="Your Title" value={formData.senderTitle} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />

                    <input type="email" name="email" placeholder="Your Email" value={formData.senderContact.email} onChange={(e) => handleChange(e, null, "senderContact")} className="p-3 border rounded-lg w-full mb-4" required />
                    <input type="text" name="phone" placeholder="Your Phone" value={formData.senderContact.phone} onChange={(e) => handleChange(e, null, "senderContact")} className="p-3 border rounded-lg w-full mb-4" required />
                    <input type="text" name="address" placeholder="Your Address" value={formData.senderContact.address} onChange={(e) => handleChange(e, null, "senderContact")} className="p-3 border rounded-lg w-full mb-4" required />

                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" />

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={handlePreview} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Preview
                        </button>
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
                            Write
                        </button>
                    </div>
                </form>
            </div>
            <Footer />

            {isPreviewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-4xl max-h-[95%] relative">
                        <button className="absolute top-3 right-5 text-gray-800 hover:text-black text-2xl font-bold z-10" onClick={() => setIsPreviewOpen(false)}>
                            ✕
                        </button>
                        <div className="p-5 pt-12 max-h-[85vh] overflow-y-auto">
                            <RenderCoverletterPreview formData={formData} templateId={cltemplateId} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CLForm;
