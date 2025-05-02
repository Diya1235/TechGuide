import React from "react";

const PreviewC = ({ formData }) => {
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

  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-[700px] mx-auto p-10 bg-white border shadow-md text-[#222] font-[Arial] text-[14px] leading-[1.7]">
      {/* Header Title */}
      <div className="text-center mb-8">
        {/* Add any header content */}
      </div>

      {/* Title */}
      {/* Add your title if needed */}

      {/* Sender Placeholder Info */}
      <div className="text-sm mb-4">
        <p><strong>{formData.senderName}</strong></p>
        <p><strong>{formData.senderContact?.address}</strong></p>
        <p><strong>{formData.senderContact?.email}</strong></p>
        <p><strong>{formData.senderContact?.phone}</strong></p>
      </div>

      {/* Date and Recipient */}
      <div className="mb-4">
        <p className="mt-6"><strong>{formData.date}</strong></p>
        <p><strong>{formData.recipientName}</strong></p>
        <p><strong>{formData.recipientTitle}</strong></p>
        <p><strong>{formData.company?.name}</strong></p>
        <p><strong>{formData.company?.address}</strong></p>
      </div>

      {/* Salutation */}
      <p className="mb-4">Dear <strong>{formData.recipientName || "Hiring Manager"}</strong>,</p>

      {/* Intro */}
      {formData.company?.introduction && (
        <p className="mb-4 whitespace-pre-line"><strong>{formData.company.introduction}</strong></p>
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
        <p className="mb-4 whitespace-pre-line"><strong>{formData.closing}</strong></p>
      )}

      {/* Signature */}
      <p className="mt-8">Sincerely,</p>
      <p className="mt-2"><strong>{formData.senderName}</strong></p>
    </div>
  );
};

export default PreviewC;
