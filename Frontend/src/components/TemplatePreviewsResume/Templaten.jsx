import React from "react";

const Templaten = ({ formData }) => {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short" })
      : "Present";

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-sans p-8">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-start space-x-4 ml-4">
          <div className="w-14 h-14 rounded-full border-2 border-teal-600 text-teal-600 font-bold text-xl flex items-center justify-center mt-1">
            {formData?.firstName?.[0] || "A"}
            {formData?.lastName?.[0] || "B"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-teal-600">
              {formData?.firstName || "First"} {formData?.lastName || "Last"}
            </h1>
            <p className="text-sm text-gray-600">{`${formData?.city || "City"}, ${formData?.country || "Country"}`}</p>
            <p className="text-sm text-gray-600">{formData?.phone || "Phone"}</p>
            <p className="text-sm text-gray-600">{formData?.email || "Email"}</p>
            {formData?.linkedin && (
              <p className="text-sm text-gray-600">{formData.linkedin}</p>
            )}
          </div>
        </div>
      </div>

      {/* Timeline & Sections */}
      <div className="relative grid grid-cols-3 gap-x-6 mt-8 ">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-black transform -translate-x-1/2 z-0"></div>

        {[
          {
            label: "Professional Summary",
            content: (
              <p>{formData?.summary || "A dynamic professional summary goes here..."}</p>
            ),
          },
          {
            label: "Summary of Qualifications",
            content: (
              <ul className="list-disc list-inside">
                {(formData?.qualifications || ["Qualification 1", "Qualification 2"]).map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            ),
          },
          {
            label: "Skills",
            content: (
              <ul className="flex flex-wrap gap-2">
                {(formData?.skills || []).map((s, i) => (
                  <li
                    key={i}
                    className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs"
                  >
                    {s.skill}
                  </li>
                ))}
              </ul>
            ),
          },
          {
            label: "Work History",
            content: (
              <div className="space-y-4">
                {(formData?.workHistory || []).map((job, i) => (
                  <div key={i}>
                    <div className="font-semibold">{job.title || "Job Title"}</div>
                    <div className="text-xs text-gray-600">
                      {job.employer}, {job.location} | {formatDate(job.startDate)} -{" "}
                      {formatDate(job.endDate)}
                    </div>
                    <ul className="list-disc list-inside">
                      {(job.highlights || ["Responsibility 1", "Responsibility 2"]).map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ),
          },
          {
            label: "Education",
            content: (
              <div>
                {(formData?.education || []).map((edu, i) => (
                  <div key={i}>
                    <div className="font-semibold">{edu.schoolName} {edu.percentage && (
                  <span className="ml-2 text-sm text-gray-600">| Percent: {edu.percentage}%</span>
                )}</div>
                    <div className="text-xs text-gray-600">
                      {edu.degree} in {edu.fieldOfStudy} | {formatDate(edu.startDate)} -{" "}
                      {formatDate(edu.endDate)}
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
        ].map((section, idx) => (
          <React.Fragment key={idx}>
            {/* Left label */}
            <div className="text-right pr-2 font-semibold text-teal-700 uppercase text-sm pt-2">
              {section.label}
            </div>

            {/* Timeline Dot in center column */}
            <div className="flex justify-center relative z-10">
              <div className="w-4 h-4 rounded-full bg-white border-2 border-black"></div>
            </div>

            {/* Right content */}
            <div className="pb-8">{section.content}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Templaten;
