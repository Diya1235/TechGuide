import React, { useState, useEffect, useRef } from "react";
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
    console.log("dispResume Data:", dispResume);

    // ✅ Initialize state with dispResume data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        pincode: "",
        phone: "",
        email: "",
        github:"",
        languages:[],
        position: "",
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
    const isFirstLoad = useRef(true);

    useEffect(() => {
        if (!dispResume || !isFirstLoad.current) return;
        isFirstLoad.current = false; // ✅ Stops future resets

        setFormData((prev) => ({
            ...prev,
            ...dispResume,
            education: Array.isArray(dispResume.education) ? dispResume.education : [],
            workHistory: Array.isArray(dispResume.workHistory) ? dispResume.workHistory : [],
            skills: Array.isArray(dispResume.skills)
                ? dispResume.skills.map(skill =>
                    typeof skill === "string" ? { skill } : skill
                ) // ✅ Converts strings to objects
                : [],
            projects: Array.isArray(dispResume.projects) ? dispResume.projects : [],
            certifications: Array.isArray(dispResume.certifications)
                ? dispResume.certifications.map(cert => String(cert))
                : [],
            awards: Array.isArray(dispResume.awards)
                ? dispResume.awards.map(award => String(award))
                : [],
            interests: Array.isArray(dispResume.interests)
                ? dispResume.interests.map(interest => String(interest))
                : [],
            templateId: templateId,
            userId: user?._id,
        }));
    }, [dispResume]);
    // ✅ Runs only on first load, prevents overwriting
    // ✅ Runs only when dispResume changes, but prevents further resets


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
    const handleDchange = (e, field = null, index = null) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            if (field && index !== null) {
                // Handling array fields (e.g., skills)
                const updatedField = [...prev[field]];
                updatedField[index] =
                    typeof updatedField[index] === "object"
                        ? { ...updatedField[index], [name]: value }
                        : value;
                return { ...prev, [field]: updatedField };
            } else {
                // Handling simple fields (e.g., firstName)
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
        setFormData((prev) => ({
            ...prev,
            [fieldName]: [
                ...prev[fieldName],
                fieldName === 'education' || fieldName === 'workHistory' || fieldName === 'projects'
                    ? { title: '', location: '', description: '', startDate: '', endDate: '' } // ✅ Keep objects for these fields
                    : '' // ✅ Add empty string for awards, certifications, interests
            ],
        }));
    };




    const handleEdit = async () => {
        try {
            const formattedFormData = {
                ...formData,
                skills: formData.skills.map(skill => skill.skill), // ✅ Convert to an array of strings
            };

            const response = await axios.post(
                `${RESUME_API_END_POINT}/updateResume/${dispResume._id}`,
                formattedFormData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.data.success) {
                toast.success("Resume updated successfully", { style: { backgroundColor: "#28a745", color: "#fff" } });
                dispatch(setResume(formattedFormData)); // ✅ Store correctly formatted data in Redux
                navigate(`/resume/${dispResume._id}/${dispResume.templateId}`);
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
                        <h2 className="text-xl font-semibold">Basic Details  <span className="text-red-500">*</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={(e) => handleDchange(e)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="First Name"
                                required
                            />

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={(e) => handleDchange(e)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Last Name"
                                required
                            />
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={(e) => handleDchange(e)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="City"
                            />
                            <select
                                name="country"
                                value={formData.country}
                                onChange={(e) => handleDchange(e)}
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
                                onChange={(e) => handleDchange(e)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Pincode"
                            />
                            <input
                                type="text"
                                name="position"
                                onChange={(e) => handleDchange(e)}
                                value={formData.position}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Data analyst"
                            />

                            <input
                                type="tel"
                                name="phone"
                                onChange={(e) => handleDchange(e)}
                                value={formData.phone}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Phone Number"
                            />
                            <input
                                type="email"
                                name="email"
                                onChange={(e) => handleDchange(e)}
                                value={formData.email}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="Email"
                            />
                             <input
                                type="text"
                                name="github"
                                onChange={(e) => handleDchange(e)}
                                value={formData.github}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                placeholder="github"
                            />
                        </div>
                    </div>

                    {/* Education */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Education  <span className="text-red-500">*</span></h2>

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
                               
                                    <input
                                        type="text"
                                        name="percentage"
                                        value={edu.percentage}
                                        onChange={(e) => handleDchange(e, 'education', index)}
                                        className={`w-full p-3 border rounded-md`}
                                        placeholder="Percentage scored"
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
                        <h2 className="text-xl font-semibold">Skills  <span className="text-red-500">*</span></h2>

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
                                        value={skill.skill} // ✅ Access `skill` property
                                        onChange={(e) => {
                                            const updatedSkills = [...formData.skills];
                                            updatedSkills[index] = { skill: e.target.value };
                                            setFormData({ ...formData, skills: updatedSkills });
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        placeholder=" Hard Skills : Java, Python"
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
                                <textarea
                                    name="description"
                                    value={work.description}
                                    onChange={(e) => handleDchange(e, "workHistory", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Work Description"
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
                        <h2 className="text-xl font-semibold">Summary  <span className="text-red-500">*</span></h2>

                        {/* AI Loading Animation */}
                        {loadingSummary && (
                            <div className="text-center text-blue-500 text-lg animate-pulse flex items-center justify-center gap-2">
                                Generating Summary... ✨📄
                            </div>
                        )}

                        <textarea
                            name="summary"
                            value={formData.summary}
                            onChange={(e) => handleDchange(e, "summary")}  // ✅ Calls with "summary"
                            className="w-full p-3 border border-gray-300 rounded-md"
                            placeholder="Your professional summary..."
                        />


                        
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
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Languages  <span className="text-red-500">*</span></h2>
                        {formData.languages.map((lang, index) => (
                            <div key={index} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={lang}
                                    onChange={(e) => handleDchange(e, "languages", index)}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter certificate name"
                                />

                                {/* Show Remove Button Only on the 2nd and Later Fields */}
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveField("languages", index)}
                                        className="absolute right-2 text-red-500 hover:text-red-700"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddField("languages")}
                            className="text-blue-500"
                        >
                            + Add language
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
