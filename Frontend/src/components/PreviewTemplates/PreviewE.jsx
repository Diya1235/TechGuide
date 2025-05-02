import React from "react";

const PreviewE = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header Section */}
      <div className="text-center border-b-2 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
        <p className="text-md font-semibold">{formData?.position || "N/A"}</p>
        <p className="text-sm">{`${formData?.city || "N/A"}, ${formData?.country || "N/A"}`}</p>
        <p className="text-sm">
  {formData?.email || "N/A"} | {formData?.phone || "N/A"} 
  {formData?.github && ` | ${formData.github}`}
</p>

      </div>

      {/* Profile Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase"> Summary</h2>
        <p className="text-sm text-left">{formData?.summary || "N/A"}</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
  <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Skills</h2>
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


      {/* Work Experience */}
      {formData?.workHistory?.some(job => job.title || job.employer || job.description) && (
  <div className="mb-6">
    <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Experience</h2>
    {formData.workHistory
      .filter(job => job.title || job.employer || job.description) // ✅ Filter out empty jobs
      .map((job, index) => (
        <div key={index} className="mb-4">
          <p className="font-medium text-md">
            {job.title || "N/A"} - {job.employer || "N/A"}
          </p>
          <p className="text-sm text-gray-600">
            {formatDate?.(job.startDate) ?? "N/A"} - {formatDate?.(job.endDate) ?? "N/A"}
          </p>
          <p className="text-sm">{job.location || "N/A"}</p>
          <p className="text-sm">{job.description || "N/A"}</p>
        </div>
      ))}
  </div>
)}

      <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Projects</h2>
          {formData?.projects?.length > 0 ? (
            formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold ">{project.title}</h3>
                <p className="text-sm">{project.description || "No description available"}</p>
              </div>
            ))
          ) : (
            <p className="text-sm">N/A</p>
          )}
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Certificates</h2>
          <ul className="list-disc pl-5 text-sm">
            {(formData?.certifications || []).map((cert, index) => (
              <li key={index}>{cert || "N/A"}</li>
            ))}
          </ul>
        </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Education</h2>
        {(formData?.education ?? []).map((edu, index) => (
          <div key={index} className="mb-4">
            <p className="font-medium text-md">{edu.degree || "N/A"} in {edu.fieldOfStudy || "N/A"}</p>
            <p className="text-sm">{edu.schoolName || "N/A"}</p>
            {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}
            <p className="text-sm text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewE;
