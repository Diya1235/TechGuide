import React from "react";
import { Mail, Phone, Linkedin } from "lucide-react";

const TemplateE = ({ formData }) => {
  if (!formData) return <p>No Data Available</p>;

  const getInitials = (name) => {
    if (!name) return "N/A";
    const words = name.trim().split(" ");
    return words.map(w => w[0]).join("").slice(0, 2).toUpperCase();
  };

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
    <div className="max-w-[750px] mx-auto bg-white shadow-md border p-10 font-[Arial] text-[#222] text-[14px] leading-[1.8]">

      {/* Top Section with Initials and Name */}
      {/* Top Section with Name and Initials on Right */}
<div className="flex justify-between items-center mb-6">
  <div>
    <h1 className="text-xl font-bold text-[#111]">{formData.senderName}</h1>
    <p className="text-sky-600 font-semibold text-[15px]">{formData.senderTitle}</p>
  </div>
  <div className="w-[70px] h-[70px] rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-sky-700">
    {getInitials(formData.senderName)}
  </div>
</div>

      {/* Contact Info */}
      <div className="flex flex-wrap items-center text-blue-700 text-sm mb-6 gap-4">
        {formData.senderContact?.phone && (
          <div className="flex items-center gap-1">
            <Phone size={14} />
            <span>{formData.senderContact.phone}</span>
          </div>
        )}
        {formData.senderContact?.email && (
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <span>{formData.senderContact.email}</span>
          </div>
        )}
        {formData.senderContact?.address && (
          <div className="flex items-center gap-1">
            <Linkedin size={14} />
            <span>{formData.senderContact?.address}</span>
          </div>
        )}
      </div>

      {/* Address */}
     
      {/* "COVER LETTER" title */}
      <p className="text-[13px] text-gray-700 mb-2 tracking-wide">COVER LETTER</p>
      <div className="border-t border-sky-600 border-t-[1px] mb-6"></div>

      {/* Recipient Info */}
      <div className="mb-6 text-sm">
        <p>{formData.recipientTitle}</p>
        <p>{formData.company?.name}</p>
        <p>{formData.company?.address}</p>
        <p className="mt-2">{formData.date}</p>
      </div>

      {/* Blue line before Salutation */}
      <div className="pt-4 border-t border-sky-600 border-t-[1px] mb-4"></div>

      {/* Salutation */}
      <p className="mb-4">Dear <strong>{formData.recipientName || "Hiring Manager"}</strong>,</p>

      {/* Introduction */}
      {formData.company?.introduction && (
        <p className="mb-4 whitespace-pre-line">{formData.company.introduction}</p>
      )}

      {/* Body */}
      {Array.isArray(formData.body) && formData.body.length > 0 ? (
        formData.body.map((para, index) => {
          const text = typeof para === "string" ? para : para.paragraph || "...";
          return (
            <p key={index} className="mb-4">
              {(index === 1 || index === 2 || index === 3)
                ? boldFirstWord(text)
                : text}
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
      <div className="mt-8">
        <p>Sincerely,</p>
        <p className="mt-2 font-semibold">{formData.senderName}</p>
      </div>
    </div>
  );
};

export default TemplateE;
