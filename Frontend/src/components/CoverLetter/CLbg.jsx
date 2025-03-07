import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Denis P.",
    rating: 5,
    text: "I utilized TechGuide builder app to the fullest, applying everything I learned, and even added some unique touches the resume software offered. Now, instead of stressing over what keyword or language to use on my resume, I can focus on which job offer to accept.",
  },
  {
    name: "David Birdsell Jr.",
    rating: 4,
    text: "I went from fired to hired in less than 3 weeks. I was let go from my old job due to downsizing. With Zety, I was able to build custom resumes tailored to the jobs I was applying to quickly and easily. My last day was 3/9/18 and I had several offers by 3/25/18. Accepted an excellent job on 3/27/18. I can't thank you guys enough. You really helped save my family from some serious hardship.",
  },
  {
    name: "Jeanne",
    rating: 5,
    text: "TechGuide is what will make you stand out. In less than a month and a half, I got contacted by six employers and went in for three interviews. They’ve all commented on how my résumé caught their eye, and how 'visually pleasant' it is. The cover letter tool has been a tremendous help as well. It has made my life so much easier!",
  },
];

const CLbg = () => {
  return (
    <section className="bg-[#0B1444] text-white py-16 px-8 text-center mb-2">
      {/* Header */}
      <h2 className="text-4xl font-bold italic">"You're hired!"</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-4 text-lg">
        <p className="md:w-1/3">Imagine that after so much effort, you’re the one who got the interview invitation. How does that make you feel?</p>
        <span className="hidden md:block border-l-2 border-gray-500 h-12"></span>
        <p className="md:w-1/3">With TechGuide, it can all come true. Use the techGuide cover letter generator and seal the deal.</p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-[#162155] p-6 rounded-xl shadow-lg border border-gray-600 hover:shadow-2xl transition-all"
          >
            {/* User Info */}
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-gray-400 text-3xl" />
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            </div>

            {/* Star Rating */}
            <div className="flex mt-2 text-yellow-400">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-300 mt-4 text-sm">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CLbg;
