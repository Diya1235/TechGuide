import { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constant";

const AdminDashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalVisits, setTotalVisits] = useState(0);
    const [totalTimeSpent, setTotalTimeSpent] = useState(0);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    // ✅ Fetch all stats data
    const fetchDashboardData = async () => {
        try {
            // Fetch total users
            const userRes = await axios.get(`${USER_API_END_POINT}/getTotalUsers`, { withCredentials: true });
            if (userRes.data.success) setTotalUsers(userRes.data.totalUsers);

            // Fetch website 
            const statsRes = await axios.get(`${USER_API_END_POINT}/getstats`, { withCredentials: true });
            console.log(statsRes);
            if (statsRes.data.success) {
                setTotalVisits(statsRes.data.visits);
                setTotalTimeSpent(statsRes.data.totalTimeSpent);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    // ✅ Format time spent in HH:MM:SS
    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 ">
            <div className="w-full max-w-6xl p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 mx:auto sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Total Users */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center">
                        <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
                        <p className="text-4xl font-bold text-blue-600">{totalUsers}</p>
                    </div>

                   

                    
                    
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
