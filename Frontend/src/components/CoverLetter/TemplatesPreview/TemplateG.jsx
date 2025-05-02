import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";

const TemplateG = ({ formData }) => {
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
    <div className="max-w-[750px] mx-auto bg-white shadow-lg p-10 font-[Arial] text-[#222] text-[14px] leading-[1.8]">
      {/* Sender Name and Position Titles */}
      <h1 className="text-xl font-bold text-[#111] mb-1">{formData.senderName}</h1>
      <p className="text-gray-800 font-semibold mb-2 text-sm">
        {formData.senderTitle }
      </p>

      {/* Contact Bar */}
      <div className="flex flex-wrap items-center text-gray-800 text-xs mb-4 gap-4">
        {formData.senderContact?.phone && (
          <div className="flex items-center gap-1">
            
            <span>{formData.senderContact.phone}</span>
          </div>
        )}
        {formData.senderContact?.email && (
          <div className="flex items-center gap-1">
            
            <span>{formData.senderContact.email}</span>
          </div>
        )}
        {formData.senderContact.address && (
          <div className="flex items-center gap-1">
            
            <span>{formData.senderContact.address}</span>
          </div>
        )}
      </div>

      {/* Cover Letter Title */}
      <p className="text-[11px] font-semibold text-gray-500 mb-2 uppercase">Cover Letter</p>

      {/* Salutation */}
      <p className="mb-4">Dear <strong>{formData.recipientName || "Recruiter"}</strong>,</p>

      {/* Intro Paragraph */}
      {formData.company?.introduction && (
        <p className="mb-4 whitespace-pre-line">{formData.company.introduction}</p>
      )}

      {/* Body Paragraphs */}
      {Array.isArray(formData.body) && formData.body.length > 0 ? (
        formData.body.map((para, index) => {
          const text = typeof para === "string" ? para : para.paragraph || "...";
          return (
            <p key={index} className="mb-4">
              {(index >= 1 && index <= 3) ? boldFirstWord(text) : text}
            </p>
          );
        })
      ) : (
        <p className="mb-4">[Your body paragraphs here]</p>
      )}

      {/* Closing */}
      {formData.closing && (
        <p className="mb-4 whitespace-pre-line">{formData.closing}</p>
      )}

      {/* Signature */}
      <div className="mt-10">
        <p>Sincerely,</p>
        <p className="font-semibold mt-2">{formData.senderName}</p>
      </div>
    </div>
  );
};

export default TemplateG;