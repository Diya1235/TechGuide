import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setsavedLetters, setsavedResumes } from '@/redux/templateSlice';
import { COVERLETTER_API_END_POINT } from '@/utils/Constant';
import { FaTrashAlt } from 'react-icons/fa'; // Importing trash bin icon from react-icons
import { toast } from 'sonner';

const UserSavedCL = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((store) => store.auth);
    const { savedLetters } = useSelector((store) => store.templates);

    // Normalize savedResumes to always be an array
    const coverletters = Array.isArray(savedLetters) ? savedLetters : [];

    // Array of images
    const images = [
        'https://img.freepik.com/free-vector/email-with-yellow-envelope_24877-83763.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid',

    ];

    useEffect(() => {
        const fetchUserSavedletters = async () => {
            try {
                const res = await axios.get(`${COVERLETTER_API_END_POINT}/getcoverletterbyId/${user._id}`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    dispatch(setsavedLetters(Array.isArray(res.data.data) ? res.data.data : [res.data.data]));
                }
            } catch (error) {
                console.error("Error fetching saved cover letters:", error);

                if (error.response?.status === 404) {
                    dispatch(setsavedLetters([])); // Set empty array if no data found
                }
            }
        };

        if (user?._id) {
            fetchUserSavedletters(); // Initial fetch

            // Polling: Fetch data every 5 seconds
            const intervalId = setInterval(fetchUserSavedletters, 5000);

            return () => clearInterval(intervalId); // Cleanup interval on unmount
        }
    }, [user, dispatch]);

    const handleDetailsClick = (coverletterId) => {
        navigate(`/coverletter/${coverletterId}`);
    };

    const handleDelete = async (coverletterId) => {
        try {
            const res = await axios.delete(`${COVERLETTER_API_END_POINT}/deletecoverletter/${coverletterId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setsavedLetters((prev) => prev.filter(letter => letter._id !== coverletterId)));
                toast.success("Letter deleted successfully!");
            } else {
                toast.error("Failed to delete letter");
            }
        } catch (error) {
            console.error("Error deleting letter:", error);
            toast.error("Failed to delete letter");
        }
    };


    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                {coverletters.map((letter, index) => (
                    <div
                        key={letter._id}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-400"
                        onClick={() => handleDetailsClick(letter._id)}
                    >
                        {/* Static image from array */}
                        <img
                            src={images[index % images.length]} // Cycle through the array of images
                            alt={`Cover Letter ${index + 1}`}
                            className="rounded-t-lg object-cover w-full h-40"
                        />
                        <div className="p-4">
                            <div className="flex justify-between items-center">
                                <p className="text-lg mb-2">
                                <strong> From: </strong> {letter.senderName || `Cover Letter ${index + 1}`}
                                </p><br/>
                               

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the card click from triggering
                                        handleDelete(letter._id); // Delete the resume
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrashAlt size={20} />
                                </button>
                            </div>
                            <p className="text-lg mb-2">
                            <strong> To: </strong>{letter.recipientName || "Recipient Name"}
                                </p>

                        </div>
                    </div>
                ))}
            </div>

            {coverletters.length > 0 ? (
                <></>
            ) : (
                <p className="text-gray-500 mt-4">No cover letters found. Create one to see it here!</p>
            )}

        </div>
    );
};

export default UserSavedCL;
