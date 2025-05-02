import React from "react";

const PreviewB = ({ formData }) => {
  if (!formData) return <p>No Data Available</p>;

  // Helper to bold first word of paragraph
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
    <div className="max-w-2xl mx-auto p-12 bg-white border shadow-lg font-[Georgia] text-[15px] leading-relaxed text-black">
      {/* Sender Info */}
      <h2 className="text-[20px] font-bold mb-1">{formData.senderName}</h2>
      <p className="mb-1"><strong>Phone:</strong> {formData.senderContact?.phone}</p>
      <p className="mb-1">
        <strong>Email:</strong>{" "}
        <a href={`mailto:${formData.senderContact?.email}`} className="text-blue-600 underline">
          {formData.senderContact?.email}
        </a>
      </p>
      <p className="mb-6 whitespace-pre-line">{formData.senderContact?.address}</p>

      {/* Recipient Info */}
      <div className="mb-6 whitespace-pre-line">
        <p>{formData.recipientName}</p>
        <p className="italic">{formData.recipientTitle}</p>
        <p>{formData.company?.name}</p>
        <p>{formData.company?.address}</p>
      </div>

      {/* Date */}
      <p className="mb-6">{formData.date}</p>

      {/* Salutation */}
      <p className="mb-4">Dear {formData.recipientName},</p>

      {/* Introduction */}
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
        <p className="mb-4">Your body content here...</p>
      )}

      {/* Closing */}
      {formData.closing && (
        <p className="mb-4 whitespace-pre-line">{formData.closing}</p>
      )}

      {/* Signature */}
      <p className="mt-8">Sincerely,</p>
      <p className="mt-2">{formData.senderName}</p>
    </div>
  );
};

export default PreviewB;
