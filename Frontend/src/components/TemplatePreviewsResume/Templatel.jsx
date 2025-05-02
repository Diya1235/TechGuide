import React from "react";

const Templatel = ({ formData }) => {
  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

  return (
    <div className="bg-white max-w-6xl mx-auto p-10 rounded-lg shadow border border-gray-200 font-sans">
      {/* Header */}
      <div className="text-left mb-8">
        <h1 className="text-3xl font-bold text-blue-900">{`${formData?.firstName || "First"} ${formData?.lastName || "Last"}`}</h1>
        <p className="text-sm mt-2 max-w-2xl mx-auto text-gray-700">{formData?.summary || "N/A"}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="col-span-2 space-y-8">
          {/* Work Experience */}
          {formData?.workHistory?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 uppercase text-blue-800">Work Experience</h2>
              {formData.workHistory.map((job, index) => (
                <div key={index} className="mt-4">
                  <p className="font-semibold">{job.title} — <span className="text-gray-700">{job.employer}</span></p>
                  <p className="text-sm text-gray-500 italic">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                  <p className="text-sm text-gray-700">{job.location}</p>
                  <ul className="list-disc list-inside text-sm mt-1 text-gray-700">
                    {(job?.description || []).map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {(formData?.education || []).length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 uppercase text-blue-800">Educational Background</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="mt-4">
                  <p className="font-semibold">{edu.degree} in {edu.fieldOfStudy}</p>
                  {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}
                  <p className="text-sm text-gray-600">{edu.schoolName}</p>
                  
                  <p className="text-sm text-gray-500 italic">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-8">
          {/* Contact */}
          <div>
            <h2 className="text-lg font-semibold border-b pb-1 uppercase text-blue-800">Contact</h2>
            <p className="text-sm text-gray-800 mt-2">{formData?.email}</p>
            <p className="text-sm text-gray-800">{formData?.phone}</p>
            <p className="text-sm text-gray-800">{formData?.city}, {formData?.country}</p>
            {formData?.github && (
              <p className="text-sm text-blue-600">{formData.github}</p>
            )}
          </div>

          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 uppercase text-blue-800">Skills</h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {formData.skills.map((skill, i) => (
                  <li key={i}>{skill.skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {formData?.certifications?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 uppercase text-blue-800">Certifications</h2>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {formData.certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Info */}
          {(formData?.awards?.length > 0 || formData?.interests?.length > 0) && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 uppercase text-blue-800">Additional Information</h2>
              {formData?.awards?.length > 0 && (
                <>
                  <p className="text-sm font-semibold mt-2">Awards</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {formData.awards.map((award, i) => (
                      <li key={i}>{award}</li>
                    ))}
                  </ul>
                </>
              )}
              {formData?.interests?.length > 0 && (
                <>
                  <p className="text-sm font-semibold mt-2">Interests</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {formData.interests.map((interest, i) => (
                      <li key={i}>{interest}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templatel;
