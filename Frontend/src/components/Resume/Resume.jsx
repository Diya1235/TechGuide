import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";
import "../Resume/Resume.css";
import res from "../images/Res.png";
import res2 from "../images/Res2.png"; 
import { Button } from "../ui/button";
import gif from "../images/What.gif";
import gif1 from "../images/Res.gif"; 
import Resumesec from "../Resume/Resumesec.jsx";
import email from "../images/Email.gif";
import girl from "../images/girl.png";
import v1 from "../images/choose.mp4";
import v2 from "../images/write.mp4";
import { ArrowRightCircleIcon } from "lucide-react";
import ResumeTemplates from "../Resume/ResumeTemplates.jsx";
import { Link, useNavigate } from "react-router-dom";

const Resume = () => {
  const navigate = useNavigate();

  const handlescore = () => {
    navigate('/scorechecker');
    console.log("Hell")
  };

  return (
    <>
      <Navbar />
      <div className="lg:w-full w-full">
        <div className="flex flex-col items-center lg:items-start mt-20 mb-5 lg:ml-20 w-11/12 lg:w-3/5">
          <h1 className="text-4xl font-bold text-gray-900 text-center lg:text-left mb-5">
            Our{" "}
            <span className="text-blue-700 animate-fadeIn">RESUME BUILDER</span>{" "}
            will help <br />
            you to the interview round.
          </h1>
          <div className="mt-5 flex flex-col lg:flex-row items-center gap-4">
            <Link to="/user/resumes">
              <Button className="px-8 py-7 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-400 text-xl">
                Build Your Resume
              </Button>
            </Link>
            <Button
              className="px-8 py-7 bg-transparent text-blue-700 font-semibold rounded-lg border border-blue-700 hover:bg-blue-700 hover:text-white text-xl"
              onClick={handlescore}
            >
              Get your score
            </Button>
          </div>
        </div>

        {/* Flipping Card Section */}
        <div className="lg:ml-20 mt-2 flex justify-center lg:justify-start items-center">
          <h1 className="text-xl font-medium text-blue-950 text-center lg:text-left">
            Looking for{" "}
            <span className="text-2xl text-gray-850 font-bold animate-fadeIn">
              ATS friendly
            </span>{" "}
            resumes?
          </h1>
        </div>

        <div className="flex flex-cols lg:-mt-72 flipping-image-container lg:mr-60 bg-white mt-5 w-11/12 lg:w-2/5">
          <div className="flipping-card">
            <div className="flipping-card-inner">
              <div className="flipping-card-front">
                <img src={res} alt="Resume Front" />
              </div>
              <div className="flipping-card-back">
                <img src={res2} alt="Resume Back" />
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Section */}
        <div className="w-full py-20 bg-gradient-to-r from-blue-200 to-blue-500 text-white text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center gap-4">
              <h2 className="text-5xl font-bold text-blue-800">What is a Resume?</h2>
              <img src={gif} alt="GIF" className="w-20 lg:w-24 h-auto animate-bounce" />
            </div>
            <p className="typing-effect font-medium text-yellow-800 text-2xl mt-2">
              A resume is a formal document summarizing your professional background.
            </p>
            <img src={gif1} alt="Resume GIF" />
            <p className="text-xl font-medium text-gray-950 mt-2">
              Get short-listed using our <span className="text-3xl font-bold">Resume Builder</span>
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 my-10 px-5 lg:px-20">
          {[
            { video: v1, title: "1. Choose a Template", desc: "Pick from ATS-friendly templates." },
            { video: v2, title: "2. Add Your Details", desc: "Enter your info & personalize it." },
            { image: email, title: "3. Download & Share", desc: "Save as PDF and apply." }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-8 rounded-lg shadow-lg flex flex-col items-center">
                {step.video ? (
                  <video src={step.video} className="w-32 h-32" autoPlay muted loop />
                ) : (
                  <img src={step.image} alt="Step" className="w-32 h-32" />
                )}
                <h3 className="text-2xl font-bold mt-4">{step.title}</h3>
                <p className="text-gray-700 mt-2">{step.desc}</p>
              </div>
              {index < 2 && <ArrowRightCircleIcon className="text-blue-700 animate-pulse w-10 h-10 mt-4 lg:hidden rotate-90" />}
            </div>
          ))}
        </div>

        <Resumesec />
        <ResumeTemplates />

        {/* CTA Section */}
        <div className="bg-blue-100 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-blue-500 rounded-xl py-10 px-6 lg:px-16">
              <div className="bg-black text-white rounded-xl p-8 flex flex-col lg:flex-row items-center gap-6">
                <img src={girl} className="w-20 rounded-lg" alt="User" />
                <h2 className="text-2xl lg:text-3xl font-bold text-center lg:text-left">
                  Your resume serves as a snapshot of your journey.
                </h2>
                <Button className="mt-6 px-6 py-3 bg-teal-500 text-white text-lg font-medium rounded-lg hover:bg-teal-600">
                  Build Your Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Resume;
