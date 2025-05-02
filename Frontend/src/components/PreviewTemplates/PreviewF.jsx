import React from "react";
import { Mail, Phone, MapPin, Linkedin, MailIcon } from "lucide-react";
import { FaGithub, FaMapPin, FaPhone } from "react-icons/fa";

const PreviewF = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-300 text-gray-900" style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Name, Position, and Summary */}
      <div className="text-left mb-4">
        <h1 className="text-3xl font-bold uppercase text-black">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
        <p className="text-lg font-semibold text-gray-700">{formData?.position || "N/A"}</p>
        <p className="text-sm mt-2 text-gray-600">{formData?.summary || "N/A"}</p>
      </div>

      {/* Contact Details Enclosed in Lines */}
      <hr className="border-gray-400 my-2" />
      <div className="flex justify-between text-sm py-2 items-center text-gray-800">
        <div className="flex items-center gap-1">
          <MailIcon className="w-4 h-4 text-gray-600" />
          <p>{formData?.email || "N/A"}</p>
        </div>
        <div className="flex items-center gap-1">
          <FaPhone className="w-4 h-4 text-gray-600" />
          <p>{formData?.phone || "N/A"}</p>
        </div>
        {
          formData?.github && (<div className="flex items-center gap-1">
            <FaGithub className="w-4 h-4 text-gray-600" />
            <p>{formData?.github || "N/A"}</p>
          </div>)
        }
        <div className="flex items-center gap-1">
          <FaMapPin className="w-4 h-4 text-gray-600" />
          <p>{`${formData?.city || "N/A"}, ${formData?.country || "N/A"}`}</p>
        </div>

      </div>
      <hr className="border-gray-400 my-2" />

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-8 mt-4">
        {/* Left Column: Work Experience */}
        {formData?.workHistory?.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 mb-3 uppercase text-black">
              Work Experience
            </h2>
            {formData.workHistory.map((job, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-md font-bold text-gray-900">{job.title || "N/A"}</h3> {/* Fixed typo */}
                <p className="text-sm font-semibold text-gray-700">
                  {job.employer || "N/A"} | {job.location || "N/A"}
                </p>
                <p className="text-xs text-gray-600">
                  {`${formatDate?.(job.startDate) ?? "N/A"} - ${formatDate?.(job.endDate) ?? "N/A"}`}
                </p>
                <p className="text-sm text-gray-700 mt-1">{job.description || "N/A"}</p>
              </div>
            ))}
          </div>
        )}


        {/* Right Column: Skills, Certificates, Education */}
        <div>
          {/* Skills Section (No Bullets) */}
          <h2 className="text-lg font-semibold border-b pb-1 mb-3 uppercase text-black">Skills</h2>
{Array.isArray(formData?.skills) && formData.skills.length > 0 && (
  <ul className="grid grid-cols-3 gap-2 text-sm">
    {formData.skills.map((skillObj, index) => (
      <li key={index} className="list-disc list-inside">{skillObj.skill || "N/A"}</li>
    ))}
  </ul>
)}


          {/* Certificates Section */}
          <h2 className="text-lg font-semibold border-b pb-1 mt-5 mb-3 uppercase text-black">Certificates</h2>
          {formData?.certifications?.map((cert, index) => (
            <p key={index} className="text-sm text-gray-700">{cert || "N/A"}</p>
          ))}


          {/* Education Section */}
          <h2 className="text-lg font-semibold border-b pb-1 mt-5 mb-3 uppercase text-black">Education</h2>
          {formData?.education?.map((edu, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-md font-bold text-gray-900">{edu.degree || "N/A"}</h3>
              <p className="text-sm font-semibold text-gray-700">{edu.schoolName || "N/A"}</p>
              {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}
              <p className="text-xs text-gray-600">{`${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`}</p>
            </div>
          ))}


          {/* Interests Section */}
          {formData?.interests?.length > 0 && (
            <>
              <h2 className="text-lg font-semibold border-b pb-1 mt-5 mb-3 uppercase text-black">Interests</h2>
              <p className="text-sm text-gray-700">{formData?.interests?.join(" • ")}</p>
            </>
          )}
          {formData?.languages?.length > 0 && (
            <>
              <h2 className="text-lg font-semibold border-b pb-1 mt-5 mb-3 uppercase text-black">Languages</h2>
              <p className="text-sm text-gray-700">{formData?.languages?.join(" • ")}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewF;
