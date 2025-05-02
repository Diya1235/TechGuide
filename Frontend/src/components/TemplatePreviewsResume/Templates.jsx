const Templates = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  const sectionTitleStyle = {
    borderBottom: '2px solid #3b82f6', // Tailwind's blue-500 hex code
    marginBottom: '0.75rem', // Equivalent to Tailwind's mb-3
    paddingBottom: '0.25rem', // Equivalent to Tailwind's pb-1
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', // A common sans-serif stack
  };

  const codeFontStyle = {
    fontFamily: 'monospace',
    fontSize: '0.875rem', // Equivalent to Tailwind's text-sm
    lineHeight: '1.5',
  };

  return (
    <div className="bg-gray-100 rounded-md shadow-lg max-w-4xl mx-auto grid grid-cols-3 gap-8">
      {/* Left Sidebar */}
      <div className="col-span-1 text-white p-6 rounded-l-md relative">
        {/* Header in Pentagon Shape */}
        <div
          className="relative mb-6"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)',
            background: '#3b82f6',
            padding: '1.25rem',
          }}
        >
          <h1 className="text-3xl font-bold uppercase tracking-tight">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
          <p className="text-lg text-teal-200">{formData?.position || "N/A"}</p>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold uppercase  text-gray-800 mb-2" style={sectionTitleStyle}>Contact</h2>
          {formData?.phone && <p className="text-sm  text-gray-800 mb-1" style={codeFontStyle}>{formData.phone}</p>}
          {formData?.email && <p className="text-sm  text-gray-800 mb-1" style={codeFontStyle}>{formData.email}</p>}
          {formData?.city && formData?.country && <p className="text-sm  mb-1" style={codeFontStyle}>{`${formData.city}, ${formData.country}`}</p>}
          {formData?.linkedin && <p className="text-sm  text-gray-800" style={codeFontStyle}>{formData.linkedin}</p>}
          {formData?.github && <p className="text-sm  text-gray-800" style={codeFontStyle}>{formData.github}</p>}
        </div>

        {/* Work Experience (Moved to Left Sidebar) */}
        {formData?.workHistory?.filter(job => job.employer || job.title || job.location)?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase  text-gray-800 mb-2" style={sectionTitleStyle}>Experience</h2>
            {formData.workHistory
              .filter(job => job.employer || job.title || job.location)
              .slice(0, 2) // Displaying a limited number for the sidebar
              .map((job, index) => (
                <div key={index} className="mb-3">
                  <h3 className="font-semibold text-sm  text-gray-800" style={codeFontStyle}>{job.title || "N/A"}</h3>
                  <p className="text-xs  text-gray-800" style={codeFontStyle}>{job.employer || "N/A"}</p>
                  <p className="text-xs  text-gray-800" style={codeFontStyle}>{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                </div>
              ))}
          </div>
        )}

        {/* Skills */}
        {formData?.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase  text-gray-800 mb-2" style={sectionTitleStyle}>Skills</h2>
            <div className="grid grid-cols-2 gap-2">
              {(formData?.skills || []).map((skill, index) => (
                <p key={index} className="text-sm  text-gray-800" style={codeFontStyle}>{typeof skill === "string" ? skill : skill?.skill || "N/A"}</p>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {formData?.education?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase  text-gray-800 mb-2" style={sectionTitleStyle}>Education</h2>
            {(formData?.education || []).map((edu, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold text-sm  text-gray-800" style={codeFontStyle}>{edu.schoolName || "N/A"}</p>
                <p className="text-xs  text-gray-800" style={codeFontStyle}>{`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`} {edu.percentage && (
                <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
              )}</p>
                <p className="text-xs  text-gray-800" style={codeFontStyle}>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {formData?.certifications?.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase  text-gray-800 mb-2" style={sectionTitleStyle}>Certifications</h2>
            <ul className="list-none pl-0">
              {(formData?.certifications || []).map((cert, index) => (
                <li key={index} className="text-sm  text-gray-800" style={codeFontStyle}>{cert || "N/A"}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="col-span-2 bg-white p-6 rounded-r-md">
        {/* Summary */}
        <div className="mb-6">
          <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase" style={sectionTitleStyle}>Summary</h2>
          <p className="text-sm text-gray-700" style={codeFontStyle}>{formData?.summary || "N/A"}</p>
        </div>

        {/* Full Work Experience (on the Right) */}
        {formData?.workHistory?.filter(job => job.employer || job.title || job.location)?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase" style={sectionTitleStyle}>Work Experience</h2>
            {formData.workHistory
              .filter(job => job.employer || job.title || job.location)
              .map((job, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg text-gray-800" style={codeFontStyle}>{job.title || "N/A"}</h3>
                  <p className="text-sm text-gray-600 mb-1" style={codeFontStyle}>{job.employer || "N/A"} | {job.location || "N/A"}</p>
                  <p className="text-sm text-gray-500" style={codeFontStyle}>{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                  {job.description && (
                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-700" style={codeFontStyle}>
                      {job.description.split('\n').map((item, i) => (
                        <li key={i} style={codeFontStyle}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Projects */}
        {formData?.projects?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase" style={sectionTitleStyle}>Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-lg text-gray-800" style={codeFontStyle}>{project.title || "N/A"}</h3>
                <p className="text-sm text-gray-500" style={codeFontStyle}>{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                <p className="text-sm text-gray-700" style={codeFontStyle}>{project.description || "N/A"}</p>
              </div>
            ))}
          </div>
        )}
        {formData?.workHistory?.length > 0 && (
          <div>
            <h2 className="text-md font-semibold border-b pb-1 uppercase text-gray-800" style={sectionTitleStyle}>Work Experience</h2>
            {formData.workHistory.map((job, index) => (
              <div key={index} className="mt-4">
                <p className="font-semibold">{job.title} — <span className="text-gray-700">{job.employer}</span></p>
                <p className="text-sm text-gray-500 italic">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                <p className="text-sm text-gray-700">{job.location}</p>
                <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                  {(job?.description || []).map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {formData?.awards?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase" style={sectionTitleStyle}>Awards</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {(formData?.awards || []).map((award, index) => (
                <li key={index} style={codeFontStyle}>{award || "N/A"}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;