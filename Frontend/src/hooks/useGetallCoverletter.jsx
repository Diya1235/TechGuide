import { setcLTemplates } from "@/redux/templateSlice";
import { COVERLETTER_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetallCoverletter = () => { // ❌ Remove refreshTrigger as a parameter
  const dispatch = useDispatch();

  const fetchAllTemplates = async () => {
    try {
      const res = await axios.get(`${COVERLETTER_API_END_POINT}/getAllTemplates`, {
        withCredentials: true,
      });

      console.log("API Response:", res.data);
      
      if (res.data.success) {
        dispatch(setcLTemplates(res.data.data)); // ✅ Update Redux store
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAllTemplates(); // ✅ Fetch data on mount
  }, [dispatch]);

  return fetchAllTemplates; // ✅ Return function so it can be called manually
};

export default useGetallCoverletter;
