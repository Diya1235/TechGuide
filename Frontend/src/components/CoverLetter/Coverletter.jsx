import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../Footer';
import TemplateSlide from './TemplateSlide';
import WhyCL from './WhyCL';
import { motion } from "framer-motion";
import CLbg from './CLbg';
import { useNavigate } from 'react-router-dom';

const CoverLetterSection = () => {
  const steps = [
    {
      step: "1️⃣",
      title: "Pick a template",
      description: "Choose from 18 professional templates designed by career experts to make your cover letter stand out.",
      image: "https://www.livecareer.com/lcapp/uploads/2023/08/step-1.png",
    },
    {
      step: "2️⃣",
      title: "Provide your details",
      description: "Answer a few questions or upload an existing resume, and we’ll create a personalized cover letter for you.",
      image: "https://www.livecareer.com/lcapp/uploads/2023/08/step-2.png",
    },
    {
      step: "3️⃣",
      title: "Click download",
      description: "Download your polished cover letter in the preferred file format and apply for your dream job immediately.",
      image: "https://www.livecareer.com/lcapp/uploads/2023/08/step-3.png",
    },
  ];
  const navigate=useNavigate();
  const handleClick = ()=>{
    navigate("/user/CoverletterTemplates");

  }
  return (
    <>
      <Navbar />

      <section className="bg-gray-900 text-white py-16 px-8 mt-7 mb-5 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left ml-7">
          <h2 className="text-5xl font-bold mb-4 ">Write a <span className='text-teal-400'>Cover Letter</span> That Gets You Hired</h2>
          <p className="mb-6">Use our professional cover letter templates to create a message that wows employers!</p>
          <ul className="list-disc list-inside mb-6">
            <li>Choose a one-click design template</li>
            <li>Easily customize your cover letter</li>
            <li>Land the interview and get hired faster!</li>
          </ul>
          <button className="bg-blue-400 text-black px-6 py-3 font-bold rounded shadow-lg hover:bg-blue-500" onClick={handleClick}>
            CREATE YOUR COVER LETTER
          </button>
        </div>
        <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <img src="https://www.cover-letter-now.com/sapp/uploads/2022/09/home-banner.png" alt="Cover Letter Preview" className="w-full max-w-md shadow-lg rounded" />
        </div>
      </section>
      <div>
        <div>
          <WhyCL />
        </div>
        <section className="bg-white text-gray-900 py-16 px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">🚀 Four Simple Steps to Create a Great Cover Letter:</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center p-6 bg-gray-100 border border-gray-300 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Step Icon */}
                <div className="text-2xl">{step.step}</div>

                {/* Image */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-24 h-24 mb-4 mt-3 transform transition-transform duration-300 hover:scale-110"
                />

                {/* Title */}
                <h3 className="text-lg font-semibold mt-2 mb-2 text-gray-800">{step.title}</h3>

                {/* Description */}
                <p className="text-sm text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            className="mt-8 bg-yellow-400 text-black px-6 py-3 font-bold rounded shadow-lg hover:bg-yellow-500"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            onClick={handleClick}
          >
            Create Your Cover Letter
          </motion.button>
        </section>
      </div>
      <div>
        <TemplateSlide />
      </div>
      <div>
        <CLbg/>
      </div>
      <Footer />
    </>
  );
};

export default CoverLetterSection;
