const Templatek = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
        })
      : "Present";

  return (
    <div className="bg-white max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg border border-gray-300 font-sans">
      {/* Header */}
      <div className="">
        {/* Name and Position */}
        <div className="bg-white text-left p-4">
          <h1 className="text-3xl font-bold text-black uppercase">{`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}</h1>
          <p className="text-md font-semibold text-teal-600">{formData?.position || "N/A"}</p>
        </div>

        {/* Summary */}
        <div className="bg-black text-white text-sm p-4 text-left">
          {formData?.summary || "N/A"}
        </div>

        {/* Contact Details */}
        <div className="bg-teal-600 text-white flex flex-wrap justify-around p-3 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24"><path d="M21 8V7l-3 2-2-1-3 4-2-1-5 6H3l7-8 2 1 3-4 2 1z" /></svg>
            <span>{formData?.email || "N/A"}</span>
          </div>
          {formData?.phone && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24"><path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.2.49 2.53.76 3.88.76.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.48 21 3 13.52 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.35.26 2.68.76 3.88.15.38.05.82-.22 1.11l-2.2 2.2z"/></svg>
              <span>{formData.phone}</span>
            </div>
          )}
          {formData?.github && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.95.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.69-3.88-1.38-3.88-1.38-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.68 0-1.25.45-2.27 1.19-3.07-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.19 1.17A11.08 11.08 0 0112 6.83c.98.01 1.97.13 2.89.38 2.21-1.48 3.18-1.17 3.18-1.17.63 1.57.23 2.73.12 3.02.74.8 1.18 1.82 1.18 3.07 0 4.42-2.71 5.38-5.29 5.66.41.36.78 1.08.78 2.17 0 1.56-.01 2.81-.01 3.19 0 .31.2.67.8.56A10.99 10.99 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>
              <span>{formData.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Left Main Section */}
        <div className="w-full lg:w-2/3 p-6">
          {/* Work Experience */}
          {formData?.workHistory?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Work Experience</h2>
              {formData.workHistory.map((job, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">{job.title || "N/A"}</p>
                  <p className="text-sm italic">{job.employer || "N/A"}, {job.location || "N/A"}</p>
                  <p className="text-sm text-teal-600">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                  {job.description && <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{job.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {formData?.projects?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Projects</h2>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{project.description}</p>
                  <p className="text-sm text-teal-600">{formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Education</h2>
            {(formData?.education || []).map((edu, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium">{edu.schoolName || "N/A"}</p>
                <p className="text-sm">{`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`},{edu.percentage && (
                <span className="ml-2 text-sm text-gray-600"> Percent: {edu.percentage}%</span>
              )}</p>
                <p className="text-sm text-teal-600">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3 mt-2 bg-gray-200 p-6">
          {/* Skills Summary */}
          {Array.isArray(formData?.skills) && formData.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase text-gray-900">AREAS OF EXPERTISE</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm  list-inside">
                {formData.skills.map((skillObj, index) => (
                  <li key={index}>{skillObj?.skill || "N/A"}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Certifications</h2>
            <ul className="list-inside text-sm">
              {(formData?.certifications || []).map((cert, index) => (
                <li key={index}>{cert || "N/A"}</li>
              ))}
            </ul>
          </div>

          {/* Awards */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Awards</h2>
            <ul className=" list-inside text-sm">
              {(formData?.awards || []).map((award, index) => (
                <li key={index}>{award || "N/A"}</li>
              ))}
            </ul>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold border-b pb-1 mb-2 uppercase">Interests</h2>
            <ul className=" list-inside text-sm">
              {(formData?.interests || []).map((interest, index) => (
                <li key={index}>{interest || "N/A"}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templatek;
