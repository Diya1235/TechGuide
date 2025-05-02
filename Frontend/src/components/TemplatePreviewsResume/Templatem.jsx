const Templatem = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="grid grid-cols-3 font-sans max-w-6xl mx-auto shadow-lg border border-gray-300 ">
      {/* Header Section */}
      <div className="col-span-2 bg-gray-100 p-5">
        <h1 className="text-3xl font-bold text-teal-700">{`${formData?.firstName || "First"} ${formData?.lastName || "Last"}`}</h1>
        <p className="text-lg text-gray-700 font-medium">{formData?.position || "Your Title"}</p>
        <p className="mt-4 text-sm text-gray-600">{formData?.summary || "Summary goes here..."}</p>
      </div>

      <div className="bg-teal-600 text-white p-6 ml-2">
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold">Email</p>
            <p>{formData?.email || "email@example.com"}</p>
          </div>
          <div>
            <p className="font-semibold">Phone</p>
            <p>{formData?.phone || "+1 000 000 0000"}</p>
          </div>
          <div>
            <p className="font-semibold">Location</p>
            <p>{`${formData?.city || "City"}, ${formData?.country || "Country"}`}</p>
          </div>
          {formData?.linkedin && (
            <div>
              <p className="font-semibold">LinkedIn</p>
              <p className="break-all">{formData.linkedin}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-2 bg-white p-6 space-y-8 mt-2">
        {/* Work Experience */}
        {formData?.workHistory?.length > 0 && (
          <div>
            <h2 className="text-teal-700 font-semibold text-lg border-b border-gray-300 pb-1 mb-3 uppercase">Work Experience</h2>
            {formData.workHistory.map((job, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="font-medium text-black">{job.title || "Role"}</p>
                  <p>{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                </div>
                <p className="text-sm text-gray-500 italic">{job.employer} — {job.location}</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  {(job?.description || "").split("\n").map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {formData?.education?.length > 0 && (
          <div>
            <h2 className="text-teal-700 font-semibold text-lg border-b border-gray-300 pb-1 mb-3 uppercase">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p className="font-medium text-black">{edu.schoolName} {edu.percentage && (
                <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
              )}</p>
                  <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
                <p className="text-sm italic text-gray-500">{edu.degree} in {edu.fieldOfStudy}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar Right */}
      <div className="bg-gray-100 p-6 ml-2 mt-2 space-y-8 text-sm">
        
        {/* Soft Skills */}
        {formData?.skills?.length > 0 && (
          <div>
            <h2 className="text-teal-700 font-semibold mb-2 uppercase">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((s, idx) => (
                <span
                  key={idx}
                  className="bg-teal-600 text-white px-3 py-1 rounded-full text-xs"
                >
                  {s.skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {formData?.certifications?.length > 0 && (
          <div>
            <h2 className="text-teal-700 font-semibold mb-2 uppercase">Certifications</h2>
            <ul className="list-disc list-inside text-gray-700">
              {formData.certifications.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
        {formData?.awards?.length > 0 && (
          <div>
            <h2 className="text-teal-700 font-semibold mb-2 uppercase">Achievements</h2>
            <ul className="list-disc list-inside text-gray-700">
              {formData.awards.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
        {formData?.languages?.length > 0 && (
          <div>
            <h2 className="text-teal-700 font-semibold mb-2 uppercase">Languages</h2>
            <ul className="list-disc list-inside text-gray-700">
              {formData.languages.map((cert, idx) => (
                <li key={idx}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Templatem;
