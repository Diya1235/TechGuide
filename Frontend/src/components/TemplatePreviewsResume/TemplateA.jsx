const TemplateA = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-200">
      {/* Header Section */}
      <div className="text-center border-b-2 pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
        <p className="text-sm">
          <span className="text-blue-600">{formData?.email || "N/A"}</span> | {formData?.phone || "N/A"}
        </p>
        <p className="text-sm">{`${formData?.city || "N/A"}, ${formData?.country || "N/A"}`}</p>
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
              <p className="font-medium">{edu.schoolName || "N/A"}</p>
              <p className="text-sm">{`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`}</p>
            </div>
            <p className="text-sm text-gray-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Work Experience</h2>
        {(formData?.workHistory || []).map((job, index) => (
          <div key={index} className="mb-4 flex justify-between">
            <div>
              <p className="font-medium">{job.employer || "N/A"}</p>
              <p className="text-sm">{job.location || "N/A"}</p>
              <p className="text-sm">{job.title || "N/A"}</p>
            </div>
            <p className="text-sm text-gray-600">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
          </div>
        ))}
      </div>

      {/* Projects */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Projects</h2>
        {(formData?.projects || []).map((project, index) => (
          <div key={index} className="mb-4 flex justify-between">
            <div>
              <p className="font-medium">{project.title || "N/A"}</p>
              <p className="text-sm text-gray-700">{project.description || "N/A"}</p>
            </div>
            <p className="text-sm text-gray-600">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Certifications</h2>
        <ul className="list-disc list-inside text-sm">
          {(formData?.certifications || []).map((cert, index) => (
            <li key={index}>{cert || "N/A"}</li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-center">Skills</h2>
        <ul className="list-disc list-inside text-sm">
          {(formData?.skills || []).map((skill, index) => (
            <li key={index}>{typeof skill === "string" ? skill : skill?.skill || "N/A"}</li>
          ))}
        </ul>
      </div>

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

export default TemplateA;
