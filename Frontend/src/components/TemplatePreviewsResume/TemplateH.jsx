import React from "react";
import { MailIcon } from "lucide-react";
import { FaGithub, FaMapPin, FaPhone, FaLinkedin } from "react-icons/fa";

const TemplateH = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  return (
    <div className="flex max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden font-sans text-sm">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-100 p-6 text-gray-800">
        {/* Name & Role */}
        <h1 className="text-xl font-bold text-black">{`${formData?.firstName || "First"} ${formData?.lastName || "Last"}`}</h1>
        <p className="text-sm text-blue-500 font-semibold">{formData?.position || "Your Role Here"}</p>

        {/* Contact Info */}
        <div className="mt-4 text-black text-xs space-y-1">
          <div className="flex items-center gap-2"><FaPhone />{formData?.phone || "Phone"}</div>
          <div className="flex items-center gap-2"><MailIcon className="w-4 h-4" />{formData?.email || "Email"}</div>
          <div className="flex items-center gap-2"><FaMapPin />{`${formData?.city || "City"}, ${formData?.country || "Country"}`}</div>
        </div>

        {/* Links */}
        <div className="mt-4">
          <h3 className="text-blue-800 font-semibold border-b border-gray-300 pb-1">LINKS</h3>
          <div className="text-blue-700 underline text-xs space-y-1">
            {formData?.linkedin && <div>{formData.linkedin}</div>}
            {formData?.github && <div>{formData.github}</div>}
          </div>
        </div>

        {/* Education */}
        {formData?.education?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-blue-800 font-semibold border-b border-gray-300 mb-1 pb-1">EDUCATION</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="text-black font-medium text-xs">{edu.degree}</p>
                <p className="text-gray-800 text-xs italic">{edu.schoolName}</p>
                {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}
                <p className="text-gray-600 text-[10px]">{`${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {formData?.skills?.length > 0 && (
          <div className="mt-4">
            <h3 className="text-blue-800 font-semibold border-b border-gray-300 mb-1 pb-1">SKILLS</h3>
            {formData.skills.map((s, index) => (
              <div key={index} className="mb-2">
                <p className="text-xs text-black mb-1">{s.skill}</p>
                <div className="w-full h-1 bg-gray-300 rounded-full">
                  <div className="h-1 bg-blue-600 rounded-full" style={{ width: `${s.level || 80}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {formData?.languages?.length > 0 && (
  <div className="mt-4">
    <h3 className="text-blue-800 font-semibold border-b border-gray-300 mb-1 pb-1">
      LANGUAGES
    </h3>
    {formData.languages.map((lang, index) => (
      <div key={index} className="mb-2">
        <p className="text-xs text-black mb-1">{lang}</p> {/* Fixed this line */}
        <div className="w-full h-1 bg-gray-300 rounded-full">
          <div className="h-1 bg-blue-600 rounded-full" style={{ width: `${lang.level || 80}%` }}></div>
        </div>
      </div>
    ))}
  </div>
)}

      </div>

      {/* Right Column */}
      <div className="w-2/3 p-6 text-gray-900">
        {/* Summary */}
        {formData?.summary && (
          <div className="mb-4">
            <h2 className="text-blue-800 font-bold text-sm mb-1 border-b border-gray-300 pb-1">PROFILE</h2>
            <p className="text-xs leading-relaxed text-black">{formData.summary}</p>
          </div>
        )}

        {/* Experience */}
        {formData?.workHistory?.length > 0 && (
  <div className="mb-4">
    <h2 className="text-blue-800 font-bold text-sm mb-1 border-b border-gray-300 pb-1">
      EMPLOYMENT HISTORY
    </h2>
    <div className="relative border-l-2 border-blue-600 pl-6 ml-2">
      {formData.workHistory.map((job, index) => (
        <div key={index} className="mb-10 relative">
          
          {/* Dot positioned on the line */}
          <div className="absolute left-[-11px] top-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white z-10"></div>

          {/* Job card */}
          <div className="bg-blue-50 p-3 rounded-md shadow-sm">
            <p className="text-black font-bold text-xs">{job.title}</p>
            <p className="text-gray-800 italic text-xs">
              {job.employer} | {job.location}
            </p>
            <p className="text-gray-600 text-[10px] mb-1">
              {`${formatDate(job.startDate)} - ${formatDate(job.endDate)}`}
            </p>
            <p className="text-xs text-black leading-snug">{job.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


        {/* Certificates */}
        {formData?.certifications?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-blue-800 font-bold text-sm mb-1 border-b border-gray-300 pb-1">CERTIFICATES</h2>
            <ul className="list-disc list-inside text-xs text-black">
              {formData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {formData?.achievements?.length > 0 && (
          <div className="mb-4">
            <h2 className="text-blue-800 font-bold text-sm mb-1 border-b border-gray-300 pb-1">AWARDS / ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside text-xs text-black">
              {formData.achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateH;
