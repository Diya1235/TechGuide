import React from "react";
import Navbar from "../shared/Navbar";
import heroImage from "../images/RESUME.jpeg";
import useGetAllResumeTemplates from "@/hooks/useGetAllResumeTemplates";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setresumetemplateId } from "@/redux/templateSlice";

const ResumeCards = () => {
  // Custom hook to fetch templates
  useGetAllResumeTemplates();

  // Get resumeTemplates from Redux store
  const { resumeTemplates } = useSelector((store) => store.templates);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartWithTemplate = (templateId) => {
   dispatch(setresumetemplateId(templateId));
   console.log(templateId);
    navigate(`/user/createResume`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen ">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-10">
          {/* Left Side: Resume Templates */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl font-bold leading-tight text-gray-800">
              RESUME <span className="text-blue-500">TEMPLATES</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Choose a free Resume Template and build your resume. Use our intuitive drag-and-drop builder to save it as a PDF.
            </p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition">
              Get Started
            </button>
          </div>

          {/* Right Side: Static Image */}
          <div className="md:w-1/2 h-96 flex justify-center items-center">
            <img
              src={heroImage}
              alt="Hero"
              className="w-full h-full object-contain"
            />
          </div>
        </section>

        {/* Resume Cards Section with Dotted Background */}
        <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {resumeTemplates?.map((template) => (
            <div
              key={template._id}
              className="group relative bg-transparent p-6 rounded-lg border border-gray-300 shadow-md hover:border-blue-500 hover:shadow-xl overflow-hidden hover:bg-gradient-to-r hover:from-blue-300 hover:to-blue-400 transition-all duration-300"
            >
              <div className="relative bg-white rounded-md p-4 h-full flex items-center justify-center transition-all duration-300">
                <img
                  src={template.image} // Dynamically load the image from the template data
                  alt={template.name} // Template name as alt text
                  className="w-full h-auto object-cover rounded-md"
                />
                
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-white text-blue-500 px-4 py-2 rounded-lg shadow-lg font-semibold hover:bg-gray-100"
                  onClick={() => handleStartWithTemplate(template._id)}
                >
                  Start with this Template
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default ResumeCards;
