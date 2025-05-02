const TemplateJ = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="bg-white border border-gray-300 max-w-5xl mx-auto shadow-md rounded-md">
      {/* Top Header */}
      <div className="bg-blue-950 text-white p-6">
        <h1 className="text-3xl font-bold uppercase">
          {`${formData?.firstName || "First"} ${formData?.lastName || "Last"}`}
        </h1>
        <p className="text-lg">
          {formData?.position || "Position Placeholder"}
        </p>
        <div className="text-sm mt-2 flex flex-wrap gap-x-6 gap-y-1 items-center">
<p>📍 {`${formData?.city || "City"}, ${formData?.country || "Country"}`}</p>
<p>📞 {formData?.phone || "Phone"}</p>
<p>✉️ {formData?.email || "Email"}</p>
{formData?.github && (
  <p>
    💻{" "}
    <a
      href={formData.github}
      className="underline text-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      {formData.github}
    </a>
  </p>
)}
</div>

      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6 p-6 text-black text-sm">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          <section>
            <h2 className="text-md font-bold uppercase border-b-2 border-black pb-1 mb-2">
              Summary
            </h2>
            <p>{formData?.summary || "Your summary goes here..."}</p>
          </section>

          {/* Experience */}
          {formData?.workHistory?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-2 border-black pb-1 mb-2">
                Experience
              </h2>
              {formData.workHistory.map((job, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold">
                    {job.title || "Job Title"} @{" "}
                    <span className="text-blue-800 font-semibold">
                      {job.employer || "Company"}
                    </span>
                  </p>
                  <p className="italic">
                    {job.location || "Location"} | {formatDate(job.startDate)} -{" "}
                    {formatDate(job.endDate)}
                  </p>
                  <ul className="list-disc list-inside mt-1 pl-4">
                    {(job?.description || []).map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          <section>
            <h2 className="text-md font-bold uppercase border-b-2 border-black pb-1 mb-2">
              Education
            </h2>
            {(formData?.education || []).map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold text-blue-700">{edu.schoolName}</p>
                <p className="italic">
                  {edu.degree} in {edu.fieldOfStudy} | {edu.percentage && (
                <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
              )}{formatDate(edu.startDate)} -{" "}
                  {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-1 space-y-6">
          {/* Projects */}
          {formData?.projects?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-2 border-black pb-1 mb-2">
                Projects
              </h2>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold text-blue-700">{project.title}</p>
                  <p>{project.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Achievements */}
          {(formData?.awards || []).length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-2 border-black pb-1 mb-2">
                Achievements
              </h2>
              <ul className="list-disc list-inside pl-4">
                {formData.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-2 border-black pb-1 mb-2">
                Skills
              </h2>
              <ul className="flex flex-wrap gap-2">
                {formData.skills.map((s, i) => (
                  <li key={i} className="bg-gray-100 px-2 py-1 rounded">
                    {s.skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {formData?.certifications?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-2 border-black pb-1 mb-2">
                Courses
              </h2>
              <ul className="list-disc list-inside pl-4">
                {formData.certifications.map((cert, i) => (
                  <li key={i} className="text-blue-800">{cert}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateJ;
