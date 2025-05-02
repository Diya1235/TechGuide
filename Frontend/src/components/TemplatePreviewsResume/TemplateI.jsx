const TemplateI = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl mx-auto font-sans border border-gray-300 text-black">
      {/* HEADER - Name, Position, Contact */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold uppercase">
          {`${formData?.firstName || "N/A"} ${formData?.lastName || ""}`}
        </h1>
        <p className="text-blue-600 font-semibold text-lg">{formData?.position || "N/A"}</p>
        <div className="text-sm mt-2 space-y-1">
          <p>📍 {`${formData?.city || "N/A"}, ${formData?.country || "N/A"}`}</p>
          <p>📞 {formData?.phone || "N/A"}</p>
          <p>✉️ {formData?.email || "N/A"}</p>
          {formData?.github && (
            <p>
              💻{" "}
              <a
                href={formData.github}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {formData.github}
              </a>
            </p>
          )}
        </div>
      </div>

      {/* TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-3 gap-8">
        {/* LEFT Column - 2/3 */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          <section>
            <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
              SUMMARY
            </h2>
            <p className="text-sm">{formData?.summary || "N/A"}</p>
          </section>

          {/* Experience */}
          {formData?.workHistory?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
                EXPERIENCE
              </h2>
              {formData.workHistory.map((job, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold">
                    {job.title || "N/A"} @{" "}
                    <span className="text-blue-600">{job.employer || "N/A"}</span>
                  </p>
                  <p className="text-sm italic">
                    {job.location || "N/A"} | {formatDate(job.startDate)} - {formatDate(job.endDate)}
                  </p>
                  <ul className="list-disc list-inside text-sm pl-4 mt-1">
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
            <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
              EDUCATION
            </h2>
            {(formData?.education || []).map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{edu.schoolName}</p>
                {edu.percentage && (
                <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
              )}
                <p className="text-sm italic">
                  {edu.degree} in {edu.fieldOfStudy} | {formatDate(edu.startDate)} -{" "}
                  {formatDate(edu.endDate)}
                </p>
              </div>
            ))}
          </section>
        </div>

        {/* RIGHT Column - 1/3 */}
        <div className="space-y-6">
          {/* Projects */}
          {formData?.projects?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
                PROJECTS
              </h2>
              {formData.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <p className="font-semibold text-blue-600">{project.title}</p>
                  <p className="text-sm">{project.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Achievements / Awards */}
          {(formData?.awards || []).length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
                ACHIEVEMENTS
              </h2>
              <ul className="list-disc list-inside text-sm pl-4">
                {formData.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
                SKILLS
              </h2>
              <ul className="flex flex-wrap gap-2 text-sm">
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
              <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
                COURSES
              </h2>
              <ul className="list-disc list-inside text-sm pl-4">
                {formData.certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {formData?.interests?.length > 0 && (
            <section>
              <h2 className="text-md font-bold uppercase border-b-4 border-black pb-1 mb-2">
                PASSIONS
              </h2>
              <ul className="list-disc list-inside text-sm pl-4">
                {formData.interests.map((interest, i) => (
                  <li key={i}>{interest}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateI;
