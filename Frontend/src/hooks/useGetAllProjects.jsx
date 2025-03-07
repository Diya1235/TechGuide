import { setallProjects } from "@/redux/projectsSlice";
import { PROJECT_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllProjects = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/getallprojects`, {
          withCredentials: true,
        });
        console.log('API Ressponse:', res.data); // Check if this logs the expected structure
        if (res.data.success) {
          dispatch(setallProjects(res.data.data)); // Dispatch only the `data` array
        }
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
      }
    };
    
    fetchAllProjects();
  },[])
}

export default useGetAllProjects;