import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { DeleteIcon, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import useGetallProjectsadmin from '@/hooks/useGetallProjectsadmin';
import { setAllAdminProjects } from '@/redux/projectsSlice';
import axios from 'axios';
import { PROJECT_API_END_POINT } from '@/utils/Constant';
import { toast } from 'sonner';

const ProjectsTable = () => {
    useGetallProjectsadmin();

    const { allAdminProjects = [], searchProjectsByText } = useSelector(store => store.projects);
    const [filterProjects, setFilterProjects] = useState([]);

    useEffect(() => {
        console.log('allAdminProjects:', allAdminProjects);

        if (!Array.isArray(allAdminProjects)) {
            console.error('Expected an array but got:', allAdminProjects);
            return;
        }

        const filteredProjects = allAdminProjects.filter((project) => {
            if (!searchProjectsByText) return true;
            return project?.title?.toLowerCase().includes(searchProjectsByText.toLowerCase()) ||
                project?.category?.toLowerCase().includes(searchProjectsByText.toLowerCase());
        });

        setFilterProjects(filteredProjects);
    }, [allAdminProjects, searchProjectsByText]);
const dispatch = useDispatch();
    const handleDelete = async (projectId) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;
    
        try {
            const res = await axios.delete(`${PROJECT_API_END_POINT}/deleteProject/${projectId}`, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
    
            if (res.data.success) {
                toast.message("Project deleted successfully!");
    
                // ✅ Update state and Redux store without re-fetching
                const updatedProjects = allAdminProjects.filter((project) => project._id !== projectId);
                dispatch(setAllAdminProjects(updatedProjects));
                setFilterProjects(updatedProjects); // ✅ Update local state
            } else {
                toast.error("Failed to delete project: " + res.data.message);
            }
        } catch (error) {
            console.error("Error deleting project:", error.response?.data || error.message);
            toast.error("Error deleting project. Please try again.");
        }
    };
    

    return (
        <Table>
            <TableCaption>List of your recently added Projects</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Project Image</TableHead>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Project Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filterProjects.length > 0 ? (
                    filterProjects.map((project) => (
                        <TableRow key={project._id || project.id}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={project.images || '/default-image.png'} />
                                </Avatar>
                            </TableCell>
                            <TableCell>{project?.title || "Untitled"}</TableCell>
                            <TableCell>{project?.category || "Uncategorized"}</TableCell>
                            <TableCell>{project?.createdAt?.split("T")[0] || "Unknown Date"}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <div className='flex items-center gap-2 w-fit cursor-pointer' onClick={() => handleDelete(project._id || project.id)}>
                                            <DeleteIcon className='w-4' />
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            No projects found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ProjectsTable;
