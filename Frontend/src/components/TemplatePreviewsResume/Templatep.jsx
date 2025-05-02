import React from "react";

const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" }) : "Present";

const Templatep = ({ formData }) => {
  return (
    <div className="bg-white text-gray-800 font-sans shadow-lg max-w-4xl mx-auto rounded-lg overflow-hidden relative">
      {/* Top Right Wave Pattern */}
      <div className="absolute -top-8 -right-8 w-48 h-24">
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <path
            fill="#64B6AC"
            fillOpacity="1"
            d="M1,32L60,48C120,84,280,106,360,90.7C480,85,600,43,720,52.7C840,45,960,105,1080,106.7C1200,128,1320,128,1385,128L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Header */}
      <div className="p-8 pb-4">
        <h1 className="text-3xl font-bold uppercase">
          {formData?.firstName || "First"} {formData?.lastName || "Last"}
        </h1>
        <p className="text-sm mt-1 tracking-widest uppercase text-gray-600">
          {formData?.position || "Professional Title"}
        </p>
        <div className="flex flex-col gap-1 text-sm text-gray-600 mt-4">
          <span>📞 {formData?.phone || "N/A"}</span>
          <span>✉️ {formData?.email || "N/A"}</span>
          <span>📍 {formData?.city || "N/A"}</span>
        </div>
      </div>

      {/* Body Grid */}
      <div className="grid grid-cols-3 gap-6 px-6 pb-6">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Experience */}
          {formData?.workHistory?.length > 0 && (
            <div>
              <h2 className="text-teal-700 font-semibold text-sm mb-2 uppercase">Experience</h2>
              {formData.workHistory.map((job, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{job.title || "N/A"}</p>
                      <p className="text-sm text-gray-600">
                        {job.employer || "N/A"} — {job.location || "N/A"}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(job.startDate)} - {formatDate(job.endDate)}</p>
                  </div>
                  {job.description && (
                    <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                      {job.description.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {formData?.education?.length > 0 && (
            <div>
              <h2 className="text-teal-700 font-semibold text-sm mb-2 uppercase">Education</h2>
              {formData.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between mb-4">
                  <div>
                    <p className="font-semibold">{edu.schoolName || "N/A"}</p>
                    <p className="text-sm text-gray-600">{`${edu.degree || "N/A"} in ${edu.fieldOfStudy || "N/A"}`} {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Certifications */}
          {formData?.certifications?.length > 0 && (
            <div>
              <h2 className="text-teal-700 font-semibold text-sm mb-2 uppercase">Certifications</h2>
              <ul className="text-sm list-disc list-inside space-y-1">
                {formData.certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Publications */}
          {formData?.publications?.length > 0 && (
            <div>
              <h2 className="text-teal-700 font-semibold text-sm mb-2 uppercase">Publications</h2>
              <ul className="text-sm list-disc list-inside space-y-1">
                {formData.publications.map((pub, idx) => (
                  <li key={idx}>{pub}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {formData?.skills?.length > 0 && (
            <div>
              <h2 className="text-teal-700 font-semibold text-sm mb-2 uppercase">Skills</h2>
              <ul className="text-sm list-disc list-inside space-y-1">
                {formData.skills.map((skill, idx) => (
                  <li key={idx}>{typeof skill === "string" ? skill : skill?.skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Volunteering */}
          {formData?.volunteer?.length > 0 && (
            <div>
              <h2 className="text-teal-700 font-semibold text-sm mb-2 uppercase">Volunteering</h2>
              <ul className="text-sm list-disc list-inside space-y-1">
                {formData.volunteer.map((vol, idx) => (
                  <li key={idx}>{vol}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Left Wave Pattern */}
      <div className="absolute -bottom-8 -left-8 w-48 h-24">
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <path
            fill="#64B6AC"
            fillOpacity="1"
            d="M0,224L60,229.3C120,235,240,245,360,250.7C480,256,600,256,720,240C840,224,960,192,1080,197.3C1200,203,1320,245,1380,266.7L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Templatep;
