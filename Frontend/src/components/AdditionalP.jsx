import React from "react";
import P1 from "./P1.png";
import P2 from "./P2.png";
import P4 from "./P4.png";

const AdditionalP = () => {
  return (
    <>
      <div className="text-center text-4xl font-extrabold text-blue-900 my-8">Maximize Your Benefits</div>
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* First Section - Image Right, Text Left */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2 text-left space-y-4" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-800">Explore an Ocean of Projects</h2>
            <p className="text-gray-600 text-lg">
              Gain access to an extensive collection of high-quality projects designed to enhance your learning and professional growth.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
            <img src={P1} alt="Projects" className="rounded-xl shadow-2xl transition-transform duration-500 hover:scale-110 border-4 border-blue-400 floating-image" height="600px" width="600px" />
          </div>
        </div>

        {/* Second Section - Image Left, Text Right */}
        <div className="flex flex-col md:flex-row-reverse items-center md:space-x-8">
          <div className="md:w-1/2 text-left space-y-4" data-aos="fade-left">
            <h2 className="text-3xl font-bold text-gray-800">Seamless & Engaging Experience</h2>
            <p className="text-gray-600 text-lg">
              Interact with a smooth, intuitive interface that simplifies navigation and enhances usability.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center" data-aos="fade-right">
            <img src={P2} alt="User Experience" className="rounded-xl shadow-2xl transition-transform duration-500 hover:scale-110 border-4 border-blue-400 floating-image" height="600px" width="600px" />
          </div>
        </div>

        {/* Third Section - Image Right, Text Left */}
        <div className="flex flex-col md:flex-row items-center md:space-x-8">
          <div className="md:w-1/2 text-left space-y-4" data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-800">Save & Access Anytime</h2>
            <p className="text-gray-600 text-lg">
              Keep your projects safe for future use, with easy retrieval whenever needed.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center" data-aos="fade-left">
            <img src={P4} alt="Save Projects" className="rounded-xl shadow-2xl transition-transform duration-500 hover:scale-110 border-4 border-blue-400 floating-image" height="600px" width="600px"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalP;
