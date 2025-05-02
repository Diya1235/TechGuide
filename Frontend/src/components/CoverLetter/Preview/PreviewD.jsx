import React from "react";
import { Mail, Phone, Linkedin, MapIcon } from "lucide-react";

const PreviewD = ({ formData }) => {
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
    <div className="max-w-[750px] mx-auto bg-white shadow-md border p-10 font-[Arial] text-[#222] text-[14px] leading-[1.8]">
      
      {/* Sender Name and Position */}
      <div className="text-left">
        <h1 className="text-2xl font-bold text-[#111]">{formData.senderName}</h1>
        <p className="text-sky-600 font-semibold text-[15px] mb-6">{formData.senderTitle}</p>
      </div>

      {/* Contact Info Bar */}
      <div className="flex flex-wrap items-center bg-sky-400 text-white px-4 py-2 rounded-md text-sm mb-6 gap-4">
        {formData.senderContact?.email && (
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <span>{formData.senderContact.email}</span>
          </div>
        )}
        {formData.senderContact?.phone && (
          <div className="flex items-center gap-1">
            <Phone size={14} />
            <span>{formData.senderContact.phone}</span>
          </div>
        )}
        {formData.senderContact?.address && (
          <div className="flex items-center gap-1">
            <MapIcon size={14} />
            <span>{formData.senderContact?.address}</span>
          </div>
        )}
      </div>

      {/* Recipient Info */}
      <div className="mb-6 text-sm">
        <p><strong>{formData.recipientName}</strong></p>
        <p><strong>{formData.recipientTitle}</strong></p>
        <p><strong>{formData.company?.name}</strong></p>
        <p><strong>{formData.company?.address}</strong></p>
        <p className="mt-2">{formData.date}</p>
      </div>

      <div className="mt-10 pt-4 border-t border-t-[1px] border-sky-600"></div>



      {/* Salutation */}
      <p className="mb-4">Dear <strong>{formData.recipientName || "Hiring Manager"}</strong>,</p>

      {/* Intro */}
      {formData.company?.introduction && (
        <p className="mb-4 whitespace-pre-line">{formData.company.introduction}</p>
      )}

      {/* Body Paragraphs */}
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

      {/* Signature with top blue line */}
      <div className="mt-10 pt-4 border-t border-sky-600">
        <p className="mt-4">Sincerely,</p>
        <p className="mt-2 font-semibold">{formData.senderName}</p>
      </div>
    </div>
  );
};

export default PreviewD;
