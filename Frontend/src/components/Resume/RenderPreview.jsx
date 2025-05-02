import React from 'react';
import PreviewA from '../PreviewTemplates/PreviewA';
import PreviewB from '../PreviewTemplates/PreviewB';
import PreviewC from '../PreviewTemplates/PreviewC';
import PreviewD from '../PreviewTemplates/PreviewD';
import PreviewE from '../PreviewTemplates/PreviewE';
import PreviewF from '../PreviewTemplates/PreviewF';
import PreviewG from '../PreviewTemplates/PreviewG';
import PreviewH from '../PreviewTemplates/PreviewH';
import PreviewI from '../PreviewTemplates/PreviewI';
import PreviewJ from '../PreviewTemplates/PreviewJ';
import PreviewK from '../PreviewTemplates/Previewk';
import Previewl from '../PreviewTemplates/Previewl';
import Previewm from '../PreviewTemplates/Previewm';
import Previewn from '../PreviewTemplates/Previewn';
import Previewo from '../PreviewTemplates/Previewo';
import Previewp from '../PreviewTemplates/Previewp';
import Previewq from '../PreviewTemplates/Previewq';
import Previewr from '../PreviewTemplates/Previewr';
import Previews from '../PreviewTemplates/Previews';
import Previewt from '../PreviewTemplates/Previewt';

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
  else if (templateId === '67d95d0e1e49c2a9af8f8987') {
    return (
      <PreviewB formData={formData}/>
    )
  }
  else if (templateId === '67d9878b5aade36a8318edb6'){
    return(
      <PreviewC formData={formData}/>
    )
  }
  else if (templateId ==="67da0d908eb47ed93fdba593")
  {
    return(
      <PreviewD  formData={formData}/>
    )
  }
  else if(templateId === "67da15548eb47ed93fdba65e")
  {
    return(
      <PreviewE formData={formData}/>
    )
  }
  else if(templateId === "67da1e748eb47ed93fdba7cb")
    {
      return(
        <PreviewF formData={formData}/>
      )
    }
    else if(templateId === "67dabc3a1aff180c69b7d0de")
      {
        return(
          <PreviewG formData={formData}/>
        )
      }
      else if(templateId === "67dabcd11aff180c69b7d0e6")
      {
        return(
          <PreviewH formData={formData}/>
        )

      }
  else if(templateId === "67dabd3a1aff180c69b7d0ea")
  {
    return(
      <PreviewI formData={formData}/>
    )
  }
  else if(templateId === "67dac3121aff180c69b7d15a")
  {
    return(
      <PreviewJ formData={formData}/>
    )
  }
  else if(templateId === "68011030fad089b7b9c3b028")
  {
    return(
      <PreviewK formData={formData}/>
    )
  }
  else if(templateId === "6801105efad089b7b9c3b02c")
  {
    return(
      <Previewl formData={formData}/>
    )
  }
  else if(templateId === "6801108efad089b7b9c3b030")
  {
    return(
      <Previewm formData={formData}/>
    )
  }
  else if(templateId === "680110e3fad089b7b9c3b03a")
  {
    return(
      <Previewn formData={formData}/>
    )
  }
  else if(templateId === "68011444fad089b7b9c3b040")
  {
    return(
      <Previewo formData={formData}/>
    )
  }
  else if(templateId === "680114bbfad089b7b9c3b044")
  {
    return(
      <Previewp formData={formData}/>
    )
  }
  else if(templateId === "680114f4fad089b7b9c3b048")
  {
    return(
      <Previewq formData={formData}/>
    )
  }
  else if(templateId === "6801150dfad089b7b9c3b04c")
  {
    return(
      <Previewr formData={formData}/>
    )
  }
else if(templateId === "68011525fad089b7b9c3b050")
{
  return(
    <Previews formData={formData}/>
  )
}
else if(templateId ==="68011546fad089b7b9c3b054")
{
  return(
    <Previewt formData={formData}/>
  )
}
  else {
    return <p className="text-center text-gray-700">No preview available for this template.</p>;
  }
};

export default RenderPreview;
