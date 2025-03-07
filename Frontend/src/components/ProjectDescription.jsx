import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleProject, setsaveProject } from "../redux/projectsSlice";
import axios from "axios";
import { PROJECT_API_END_POINT } from "@/utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ProjectDescription = () => {
  const params = useParams();
  const projectId = params.id;
  const dispatch = useDispatch();
  const { singleProject, savedProjects } = useSelector((store) => store.projects);
  const { user } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const isProjectSaved = savedProjects.some((project) => project._id === projectId);

  const saveProjectHandler = async () => {
    try {
      const res = await axios.get(`${PROJECT_API_END_POINT}/saveproject/${projectId}`, {
        withCredentials: true,
      });
  
      if (res.data.success) {
        toast.success(res.data.message,{
          style: {
            backgroundColor: '#28a745', // Green color
            color: '#fff', // White text
          },
        });
  
        // Optimistically update the savedProjects in Redux
        dispatch(setsaveProject([...savedProjects, singleProject])); 
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || "An error occurred while saving the project",{
        style: {
          backgroundColor: 'red', // Green color
          color: '#fff', // White text
        },
      });
    }
  };
  

  useEffect(() => {
    const fetchSingleProject = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/get/${projectId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleProject(res.data.project));
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    const fetchUserSavedProjects = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/getsavedprojects`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsaveProject(res.data.savedProjects));
        }
      } catch (error) {
        console.error("Error fetching saved projects:", error);
      }
    };

    fetchUserSavedProjects();
    fetchSingleProject();
  }, [user, dispatch, projectId]);

  const handleBackNavigation = () => navigate("/projectcards");

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 bg-white shadow-lg border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between px-5 py-4 bg-gray-100 border-b border-gray-300 rounded-t-lg">
          <Button className="w-[20%] lg:w-[10%]" onClick={handleBackNavigation}>
            Back
          </Button>
          <Button
            className={`w-[20%] lg:w-[10%] ${
              isProjectSaved ? "bg-gray-400 text-white" : "bg-blue-500 text-white"
            }`}
            onClick={!isProjectSaved ? saveProjectHandler : undefined}
            disabled={isProjectSaved}
          >
            {isProjectSaved ? "Saved" : "Save"}
          </Button>
        </div>

        <div className='flex flex-col md:flex-row gap-6 p-6'>
          {/* Left Side: Image */}
          <div className='w-full md:w-[50%] flex justify-center items-start'>
            <img src={singleProject?.images[1]} alt="Project" className='w-full h-auto object-cover rounded-lg shadow-md' />
          </div>

          {/* Right Side: Content */}
          <div className='w-full md:w-[50%]'>
            <h1 className='text-4xl font-bold mb-4 text-blue-800'>{singleProject?.title}</h1>
            <p className='text-lg mb-6 text-gray-800'>{singleProject?.description}</p>

            <h2 className='text-2xl font-semibold mb-4 text-gray-700'>Category</h2>
            <p className='text-lg mb-6 text-gray-800'>{singleProject?.category}</p>

            <h2 className='text-2xl font-semibold mb-4 text-gray-700'>Roles</h2>
            <div className='space-y-4'>
              {singleProject?.roles?.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className='text-lg text-gray-600'>
                  <strong>Role {index + 1}:</strong> {role}
                </motion.div>
              ))}
            </div>

            <h2 className='text-2xl font-semibold mt-8 mb-4 text-gray-700'>Prerequisites</h2>
            <p className='text-lg text-gray-800'>{singleProject?.prerequisites}</p>

            <h2 className='text-2xl font-semibold mt-8 mb-4 text-gray-700'>Roadmap</h2>
            <ol className='list-decimal pl-5 space-y-2 text-lg text-gray-800'>
              {singleProject?.roadmap?.map((item, index) => (
                <motion
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.5 }}>
                  {item.split('. ').map((line, lineIndex) => (
                    <div key={lineIndex} className='mb-2'>{line}{lineIndex < item.split('. ').length - 1 && '.'}</div>
                  ))}
                </motion>
              ))}
            </ol>

            <h2 className='text-2xl font-semibold mt-8 mb-4 text-gray-700'>Scope</h2>
            <p className='text-lg text-gray-800'>
              {singleProject?.scope}
            </p>

            <h2 className='text-2xl font-semibold mt-8 mb-4 text-gray-700'>Technology Stack</h2>
            <div className='flex flex-wrap gap-4'>
              {singleProject?.technology?.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className='px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:scale-105'>
                  {tech}
                </motion.div>
              ))}
            </div>

            {/* Project Images */}
            <div className='mt-8'>
              <h2 className='text-2xl font-semibold mb-4 text-gray-700'>Project Images</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {singleProject?.images?.map((img, index) => (
                  <img key={index} src={img} alt={`Project Image ${index + 1}`} className='rounded-lg shadow-md' />
                ))}

              </div>
            </div>

            {/* Resources */}
            <div className='mt-8'>
              <h2 className='text-2xl font-semibold mb-4 text-gray-700'>Resources</h2>
              <ul className='list-disc pl-5 space-y-2 text-lg text-blue-600'>
                {singleProject?.resources?.map((resource, index) => (
                  <li key={index}><a href={resource} target="_blank" rel="noopener noreferrer">{resource}</a></li>
                ))}
              </ul>
            </div>

            {/* YouTube Links */}
            <div className='mt-8'>
              <h2 className='text-2xl font-semibold mb-4 text-gray-700'>YouTube Links</h2>
              <ul className='list-disc pl-5 space-y-2 text-lg text-blue-600'>
                {singleProject?.linksyt?.map((link, index) => (
                  <li key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDescription;
