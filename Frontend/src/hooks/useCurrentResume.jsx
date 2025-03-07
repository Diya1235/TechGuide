import { RESUME_API_END_POINT } from '@/utils/Constant';
import React from 'react'
import { useDispatch } from 'react-redux';

const useCurrentResume = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
      const fetchcurrentresume = async () => {
        try {
          const res = await axios.get(`${RESUME_API_END_POINT}/getUserResume/`, {
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

export default useCurrentResume