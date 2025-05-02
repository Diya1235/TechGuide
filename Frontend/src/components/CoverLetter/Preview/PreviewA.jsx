import React from "react";

const PreviewA = ({ formData }) => {
  if (!formData) return <p>No Data Available</p>;

  console.log("Preview Data:", formData); // Debugging

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border shadow-lg">
      {/* Sender Information */}
      <h2><strong>{formData.senderName || "Recipient Name"}</strong></h2>
      <p className="text-lg text-gray-700">{formData.senderTitle || "title"}</p>

      <div className="mt-4">
        <p><strong>Phone:</strong> {formData.senderContact?.phone || "Your Phone"}</p>
        <p><strong>Email:</strong> 
          <a href={`mailto:${formData.senderContact?.email}`} className="text-blue-600">
            {formData.senderContact?.email || "your email"}
          </a>
        </p>
        <p>{formData.senderContact?.address || "Your Address"}</p>
      </div>

      <p className="mt-6">{formData.date}</p>

      {/* Recipient Information */}
      <div className="mt-6">
        <p><strong>{formData.recipientName || "Recipient Name"}</strong></p>
        <p><em>{formData.recipientTitle || "Recipient Title"}</em></p>
        <p>{formData.company?.name || "Company Name"}</p>
        <p>{formData.company?.address || "Company Address"}</p>
      </div>

      <p className="mt-6">Dear {formData.recipientName || "Recipient Name"},</p>

      {/* Introduction */}
      <p className="mt-4">{formData.company?.introduction || "Your introduction here..."}</p>

      {/* Body Content - Mapping paragraphs */}
      {Array.isArray(formData.body) && formData.body.length > 0 ? (
        formData.body.map((paraObj, index) => (
          <p key={index} className="mt-4">
            {typeof paraObj === "string" ? paraObj : paraObj.paragraph || "..."}
          </p>
        ))
      ) : (
        <p className="mt-4">Your body content here...</p>
      )}

      {/* Closing */}
      <p className="mt-4">{formData.closing || "Your closing statement..."}</p>

      <p className="mt-6">Sincerely,</p>
      <p>{formData.senderName || "Your Name"}</p>
    </div>
  );
};

export default PreviewA;
