import React from "react";

const TemplateA = ({ formData }) => {
    if (!formData) return <p className="text-center text-gray-700">No data available.</p>;

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white border shadow-lg rounded-lg">
            {/* Sender Information */}
            <h2 className="text-2xl font-bold">{formData.senderName}</h2>
            <p className="text-lg text-gray-700">{formData.senderTitle}</p>

            <div className="mt-4">
                {formData.senderContact?.phone && <p><strong>Phone:</strong> {formData.senderContact.phone}</p>}
                {formData.senderContact?.email && (
                    <p>
                        <strong>Email:</strong> 
                        <a href={`mailto:${formData.senderContact.email}`} className="text-blue-600"> {formData.senderContact.email}</a>
                    </p>
                )}
                {formData.senderContact?.address && <p>{formData.senderContact.address}</p>}
            </div>

            {/* Date */}
            <p className="mt-6">{new Date().toLocaleDateString()}</p>

            {/* Recipient Details */}
            <div className="mt-6">
                <p><strong>{formData.recipientName}</strong></p>
                <p><em>{formData.recipientTitle}</em></p>
                <p>{formData.company?.name}</p>
                <p>{formData.company?.address}</p>
            </div>

            {/* Letter Content */}
            <p className="mt-6">{formData.salutation}</p>
            <p className="mt-4">{formData.introduction}</p>

            {/* Body Paragraphs */}
            {Array.isArray(formData.body) && formData.body.length > 0 && (
                formData.body.map((paraObj, index) => (
                    <p key={paraObj._id || index} className="mt-4">{paraObj.paragraph}</p>
                ))
            )}

            <p className="mt-4">{formData.closing}</p>

            {/* Signature */}
            <p className="mt-6">{formData.signOff}</p>
            <p>{formData.senderName}</p>
        </div>
    );
};

export default TemplateA;
