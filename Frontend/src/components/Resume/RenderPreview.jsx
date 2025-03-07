import React from 'react';
import PreviewA from '../PreviewTemplates/PreviewA';

const RenderPreview = ({ formData, templateId }) => {
  const formatDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
      });
    }
    return '';
  };

  if (templateId === '678ce2a2288255c4511dfc2c') {
    return (
      <PreviewA formData={formData} />
    );
  }
  else if (templateId === '') {

  }

  else {
    return <p className="text-center text-gray-700">No preview available for this template.</p>;
  }
};

export default RenderPreview;
