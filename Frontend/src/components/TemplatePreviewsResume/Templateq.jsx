const Templateq = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-lg max-w-4xl mx-auto grid grid-cols-5 gap-6">
      {/* Left Column */}
      <div className="col-span-2">
        {/* Contact Information */}
        <div className="mb-6">
          <h1 className="text-xl font-bold uppercase text-gray-800 mb-1">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
          <p className="text-sm text-gray-700 mb-1">{formData?.position || "N/A"}</p>
          <p className="text-sm text-gray-600 mb-2">{`${formData?.city || "N/A"}, ${formData?.country || "N/A"}`}</p>
          <p className="text-sm text-blue-600 mb-1">{formData?.email || "N/A"}</p>
          <p className="text-sm text-gray-700">{formData?.phone || "N/A"}</p>
          {formData?.github && (
            <p className="text-sm text-blue-600 mt-1">{formData.github}</p>
          )}
        </div>
        <div className="mb-6">
          <h2 className="text-md font-semibold text-gray-800 border-b pb-1 mb-2">Profile Summary</h2>
          <p className="text-sm text-gray-700">{formData?.summary || "N/A"}</p>
        </div>

        {/* Projects */}
        {formData?.projects?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 border-b pb-1 mb-2">Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <p className="font-semibold text-sm text-gray-700">{project.title || "N/A"}</p>
                <p className="text-xs text-gray-500">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                <p className="text-sm text-gray-700">{project.description || "N/A"}</p>
              </div>
            ))}
          </div>
        )}

        {/* Awards */}
        {formData?.awards?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 border-b pb-1 mb-2">Awards</h2>
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
            <h2 className="text-md font-semibold text-gray-800 border-b pb-1 mb-2">Interests</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              {(formData?.interests || []).map((interest, index) => (
                <li key={index}>{interest || "N/A"}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="col-span-3">
        {/* Summary */}
        

        {/* Skills */}
        <div className="mb-4">
          <div className="bg-gray-300 inline-block rounded-md py-1 px-2 mb-1">
            <h2 className="text-md font-semibold text-gray-800 uppercase">Skills</h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(formData?.skills || []).map((skill, index) => (
              <span key={index} className=" text-gray-700 rounded-full px-3 py-1 text-xs">{typeof skill === "string" ? skill : skill?.skill || "N/A"}</span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-4">
          <div className="bg-gray-300 inline-block rounded-md py-1 px-2 mb-1">
            <h2 className="text-md font-semibold text-gray-800 uppercase">Education</h2>
          </div>
          {(formData?.education || []).map((edu, index) => (
            <div key={index} className="mb-3">
              <p className="font-semibold text-sm text-gray-700">{edu.schoolName || "N/A"}</p>
              <p className="text-xs text-gray-600">{`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`} {edu.percentage && (
                <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
              )}</p>
              <p className="text-xs text-gray-500">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {formData?.certifications?.length > 0 && (
          <div className="mb-4">
            <div className="bg-gray-300 inline-block rounded-md py-1 px-2 mb-1">
              <h2 className="text-md font-semibold text-gray-800 uppercase">Certifications</h2>
            </div>
            <ul className="list-none pl-0 text-sm text-gray-700">
              {(formData?.certifications || []).map((cert, index) => (
                <li key={index}>{cert || "N/A"}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {formData?.languages?.length > 0 && (
          <div className="mb-4">
            <div className="bg-gray-300 inline-block rounded-md py-1 px-2 mb-1">
              <h2 className="text-md font-semibold text-gray-800 uppercase">Languages</h2>
            </div>
            <ul className="list-none pl-0 text-sm text-gray-700">
              {(formData?.languages || []).map((lang, index) => (
                <li key={index}>{lang || "N/A"}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Work Experience */}
        {formData?.workHistory?.filter(job => job.employer || job.title || job.location)?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-800 border-b pb-1 mb-2">Work Experience</h2>
            {formData.workHistory
              .filter(job => job.employer || job.title || job.location)
              .map((job, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold text-sm text-gray-700">{job.employer || "N/A"} | <span className="text-gray-600">{job.location || "N/A"}</span></p>
                  <p className="text-sm text-gray-700">{job.title || "N/A"}</p>
                  <p className="text-xs text-gray-500">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                  {job.description && (
                    <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                      {job.description.split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templateq;