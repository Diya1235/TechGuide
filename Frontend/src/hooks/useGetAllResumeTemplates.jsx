import { setresumeTemplates } from "@/redux/templateSlice";
import { RESUME_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";

import { useDispatch } from "react-redux";

const useGetAllResumeTemplates = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchAllTemplates = async () => {
      try {
        const res = await axios.get(`${RESUME_API_END_POINT}/getAllTemplates`, {
          withCredentials: true,
        });

        console.log("API Response:", res.data.data); // Debugging log

        if (Array.isArray(res.data.data)) {
          dispatch(setresumeTemplates(res.data.data)); // Dispatch only `data` array
        } else {
          console.error("Invalid API data format:", res.data);
          dispatch(setresumeTemplates([])); // Ensure state stays an array
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        dispatch(setresumeTemplates([])); // Prevent state corruption
      }
    };

    fetchAllTemplates();
  }, [dispatch]);
};

export default useGetAllResumeTemplates;
