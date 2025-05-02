import { setAllAdminProjects } from "@/redux/projectsSlice";
import { PROJECT_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetallProjectsadmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminProjects = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/getadminprojects`, {
          withCredentials: true,
        });

        console.log("API Response:", res.data); // Ensure the structure is correct

        if (res.data.success) {
          dispatch(setAllAdminProjects(res.data.projects)); // Dispatch only the `projects` array
        } else {
          console.warn("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    fetchAllAdminProjects();
  }, [dispatch]); // Added `dispatch` to dependencies
};

export default useGetallProjectsadmin;
