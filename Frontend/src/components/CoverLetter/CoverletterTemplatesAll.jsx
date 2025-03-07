import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useGetAllResumeTemplates from "@/hooks/useGetAllResumeTemplates";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";
import { setcoverltemplateId } from "@/redux/templateSlice";
import { useNavigate } from "react-router-dom";


const CoverLetterTemplatesAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { cLTemplates } = useSelector((store) => store.templates);
    useGetAllResumeTemplates();
    const handleStartWithTemplate = (templateId) => {
       dispatch(setcoverltemplateId(templateId));
       console.log(templateId);
        navigate(`/user/createCoverletter`);
      };
  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16 px-8">
      {/* Hero Section */}
      <div className="max-w-8xl mx-auto bg-teal-500 p-12 -mt-5 rounded-xl shadow-2xl text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">Cover Letter Templates</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Looking to create a cover letter that helps you stand out? Choose from our
            professionally designed templates and impress hiring managers effortlessly!
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg shadow-lg hover:from-teal-500 hover:to-blue-600 transition-all font-semibold text-lg"
          >
            Start with Random Template →
          </motion.button>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="https://img.freepik.com/premium-vector/young-woman-jane-near-folder-talking-smartphone-3d-vector-people-character-illustration_365941-613.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"
            alt="Illustration"
            className="w-full max-w-sm rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Template Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cLTemplates.map((template) => (
          <div
            key={template._id}
            className="group relative bg-white p-6 rounded-xl border border-gray-300 shadow-lg hover:shadow-2xl overflow-hidden hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 transition-all duration-300"
          >
            <div className="relative bg-white rounded-md p-4 h-full flex items-center justify-center transition-all duration-300">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-white text-blue-500 px-5 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-100 text-lg"
                onClick={() => handleStartWithTemplate(template._id)}
              >
                Start with this Template
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default CoverLetterTemplatesAll;