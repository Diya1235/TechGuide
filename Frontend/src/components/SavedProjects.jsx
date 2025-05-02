import React, { useEffect } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PROJECT_API_END_POINT } from "@/utils/Constant";
import { removeSavedProject, setSavedProjects } from "@/redux/projectsSlice";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const SavedProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { savedProjects = [] } = useSelector((store) => store.projects);

  // ✅ Fetch user saved projects when component mounts
  useEffect(() => {
    const fetchUserSavedProjects = async () => {
      if (!user) return; 
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/getSavedProjects`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSavedProjects(res.data.data));
          localStorage.setItem("savedProjects", JSON.stringify(res.data.data)); // ✅ Save in LocalStorage
        }
      } catch (error) {
        console.error("Error fetching saved projects:", error);
      }
    };
    fetchUserSavedProjects();
  }, [user, dispatch]);

  // ✅ Navigate to Project Description
  const handleDetailsClick = (projectId) => {
    navigate(`/description/${projectId}`);
  };

  // ✅ Remove a project from saved projects
  const handleRemoveClick = async (projectId) => {
    try {
      const res = await axios.delete(`${PROJECT_API_END_POINT}/removeSavedProject/${projectId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // ✅ Remove project from Redux state
        dispatch(removeSavedProject(projectId));

        // ✅ Remove project from LocalStorage
        const updatedProjects = savedProjects.filter((proj) => proj._id !== projectId);
        localStorage.setItem("savedProjects", JSON.stringify(updatedProjects));

        // ✅ Update Redux state
        dispatch(setSavedProjects(updatedProjects));
      } else {
        console.error("Failed to remove project:", res.data.message);
      }
    } catch (error) {
      console.error("Error removing project:", error.response?.data || error.message);
    }
  };

  return (
    <Table className="mt-4">
      <TableCaption className="text-gray-850 font-medium">Your Saved Projects</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-blue-900 font-bold">Serial No.</TableHead>
          <TableHead className="text-blue-900 font-bold">Project Name</TableHead>
          <TableHead className="text-blue-900 font-bold">Category</TableHead>
          <TableHead className="text-blue-900 font-bold">Technology Stack</TableHead>
          <TableHead className="text-right text-blue-900 font-bold">Know More</TableHead>
          <TableHead className="text-right text-blue-900 font-bold">Remove</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {savedProjects.length > 0 ? (
          savedProjects.map((project, index) => (
            <TableRow key={project._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>{project.technology?.join(", ") || "N/A"}</TableCell>
              <TableCell className="text-right">
                <Badge className="bg-blue-500 cursor-pointer" onClick={() => handleDetailsClick(project._id)}>
                  Details
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <FaTrash
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  onClick={() => handleRemoveClick(project._id)}
                  title="Remove"
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500">
              No saved projects yet.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SavedProjects;
