import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import tech from '../images/TECHGUIDE.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/Constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';
import { clearSavedProjects } from "../../redux/projectsSlice";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get current page

  const logouthandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message, {
          position: "top-center",
          style: { marginTop: "100px" }
      });
        dispatch(clearSavedProjects());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.message || "Logout failed");
    }
  };

  return (
    <div className='bg-white shadow-md'>
      <div className='flex items-center justify-between px-4 lg:px-8 mx-auto max-w-7xl h-18 cursor-pointer'>
        
        {/* Logo Section */}
        <div className="flex items-start gap-0 mr-2 -ml-3">
          <video className="logo-video h-16 w-16" autoPlay loop muted>
            <source src={tech} type="video/mp4" />
          </video>
          <Link to='/'>
            <h1 className='text-l mt-5 mr-2 lg:text-2xl font-bold '>
              Tech<span className='text-blue-500'>Guide</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Menu */}
        <div className='flex items-center gap-4 lg:gap-12'>
          <ul className='hidden lg:flex font-medium items-center gap-5'>
            {user && user.role === 'admin' ? (
              <>
                <Link to="/adminProjects" className={location.pathname === "/adminProjects" ? "text-blue-500" : "text-black"}>
                  Projects
                </Link>
                <Link to="/admintemplates" className={location.pathname === "/admintemplates" ? "text-blue-500" : "text-black"}>
                  Resume Templates
                </Link>
                <Link to="/admincltemplates" className={location.pathname === "/admincltemplates" ? "text-blue-500" : "text-black"}>
                  Coverletter Templates
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className={location.pathname === "/" ? "text-blue-500" : "text-black"}>
                  Home
                </Link>
                <Link to="/findprojects" className={location.pathname === "/findprojects" ? "text-blue-500" : "text-black"}>
                  Find Projects
                </Link>
                <Link to="/resume" className={location.pathname === "/resume" ? "text-blue-500" : "text-black"}>
                  Resume
                </Link>
                <Link to="/coverletter" className={location.pathname === "/coverletter" ? "text-blue-500" : "text-black"}>
                  Cover Letter
                </Link>
                <Link to="/news" className={location.pathname === "/news" ? "text-blue-500" : "text-black"}>
                  Tech News
                </Link>
                <Link to="/college" className={location.pathname === "/college" ? "text-blue-500" : "text-black"}>
                  Explore Colleges
                </Link>
                <Link to="/roles" className={location.pathname === "/roles" ? "text-blue-500" : "text-black"}>
                  Explore roles
                </Link>
              </>
            )}
          </ul>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center gap-3 ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="p-1 ml-5 transform translate-y-1 sm:translate-y-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className=" w-5 h-5 sm:w-6 sm:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <ul className="flex flex-col font-medium space-y-3">
                  {user && user.role === 'admin' ? (
                    <>
                      <Link to="/adminProjects" className={location.pathname === "/adminProjects" ? "text-blue-500" : "text-black"}>
                        Projects
                      </Link>
                      <Link to="/admintemplates" className={location.pathname === "/admintemplates" ? "text-blue-500" : "text-black"}>
                        Resume Templates
                      </Link>
                      <Link to="/admincltemplates" className={location.pathname === "/admincltemplates" ? "text-blue-500" : "text-black"}>
                  Coverletter Templates
                </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/" className={location.pathname === "/" ? "text-blue-500" : "text-black"}>
                        Home
                      </Link>
                      <Link to="/findprojects" className={location.pathname === "/findprojects" ? "text-blue-500" : "text-black"}>
                        Find Projects
                      </Link>
                      <Link to="/resume" className={location.pathname === "/resume" ? "text-blue-500" : "text-black"}>
                        Resume
                      </Link>
                      <Link to="/coverletter" className={location.pathname === "/coverletter" ? "text-blue-500" : "text-black"}>
                        Cover Letter
                      </Link>
                      <Link to="/news" className={location.pathname === "/news" ? "text-blue-500" : "text-black"}>
                        Tech News
                      </Link>
                      <Link to="/college" className={location.pathname === "/college" ? "text-blue-500" : "text-black"}>
                  Explore Colleges
                </Link>
                <Link to="/roles" className={location.pathname === "/roles" ? "text-blue-500" : "text-black"}>
                  Explore roles
                </Link>
                    </>
                  )}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          {/* User Authentication */}
          {!user ? (
            <div className='flex items-center gap-2'>
              <Link to="/login">
                <Button variant="outline" size="sm" className="lg:text-base text-sm">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-500 text-white hover:bg-blue-800 text-sm lg:text-base" size="sm">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilepic || "https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"} alt="User" />
                  <AvatarFallback>DS</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className='flex gap-4'>
                  <Avatar>
                    <AvatarImage src={user?.profile?.profilepic || "https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"} alt="User" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className='font-bold text-xl'>{user?.fullname}</h4>
                    <p className='text-md text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col my-2 text-gray-600'>
                  {user.role === 'user' && (
                    <div className='flex items-center gap-2 cursor-pointer'>
                      <User2 />
                      <Button variant="link" size="sm" className="text-blue-500"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className='flex items-center gap-2 cursor-pointer'>
                    <LogOut />
                    <Button onClick={logouthandler} variant="link" size="sm" className="text-red-500">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
