import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constant";
import { toast } from "sonner";
import log from '../images/Loginpage.gif';
import sig from '../images/signup.gif';

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Sign Up
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    linkedIn:"",
    github:"",
    file: "",
  });
  const [errors, setErrors] = useState({});
  const { loading,user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Field validation
  const validateField = (name, value) => {
    const tempErrors = { ...errors };

    switch (name) {
      case "fullname":
        if (!isSignIn && value.trim() === "") {
          tempErrors.fullname = "Full name is required.";
        } else if (!isSignIn && /[^a-zA-Z\s]/.test(value)) {
          tempErrors.fullname = "Full name must contain only letters and spaces.";
        } else {
          delete tempErrors.fullname;
        }
        break;

      case "email":
        if (value.trim() === "") {
          tempErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          tempErrors.email = "Invalid email address.";
        } else {
          delete tempErrors.email;
        }
        break;

      case "password":
        if (value.trim() === "" || value.length < 6) {
          tempErrors.password = "Password must be at least 6 characters.";
        } else {
          delete tempErrors.password;
        }
        break;

      case "phone":
        if (!isSignIn && (value.trim() === "" || value.length !== 10)) {
          tempErrors.phone = "Phone number must be exactly 10 digits.";
        } else {
          delete tempErrors.phone;
        }
        break;

      default:
        break;
    }

    setErrors(tempErrors);
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d*$/.test(value)) return; // Allow only numbers for phone

    setInput({ ...input, [name]: value });

    validateField(name, value); // Validate field on change
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const validateFields = () => {
    Object.keys(input).forEach((name) => validateField(name, input[name]));
    return Object.keys(errors).length === 0;
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    if (isSignIn) {
      try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
          navigate("/");
          toast.success(res.data.message, {
            position: "top-center",
            style: { marginTop: "100px" }
        });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred", {
          position: "top-center"
      });
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      try {
        dispatch(setLoading(true));
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "top-center",
            style: { marginTop: "100px" }
        });
          setIsSignIn(true);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred", {
          position: "top-center"
      });
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
 useEffect(()=>{
  if(user){
    navigate("/");
  }
 })
  return (
    <>
      <Navbar />
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 flex flex-col lg:flex-row items-center">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => navigate("/")}
          >
            ✖
          </button>

          <div className="hidden lg:flex flex-1 justify-center items-center">
            <img
              src={isSignIn ? log : sig}
              alt="Auth Illustration"
              className="w-full max-w-sm object-contain"
            />
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-between mb-7 mt-2">
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center rounded-l-lg ${
                  isSignIn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setIsSignIn(true)}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 text-center rounded-r-lg ${
                  !isSignIn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setIsSignIn(false)}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleAuthSubmit}>
              {!isSignIn && (
                <div className="my-2">
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    placeholder="Full Name"
                    onChange={changeEventHandler}
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm">{errors.fullname}</p>
                  )}
                </div>
              )}
              <div className="my-2">
                <Label>Email</Label>
                <Input
                  type="text"
                  value={input.email}
                  name="email"
                  placeholder="Email"
                  onChange={changeEventHandler}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="my-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  placeholder="Password"
                  onChange={changeEventHandler}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              {!isSignIn && (
                <>
                  <div className="my-2">
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      value={input.phone}
                      name="phone"
                      placeholder="Phone Number"
                      onChange={changeEventHandler}
                      maxLength={10}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                  </div>
                  <div className="my-4">
                    <RadioGroup className="flex flex-row items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Input
                          type="radio"
                          name="role"
                          value="user"
                          checked={input.role === "user"}
                          onChange={(e) =>
                            setInput({ ...input, role: e.target.value })
                          }
                        />
                        <Label>User</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="my-4 flex flex-col sm:flex-row items-center gap-2">
                    <Label className="mb-2 sm:mb-0">Profile</Label>
                    <Input
                      accept="image/*"
                      onChange={changeFileHandler}
                      type="file"
                    />
                  </div>
                </>
              )}

              {loading ? (
                <Button className="w-full my-4">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-blue-500 hover:bg-blue-800"
                >
                  {isSignIn ? "Sign In" : "Register"}
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
