import { Card, CardContent } from '@mui/material';
import { Badge, SearchIcon } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import P1 from './images/P1.gif';
import P2 from './images/P2.gif';
import { Link } from 'react-router-dom';
const Hero1 = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-6 p-6">
    <h1 className="text-3xl font-bold">The <span className="text-blue-500">Project</span> Finder</h1><SearchIcon/>
    <p className="max-w-xl text-gray-600">
      Discover our extensive feature , The Project Finder, which gives you
      the best information on finding  projects which one can build and 
       showcase in your resumes.
    </p>
    <Button variant="link" className="text-blue-600 border-dotted border-2 border-gray-500">
      <Link to="/findprojects">Find</Link> 
    </Button>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {/* Resume Guide Card */}
      <Card className="relative overflow-hidden p-6">
        <Badge className="absolute top-4 left-4 bg-orange-500">Field Tested</Badge>
        <CardContent className="flex flex-col items-center">
          <img src={P1} alt="Resume Guide" className="w-44 h-44 mb-4" />
          <h2 className="text-lg font-semibold text-center">
            Explore Projects,resources and tech stack used to build them.
          </h2>
        </CardContent>
      </Card>
      {/* Cover Letter Guide Card */}
      <Card className="relative overflow-hidden p-6">
        <Badge className="absolute top-4 left-4 bg-blue-500">HR Approved</Badge>
        <CardContent className="flex flex-col items-center">
          <img src={P2} alt="Cover Letter Guide" className="w-44 h-44 mb-4" />
          <h2 className="text-lg font-semibold text-center">
            Search from pool of projects
          </h2>
        </CardContent>
      </Card>
    </div>
  </div>
);
}
export default Hero1;


