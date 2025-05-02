const Previewo = ({ formData }) => {
    const formatDate = (date) =>
      date
        ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
        : "Present";
  
    return (
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto bg-white p-6">
        {/* Left Column */}
        <div className="col-span-1 bg-gray-100 p-4 rounded-lg shadow-md">
          {/* Contact Info */}
          <div className="mb-6 text-sm border-b pb-2">
            <p className="mb-2">📞 {formData?.phone || "N/A"}</p>
            <p className="mb-2">✉️ {formData?.email || "N/A"}</p>
            <p className="mb-2">📍 {formData?.city || "N/A"}</p>
            <p className="mb-2">🔗 {formData?.linkedin || "N/A"}</p>
          </div>
  
          {/* Projects */}
          {formData?.projects?.length > 0 && (
            <div className="mb-6 border-b pb-2">
              <h2 className="text-md font-semibold uppercase mb-2">Projects</h2>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium text-sm">{project.title || "N/A"}</p>
                  <p className="text-sm text-gray-700">{project.description || "N/A"}</p>
                </div>
              ))}
            </div>
          )}
  
          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <div className="mb-6 border-b pb-2">
              <h2 className="text-md font-semibold uppercase mb-2">Skills</h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {formData.skills.map((skill, index) => (
                  <li key={index}>{typeof skill === "string" ? skill : skill?.skill || "N/A"}</li>
                ))}
              </ul>
            </div>
          )}
          {formData?.certifications?.length > 0 && (
            <div>
              <h2 className=" font-semibold mb-2 uppercase">Certifications</h2>
              <ul className="list-disc list-inside text-gray-700">
                {formData.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
          {formData?.awards?.length > 0 && (
            <div>
              <h2 className="font-semibold mb-2 uppercase">Achievements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {formData.awards.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
  
        {/* Right Column */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md">
          {/* Header */}
          <div className="text-center mb-6 border-b pb-4">
            <h1 className="text-3xl font-bold uppercase">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
            <p className="text-sm uppercase tracking-wider">{formData?.position || "Professional Title"}</p>
          </div>
  
          {/* Summary */}
          <div className="mb-6 border-b pb-2">
            <h2 className="text-md font-semibold uppercase mb-2">Summary</h2>
            <p className="text-sm text-gray-700">{formData?.summary || "N/A"}</p>
          </div>
  
          {/* Internships */}
          {formData?.internships?.length > 0 && (
            <div className="mb-6 border-b pb-2">
              <h2 className="text-md font-semibold uppercase mb-2">Internships</h2>
              {formData.internships.map((intern, index) => (
                <div key={index} className="mb-2 flex justify-between">
                  <div>
                    <p className="font-medium text-sm">{intern.position || "N/A"}</p>
                    <p className="text-sm text-gray-600">{intern.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(intern.startDate)} - {formatDate(intern.endDate)}</p>
                </div>
              ))}
            </div>
          )}
  
          {/* Professional Experience */}
          {formData?.workHistory?.length > 0 && (
            <div className="mb-6 border-b pb-2">
              <h2 className="text-md font-semibold uppercase mb-2">Professional Experience</h2>
              {formData.workHistory.map((job, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-sm">{job.title || "N/A"}</p>
                      <p className="text-sm text-gray-600">{job.employer || "N/A"} - {job.location || "N/A"}</p>
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                  </div>
                  {job.description && <p className="text-sm text-gray-700 mt-1">{job.description}</p>}
                </div>
              ))}
            </div>
          )}
  
          {/* Education */}
          <div className="mb-6 border-b pb-2">
            <h2 className="text-md font-semibold uppercase mb-2">Education</h2>
            {(formData?.education || []).map((edu, index) => (
              <div key={index} className="mb-4 flex justify-between">
                <div>
                  <p className="font-medium text-sm">{edu.schoolName || "N/A"}</p>
                  <p className="text-sm text-gray-600">{`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`} {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}</p>
                </div>
                <p className="text-sm text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default Previewo;
  