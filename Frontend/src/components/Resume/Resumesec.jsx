import React, { useEffect, useRef, useState } from "react";
import "./Resume.css";
import { CodeIcon, CodeSquareIcon, Contact2Icon, IceCream2Icon, KeyIcon, PenIcon, SaveAllIcon, TagsIcon, WorkflowIcon } from "lucide-react";

const Resumesec = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <div
      ref={ref}
      className="p-6 text-center bg-gradient-to-r from-gray-800 to-teal-500 text-white "
    >
      <h3 className="text-2xl mb-4 font-serif">
        ATS( Applicant Tracking System ) friendly design
      </h3>
      <p className="mb-6 text-lg">
       Limited Templates to avoid confusion and increase clarification
      </p>
      <div className="flex flex-wrap gap-4 justify-center items-start">
        <div
          className={`flex items-center p-4 rounded-lg shadow-lg bg-gray-800 text-gray-100 box-animation delay-200 ${
            inView ? "slide-in" : "slide-out"
          }`}
        >
          <div className="p-2 rounded-full mr-4 ">
            <TagsIcon/>
          </div>
          <span className="font-medium text-xl ">Clear and consice </span>
        </div>

        <div
          className={`flex items-center p-4 rounded-lg shadow-lg bg-gray-800 text-gray-100 box-animation delay-400 ${
            inView ? "slide-in" : "slide-out"
          }`}
        >
          <div className="p-2 rounded-full mr-4">
           <CodeIcon/>
          </div>
          <span className="font-medium text-xl">Easy to create</span>
        </div>

        <div
          className={`flex items-center p-4 rounded-lg shadow-lg bg-gray-800 text-gray-100 box-animation delay-600 ${
            inView ? "slide-in" : "slide-out"
          }`}
        >
          <div className="p-2 rounded-full mr-4">
            <SaveAllIcon/>
          </div>
          <span className="font-bold">Save and Export</span>
        </div>
      </div>
      <button className="bg-teal-500 hover:bg-gray-800 text-white py-2 px-4 mt-6 rounded">
        Pick a template
      </button>
    </div>
    
    
  );
};

export default Resumesec;