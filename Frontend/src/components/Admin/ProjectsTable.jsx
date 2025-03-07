import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { DeleteIcon, Edit2, MoreHorizontal } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetallProjectsadmin from '@/hooks/useGetallProjectsadmin'


const ProjectsTable = () => {
    useGetallProjectsadmin();
  
   const {allAdminProjects, searchProjectsByText} = useSelector(store=>store.projects);
    const [filterProjects,setFilterProjects] = useState(allAdminProjects);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('allAdminProjects:', allAdminProjects);
        const filteredprojects = (allAdminProjects || []).filter((projects) => {
            if (!searchProjectsByText) {
                return true;
            }
            return projects?.title?.toLowerCase().includes(searchProjectsByText.toLowerCase()) || projects?.category.toLowerCase().includes(searchProjectsByText.toLowerCase()) ;
        });
        setFilterProjects(filteredprojects);
    }, [allAdminProjects, searchProjectsByText]);
    
  return (
    <>
    <Table>
        <TableCaption>List of your recent added Projects</TableCaption>
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
            {
                filterProjects.map((projects) => (
                <tr>
            <TableCell>
                <Avatar>
                    <AvatarImage src={projects.images}/>
                </Avatar>
            </TableCell>
            <TableCell>
                {projects?.title}
            </TableCell>
            <TableCell>
               {projects?.category}
            </TableCell>
            <TableCell>
               {projects?.createdAt.split("T"[0])}
            </TableCell>
            <TableCell className="text-right cursor-pointer">
                <Popover>
                    <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                    <PopoverContent className="w-32">
                        <div className='flex items-center gap-2 w-fit cursor-pointer'>
                        <DeleteIcon className='w-4 cursor-pointer' onClick={() => handleDelete()} />
<span className='cursor-pointer' onClick={() => handleDelete()}>Delete</span>

                        </div>
                    </PopoverContent>
                </Popover>
            </TableCell>
            </tr>
                ))
}
        </TableBody>
    </Table>
    </>
  )
}

export default ProjectsTable