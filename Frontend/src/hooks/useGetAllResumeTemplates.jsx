import { setresumeTemplates } from "@/redux/templateSlice";
import { PROJECT_API_END_POINT, RESUME_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllResumeTemplates = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchallTemplates = async () => {
      try {
        const res = await axios.get(`${RESUME_API_END_POINT}/getAllTemplates`, {
          withCredentials: true,
        });
        console.log('API Ressponse:', res.data); // Check if this logs the expected structure
        if (res.data.success) {
          dispatch(setresumeTemplates(res.data.data)); // Dispatch only the `data` array
        }
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
      }
    };
    
    fetchallTemplates();
  },[])
}

export default useGetAllResumeTemplates;