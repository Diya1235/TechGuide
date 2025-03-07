import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Navbar from "../shared/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { COVERLETTER_API_END_POINT } from "@/utils/Constant";
import { setCurrentCL } from "@/redux/templateSlice";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PreviewA from "./Preview/PreviewA";
import { Button } from "../ui/button";

const CLForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cltemplateId } = useSelector((store) => store.templates);
    const { user } = useSelector((store) => store.auth);
    const { displetter } = useSelector((store) => store.templates);

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
        senderTitle: "",
        templateId: cltemplateId,
        userId: user ? user._id : "",
    });

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (displetter) {
            setFormData(displetter);
        }
    }, [displetter]);

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        if (index !== null) {
            setFormData((prev) => {
                const updatedBody = [...prev.body];
                updatedBody[index] = { ...updatedBody[index], paragraph: value }; // Ensure correct structure
                return { ...prev, body: updatedBody };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };


    const addParagraph = () => {
        setFormData((prev) => ({
            ...prev,
            body: [...prev.body, { paragraph: "", _id: Math.random().toString(36).substr(2, 9) }], // Generate a temp ID
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${COVERLETTER_API_END_POINT}/update/${formData._id}`,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.data.success) {
                toast.success("Cover Letter updated successfully", {
                    style: { backgroundColor: "#28a745", color: "#fff" },
                });
                dispatch(setCurrentCL(formData));
                navigate("/viewcoverletter");
            }
        } catch (error) {
            toast.error("Error updating cover letter", {
                style: { backgroundColor: "red", color: "#fff" },
            });
            console.error("Error:", error);
        }
    };
    const removeParagraph = (index) => {
        setFormData((prev) => {
            const updatedBody = [...prev.body];
            updatedBody.splice(index, 1); // Remove the paragraph at the given index
            return { ...prev, body: updatedBody };
        });
    };
    const handleBack = () => {
        navigate("/profile")
    }

    console.log(formData);

    return (
        <>
            <Navbar />
            <div className="flex justify-between items-center max-w-4xl mx-auto mt-6 px-4">
                <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md" onClick={handleBack}>
                    Back
                </Button>
            </div>
            <div className="max-w-4xl mx-auto p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Edit Cover Letter</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                    <input type="text" name="recipientName" placeholder="Recipient Name" value={formData.recipientName} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />
                    <input type="text" name="recipientTitle" placeholder="Recipient Title" value={formData.recipientTitle} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" />
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        value={formData.company?.name || ""}
                        onChange={(e) => setFormData({
                            ...formData,
                            company: { ...formData.company, name: e.target.value }
                        })}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />

                    <input
                        type="text"
                        name="companyAddress"
                        placeholder="Company Address"
                        value={formData.company?.address || ""}
                        onChange={(e) => setFormData({
                            ...formData,
                            company: { ...formData.company, address: e.target.value }
                        })}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />

                    <textarea name="introduction" placeholder="Introduction" value={formData.introduction} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />
                    {formData.body.map((item, index) => (
                        <div key={item._id || index} className="relative mb-4">
                            <textarea
                                placeholder={`Paragraph ${index + 1}`}
                                value={item.paragraph || ""}
                                onChange={(e) => handleChange(e, index)}
                                className="p-3 border rounded-lg w-full pr-10"
                                required
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => removeParagraph(index)}
                                    className="absolute top-2 right-2   text-white px-2 py-1 rounded-full"
                                >
                                    ✖
                                </button>
                            )}
                        </div>
                    ))}


                    <button type="button" onClick={addParagraph} className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4">+ Add Paragraph</button>
                    <textarea name="closing" placeholder="Closing" value={formData.closing} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />
                    <input type="text" name="senderName" placeholder="Your Name" value={formData.senderName} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />
                    <input type="text" name="senderTitle" placeholder="Your Title" value={formData.senderTitle} onChange={handleChange} className="p-3 border rounded-lg w-full mb-4" required />
                    <input
                        type="text"
                        name="email"
                        placeholder="Your email"
                        value={formData.senderContact?.email || ""}
                        onChange={(e) => setFormData({
                            ...formData,
                            senderContact: { ...formData.senderContact, email: e.target.value }
                        })}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Your address"
                        value={formData.senderContact?.address || ""}
                        onChange={(e) => setFormData({
                            ...formData,
                            senderContact: { ...formData.senderContact, address: e.target.value }
                        })}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Your phone"
                        value={formData.senderContact?.phone || ""}
                        onChange={(e) => setFormData({
                            ...formData,
                            senderContact: { ...formData.senderContact, phone: e.target.value }
                        })}
                        className="p-3 border rounded-lg w-full mb-4"
                        required
                    />

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={() => setIsPreviewOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Preview</button>
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">Update</button>
                    </div>
                </form>
            </div>
            <Footer />
            {isPreviewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[80vh] overflow-auto relative">
                        <button onClick={() => setIsPreviewOpen(false)} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-lg">✖</button>
                        <PreviewA formData={formData} />
                    </div>
                </div>
            )}
        </>
    );
};

export default CLForm;
