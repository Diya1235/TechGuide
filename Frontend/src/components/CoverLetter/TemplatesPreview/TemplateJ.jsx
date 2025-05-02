import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";

const TemplateJ = ({ formData }) => {
  if (!formData) return <p>No Data Available</p>;

  const boldFirstWord = (text) => {
    if (!text) return "";
    const [first, ...rest] = text.trim().split(" ");
    return (
      <>
        <strong>{first}</strong> {rest.join(" ")}
      </>
    );
  };

  return (
    <div className="max-w-[900px] mx-auto bg-white shadow-lg p-10 font-[Arial] text-[#222] text-[14px] leading-[1.6] grid grid-cols-2 gap-10">
      {/* Left Column */}
      <div>
        {/* Sender Name and Title */}
        <h1 className="text-xl font-bold text-[#111] mb-1">{formData.senderName}</h1>
        <p className="text-sky-600 font-semibold mb-4 text-sm">
          {formData.senderTitle }
        </p>

        {/* Salutation */}
        <p className="mb-2">Dear <strong>{formData.recipientName || "Recruiter"}</strong>,</p>

        {/* Intro Paragraph */}
        {formData.company?.introduction && (
          <p className="mb-3 whitespace-pre-line">{formData.company.introduction}</p>
        )}

        {/* Body Paragraphs */}
        {Array.isArray(formData.body) && formData.body.length > 0 ? (
          formData.body.map((para, index) => {
            const text = typeof para === "string" ? para : para.paragraph || "...";
            return (
              <p key={index} className="mb-3">
                {(index >= 1 && index <= 3) ? boldFirstWord(text) : text}
              </p>
            );
          })
        ) : (
          <p className="mb-3">[Your body paragraphs here]</p>
        )}

        {/* Closing */}
        {formData.closing && (
          <p className="mb-4 whitespace-pre-line">{formData.closing}</p>
        )}
      </div>

      {/* Right Column */}
      <div>
        {/* To Section */}
        <div className="mb-6">
          <p className="text-[11px] font-semibold text-gray-500 uppercase mb-1">To</p>
          <p className="font-semibold">{formData.recipientName || "Hiring Manager"}</p>
          {formData.company?.address && (
            <address className="not-italic text-sm">
              {formData.company.address.street && <div>{formData.company.address.street}</div>}
              {formData.company.address.city && <div>{formData.company.address.city}, {formData.company.address.state} {formData.company.address.zip}</div>}
              {formData.company.address.country && <div>{formData.company.address.country}</div>}
            </address>
          )}
        </div>

        {/* From Section */}
        <div>
          <p className="text-[11px] font-semibold text-gray-500 uppercase mb-1">From</p>
          <p className="font-semibold">{formData.senderName}</p>
          {formData.senderAddress && (
            <address className="not-italic text-sm mb-2">
              {formData.senderAddress.street && <div>{formData.senderAddress.street}</div>}
              {formData.senderAddress.city && <div>{formData.senderAddress.city}, {formData.senderAddress.state} {formData.senderAddress.zip}</div>}
              {formData.senderAddress.country && <div>{formData.senderAddress.country}</div>}
            </address>
          )}
          <div className="text-sky-600 text-sm">
            {formData.senderContact?.phone && <div>Phone: {formData.senderContact.phone}</div>}
            {formData.senderContact?.email && <div>Email: {formData.senderContact.email}</div>}
            {formData.linkedin && <div>LinkedIn: {formData.linkedin}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateJ;