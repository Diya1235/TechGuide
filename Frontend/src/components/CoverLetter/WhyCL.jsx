import React from "react";
import { Briefcase, MessageSquare, ThumbsUp, Star } from "lucide-react";
import { motion } from "framer-motion";

const WhyCL = () => {
  const reasons = [
    {
      icon: <Briefcase size={40} className="text-white" />,
      title: "Enhances Job Applications",
      description:
        "A well-written cover letter highlights your skills and experience, making you stand out to employers.",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      icon: <MessageSquare size={40} className="text-white" />,
      title: "Personalizes Your Application",
      description:
        "It allows you to express your enthusiasm and explain why you're a great fit for the role.",
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      icon: <ThumbsUp size={40} className="text-white" />,
      title: "Builds a Strong First Impression",
      description:
        "A compelling cover letter can capture a recruiter's attention and increase your chances of getting an interview.",
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
    {
      icon: <Star size={40} className="text-white" />,
      title: "Showcases Your Unique Value",
      description:
        "It gives you a chance to explain your achievements and how you can contribute to the company’s success.",
      bgColor: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        ✨ Why Create a Cover Letter?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className={`relative p-6 rounded-xl shadow-lg border border-gray-200 flex items-start gap-4 overflow-hidden text-white ${reason.bgColor}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {/* Floating Glow Effect */}
            <div className="absolute inset-0 bg-white/10 opacity-10 hover:opacity-20 transition-all duration-500"></div>

            {/* Icon Section */}
            <div className="flex-shrink-0">{reason.icon}</div>

            {/* Text Section */}
            <div>
              <h3 className="text-xl font-semibold">{reason.title}</h3>
              <p className="mt-2">{reason.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhyCL;
