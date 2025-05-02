const Previewr = ({ formData }) => {
    const formatDate = (date) =>
      date
        ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
        : "Present";
  
    return (
      <div className="bg-gray-100 p-8 rounded-md shadow-lg max-w-4xl mx-auto grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 bg-gray-900 text-white p-6 rounded-md">
          {/* Name and Position */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold uppercase tracking-tight">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
            <p className="text-md text-gray-400">{formData?.position || "N/A"}</p>
          </div>
  
          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">Contact</h2>
            <p className="text-sm text-gray-300">{formData?.email || "N/A"}</p>
            <p className="text-sm text-gray-300">{formData?.phone || "N/A"}</p>
            <p className="text-sm text-gray-300">{`${formData?.city || "N/A"}, ${formData?.country || "N/A"}`}</p>
            {formData?.linkedin && (
              <p className="text-sm text-blue-300">{formData.linkedin}</p>
            )}
            {formData?.github && (
              <p className="text-sm text-blue-300">{formData.github}</p>
            )}
          </div>
  
          {/* Objective/Summary */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">Objective</h2>
            <p className="text-sm text-gray-300">{formData?.summary || "N/A"}</p>
          </div>
  
          {/* Education */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">Education</h2>
            {(formData?.education || []).map((edu, index) => (
              <div key={index} className="mb-3">
                <p className="font-semibold text-sm text-gray-300">{edu.schoolName || "N/A"}</p>
                <p className="text-xs text-gray-400">{`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`} {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}</p>
                <p className="text-xs text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                <p className="text-xs text-gray-500">{edu.location || ""}</p>
              </div>
            ))}
          </div>
  
          {/* Skills */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">Skills</h2>
            <ul className="list-none pl-0">
              {(formData?.skills || []).map((skill, index) => (
                <li key={index} className="text-sm text-gray-300 mb-1">{typeof skill === "string" ? skill : skill?.skill || "N/A"}</li>
              ))}
            </ul>
          </div>
  
          {/* Certifications */}
          {formData?.certifications?.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">Certs</h2>
              <ul className="list-none pl-0">
                {(formData?.certifications || []).map((cert, index) => (
                  <li key={index} className="text-sm text-gray-300 mb-1">{cert || "N/A"}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
  
        {/* Right Column */}
        <div className="col-span-2 bg-white p-6 rounded-md">
          {/* Work Experience */}
          {formData?.workHistory?.filter(job => job.employer || job.title || job.location)?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase">Work Experience</h2>
              {formData.workHistory
                .filter(job => job.employer || job.title || job.location)
                .map((job, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-lg text-gray-800">{job.title || "N/A"}</h3>
                    <p className="text-sm text-gray-600 mb-1">{job.employer || "N/A"} | {job.location || "N/A"}</p>
                    <p className="text-sm text-gray-500">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                    {job.description && (
                      <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                        {job.description.split('\n').map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
            </div>
          )}
  
          {/* Projects */}
          {formData?.projects?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase">Projects</h2>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-lg text-gray-800">{project.title || "N/A"}</h3>
                  <p className="text-sm text-gray-500">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                  <p className="text-sm text-gray-700">{project.description || "N/A"}</p>
                </div>
              ))}
            </div>
          )}
  
          {/* Awards */}
          {formData?.awards?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase">Awards</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {(formData?.awards || []).map((award, index) => (
                  <li key={index}>{award || "N/A"}</li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Interests */}
          {formData?.interests?.length > 0 && (
            <div>
              <h2 className="text-md font-semibold text-gray-800 border-b pb-2 mb-3 uppercase">Interests</h2>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {(formData?.interests || []).map((interest, index) => (
                  <li key={index}>{interest || "N/A"}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Previewr;