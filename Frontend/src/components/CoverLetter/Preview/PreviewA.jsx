import React, { useState, useEffect } from "react";

const PreviewA = ({ formData }) => {
  const [previewData, setPreviewData] = useState(formData);

  useEffect(() => {
    setPreviewData(formData);
  }, [formData]);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border shadow-lg">
      <h2 className="text-2xl font-bold">{previewData.senderName || "Your Name"}</h2>
      <p className="text-lg text-gray-700">{previewData.senderTitle || "Career Coach/Resume Writer"}</p>

      <div className="mt-4">
        <p><strong>Phone:</strong> {previewData.senderContact?.phone || "Your Phone"}</p>
        <p><strong>Email:</strong> 
          <a href={`mailto:${previewData.senderContact?.email}`} className="text-blue-600">
            {previewData.senderContact?.email || "your.email@example.com"}
          </a>
        </p>
        <p>{previewData.senderContact?.address || "Your Address"}</p>
      </div>

      <p className="mt-6">{new Date().toLocaleDateString()}</p>

      <div className="mt-6">
        <p><strong>{previewData.recipientName || "Recipient Name"}</strong></p>
        <p><em>{previewData.recipientTitle || "Recipient Title"}</em></p>
        <p>{previewData.company?.name || "Company Name"}</p>
        <p>{previewData.company?.address || "Company Address"}</p>
      </div>

      <p className="mt-6">Dear {previewData.recipientName || "Recipient Name"},</p>

      <p className="mt-4">{previewData.introduction || "Your introduction here..."}</p>

      {/* Body Content - Mapping paragraphs */}
      {Array.isArray(previewData.body) && previewData.body.length > 0 ? (
        previewData.body.map((paraObj, index) => (
          <p key={paraObj._id || index} className="mt-4">{paraObj.paragraph || "..."}</p>
        ))
      ) : (
        <p className="mt-4">Your body content here...</p>
      )}

      <p className="mt-4">{previewData.closing || "Your closing statement..."}</p>

      <p className="mt-6">Sincerely,</p>
      <p>{previewData.senderName || "Your Name"}</p>
    </div>
  );
};

export default PreviewA;
