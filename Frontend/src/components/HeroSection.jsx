import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import vid from '../components/images/herr.mp4';
import Hero1 from './Hero1.jsx';
import Hero2 from './Hero2.jsx';

const HeroSection = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100); // Delay the animation to let the component mount

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='relative bg-gray-50'>
      {/* Sparkle Effect */}

      {/* Decorative Elements */}
      <div className='absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-300 rounded-full opacity-40 transform -translate-x-1/2 -translate-y-1/2 sm:w-48 sm:h-48'></div>
      <div className='absolute top-1/2 right-1/4 w-40 h-40 bg-pink-400 rounded-full opacity-40 transform translate-x-1/2 -translate-y-1/2 sm:w-64 sm:h-64'></div>
      <div className='absolute bottom-1/2 left-1/2 w-40 h-40 bg-blue-300 rounded-full opacity-40 transform -translate-x-1/2 translate-y-1/2 sm:w-64 sm:h-64'></div>

      <div className='absolute top-1 left-1 w-32 h-32 bg-green-300 rounded-[30%] opacity-30 sm:w-40 sm:h-40 md:w-48 md:h-48'></div>
      <div className='absolute top-2/3 right-1 w-32 h-32 bg-blue-500 rounded-[30%] opacity-20 sm:w-40 sm:h-40 md:w-48 md:h-48'></div>
      <div className='absolute top-1/4 right-1/4 w-40 h-40 bg-red-300 rounded-full opacity-20 sm:w-56 sm:h-56 md:w-64 md:h-64'></div>

      <div className='relative z-10 text-center px-4'>
        <div className='flex flex-col gap-5 my-10'>
          <span className='mx-auto px-4 py-2 rounded-full bg-blue-500 text-slate-100 font-bold text-sm sm:text-base'>
            Your I.T career, our Solutions: Achieve Excellence together
          </span>

          <h1 className='text-3xl font-bold mt-10 sm:text-4xl md:text-5xl'>
            <span className={`text-blue-500 animate-sparkle`}>Browse</span>, Create & <br />Get your problems <span className="text-blue-500">solved</span>
          </h1>
          <p className='text-base sm:text-lg md:text-xl'>
            Meet your Guide who will help you at each step of your IT career.
          </p>
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg">




            {/* Text Content */}
            <div className="text-center mt-4">
              <video src={vid} loop autoPlay muted className="w-full h-auto" />
            </div>
          </div>

          <div className='flex flex-col-reverse sm:flex-row items-center gap-6 mt-10 py-5'>
            <img
              src="https://img.freepik.com/free-vector/man-setting-rocket-woman-pushing-button-spaceship_74855-4434.jpg?ga=GA1.1.1042404616.1705058647"
              alt="Rocket Launch Illustration"
              className='w-full sm:w-1/2'
            />
            <div className='flex flex-col justify-left text-left w-full sm:w-1/2'>
              <h2 className='text-xl font-bold sm:text-2xl md:text-3xl'>
                "Finding the Right Project Feels Like <br /> <span className='text-blue-500'>Rocket Science?</span> <br />Let Us Help You Navigate the Stars."
              </h2>
              <Link to="/findprojects">
                <Button className="bg-blue-500 text-slate-100 rounded-md w-full sm:w-1/2 mt-5 hover:bg-blue-800">
                  Find Now
                </Button>
              </Link>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 py-5'>
            <div className='flex flex-col justify-start text-left w-full sm:w-1/2 mt-5 sm:mt-0'>
              <h2 className='text-xl font-bold sm:text-2xl md:text-3xl'>
                Having difficulty in building your<br />
                <span className='text-blue-500'>RESUME</span>? <br />
                Build Job-winning resumes with us..
              </h2>
              <Button className="bg-blue-500 text-slate-100 rounded-md w-full sm:w-44 mt-5 hover:bg-blue-800">
                <Link to="/resume">
                  Build Now
                </Link>

              </Button>
            </div>
            <div className='flex justify-center sm:justify-end w-full sm:w-1/2'>
              <img
                src="https://img.freepik.com/premium-vector/concept-two-guys-are-choosing-candidate_701961-1770.jpg?ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
                alt="Hiring Icon"
                className="w-full max-w-xs md:max-w-sm lg:max-w-xl"
              />
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-center gap-6 mt-10 py-5'>
            <img
              src="https://img.freepik.com/free-vector/writing-letter-concept-illustration_114360-4442.jpg?ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
              alt="Cover Letter Illustration"
              className='w-full sm:w-1/2 md:w-3/5 lg:w-1/2 h-auto'
            />
            <div className='flex flex-col justify-left text-left w-full sm:w-1/2'>
              <h2 className='text-xl font-bold sm:text-2xl md:text-3xl'>
                Done with Resume and Projects.
                <br />But what about <span className='text-blue-500'>COVER LETTER </span>?
                <br />
              </h2>
              <Button className="bg-blue-500 text-slate-100 rounded-md w-full sm:w-1/2 mt-5 hover:bg-blue-800">
                <Link to="/coverletter">
                  Create Now</Link>

              </Button>
            </div>
          </div>

          <div className='m-auto '>
             <h1 className='text-3xl font-bold'> WHAT WE PROVIDE?</h1>
            </div>
          <div className='flex flex-col lg:flex-row gap-5'>
            
            <div className='flex flex-col items-center lg:items-start lg:w-1/3 hover:translate-x-4'>
            <Link to="/news">
              <img
                src="https://img.freepik.com/premium-vector/online-news-article_773186-1069.jpg?ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
                className='w-full h-48 sm:h-56 md:h-64'
                alt="Tech News"
              />
              </Link>
              <p className='font-bold text-center lg:text-left mt-3'>
                Browse Tech related news and make an impression!!
              </p>
              
            </div>
            <div className='flex flex-col items-center lg:items-start lg:w-1/3 hover:translate-y-4'>
              <img
                src="https://img.freepik.com/premium-vector/young-guy-near-smartphone-with-chatbot-artificial-intelligence-machine-learning-concept-modern-technologies-innovations-cartoon-flat-vector-illustration_118813-17196.jpg?ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
                className='w-full h-48 sm:h-56 md:h-64'
                alt="Chatbot"
              />
              <p className='font-bold text-center lg:text-left mt-3'>
                Get personalized chatbot for resolving your queries..
              </p>
            </div>
            <div className='flex flex-col items-center lg:items-start lg:w-1/3 hover:translate-x-4'>
              <img
                src="https://img.freepik.com/premium-vector/professional-design-background-business-office-banner-illustration-vector-day-card-greetin_1013341-287257.jpg?ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
                className='w-full h-48 sm:h-56 md:h-64'
                alt="Job Role"
              />
              <p className='font-bold text-center lg:text-left mt-3'>
                Find which job role suits you!
              </p>
            </div>
          </div>
         <Hero2/>
         <Hero1/>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
