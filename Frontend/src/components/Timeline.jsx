import React from "react";

const Timeline = () => {
  return (
    <div className="bg-blue-600 text-white py-12 px-6 rounded-xl shadow-lg max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center mb-6">Our Journey</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center">
          <p className="text-lg font-semibold">2023</p>
          <p className="text-sm">Planned</p>
        </div>
        <div className="w-16 h-1 bg-white"></div>
        <div className="text-center">
          <p className="text-lg font-semibold">2024</p>
          <p className="text-sm">Founded</p>
        </div>
        <div className="w-16 h-1 bg-white"></div>
        <div className="text-center">
          <p className="text-lg font-semibold">2025</p>
          <p className="text-sm">Released</p>
        </div>
        
       
      </div>
    </div>
  );
};

export default Timeline;
