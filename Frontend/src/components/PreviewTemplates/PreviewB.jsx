import { MailIcon } from "lucide-react";
import React from "react";
import {  FaGithub, FaMailchimp, FaMapPin, FaPhone } from "react-icons/fa";

const PreviewB = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200">
      {/* Header Section */}
      <div className="text-center border-b-2 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
        <p className="text-lg font-semibold">{formData?.position || "N/A"}</p>
        <p className="text-sm flex items-center justify-center space-x-6 text-center">
    <span className="flex items-center">
        <MailIcon className="mr-1 text-gray-500" /> {formData?.email || "N/A"}
    </span>
    <span className="flex items-center">
        <FaPhone className="mr-1 text-gray-500" /> {formData?.phone || "N/A"}
    </span>
    <span className="flex items-center">
        <FaMapPin className="mr-1 text-gray-500" /> {formData?.city || "N/A"}
    </span>
   {formData?.github && (
     <span className="flex items-center">
     <FaGithub className="mr-1 text-gray-500" /> {formData?.github }
 </span>
   )}
</p>

      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Professional Summary</h2>
        <p className="text-sm text-gray-700">{formData?.summary || "N/A"}</p>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      {/* Skills Section */}
      <div className="mb-6">
  {Array.isArray(formData?.skills) && formData.skills.length > 0 && (
    <>
      <h2 className="text-xl font-bold mb-2">Skills</h2>
      <ul className="grid grid-cols-3 gap-2 text-sm">
        {formData.skills.map((skillObj, index) => (
          <li key={index} className="list-disc list-inside">
            {typeof skillObj === "string" ? skillObj : skillObj?.skill || "N/A"}
          </li>
        ))}
      </ul>
    </>
  )}
</div>

      <hr className="border-t border-gray-300 my-4" />

      {/* Experience Section */}
      {formData?.workHistory?.some(job => job.title || job.employer) && (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-2">Experience</h2>
    {formData.workHistory
      .filter(job => job.title || job.employer) // Only map non-empty jobs
      .map((job, index) => (
        <div key={index} className="mb-4 flex justify-between">
          <h3 className="font-semibold text-md">
            {job.title || "N/A"} - {job.employer || "N/A"}
          </h3>
          <span className="font-bold text-sm text-right">
            {formatDate?.(job.startDate) ?? "N/A"} - {formatDate?.(job.endDate) ?? "N/A"}
          </span>
        </div>
      ))}
  </div>
)}

      <hr className="border-t border-gray-300 my-4" />

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
      <hr className="border-t border-gray-300 my-4" />

      {/* Education Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Education</h2>
        {formData?.education?.length > 0 ? formData.education.map((edu, index) => (
          <div key={index} className="flex justify-between">
            <h3 className="font-semibold text-md">{edu.schoolName} - {edu.degree} | {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">Percent: {edu.percentage}%</span>
                )}</h3>
            <span className="font-bold text-sm text-right">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
          </div>
        )) : <p className="text-sm text-gray-700">N/A</p>}
      </div>
      <hr className="border-t border-gray-300 my-4" />

      {/* Awards & Certificates Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Certificates</h2>
        <ul className="list-disc list-inside text-sm">
          {(formData?.certifications || []).map((cert, index) => (
            <li key={index}>{cert || "N/A"}</li>
          ))}
        </ul>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Awards & Acheivements</h2>
        {formData?.awards?.length > 0 ? formData.awards.map((award, index) => (
          <div key={index} className="flex justify-between">
            <h3 className="text-md">{award}</h3>
           
          </div>
        )) : <p className="text-sm text-gray-700">N/A</p>}
      </div>
      <hr className="border-t border-gray-300 my-4" />
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Interests</h2>
        <ul className="list-disc list-inside text-sm">
          {(formData?.interests || []).map((interest, index) => (
            <li key={index}>{interest || "N/A"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreviewB;
