import { MailIcon } from "lucide-react";
import React from "react";
import { FaPhone, FaMapPin, FaGithub } from "react-icons/fa";

const PreviewD = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200 flex">
      {/* Left Column */}
      <div className="w-2/3 pr-6">
        {/* Header Section */}
        <div className="border-b-2 pb-4 mb-6">
          <h1 className="text-3xl font-bold  text-blue-600">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
          <p className="text-lg font-semibold">{formData?.position || "N/A"}</p>
          <p className="text-sm ">{formData?.summary || "N/A"}</p>
        </div>

        {/* Work Experience */}
        {formData?.workHistory?.some(job => job.title || job.employer) && (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-blue-600 mb-2 border-b-2 pb-1">
      Work Experience
    </h2>
    {formData.workHistory
      .filter(job => job.title || job.employer) // ✅ Remove empty entries
      .map((job, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-md">
            {job.title || "N/A"} - {job.employer || "N/A"}
          </h3>
          <span className="text-sm">
            {formatDate?.(job.startDate) ?? "N/A"} - {formatDate?.(job.endDate) ?? "N/A"}
          </span>
        </div>
      ))}
  </div>
)}


        {/* Projects */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-2 border-b-2 pb-1">Projects</h2>
          {formData?.projects?.length > 0 ? (
            formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-md">{project.title}</h3>
                <p className="text-sm">{project.description || "No description available"}</p>
              </div>
            ))
          ) : (
            <p className="text-sm">N/A</p>
          )}
        </div>

        {/* Professional Summary */}
        
      </div>

      {/* Right Column */}
      <div className="w-1/3 bg-gray-100 p-4 rounded-lg">
        {/* Contact */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2 border-b-2 pb-1">Contact</h2>
          <p className="text-sm flex items-center"><MailIcon className="mr-2 text-gray-500" /> {formData?.email || "N/A"}</p>
          <p className="text-sm flex items-center"><FaPhone className="mr-2 text-gray-500" /> {formData?.phone || "N/A"}</p>
          <p className="text-sm flex items-center"><FaMapPin className="mr-2 text-gray-500" /> {formData?.city || "N/A"}</p>
         {formData?.github && (
           <p className="text-sm flex items-center"><FaGithub className="mr-2 text-gray-500" /> {formData?.github || "N/A"}</p>
         )}
        </div>

        {/* Skills */}
        <div className="mb-4">
  <h2 className="text-xl font-semibold text-blue-600 mb-2 border-b-2 pb-1">Skills</h2>
  {Array.isArray(formData?.skills) && formData.skills.length > 0 && (
    <ul className="grid grid-cols-3 gap-2 text-sm">
      {formData.skills.map((skill, index) => (
        <li key={index} className="list-disc list-inside">
          {typeof skill === "string" ? skill : skill?.skill || "N/A"}
        </li>
      ))}
    </ul>
  )}
</div>


        {/* Education */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2 border-b-2 pb-1">Education</h2>
          {formData?.education?.length > 0 ? (
            formData.education.map((edu, index) => (
              <div key={index}>
                <h3 className="text-md font-semibold">{edu.schoolName} - {edu.degree} {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}</h3>
                <span className="text-sm">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm">N/A</p>
          )}
        </div>

        {/* Certificates */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-blue-600 mb-2 border-b-2 pb-1">Certificates</h2>
          <ul className="list-disc pl-5 text-sm">
            {(formData?.certifications || []).map((cert, index) => (
              <li key={index}>{cert || "N/A"}</li>
            ))}
          </ul>
        </div>

        
        <div className="mb-4">
            <h2 className="text-xl font-semibold text-blue-600 mb-2 border-b-2 pb-1">Awards & Acheivements</h2>
            {formData?.awards?.length > 0 ? formData.awards.map((award, index) => (
              <div key={index} className="flex justify-between">
                <h4 className=" text-md">{award}</h4>

              </div>
            )) : <p className="text-sm text-gray-700">N/A</p>}
          </div>

      </div>
    </div>
  );
};

export default PreviewD;
