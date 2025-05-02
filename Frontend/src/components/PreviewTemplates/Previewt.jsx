const Previewt = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  // Generate random level for skills (4 or 5)
  const getRandomLevel = () => Math.floor(Math.random() * 2) + 4;

  return (
    <div className="bg-gray-100 rounded-md shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#556B2F] text-white p-6 rounded-t-md flex justify-between items-center border border-white">
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-tight border-2 border-white px-2 py-1 inline-block">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
          <p className="text-md text-white mt-1">{formData?.position || "N/A"}</p>
        </div>
        <div className="text-right text-sm text-white">
          {formData?.email && <p>{formData.email}</p>}
          {formData?.phone && <p>{formData.phone}</p>}
          {formData?.linkedin && <p>{formData.linkedin}</p>}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-8 grid grid-cols-3 gap-8 ">
        {/* Left Column */}
        <div className="col-span-1 bg-gray-200 p-4">
          {/* Objective */}
          {formData?.summary && (
            <div className="mb-6 break-words max-w-xs">
              <h2 className="text-md font-bold uppercase border-b pb-1 mb-2">Objective</h2>
              <p className="text-sm text-gray-700 break-words leading-snug">{formData.summary}</p>
            </div>
          )}

          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase border-b pb-1 mb-2">Skills</h2>
              <ul className="list-none pl-0">
                {formData.skills.map((skillItem, index) => {
                  const skillName = typeof skillItem === 'string' ? skillItem : skillItem?.skill || 'N/A';
                  const level = typeof skillItem === 'object' && skillItem?.level ? skillItem.level : getRandomLevel();
                  return (
                    <li key={index} className="text-sm text-gray-800 mb-1 flex justify-between items-center">
                      <span>{skillName}</span>
                      <span className="text-[#556B2F] text-sm ml-2 whitespace-nowrap">
                        {'★'.repeat(level)}{'☆'.repeat(5 - level)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Education */}
          {formData?.education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase border-b pb-1 mb-2">Education</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold text-sm text-gray-700">{edu.schoolName || 'N/A'}, {edu.degree || 'N/A'} {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}</p>
                  <p className="text-xs text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          {/* Experience */}
          {formData?.workHistory?.filter(job => job.employer || job.title || job.location)?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-md font-bold uppercase border-b pb-1 mb-2">Experience</h2>
              {formData.workHistory
                .filter(job => job.employer || job.title || job.location)
                .map((job, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-md text-gray-800">{job.title || 'N/A'}</h3>
                    <p className="text-sm text-gray-600">{job.employer || 'N/A'} | {formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                    {job.description && Array.isArray(job.description) && (
                      <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
                        {job.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {job.description && typeof job.description === 'string' && (
                      <p className="mt-2 text-sm text-gray-700">{job.description}</p>
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Certifications */}
          {formData?.certifications?.length > 0 && (
            <div className="ml-20">
              <h2 className="text-md font-bold uppercase border-b pb-1 mb-2">Certifications</h2>
              <ul className="list-disc pl-0">
                {formData.certifications.map((cert, index) => (
                  <li key={index} className="text-sm text-gray-700 mb-1">{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Previewt;
