import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { PROJECT_API_END_POINT } from '@/utils/Constant';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';

const RealProjects = ({ project }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);

    // Function to calculate the timestamp text
    const getTimestampText = (createdAt) => {
        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const timeDiff = currentDate - createdDate;
        const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysAgo <= 30) {
            return 'Latest';
        } else {
            const monthsAgo = Math.floor(daysAgo / 30);
            return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
        }
    };

    return (
        <div className="p-5 rounded-md shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow relative">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-red-500 font-bold">{project?.category}</p>
                <Button
                    variant="outline"
                    className={`rounded-full`}
                    size="icon"
                    // Disable button if the project is saved
                >
                    <Bookmark />
                </Button>
            </div>

            {/* Avatar & Role Section */}
            <div className="flex items-center gap-4 mb-4">
                <Avatar style={{ width: '64px', height: '64px' }}>
                    <AvatarImage
                        src={project?.images?.[1] || '/default-image.png'}
                        alt={project?.title || 'Project Image'}
                        style={{ width: '100%', height: '100%', borderRadius: '8px' }}
                    />
                </Avatar>
                <div>
                    <h1 className="font-bold text-xl mb-2 text-blue-900">{project?.title}</h1>
                </div>
            </div>

            {/* Title and Description Section */}
            <div className="mb-4">
                <p className="text-sm text-gray-950 line-clamp-5">
                    {project?.description || 'No description available.'}
                </p>
            </div>

            {/* Technology Section */}
            <div className="mb-4">
                <p className="font-medium text-gray-950">Technologies:</p>
                <p className="text-sm font-medium text-orange-900">
                    {project?.technology?.join(', ') || 'Not specified'}
                </p>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={() => navigate(`/description/${project?._id}`)}
                    className="bg-blue-500 text-white w-full sm:w-auto"
                >
                    Details
                </Button>
            </div>

            {/* Timestamp Section */}
            <div className="absolute bottom-2 right-2 text-sm font-medium text-red-900">
                {project?.createdAt ? getTimestampText(project.createdAt) : 'Unknown date'}
            </div>
        </div>
    );
};

export default RealProjects;
