import React from 'react'
import { IconClipboard, IconShieldCheck, IconEdit, IconCode, IconTrendingUp, IconCurrencyRupee } from "@tabler/icons-react";
import { Card } from '@mui/material';
import { FileCheck } from 'lucide-react';
const Hero2 = () => {
    const features = [
        {
          icon: <IconClipboard size={32} className="text-yellow-500" />, 
          title: "A better resume in minutes", 
          description: "Replace your old resume in a few simple clicks. Our builder gives recruiters what they want."
        },
        {
          icon: <IconShieldCheck size={32} className="text-orange-500" />, 
          title: "ATS-friendly templates", 
          description: "Tick every box and make sure your resume is never filtered out by the hiring software."
        },
        {
          icon: <FileCheck size={32} className="text-red-500" />, 
          title: "ATS score checker", 
          description: "Stop worrying!.Test your resume score with ous."
        },
        {
          icon: <IconCode size={32} className="text-blue-500" />, 
          title: "Easy with AI", 
          description: "Quickly generate formal phrases and summaries. Sound professional, faster."
        },
        {
          icon: <IconTrendingUp size={32} className="text-indigo-500" />, 
          title: "Beat the competition", 
          description: "Our tested resume templates are designed to make you more attractive to recruiters."
        },
        {
          icon: <IconCurrencyRupee size={32} className="text-yellow-600" />, 
          title: "Get paid more", 
          description: "A higher salary begins with a strong resume. "
        }
      ];
    
      return (
        <div className="flex flex-col items-center text-center space-y-6 p-6">
          <h1 className="text-3xl font-bold mt-10">Get short-listed fast with a <span className='text-blue-500'>powerful</span> resume</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col items-center p-6 text-center hover hover-scale-xl">
                {feature.icon}
                <h2 className="text-lg font-semibold mt-4">{feature.title}</h2>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      );
}

export default Hero2;

