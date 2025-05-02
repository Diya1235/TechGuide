import React from 'react';
import PreviewA from './Preview/PreviewA';
import PreviewB from './Preview/PreviewB';
import PreviewC from './Preview/PreviewC';
import PreviewD from './Preview/PreviewD';
import PreviewE from './Preview/PreviewE';
import PreviewF from './Preview/PreviewF';
import PreviewG from './Preview/PreviewG';
import PreviewH from './Preview/PreviewH';
import PreviewI from './Preview/PreviewI';
import PreviewJ from './Preview/PreviewJ';


const RenderCoverletterPreview = ({ formData, templateId }) => {
  const formatDate = (date) => {
    if (date) {
      return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
      });
    }
    return '';
  };

  if (templateId === '67c395edf7c10af554a40ef0') {
    return (
      <PreviewA formData={formData} />
    );
  }
  else if(templateId === '67c39617f7c10af554a40ef4')
  {
    return(
      <PreviewB formData={formData}/>
    )
  }
  else if(templateId === '68020648dc4d36d52a06d011')
  {
    return(
      <PreviewC formData={formData}/>
    )
  }
  else if(templateId === '6802066bdc4d36d52a06d017')
  {
    return(
      <PreviewD formData={formData}/>
    )
  }
  else if(templateId === '6802069cdc4d36d52a06d01d')
    {
      return(
        <PreviewE formData={formData}/>
      )
    }
    else if(templateId === '680206badc4d36d52a06d023')
      {
        return(
          <PreviewF formData={formData}/>
        )
      }
      else if(templateId === '680206cddc4d36d52a06d029')
        {
          return(
            <PreviewG formData={formData}/>
          )
        }
        else if(templateId === '680206e1dc4d36d52a06d02f')
          {
            return(
              <PreviewH formData={formData}/>
            )
          }
          else if(templateId === '68020703dc4d36d52a06d035')
            {
              return(
                <PreviewI formData={formData}/>
              )
            }
            else if(templateId === '68039c3c6ad039fe5b91c913')
              {
                return(
                  <PreviewJ formData={formData}/>
                )
              }
            
   
        

  else {
    return <p className="text-center text-gray-700">No preview available for this template.</p>;
  }
};

export default RenderCoverletterPreview;
