import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Footer from './Footer'
import useGetAllProjects from '@/hooks/useGetAllProjects'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Chatbot from './Chatbot'

const Home = () => {
 useGetAllProjects();
 const {user} = useSelector(store=>store.auth);
 const navigate = useNavigate();
 useEffect(()=>{
 if(user?.role === 'admin'){
   navigate("/adminProjects");
 }
 },[]);

  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Chatbot/>
    <Footer/>
    </>
  )
}

export default Home