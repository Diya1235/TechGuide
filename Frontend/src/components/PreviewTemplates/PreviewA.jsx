const PreviewA = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200">
      {/* Header Section */}
      <div className="text-center border-b-2 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
        <p className="text-md">
          <span className="font-bold">{formData?.position || "N/A"}</span>
        </p>
        <p className="text-sm">{`${formData?.city || "N/A"}, ${formData?.country || "N/A"}`}</p>
        <div className="text-sm flex justify-between w-full">
          {/* Email Section (Left) */}
          <div className="flex flex-col">
            <span className="font-semibold">Email</span>
            <span className="text-blue-600">{formData?.email || "N/A"}</span>
          </div>
          {formData?.github && (
            <div className="flex flex-col">
              <span className="font-semibold">Github</span>
              <span className="text-blue-600">{formData.github}</span>
            </div>
          )}


          {/* Phone Section (Right) */}
          <div className="flex flex-col text-right">
            <span className="font-semibold">Contact</span>
            <span>{formData?.phone || "N/A"}</span>
          </div>
        </div>



      </div>

      {/* Profile Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Profile Summary</h2>
        <p className="text-sm">{formData?.summary || "N/A"}</p>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Education</h2>
        {(formData?.education || []).map((edu, index) => (
          <div key={index} className="mb-4 flex justify-between">
            <div>
              <p className="font-medium">
                {edu.schoolName || "N/A"}
                {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}
              </p>
              <p className="text-sm">
                {`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`}
              </p>
            </div>
            <p className="text-sm text-gray-600">
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
            </p>
          </div>
        ))}
      </div>


      {/* Work Experience */}
      <div className="mb-6">
  {Array.isArray(formData?.skills) && formData.skills.length > 0 && (
    <>
      <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Skills Summary</h2>
      <ul className="grid grid-cols-1 gap-2 text-sm">
        {formData.skills.map((skillObj, index) => {
          const skillString = typeof skillObj === "string" ? skillObj : JSON.stringify(skillObj);
          const [label, value] = skillString.split(":");
          return (
            <li key={index} className="list-none">
              <span className="font-semibold">{label?.trim() || "Skill"}</span>
              {value && <span>: {value.trim()}</span>}
            </li>
          );
        })}
      </ul>
    </>
  )}
</div>





      {/* Projects */}
      {formData?.projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2 text-center uppercase">
            Projects
          </h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="mb-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{project.title}</p>
                <p className="text-sm text-gray-700">{project.description}</p>
              </div>
              <p className="text-sm text-gray-600">
                {formatDate?.(project.startDate) ?? "N/A"} - {formatDate?.(project.endDate) ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}


      {/* Certifications */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Certifications</h2>
        <ul className="list-disc list-inside text-sm">
          {(formData?.certifications || []).map((cert, index) => (
            <li key={index}>{cert || "N/A"}</li>
          ))}
        </ul>
      </div>


      {formData?.workHistory?.filter(job => job.employer || job.title || job.location)?.length > 0 && (
  <div className="mb-6">
    <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">
      Work Experience
    </h2>
    {formData.workHistory
      .filter(job => job.employer || job.title || job.location)
      .map((job, index) => (
        <div key={index} className="mb-4 flex justify-between">
          <div>
            <p className="font-medium">{job.employer || "N/A"}</p>
            <p className="text-sm">{job.location || "N/A"}</p>
            <p className="text-sm">{job.title || "N/A"}</p>
            {job.description && (
              <p className="text-sm mt-1 text-gray-700 whitespace-pre-line">{job.description}</p>
            )}
          </div>
          <p className="text-sm text-gray-600 text-right">
            {formatDate?.(job.startDate) ?? "N/A"} - {formatDate?.(job.endDate) ?? "N/A"}
          </p>
        </div>
      ))}
  </div>
)}




      {/* Awards */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Awards</h2>
        <ul className="list-disc list-inside text-sm">
          {(formData?.awards || []).map((award, index) => (
            <li key={index}>{award || "N/A"}</li>
          ))}
        </ul>
      </div>

      {/* Interests */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Interests</h2>
        <ul className="list-disc list-inside text-sm">
          {(formData?.interests || []).map((interest, index) => (
            <li key={index}>{interest || "N/A"}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreviewA;
