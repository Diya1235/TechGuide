import React from "react";
import { MailIcon } from "lucide-react";
import { FaMapPin, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const TemplateG = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  return (
    <div
      className="p-10 bg-white rounded-lg shadow-lg max-w-6xl mx-auto border border-gray-300 text-gray-900"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      {/* Header split into two columns */}
      <div className="grid grid-cols-2 pb-6 border-b">
        {/* Left side - Name, Title, Contact */}
        <div className="col-span-2">
          <h1 className="text-3xl font-bold text-blue-900 uppercase">
            {`${formData?.firstName || "First"} ${formData?.lastName || "Last"}`}
          </h1>
          <p className="text-blue-500 font-semibold text-sm">
            {formData?.position || "Your Role Here"}
          </p>
          <div className="flex flex-wrap gap-4 items-center mt-2 text-sm text-gray-800">
      {formData?.phone && (
        <div className="flex items-center gap-1">
          <FaPhone className="text-blue-600" />
          {formData.phone}
        </div>
      )}
      {formData?.email && (
        <div className="flex items-center gap-1">
          <MailIcon className="w-4 h-4 text-blue-600" />
          {formData.email}
        </div>
      )}
      {formData?.linkedin && (
        <div className="flex items-center gap-1">
          <FaLinkedin className="text-blue-600" />
          {formData.linkedin}
        </div>
      )}
      {formData?.github && (
        <div className="flex items-center gap-1">
          <FaGithub className="text-blue-600" />
          {formData.github}
        </div>
      )}
      {(formData?.city || formData?.country) && (
        <div className="flex items-center gap-1">
          <FaMapPin className="text-blue-600" />
          {`${formData.city || ""}, ${formData.country || ""}`}
        </div>
      )}
    </div>
        </div>
        {/* Right side - reserved for future image or blank */}
        <div></div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-6">
        {/* Left Column */}
        <div className="md:col-span-1 space-y-6">
          {/* Summary */}
          {formData?.summary && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">SUMMARY</h2>
              <p className="text-sm text-gray-900 leading-relaxed">
                {formData.summary}
              </p>
            </div>
          )}

          {/* Projects */}
          {formData?.projects?.length > 0 && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">PROJECTS</h2>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm font-bold text-blue-800">{project.title}</p>
                  <p className="text-sm text-gray-900">{project.description}</p>
                  <p className="text-xs text-gray-600">{`${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}</p>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {formData?.awards?.length > 0 && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">KEY ACHIEVEMENTS</h2>
              <ul className="text-sm list-disc list-inside text-gray-900">
                {formData.awards.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {formData?.certifications?.length > 0 && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">TRAINING / COURSES</h2>
              <ul className="text-sm list-disc list-inside text-gray-900">
                {formData.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Experience */}
          {formData?.workHistory?.length > 0 && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">EXPERIENCE</h2>
              {formData.workHistory.map((job, index) => (
                <div key={index} className="mb-4">
                  <p className="text-sm font-bold text-blue-800">{job.title}</p>
                  <p className="text-sm text-blue-600 italic">
                    {job.employer} | {job.location}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">{`${formatDate(job.startDate)} - ${formatDate(job.endDate)}`}</p>
                  <p className="text-sm text-gray-900 leading-snug">{job.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">SKILLS</h2>
              <div className="text-sm text-blue-800 flex flex-wrap gap-2">
                {formData.skills.map((s, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                  >
                    {s.skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {formData?.education?.length > 0 && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">EDUCATION</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="text-sm font-bold text-blue-800">{edu.degree}</p>
                  <p className="text-sm text-blue-600 italic">{edu.schoolName}</p>
                  {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}
                  <p className="text-xs text-gray-600">{`${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`}</p>
                </div>
              ))}
            </div>
          )}
          {formData?.languages?.length > 0 && (
            <div>
              <h2 className="text-blue-800 font-semibold border-b mb-2">Languages</h2>
              <ul className="text-sm list-disc list-inside text-gray-900">
                {formData.languages.map((lang, index) => (
                  <li key={index}>{lang}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateG;
