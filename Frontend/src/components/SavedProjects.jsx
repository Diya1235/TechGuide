import React, { useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector, useDispatch } from 'react-redux'; // Added useDispatch
import { useNavigate, useParams } from 'react-router-dom'; // Added useParams
import { PROJECT_API_END_POINT, USER_API_END_POINT } from '@/utils/Constant';
import { setsaveProject, removeSavedProject } from '@/redux/projectsSlice'; // Import the removeSavedProject action
import axios from 'axios'; // Ensure axios is imported
import { FaTrash } from 'react-icons/fa'; // For the delete icon

const SavedProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Added useDispatch
  const params = useParams();
  const projectId = params.id;

  // Access the user and saved projects from Redux
  const { user } = useSelector((store) => store.auth);
  const { savedProjects } = useSelector((store) => store.projects);

  // Fetch user saved projects
  useEffect(() => {
    const fetchUserSavedProjects = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/getsavedprojects`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsaveProject(res.data.savedProjects));
        }
      } catch (error) {
        console.error('Error fetching saved projects:', error);
      }
    };
    fetchUserSavedProjects();
  }, [user, dispatch, projectId]);

  // Navigate to the ProjectDescription page
  const handleDetailsClick = (projectId) => {
    navigate(`/description/${projectId}`);
  };

  // Remove a project from saved projects
  const handleRemoveClick = async (projectId) => {
    try {
      const res = await axios.delete(`${USER_API_END_POINT}/removeSavedProject/${projectId}`, {
        withCredentials: true, // Ensure credentials (cookie) are included
      });
      console.log(projectId);      
      if (res.data.success) {
        dispatch(removeSavedProject(projectId));
      } else {
        console.error('Failed to remove project from saved list');
      }
    } catch (error) {
      console.error('Error removing project:', error.response?.data || error.message);
    }
  };



  return (
    <>
      <Table className="mt-4">
        <TableCaption className="text-gray-850 font-medium">Your Saved Projects</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-900 font-bold">Serial no.</TableHead>
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
                <TableCell>{project.technology.join(', ')}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className="bg-blue-500 cursor-pointer"
                    onClick={() => handleDetailsClick(project._id)}
                  >
                    Details
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleRemoveClick(project._id)} // Pass the project._id as projectId
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
    </>
  );
};

export default SavedProjects;
