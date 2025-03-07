import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RESUME_API_END_POINT } from '@/utils/Constant';
import RenderPreview from './RenderPreview';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { toast } from 'sonner';
import ShowResume from './ShowResume';
import { setCurrentResume } from '@/redux/templateSlice';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const ResumeForm = () => {
    const { templateId } = useSelector((store) => store.templates);
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        city: '',
        country: '',
        pincode: '',
        phone: '',
        email: '',
        education: [{ schoolName: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }],
        workHistory: [{ title: '', location: '', employer: '', startDate: '', endDate: '' }],
        skills: [{ skill: '' }],
        projects: [{ title: '', description: '', startDate: '', endDate: '' }],
        certifications: [''],
        awards: [''],
        interests: [''],
        summary: '',
        templateId: templateId,
        userId: user._id,
    });
    const genAI = new GoogleGenerativeAI("AIzaSyAOtKk6_GEvkPmBPNgn3L5wGdZE15Ai-QE"); // Ensure you have a valid API Key

    const [loadingSummary, setLoadingSummary] = useState(false);
    
    const handleGenerateSummary = async () => {
        try {
            if (!formData.firstName || !formData.lastName || !formData.education.length) {
                toast.error("Please enter your basic details (name and education) before generating a summary.", {
                    position: "top-center"
                });
                return;
            }
    
            setLoadingSummary(true); // Show animation while AI is generating summary
    
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
            const prompt = `Generate a concise, professional resume summary:
            Name: ${formData.firstName} ${formData.lastName}
            Education: ${formData.education.map(edu => `${edu.degree} in ${edu.fieldOfStudy}`).join(", ")}
            Work Experience: ${formData.workHistory.length > 0 
                ? formData.workHistory.map(work => `${work.title} at ${work.employer}`).join(", ") 
                : "No work experience"}
            Skills: ${formData.skills.length > 0 
                ? formData.skills.map(skill => skill.skill).join(", ") 
                : "No skills listed"}
    
            Summary:`; 
    
            // ✅ Correct API call
            const result = await model.generateContent([prompt]);
    
            // ✅ Correct way to extract the response
            const responseText = await result.response.text();
    
            setFormData(prev => ({ ...prev, summary: responseText }));
        } catch (error) {
            console.error("Error generating summary:", error);
            toast.error("Failed to generate summary. Please try again.");
        } finally {
            setLoadingSummary(false); // Hide animation after AI response
        }
    };
    

    const [loadingSkills, setLoadingSkills] = useState(false);

    const handleSuggestSkills = async () => {
        try {
            if (!formData.education.length || !formData.education[0].degree || !formData.education[0].fieldOfStudy) {
                toast.error("Please enter your education details first before getting skill suggestions.", {
                    position: "top-center"
                });
                return;
            }
    
            setLoadingSkills(true); // Show animation while AI is generating skills
    
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
            const prompt = `Suggest exactly 2-3 IT skills based on the user's background.
            Provide only skill names, one per line. Do not include explanations.
    
            Education: ${formData.education.map(edu => `${edu.degree} in ${edu.fieldOfStudy}`).join(", ")}
            Work Experience: ${formData.workHistory.length > 0 
                ? formData.workHistory.map(work => `${work.title} at ${work.employer}`).join(", ") 
                : "No work experience"}
            Projects: ${formData.projects.length > 0 
                ? formData.projects.map(proj => proj.title).join(", ") 
                : "No projects"}
    
            Suggested IT Skills:`; // Ensuring clear prompt
    
            // ✅ Correct API Call
            const result = await model.generateContent([prompt]);
    
            // ✅ Correct API Response Handling
            const responseText = await result.response.text();
    
            // ✅ Convert AI response into a list of skills
            const suggestedSkills = responseText
                .trim()
                .split("\n") // Ensure skills appear separately
                .slice(0, 3) // Limit to 2-3 skills
                .map(skill => ({ skill: skill.trim() }));
    
            // ✅ Ensure unique skills (Avoid duplicates)
            const updatedSkills = [
                ...formData.skills,
                ...suggestedSkills.filter(newSkill => 
                    !formData.skills.some(existingSkill => existingSkill.skill === newSkill.skill)
                )
            ];
    
            setFormData(prevData => ({
                ...prevData,
                skills: updatedSkills,
            }));
        } catch (error) {
            console.error("Error suggesting skills:", error);
            toast.error("Failed to generate skills. Please try again.");
        } finally {
            setLoadingSkills(false); // Hide animation after AI response
        }
    };
    

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
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [errors, setErrors] = useState({
        firstName: "", lastName: "", phone: "", email: "", pincode: "",
        city: "", country: "", summary: "",
        education: [], workHistory: [], projects: [], certifications: [],
        skills: [], awards: [], interests: []
    });


    const validateInput = (name, value, index = null, section = null) => {
        let errorMsg = "";
    
        // Basic Details - Name Fields (First, Last, City, Country)
        if (["firstName", "lastName", "city", "country"].includes(name)) {
            if (!/^[a-zA-Z. ]*$/.test(value)) {
                errorMsg = "Only letters, spaces, and dots are allowed.";
            } else if (value.trim() === "") {
                errorMsg = "This field cannot be empty.";
            }
        }
    
        // Phone Number - 10 Digits
        if (name === "phone") {
            if (!/^\d{0,10}$/.test(value)) {
                errorMsg = "Only numbers are allowed.";
            } else if (value.length !== 10) {
                errorMsg = "Phone number must be exactly 10 digits.";
            }
        }
    
        // Email - Must follow email format
        if (name === "email") {
            if (!/^\S+@\S+\.\S+$/.test(value)) {
                errorMsg = "Enter a valid email address.";
            }
        }
    
        // Pincode - Exactly 6 Digits
        if (name === "pincode") {
            if (!/^\d{0,6}$/.test(value)) {
                errorMsg = "Only numbers are allowed.";
            } else if (value.length !== 6) {
                errorMsg = "Pincode must be exactly 6 digits.";
            }
        }
    
        // Education - School Name, Degree, Field of Study
        if (section === "education" && ["schoolName", "degree", "fieldOfStudy"].includes(name)) {
            if (!/^[a-zA-Z ]*$/.test(value)) {
                errorMsg = "Only letters and spaces are allowed.";
            }
        }
    
        // Work History - Job Title, Employer, Location
        if (section === "workHistory" && ["title", "employer", "location"].includes(name)) {
            if (!/^[a-zA-Z ]*$/.test(value)) {
                errorMsg = "Only letters and spaces are allowed.";
            }
        }
    
        // Projects - Title & Description Cannot Be Empty
        if (section === "projects" && (name === "title" || name === "description")) {
            if (value.trim() === "") {
                errorMsg = `${name === "title" ? "Project title" : "Project description"} cannot be empty.`;
            }
        }
    
        // Certifications - Cannot Be Empty
        if (section === "certifications" && value.trim() === "") {
            errorMsg = "Certification name cannot be empty.";
        }
    
        // Awards & Interests - Cannot Be Empty
        if (["awards", "interests"].includes(section) && value.trim() === "") {
            errorMsg = `${section.charAt(0).toUpperCase() + section.slice(1)} field cannot be empty.`;
        }
    
        // Summary - Minimum 50 Characters
        if (name === "summary") {
            if (value.trim() === "") {
                errorMsg = "Summary cannot be empty.";
            } else if (value.length < 50) {
                errorMsg = "Summary must be at least 50 characters.";
            }
        }
    
        setErrors((prev) => {
            if (index !== null && section) {
                return {
                    ...prev,
                    [section]: prev[section]?.map((item, i) => (i === index ? { ...item, [name]: errorMsg } : item)) || []
                };
            } else {
                return { ...prev, [name]: errorMsg };
            }
        });
    };
    



    const handleChange = (e, section, index = null) => {
        const { name, value } = e.target;
    
        validateInput(name, value, index, section); // Validate input live
    
        setFormData((prev) => {
            if (["certifications", "awards", "interests"].includes(section)) {
                const updatedSection = [...prev[section]];
                updatedSection[index] = value; // Store value directly as a string
                return { ...prev, [section]: updatedSection };
            } else if (index === null) {
                return { ...prev, [name]: value };
            } else {
                const updatedField = [...prev[section]];
                updatedField[index] = { ...updatedField[index], [name]: value };
                return { ...prev, [section]: updatedField };
            }
        });
    };
    
    


    const handleDateChange = (date, fieldName, index, key) => {
        const updatedField = [...formData[fieldName]];
        updatedField[index] = { ...updatedField[index], [key]: date };
        setFormData({ ...formData, [fieldName]: updatedField });
    };


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

    const handleCreateResume = async () => {
        console.log(formData);
        try {
            const response = await axios.post(`${RESUME_API_END_POINT}/createResume`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
            },);
            if (response.data.success) {
                setStep(3);
                toast.success("Resume created successfully", {
                    style: {
                        backgroundColor: '#28a745', // Green color
                        color: '#fff', // White text
                    },
                });
                dispatch(setCurrentResume(formData));
                navigate("/viewCreatedResume");

            }
            // navigate(`/resume/${response.data.data._id}`);
        } catch (error) {
            toast.error("Missing fields", {
                style: {
                    backgroundColor: 'red', // Green color
                    color: '#fff', // White text
                },
            });
            console.log(error);
        }

    };

    const handlePreview = () => {
        // Implement the preview functionality, for example, you can navigate to a preview page
        setIsPreviewOpen(true);

    };
    const handleBack = () => {
        navigate("/user/resumes");
    }
    const handleRemoveField = (fieldName, index) => {
        if (formData[fieldName].length > 1) {
            const updatedField = formData[fieldName].filter((_, i) => i !== index);
            setFormData({ ...formData, [fieldName]: updatedField });
        }
    };

    const [step, setStep] = useState(2);

    useEffect(() => {
        setStep(2);
    }, []);



    return (
        <>
            <Navbar />
            <Button className="lg:ml-20 mt-5 w-[10%] ml-5" onClick={handleBack}>Back</Button>
            <div className="max-w-7xl mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-8">Resume Builder</h1>

                {/* Step Progress Bar */}
                <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3].map((num) => (
                        <div key={num} className="flex flex-col items-center w-1/3">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold ${num <= step ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                {num < step ? <FaCheck /> : num}
                            </div>
                            <span className={`mt-2 text-sm font-medium ${num <= step ? 'text-blue-600' : 'text-gray-400'}`}>
                                {num === 1 ? 'Template Selection' : num === 2 ? 'Form Filling' : 'Resume Ready'}
                            </span>
                        </div>
                    ))}
                </div>
                <form className="space-y-8">
                    {/* Basic Details */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Basic Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* First Name */}

                            <div>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange(e, "firstName")}
                                    className={`w-full p-3 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md`}
                                    placeholder="First Name"
                                    required
                                />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                            </div>

                            {/* Last Name */}
                            <div>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange(e, "lastName")}
                                    className={`w-full p-3 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md`}
                                    placeholder="Last Name"
                                    required
                                />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                            </div>

                            {/* City */}
                            <div>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={(e) => handleChange(e, "city")}
                                    className={`w-full p-3 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded-md`}
                                    placeholder="City"
                                />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                            </div>

                            {/* Country */}
                            <div>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={(e) => handleChange(e, "country")}
                                    className={`w-full p-3 border ${errors.country ? "border-red-500" : "border-gray-300"} rounded-md`}
                                >
                                    <option value="">Select Country</option>
                                    {countryList.map((country, index) => (
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                                {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                            </div>

                            {/* Pincode */}
                            <div>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    maxLength={6}
                                    minLength={6}
                                    onChange={(e) => handleChange(e, "pincode")}
                                    className={`w-full p-3 border ${errors.pincode ? "border-red-500" : "border-gray-300"} rounded-md`}
                                    placeholder="Pincode"
                                />
                                {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    maxLength={10}
                                    minLength={10}
                                    onChange={(e) => handleChange(e, "phone")}
                                    className={`w-full p-3 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-md`}
                                    placeholder="Phone Number"
                                />
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange(e, "email")}
                                    className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md`}
                                    placeholder="Email"
                                />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                            </div>
                        </div>
                    </div>


                    {/* Education */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Education</h2>
                        {formData.education.map((edu, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                                {/* School Name */}
                                <div>
                                    <input
                                        type="text"
                                        name="schoolName"
                                        value={edu.schoolName}
                                        onChange={(e) => handleChange(e, 'education', index)}
                                        className={`w-full p-3 border ${errors.education?.[index]?.schoolName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="School Name"
                                    />
                                    {errors.education?.[index]?.schoolName && <p className="text-red-500 text-sm">{errors.education[index].schoolName}</p>}
                                </div>

                                {/* Degree */}
                                <div>
                                    <input
                                        type="text"
                                        name="degree"
                                        value={edu.degree}
                                        onChange={(e) => handleChange(e, 'education', index)}
                                        className={`w-full p-3 border ${errors.education?.[index]?.degree ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Degree"
                                    />
                                    {errors.education?.[index]?.degree && <p className="text-red-500 text-sm">{errors.education[index].degree}</p>}
                                </div>

                                {/* Field of Study */}
                                <div>
                                    <input
                                        type="text"
                                        name="fieldOfStudy"
                                        value={edu.fieldOfStudy}
                                        onChange={(e) => handleChange(e, 'education', index)}
                                        className={`w-full p-3 border ${errors.education?.[index]?.fieldOfStudy ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Field of Study"
                                    />
                                    {errors.education?.[index]?.fieldOfStudy && <p className="text-red-500 text-sm">{errors.education[index].fieldOfStudy}</p>}
                                </div>

                                {/* Start Date */}
                                <div>
                                    <DatePicker
                                        selected={edu.startDate ? new Date(edu.startDate) : null}
                                        onChange={(date) => handleDateChange(date, 'education', index, 'startDate')}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholderText="Start Date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <DatePicker
                                        selected={edu.endDate ? new Date(edu.endDate) : null}
                                        onChange={(date) => handleDateChange(date, 'education', index, 'endDate')}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholderText="End Date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                {/* Remove Button */}
                                {formData.education.length > 1 && index > 0 && (
                                    <button
                                        type="button"
                                        className="absolute -top-6 right-1 text-gray-500 font-bold text-xl"
                                        onClick={() => handleRemoveField('education', index)}
                                    >✕</button>
                                )}
                            </div>
                        ))}

                        {/* Add More Education */}
                        <button
                            type="button"
                            onClick={() => handleAddField('education')}
                            className="text-blue-500"
                        >+ Add Education</button>
                    </div>


                    {/* Skills */}
                    {/* Skills Section */}
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
                                            const updatedSkills = formData.skills.map((s, i) => 
                                                i === index ? { ...s, skill: e.target.value } : s
                                            );
                                            setFormData((prev) => ({ ...prev, skills: updatedSkills }));
                                        }}
                                        
                                        className={`w-full p-3 border ${errors.skills?.[index] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Enter a skill"
                                    />
                                    {errors.skills?.[index] && <p className="text-red-500 text-sm">{errors.skills[index]}</p>}
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
                            className="px-4 py-2 ml-5 rounded-md mt-2 text-white transition 
               bg-gradient-to-r from-blue-400 to-indigo-700 
               hover:from-blue-600 hover:to-indigo-800"
                        >
                            Use AI magic ✨
                        </button>

                    </div>
                    {/* Work History */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Work History</h2>
                        {formData.workHistory.map((work, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                                {/* Job Title */}
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={work.title}
                                        onChange={(e) => handleChange(e, 'workHistory', index)}
                                        className={`w-full p-3 border ${errors.workHistory?.[index]?.title ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Job Title"
                                    />
                                    {errors.workHistory?.[index]?.title && <p className="text-red-500 text-sm">{errors.workHistory[index].title}</p>}
                                </div>

                                {/* Employer */}
                                <div>
                                    <input
                                        type="text"
                                        name="employer"
                                        value={work.employer}
                                        onChange={(e) => handleChange(e, 'workHistory', index)}
                                        className={`w-full p-3 border ${errors.workHistory?.[index]?.employer ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Employer"
                                    />
                                    {errors.workHistory?.[index]?.employer && <p className="text-red-500 text-sm">{errors.workHistory[index].employer}</p>}
                                </div>

                                {/* Location */}
                                <div>
                                    <input
                                        type="text"
                                        name="location"
                                        value={work.location}
                                        onChange={(e) => handleChange(e, 'workHistory', index)}
                                        className={`w-full p-3 border ${errors.workHistory?.[index]?.location ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Location"
                                    />
                                    {errors.workHistory?.[index]?.location && <p className="text-red-500 text-sm">{errors.workHistory[index].location}</p>}
                                </div>

                                {/* Start Date */}
                                <div>
                                    <DatePicker
                                        selected={work.startDate ? new Date(work.startDate) : null}
                                        onChange={(date) => handleDateChange(date, 'workHistory', index, 'startDate')}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholderText="Start Date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <DatePicker
                                        selected={work.endDate ? new Date(work.endDate) : null}
                                        onChange={(date) => handleDateChange(date, 'workHistory', index, 'endDate')}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholderText="End Date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                {/* Remove Button */}
                                {formData.workHistory.length > 1 && index > 0 && (
                                    <button
                                        type="button"
                                        className="absolute -top-6 right-1 text-gray-500 font-bold text-xl"
                                        onClick={() => handleRemoveField('workHistory', index)}
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Add More Work Experience */}
                        <button
                            type="button"
                            onClick={() => handleAddField('workHistory')}
                            className="text-blue-500"
                        >
                            + Add Job
                        </button>
                    </div>



                    {/* Summary */}
                    {/* Summary Section */}
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
                            className={`w-full p-3 border ${errors.summary ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            placeholder="Your professional summary..."
                        />
                        {errors.summary && <p className="text-red-500 text-sm">{errors.summary}</p>}

                        <button
                            type="button"
                            onClick={handleGenerateSummary}
                            disabled={loadingSummary} // Disable button while AI is generating
                            className={`px-4 py-2 rounded-md mt-2 transition 
        ${loadingSummary
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-400 to-indigo-700 text-white hover:from-blue-600 hover:to-indigo-600"
                                }`}
                        >
                            {loadingSummary ? "Generating..." : "Generate AI Summary 🚀"}
                        </button>
                    </div>


                    {/* Certifications */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Certifications</h2>

                        {formData.certifications.map((cert, index) => (
                            <div key={index} className="relative">
                                <input
                                    type="text"
                                    value={cert}
                                    onChange={(e) => handleChange(e, 'certifications', index)}
                                    className={`w-full p-3 border ${errors.certifications?.[index] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    placeholder="Certification Name"
                                />
                                {errors.certifications?.[index] && <p className="text-red-500 text-sm">{errors.certifications[index]}</p>}

                                {formData.certifications.length > 1 && index > 0 && (
                                    <button
                                        type="button"
                                        className="absolute top-0 right-1 text-gray-600 font-bold text-xl"
                                        onClick={() => handleRemoveField('certifications', index)}
                                    >✕</button>
                                )}
                            </div>
                        ))}

                        {/* Add More Certifications */}
                        <button
                            type="button"
                            onClick={() => handleAddField('certifications')}
                            className="text-blue-500"
                        >+ Add Certification</button>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Projects</h2>
                        {formData.projects.map((project, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                                {/* Project Title */}
                                <div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={project.title}
                                        onChange={(e) => handleChange(e, 'projects', index)}
                                        className={`w-full p-3 border ${errors.projects?.[index]?.title ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Project Title"
                                    />
                                    {errors.projects?.[index]?.title && <p className="text-red-500 text-sm">{errors.projects[index].title}</p>}
                                </div>

                                {/* Project Description */}
                                <div>
                                    <textarea
                                        name="description"
                                        value={project.description}
                                        onChange={(e) => handleChange(e, 'projects', index)}
                                        className={`w-full p-3 border ${errors.projects?.[index]?.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                        placeholder="Project Description"
                                    />
                                    {errors.projects?.[index]?.description && <p className="text-red-500 text-sm">{errors.projects[index].description}</p>}
                                </div>

                                {/* Start Date */}
                                <div>
                                    <DatePicker
                                        selected={project.startDate ? new Date(project.startDate) : null}
                                        onChange={(date) => handleDateChange(date, 'projects', index, 'startDate')}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholderText="Start Date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <DatePicker
                                        selected={project.endDate ? new Date(project.endDate) : null}
                                        onChange={(date) => handleDateChange(date, 'projects', index, 'endDate')}
                                        className="w-full p-3 border border-gray-300 rounded-md"
                                        placeholderText="End Date"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                {/* Remove Button */}
                                {formData.projects.length > 1 && index > 0 && (
                                    <button
                                        type="button"
                                        className="absolute -top-6 right-1 text-gray-500 font-bold text-xl"
                                        onClick={() => handleRemoveField('projects', index)}
                                    >✕</button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddField('projects')}
                            className="text-blue-500"
                        >+ Add Project</button>
                    </div>

                    {/* Awards Section */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold">Awards</h2>
                        {formData.awards.map((award, index) => (
                            <div key={index} className="relative">
                                <input
                                    type="text"
                                    value={award}
                                    onChange={(e) => handleChange(e, 'awards', index)}
                                    className={`w-full p-3 border ${errors.awards?.[index] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    placeholder="Award Name"
                                />
                                {errors.awards?.[index] && <p className="text-red-500 text-sm">{errors.awards[index]}</p>}

                                {formData.awards.length > 1 && index > 0 && (
                                    <button
                                        type="button"
                                        className="absolute top-0 right-1 text-gray-600 font-bold text-xl"
                                        onClick={() => handleRemoveField('awards', index)}
                                    >✕</button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddField('awards')}
                            className="text-blue-500"
                        >+ Add Award</button>
                    </div>

                    {/* Interests Section */}
                    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
                        <h2 className="text-xl font-semibold mt-6">Interests</h2>
                        {formData.interests.map((interest, index) => (
                            <div key={index} className="relative">
                                <input
                                    type="text"
                                    value={interest}
                                    onChange={(e) => handleChange(e, 'interests', index)}
                                    className={`w-full p-3 border ${errors.interests?.[index] ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                    placeholder="Interest (e.g., AI, Blockchain, Cybersecurity)"
                                />
                                {errors.interests?.[index] && <p className="text-red-500 text-sm">{errors.interests[index]}</p>}

                                {formData.interests.length > 1 && index > 0 && (
                                    <button
                                        type="button"
                                        className="absolute top-0 right-1 text-gray-600 font-bold text-xl"
                                        onClick={() => handleRemoveField('interests', index)}
                                    >✕</button>
                                )}
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => handleAddField('interests')}
                            className="text-blue-500"
                        >+ Add Interest</button>
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
                            onClick={handleCreateResume}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                        >
                            Create Resume
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
