import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import ProjectsTable from './ProjectsTable'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import useGetallProjectsadmin from '@/hooks/useGetallProjectsadmin'
import { useDispatch } from 'react-redux'
import { setSearchProjectsByText } from '@/redux/projectsSlice'
import { useEffect } from 'react'
import { useState } from 'react'
import AdminDashboard from './AdminDashboard'

const AdminProjects = () => {
  useGetallProjectsadmin();
  const [input,setInput] = useState("");
  const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() =>{
      dispatch(setSearchProjectsByText(input));
    },[input])
  
    return (
    <>
    <Navbar/>
    <AdminDashboard/>
     <div className='max-w-6xl mx-auto my-10'>
    <div className='flex items-center justify-between my-5'>
    <Input className="w-fit" placeholder="Filter by name,category" onChange={(e) => setInput(e.target.value)}/>
    <Button className="bg-blue-500" onClick={() => navigate("/admin/createproject")}>New Project</Button>
    </div>
   <ProjectsTable/>
     </div>
    
    </>
   
  )
}

export default AdminProjects;