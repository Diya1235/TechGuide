import { setAllProjects } from "@/redux/projectsSlice";
import { PROJECT_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllProjects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const res = await axios.get(`${PROJECT_API_END_POINT}/getAllProjects`, {
          withCredentials: true,
        });
        console.log(res.data.projects);

        console.log("API Response:", res.data); // ✅ Logs API response structure

        if (res.data?.success) {
          dispatch(setAllProjects(res.data.projects)); // ✅ Dispatch only when data is present
        } else {
          console.error("Failed to fetch projects:", res.data?.message);
        }
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
      }
    };

    fetchAllProjects();
  }, [dispatch]); // ✅ Added dispatch to dependency array

  return null; // ✅ Ensure it follows React hooks conventions
};

export default useGetAllProjects;
