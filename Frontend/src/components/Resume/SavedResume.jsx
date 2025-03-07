import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setsavedResumes } from '@/redux/templateSlice';
import { RESUME_API_END_POINT } from '@/utils/Constant';
import { FaTrashAlt } from 'react-icons/fa'; // Importing trash bin icon from react-icons
import { toast } from 'sonner';

const SavedResume = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  const { savedResumes } = useSelector((store) => store.templates);

  // Normalize savedResumes to always be an array
  const resumes = Array.isArray(savedResumes) ? savedResumes : [];

  // Array of images
  const images = [
    'https://img.freepik.com/free-vector/document-vector-colorful-design_341269-1262.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid',

  ];

  useEffect(() => {
    const fetchUserSavedResume = async () => {
      try {
        const res = await axios.get(`${RESUME_API_END_POINT}/getUserResume/${user._id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const resumeData = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
          dispatch(setsavedResumes(resumeData));
        }
      } catch (error) {
        console.error('Error fetching saved resumes:', error);
      }
    };
    if (user?._id) fetchUserSavedResume();
  }, [user, dispatch]);

  const handleDetailsClick = (resumeId) => {
    navigate(`/resume/${resumeId}`);
  };

  const handleDelete = async (resumeId) => {
    try {
      const res = await axios.delete(`${RESUME_API_END_POINT}/deleteResume/${resumeId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // After successful deletion, remove the deleted resume from the Redux state
        dispatch(setsavedResumes(savedResumes.filter((resume) => resume._id !== resumeId)));
        toast.message('Resume deleted successfully!');
      } else {
        alert('Failed to delete resume');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      alert('Failed to delete resume');
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
        {resumes.map((resume, index) => (
          <div
            key={resume._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-400"
            onClick={() => handleDetailsClick(resume._id)}
          >
            {/* Static image from array */}
            <img
              src={images[index % images.length]} // Cycle through the array of images
              alt={`Resume ${index + 1}`}
              className="rounded-t-lg object-cover w-full h-40"
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold mb-2">
                  {resume.firstName && resume.lastName
                    ? `${resume.firstName} ${resume.lastName}`
                    : `Resume ${index + 1}`}
                </h2>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the card click from triggering
                    handleDelete(resume._id); // Delete the resume
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
              <p className="text-gray-600 truncate">
                <strong>{resume.country || 'No summary available'}</strong> 
              </p>
            </div>
          </div>
        ))}
      </div>

      {resumes.length === 0 && (
        <p className="text-gray-500 mt-4">No resumes found. Create one to see it here!</p>
      )}
    </div>
  );
};

export default SavedResume;
