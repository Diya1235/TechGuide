import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { setSavedProjects, setSingleProject } from "../redux/projectsSlice";
import axios from "axios";
import { PROJECT_API_END_POINT } from "@/utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ProjectDescription = () => {
  const params = useParams();
  const projectId = String(params.id);
  const dispatch = useDispatch();
  const { singleProject, savedProjects = [] } = useSelector((store) => store.projects);
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const [isAlreadySaved, setIsAlreadySaved] = useState(false);

  // Update the state when savedProjects change
  useEffect(() => {
    if (Array.isArray(savedProjects)) {
      const savedProjectIds = savedProjects.map(project => String(project._id || project.id)); 
      setIsAlreadySaved(savedProjectIds.includes(String(projectId)));
    }
  }, [savedProjects, projectId]);
  console.log("Extracted IDs:", savedProjects.map(project => project._id || project.id));
  console.log("Checking for:", projectId);
    
  console.log("isAlreadySaved:", isAlreadySaved);

  // Fetch saved projects from API
  useEffect(() => {
    if (!user) return;

    const fetchUserSavedProjects = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/getSavedProjects`, { withCredentials: true });

        if (res.data.success) {
          const savedProjectsData = res.data.data; 
          dispatch(setSavedProjects(savedProjectsData));
          localStorage.setItem("savedProjects", JSON.stringify(savedProjectsData));
        }
      } catch (error) {
        console.error("Error fetching saved projects:", error);
      }
    };

    try {
      const savedProjectsFromStorage = JSON.parse(localStorage.getItem("savedProjects")) || [];
      dispatch(setSavedProjects(savedProjectsFromStorage));
    } catch (error) {
      console.warn("Error reading saved projects from localStorage:", error);
      fetchUserSavedProjects();
    }
  }, [user, dispatch]);

  // Save project
  const saveProjectHandler = async () => {
    try {
      const res = await axios.post(`${PROJECT_API_END_POINT}/saveproject/${projectId}`, {}, { withCredentials: true });
  
      if (res.data.success) {
        toast.success(res.data.message, { style: { backgroundColor: "#28a745", color: "#fff" } });
  
        // Manually update local savedProjects state
        const updatedSavedProjects = [...savedProjects, { _id: projectId }];
        dispatch(setSavedProjects(updatedSavedProjects));
        localStorage.setItem("savedProjects", JSON.stringify(updatedSavedProjects));
  
        setIsAlreadySaved(true); // Update button immediately
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error saving the project", {
        style: { backgroundColor: "red", color: "#fff" },
      });
    }
  };
  

  // Fetch single project details
  useEffect(() => {
    if (!projectId) return;

    const fetchSingleProject = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/get/${projectId}`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setSingleProject(res.data.data));
          localStorage.setItem(`project_${projectId}`, JSON.stringify(res.data.data));
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    try {
      const storedProject = JSON.parse(localStorage.getItem(`project_${projectId}`));
      if (storedProject) {
        dispatch(setSingleProject(storedProject));
      } else {
        fetchSingleProject();
      }
    } catch (error) {
      console.warn("Error reading project from localStorage:", error);
      fetchSingleProject();
    }
  }, [dispatch, projectId]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 bg-white shadow-lg border border-gray-200 rounded-lg">
        {/* Header Section */}
        <div className="flex items-center justify-between px-5 py-4 bg-gray-100 border-b border-gray-300 rounded-t-lg">
          <Button className="w-[20%] lg:w-[10%]" onClick={() => navigate("/projectcards")}>
            Back
          </Button>
          <Button
            className={`w-[20%] lg:w-[10%] ${isAlreadySaved ? "bg-gray-400" : "bg-blue-500"} text-white`}
            onClick={!isAlreadySaved ? saveProjectHandler : undefined}
            disabled={isAlreadySaved}
          >
            {isAlreadySaved ? "Saved" : "Save"}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6 p-6">
          {/* Left Section - Image */}
          <div className="w-full md:w-[50%] flex justify-center items-start">
            {singleProject?.images?.length > 0 ? (
              <img
                src={singleProject.images[1] || singleProject.images[0]}
                alt="Project"
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gray-300 rounded-lg shadow-md">
                <p className="text-gray-600">No image available</p>
              </div>
            )}
          </div>

          {/* Right Section - Details */}
          <div className="w-full md:w-[50%]">
            <h1 className="text-4xl font-bold mb-4 text-blue-800">{singleProject?.title}</h1>
            <p className="text-lg mb-6 text-gray-800">{singleProject?.description}</p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Category</h2>
            <p className="text-lg mb-6 text-gray-800">{singleProject?.category}</p>

            {/* Roles Section */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Roles</h2>
            <div className="space-y-4">
              {singleProject?.roles?.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="text-lg text-gray-600"
                >
                  <strong>Role {index + 1}:</strong> {role}
                </motion.div>
              ))}
            </div>

            {/* Technology Stack */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Technology Stack</h2>
            <div className="flex flex-wrap gap-4">
              {singleProject?.technology?.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:scale-105"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
            {/* Prerequisites */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Prerequisites</h2>
            <p className="text-lg text-gray-800">{singleProject?.prerequisites}</p>

            {/* Roadmap */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Roadmap</h2>
            <ul className="list-disc pl-5 text-lg text-gray-800">
              {singleProject?.roadmap?.map((step, index) => <li key={index}>{step}</li>)}
            </ul>

            {/* Scope */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Scope</h2>
            <ul className="list-disc pl-5 text-lg text-gray-800">
              {singleProject?.scope?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>

            {/* YouTube Links */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">YouTube Links</h2>
            <ul className="list-disc pl-5 text-lg text-blue-600">
              {singleProject?.linksyt?.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Resources */}
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Resources</h2>
            <ul className="list-disc pl-5 text-lg text-blue-600">
              {singleProject?.resources?.map((resource, index) => (
                <li key={index}>
                  <a href={resource} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-800">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700">Images</h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {singleProject?.images?.map((link, index) => (
    <div key={index} className="rounded-lg overflow-hidden shadow-md">
      <img src={link} alt={`Project Image ${index + 1}`} className="w-full h-auto object-cover rounded-lg" />
    </div>
  ))}
</div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProjectDescription;
