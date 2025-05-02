import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";

const TemplateI = ({ formData }) => {
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
    <div className="max-w-[750px] mx-auto bg-white shadow-lg p-10 font-[Georgia] text-[#222] text-[14px] leading-[1.8] text-center">
      {/* Sender Name and Position Titles */}
      <h1 className="text-xl font-bold text-[#111] mb-1">{formData.senderName}</h1>
      <p className="text-sky-600 font-semibold mb-2 text-sm">
        <strong className="text-gray-800">{formData.position }</strong>
      </p>

      {/* Contact Bar */}
      <div className="flex flex-wrap items-center justify-center text-sky-600 text-xs mb-4 gap-4">
        {formData.senderContact?.phone && (
          <div className="flex items-center gap-1">
            <Phone size={12} />
            <span>{formData.senderContact.phone}</span>
          </div>
        )}
        {formData.senderContact?.email && (
          <div className="flex items-center gap-1">
            <Mail size={12} />
            <span>{formData.senderContact.email}</span>
          </div>
        )}
        {formData.linkedin && (
          <div className="flex items-center gap-1">
            <Linkedin size={12} />
            <span>{formData.linkedin}</span>
          </div>
        )}
      </div>

      {/* Separator Line */}


      {/* Cover Letter Title */}
      <p className="text-[11px] font-bold text-gray-900 mb-2 uppercase">Cover Letter</p>
      <div className="border-b-2 border-gray-800 mb-2"></div>

      {/* Salutation */}
      <p className="mb-4 text-left">Dear <strong>{formData.recipientName || "Recruiter"}</strong>,</p>

      {/* Intro Paragraph */}
      {formData.company?.introduction && (
        <p className="mb-4 whitespace-pre-line text-left">{formData.company.introduction}</p>
      )}

      {/* Body Paragraphs */}
      {Array.isArray(formData.body) && formData.body.length > 0 ? (
        formData.body.map((para, index) => {
          const text = typeof para === "string" ? para : para.paragraph || "...";
          return (
            <p key={index} className="mb-4 text-left">
              {(index >= 1 && index <= 3) ? boldFirstWord(text) : text}
            </p>
          );
        })
      ) : (
        <p className="mb-4 text-left">[Your body paragraphs here]</p>
      )}

      {/* Closing */}
      {formData.closing && (
        <p className="mb-4 whitespace-pre-line text-left">{formData.closing}</p>
      )}

      {/* Signature */}
      <div className="mt-10 text-left">
        <p>Sincerely,</p>
        <p className="font-semibold mt-2">{formData.senderName}</p>
      </div>
    </div>
  );
};

export default TemplateI;