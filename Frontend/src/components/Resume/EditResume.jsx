import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RESUME_API_END_POINT } from "@/utils/Constant";
import RenderPreview from "./RenderPreview";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { setCurrentResume, setResume } from "@/redux/templateSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";
const ResumeForm = () => {
    const { templateId } = useSelector((store) => store.templates);
    const { user } = useSelector((store) => store.auth);
    const { dispResume } = useSelector((store) => store.templates);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const countryList = [
        'United States',
        'Canada',
        'India',
        'United Kingdom',
        'Australia',
        'Germany',
        'France',
        'Japan',
        'China',
        'Brazil',
    ];

    // ✅ Initialize state with dispResume data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        pincode: "",
        phone: "",
        email: "",
        education: [],
        workHistory: [],
        skills: [],
        projects: [],
        certifications: [],
        awards: [],
        interests: [],
        summary: "",
        templateId: templateId,
        userId: user._id,
    });
    const genAI = new GoogleGenerativeAI("AIzaSyAOtKk6_GEvkPmBPNgn3L5wGdZE15Ai-QE");
    useEffect(() => {
        if (dispResume) {
            setFormData({
                ...dispResume,
                templateId: templateId,
                userId: user._id,
            });
        }
    }, [dispResume]);
    const [loadingSummary, setLoadingSummary] = useState(false);

    const handleGenerateSummary = async () => {
        try {
            if (!formData.firstName || !formData.lastName || !formData.education.length) {
                toast.error("Please enter your basic details (name and education) before generating a summary.",
                    {
                        position: "top-center"
                    }
                );
                return;
            }

            setLoadingSummary(true); // Show animation while AI is generating summary

            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const prompt = `Generate a concise, professional resume summary:
      Name: ${formData.firstName} ${formData.lastName}
      Education: ${formData.education.map(edu => edu.degree + " in " + edu.fieldOfStudy).join(", ")}
      Work Experience: ${formData.workHistory.map(work => work.title + " at " + work.employer).join(", ")}
      Skills: ${formData.skills.map(skill => skill.skill).join(", ")}
      
      Summary:`;

            const response = await model.generateContent(prompt);
            const summary = response.response.text();

            setFormData({ ...formData, summary });
        } catch (error) {
            console.error("Error generating summary:", error);
        } finally {
            setLoadingSummary(false); // Hide animation after AI response
        }
    };

    const [loadingSkills, setLoadingSkills] = useState(false);
    const handleSuggestSkills = async () => {
        try {
            if (!formData.education.length || !formData.education[0].degree || !formData.education[0].fieldOfStudy) {
                toast.error("Please enter your education details first before getting skill suggestions.",
                    {
                        position: "top-center"
                    }
                );
                return;
            }

            setLoadingSkills(true); // Show animation while AI is generating skills

            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const prompt = `Suggest exactly 2-3 IT skills based on the user's background.
      Provide only skill names, one per line. Do not include explanations.
  
      Education: ${formData.education.map(edu => edu.degree + " in " + edu.fieldOfStudy).join(", ")}
      Work Experience: ${formData.workHistory.map(work => work.title + " at " + work.employer).join(", ")}
      Projects: ${formData.projects.map(proj => proj.title).join(", ")}
      
      Suggested IT Skills (limit to 2-3):`;

            const response = await model.generateContent(prompt);
            const suggestedSkills = response.response.text()
                .trim()
                .split("\n") // Ensure skills appear separately
                .slice(0, 3) // Limit to 2-3 skills
                .map(skill => ({ skill: skill.trim() }));

            setFormData(prevData => ({
                ...prevData,
                skills: [...prevData.skills, ...suggestedSkills],
            }));
        } catch (error) {
            console.error("Error suggesting skills:", error);
        } finally {
            setLoadingSkills(false); // Hide animation after AI response
        }
    };

    // ✅ Handle text input changes
    const handleDchange = (e, field, index = null) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (Array.isArray(prev[field]) && index !== null) {
                // ✅ Handle array fields (e.g., skills, awards)
                const updatedField = [...prev[field]];
                updatedField[index] = value;
                return { ...prev, [field]: updatedField };
            } else {
                // ✅ Handle basic details (firstName, lastName, etc.)
                return { ...prev, [name]: value };
            }
        });
    };





    // ✅ Handle date selection
    const handleDateChange = (date, field, index, key) => {
        setFormData((prev) => {
            const updatedField = [...prev[field]];
            updatedField[index] = { ...updatedField[index], [key]: date };
            return { ...prev, [field]: updatedField };
        });
    };

    // ✅ Add a new field dynamically
    const handleAddField = (fieldName) => {
        const updatedField = [
            ...formData[fieldName],
            fieldName === 'education' || fieldName === 'workHistory' || fieldName === 'projects'
                ? { title: '', location: '', description: '', startDate: '', endDate: '' }
                : '',
        ];
        setFormData({ ...formData, [fieldName]: updatedField });
        dispatch(setCurrentResume(formData));
    };




    const handleEdit = async () => {
        try {
            const response = await axios.post(`${RESUME_API_END_POINT}/updateResume/${dispResume._id}`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            console.log(formData);

            if (response.data.success) {
                toast.success("Resume updated successfully", { style: { backgroundColor: "#28a745", color: "#fff" } });
                dispatch(setResume(formData));
                console.log(dispResume._id);
                navigate(`/resume/${dispResume._id}`);
            }
        } catch (error) {
            toast.error("Error updating resume", { style: { backgroundColor: "red", color: "#fff" } });
            console.error(error);
        }
    };
    const handleSkillChange = (e, index) => {
        const newSkills = [...formData.skills];
        newSkills[index].skill = e.target.value;
        setFormData((prev) => ({
            ...prev,
            skills: newSkills,
        }));
    };
    const handleRemoveField = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: Array.isArray(prev[field]) ? prev[field].filter((_, i) => i !== index) : [], // ✅ Always an array
        }));
    };



    console.log("Skills Data:", formData.skills);
    console.log("Certifications Data:", formData.certifications);
    console.log("Awards Data:", formData.awards);


    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const handlePreview = () => setIsPreviewOpen(true);
    const handleBack = () => navigate("/profile");

    return (
        <>
            <Navbar />
            <Button className="lg:ml-20 mt-5 lg:w-[10%] w-[20%] ml-3" onClick={handleBack}>Back</Button>
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Edit Resume</h1>
                <form className="space-y-8">
                    {/* Basic Details */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Basic Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleDchange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="First Name"
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleDchange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Last Name"
                                required
                            />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleDchange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="City"
                            />
                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleDchange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                            >
                                <option value="">Select Country</option>
                                {countryList.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleDchange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Pincode"
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleDchange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Phone Number"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleDchange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    {/* Education */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Education</h2>

                        {formData.education.map((edu, index) => (
                            <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md">
                                <input
                                    type="text"
                                    name="schoolName"
                                    value={edu.schoolName}
                                    onChange={(e) => handleDchange(e, "education", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="School Name"
                                />
                                <input
                                    type="text"
                                    name="degree"
                                    value={edu.degree}
                                    onChange={(e) => handleDchange(e, "education", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Degree"
                                />
                                <input
                                    type="text"
                                    name="fieldOfStudy"
                                    value={edu.fieldOfStudy}
                                    onChange={(e) => handleDchange(e, "education", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Field of Study"
                                />
                                <DatePicker
                                    selected={edu.startDate ? new Date(edu.startDate) : null}
                                    onChange={(date) => handleDateChange(date, "education", index, "startDate")}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholderText="Start Date"
                                    dateFormat="dd/MM/yyyy"
                                />
                                <DatePicker
                                    selected={edu.endDate ? new Date(edu.endDate) : null}
                                    onChange={(date) => handleDateChange(date, "education", index, "endDate")}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholderText="End Date"
                                    dateFormat="dd/MM/yyyy"
                                />

                                {/* Remove Button (Hidden on First Entry) */}
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("education", index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Add Education Button */}
                        <button
                            type="button"
                            onClick={() => handleAddField("education")}
                            className="text-blue-500 hover:underline"
                        >
                            + Add Education
                        </button>
                    </div>



                    {/* Skills */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Skills</h2>

                        {/* AI Loading Animation (Only Visible While Generating) */}
                        {loadingSkills && (
                            <div className="text-center text-green-500 text-lg animate-pulse flex items-center justify-center gap-2">
                                Generating Skills... 🚀✨
                            </div>
                        )}

                        {/* Manually Entered + AI Suggested Skills */}
                        <div className="space-y-2">
                            {formData.skills.map((skill, index) => (
                                <div key={index} className="relative bg-gray-100 p-2 rounded-md flex items-center">
                                    <input
                                        type="text"
                                        value={skill.skill}
                                        onChange={(e) => {
                                            const updatedSkills = [...formData.skills];
                                            updatedSkills[index] = { skill: e.target.value };
                                            setFormData({ ...formData, skills: updatedSkills });
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder="Enter a skill"
                                    />
                                    {formData.skills.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveField("skills", index)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* "Add Skill" Button */}
                        <button
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                skills: [...formData.skills, { skill: "" }]
                            })}
                            className="text-blue-500 mt-2"
                        >
                            + Add Skill
                        </button>

                        {/* AI Skill Suggestion Button */}
                        <button
                            type="button"
                            onClick={handleSuggestSkills}
                            className="bg-green-500 text-white px-4 py-2 ml-5 rounded-md mt-2 hover:bg-green-600 transition"
                        >
                            Suggest IT Skills
                        </button>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Awards</h2>
                        {formData.awards.map((award, index) => (
                            <div key={index} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={award}
                                    onChange={(e) => handleDchange(e, "awards", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter award name"
                                />

                                {/* X Button (Only Visible on 2nd Entry and Beyond) */}
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("awards", index)}
                                        className="absolute right-2 text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}

                        <button type="button" onClick={() => handleAddField("awards")} className="text-blue-500">
                            + Add Award
                        </button>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Interests</h2>

                        {formData.interests.map((interest, index) => (
                            <div key={index} className="relative flex items-center w-full">
                                <input
                                    type="text"
                                    value={interest} // ✅ Directly access the string value
                                    onChange={(e) => handleDchange(e, "interests", index)} // ✅ Use centralized handler
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter interest"
                                />

                                {/* Remove Button (Hidden for the First Entry) */}
                                {formData.interests.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("interests", index)}
                                        className="absolute right-2 text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Add Interest Button */}
                        <button
                            type="button"
                            onClick={() => handleAddField("interests")}
                            className="text-blue-500 hover:underline"
                        >
                            + Add Interest
                        </button>
                    </div>


                    {/* Work History */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Work History</h2>
                        {formData.workHistory.map((work, index) => (
                            <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-gray-200 rounded-md">
                                <input
                                    type="text"
                                    name="title"
                                    value={work.title}
                                    onChange={(e) => handleDchange(e, "workHistory", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Job Title"
                                />
                                <input
                                    type="text"
                                    name="employer"
                                    value={work.employer}
                                    onChange={(e) => handleDchange(e, "workHistory", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Employer"
                                />
                                <input
                                    type="text"
                                    name="location"
                                    value={work.location}
                                    onChange={(e) => handleDchange(e, "workHistory", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Location"
                                />
                                <DatePicker
                                    selected={work.startDate ? new Date(work.startDate) : null}
                                    onChange={(date) => handleDateChange(date, 'workHistory', index, 'startDate')}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholderText="Start Date"
                                    dateFormat="dd/MM/yyyy"
                                />
                                <DatePicker
                                    selected={work.endDate ? new Date(work.endDate) : null}
                                    onChange={(date) => handleDateChange(date, 'workHistory', index, 'endDate')}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholderText="End Date"
                                    dateFormat="dd/MM/yyyy"
                                />

                                {/* Remove Button (Only Visible on 2nd Entry and Beyond) */}
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("workHistory", index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddField('workHistory')}
                            className="text-blue-500"
                        >
                            + Add Job
                        </button>
                    </div>



                    {/* Summary */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Summary</h2>

                        {/* AI Loading Animation */}
                        {loadingSummary && (
                            <div className="text-center text-blue-500 text-lg animate-pulse flex items-center justify-center gap-2">
                                Generating Summary... ✨📄
                            </div>
                        )}

                        <textarea
                            value={formData.summary}
                            onChange={(e) => handleChange(e, 'summary')}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Your professional summary..."
                        />

                        <button
                            type="button"
                            onClick={handleGenerateSummary}
                            disabled={loadingSummary} // Disable button while AI is generating
                            className={`px-4 py-2 rounded-md mt-2 transition ${loadingSummary ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
                                }`}
                        >
                            {loadingSummary ? "Generating..." : "Generate AI Summary"}
                        </button>
                    </div>



                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Certificates</h2>
                        {formData.certifications.map((certificate, index) => (
                            <div key={index} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={certificate}
                                    onChange={(e) => handleDchange(e, "certifications", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter certificate name"
                                />

                                {/* Show Remove Button Only on the 2nd and Later Fields */}
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("certifications", index)}
                                        className="absolute right-2 text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddField("certifications")}
                            className="text-blue-500"
                        >
                            + Add Certificate
                        </button>
                    </div>


                    {/* Projects */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Projects</h2>
                        {formData.projects.map((project, index) => (
                            <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border border-gray-200 rounded-md">
                                <input
                                    type="text"
                                    name="title"
                                    value={project.title}
                                    onChange={(e) => handleDchange(e, "projects", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Project Title"
                                />
                                <textarea
                                    name="description"
                                    value={project.description}
                                    onChange={(e) => handleDchange(e, "projects", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Project Description"
                                />
                                <DatePicker
                                    selected={project.startDate ? new Date(project.startDate) : null}
                                    onChange={(date) => handleDateChange(date, "projects", index, "startDate")}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholderText="Start Date"
                                    dateFormat="dd/MM/yyyy"
                                />
                                <DatePicker
                                    selected={project.endDate ? new Date(project.endDate) : null}
                                    onChange={(date) => handleDateChange(date, "projects", index, "endDate")}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholderText="End Date"
                                    dateFormat="dd/MM/yyyy"
                                />

                                {/* Show Remove Button Only on the 2nd and Later Fields */}
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("projects", index)}
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddField("projects")}
                            className="text-blue-500"
                        >
                            + Add Project
                        </button>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
    {/* Awards Section */}
    <h2 className="text-xl font-semibold">Awards</h2>
    {formData.awards.map((award, index) => (
        <div key={index} className="relative flex items-center">
            <input
                type="text"
                value={award}
                onChange={(e) => handleDchange(e, "awards", index)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter award name"
            />
            {/* Show Remove Button Only on the 2nd and Later Fields */}
            {index > 0 && (
                <button
                    type="button"
                    onClick={() => handleRemoveField("awards", index)}
                    className="absolute right-2 text-red-500 hover:text-red-700"
                >
                    ✖
                </button>
            )}
        </div>
    ))}
    <button
        type="button"
        onClick={() => handleAddField("awards")}
        className="text-blue-500"
    >
        + Add Award
    </button>

    {/* Interests Section */}
    <h2 className="text-xl font-semibold mt-6">Interests</h2>
    {formData.interests.map((interest, index) => (
        <div key={index} className="relative flex items-center">
            <input
                type="text"
                value={interest}
                onChange={(e) => handleDchange(e, "interests", index)}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter interest (e.g., AI, Blockchain, Cybersecurity)"
            />
            {/* Show Remove Button Only on the 2nd and Later Fields */}
            {index > 0 && (
                <button
                    type="button"
                    onClick={() => handleRemoveField("interests", index)}
                    className="absolute right-2 text-red-500 hover:text-red-700"
                >
                    ✖
                </button>
            )}
        </div>
    ))}
    <button
        type="button"
        onClick={() => handleAddField("interests")}
        className="text-blue-500"
    >
        + Add Interest
    </button>
</div>



                    {/* Preview and Create Resume */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={handlePreview}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Preview
                        </button>
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
            {isPreviewOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-4xl max-h-[95%] relative">
                        {/* Fixed Close Button */}
                        <button
                            className="absolute top-3 right-5 text-gray-800 hover:text-black text-2xl font-bold z-10"
                            onClick={() => setIsPreviewOpen(false)}
                        >
                            ✕
                        </button>

                        {/* Scrollable Content */}
                        <div className="p-5 pt-12 max-h-[85vh] overflow-y-auto">
                            <RenderPreview formData={formData} templateId={templateId} />
                        </div>
                    </div>
                </div>

            )}
        </>
    );
};

export default ResumeForm;
