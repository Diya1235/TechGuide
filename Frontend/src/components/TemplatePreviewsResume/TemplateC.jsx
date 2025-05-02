import { MailIcon } from "lucide-react";
import React from "react";
import { FaPhone, FaMapPin, FaGithub } from "react-icons/fa";

const TemplateC = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-300">
      {/* Header Section */}
      <div className="bg-gray-200 p-6 flex justify-between items-center rounded-t-lg">
        <div>
          <h1 className="text-3xl font-bold ">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
          <p className="text-lg font-semibold">{formData?.position || "N/A"}</p>
          <p className="text-sm ">{formData?.summary || "N/A"}</p>
        </div>
        <div className="text-sm text-right">
          <p className="flex items-center"><MailIcon className="mr-1 text-gray-600" /> {formData?.email || "N/A"}</p>
          <p className="flex items-center"><FaPhone className="mr-1 text-gray-600" /> {formData?.phone || "N/A"}</p>
          {formData?.github && (
            <p className="flex items-center"><FaGithub className="mr-1 text-gray-600" /> {formData?.github || "N/A"}</p>
          )}
          <p className="flex items-center"><FaMapPin className="mr-1 text-gray-600" /> {formData?.city || "N/A"}</p>

        </div>
      </div>

      {/* Two-column Layout */}
      <div className="grid grid-cols-4 gap-6 p-6 bg-white rounded-b-lg">
        {/* Left Column - 1/4 width */}
        <div className="col-span-1">
          {/* Core Skills */}
          <h2 className="text-xl font-bold mb-2">Core Skills</h2>
{Array.isArray(formData?.skills) && formData.skills.length > 0 && (
  <ul className="grid grid-cols-3 gap-2 text-sm">
    {formData.skills.map((skillObj, index) => (
      <li key={index} className="list-disc list-inside">
        {typeof skillObj === "string" ? skillObj : skillObj?.skill || "N/A"}
      </li>
    ))}
  </ul>
)}

          <hr className="border-t border-gray-300 my-4" />

          {/* Education */}
          <h2 className="text-xl font-bold mb-2">Education</h2>
          {formData?.education?.length > 0 ? formData.education.map((edu, index) => (
            <div key={index}>
              <h3 className="font-semibold text-md">{edu.schoolName}</h3>
              <p className="text-sm">{edu.degree}</p>
              {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}
              <p className="text-xs text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
          )) : <p className="text-sm text-gray-700">N/A</p>}
          <hr className="border-t border-gray-300 my-4" />

          {/* Certifications */}
          <h2 className="text-xl font-bold mb-2">Certifications</h2>
          <ul className="list-disc list-inside text-sm">
            {(formData?.certifications || []).map((cert, index) => (
              <li key={index}>{cert || "N/A"}</li>
            ))}
          </ul>
        </div>

        {/* Right Column - 3/4 width */}
        <div className="col-span-3">
        {formData?.workHistory?.some(job => job.title || job.employer || job.description) && (
  <div className="col-span-3">
    <h2 className="text-xl font-bold mb-2">Work Experience</h2>
    {formData.workHistory
      .filter(job => job.title || job.employer || job.description) // ✅ Remove empty entries
      .map((job, index) => (
        <div key={index} className="mb-4">
          <div className="flex justify-between">
            <h3 className="font-semibold text-md">
              {job.title || "N/A"} - {job.employer || "N/A"}
            </h3>
            <span className="font-bold text-sm">
              {formatDate?.(job.startDate) ?? "N/A"} - {formatDate?.(job.endDate) ?? "N/A"}
            </span>
          </div>
          <p className="text-sm text-gray-700">{job.description || "No description available"}</p>
        </div>
      ))}
  </div>
)}


          {/* Projects Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Projects</h2>
            {formData?.projects?.length > 0 ? formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-md">{project.title}</h3>
                  <span className="font-bold text-sm text-right">{formatDate(project.startDate)} - {formatDate(project.endDate)}</span>
                </div>
                <p className="text-sm text-gray-700">{project.description || "No description available"}</p>
              </div>
            )) : <p className="text-sm text-gray-700">N/A</p>}
          </div>

          {/* Interests Section */}
          <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Awards & Acheivements</h2>
        {formData?.awards?.length > 0 ? formData.awards.map((award, index) => (
          <div key={index} className="flex justify-between">
            <h3 className=" text-md">{award}</h3>
           
          </div>
        )) : <p className="text-sm text-gray-700">N/A</p>}
      </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateC;
