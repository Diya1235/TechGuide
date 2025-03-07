import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, GitBranch, LinkedinIcon, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import SavedProjects from "./SavedProjects";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import SavedResume from "./Resume/SavedResume";
import { motion } from "framer-motion";
import UserSavedCL from "./CoverLetter/UserSavedCL";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-blue-500 rounded-2xl my-5 p-8 shadow-lg">
        <div className="flex justify-between items-center">
          {/* User Profile Info */}
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 shadow-md">
            <AvatarImage 
  src={user?.profile?.profilepic || "https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?uid=R160060484&ga=GA1.1.1042404616.1705058647&semt=ais_hybrid"} 
  alt="User profile" 
/>

            </Avatar>
            <div>
              <h1 className="font-bold text-3xl text-blue-600">{user?.fullname || "N/A"}</h1>
              <p className="text-gray-600">{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>
          {/* Update Profile Button */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <Button variant="outline" onClick={() => setOpen(true)}>
              <Pen className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>

        {/* Contact Information */}
        <div className="my-5 bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700">Contact Information</h2>
          <div className="mt-3 space-y-3 text-gray-600">
            <div className="flex items-center gap-3">
              <Mail />
              <span>{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <Contact />
              <span>{user?.phone || "N/A"}</span>
            </div>
            <div className="flex items-center gap-3">
              <GitBranch />
              <a
                href={user?.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition"
              >
                {user?.github || "N/A"}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <LinkedinIcon />
              <a
                href={user?.linkedIn || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition"
              >
                {user?.linkedIn || "N/A"}
              </a>
            </div>
          </div>
        </div>

        {/* Interests Section */}
        <div className="my-5">
          <h2 className="text-xl font-medium text-gray-700">Interests</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {user?.profile?.interests?.length > 0 ? (
              user.profile.interests.map((item, index) => (
                <Badge className="bg-blue-500 text-white px-3 py-1" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">N/A</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-5">
          <h2 className="text-xl font-medium text-gray-700">Resume</h2>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline cursor-pointer block mt-2"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-500">N/A</span>
          )}
        </div>
      </div>

      {/* Resumes & Cover Letters */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5 shadow-md my-5">
        <Label className="font-bold text-xl text-gray-700">Your Created Resumes:</Label>
        <SavedResume />
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5 shadow-md my-5">
        <h2 className="font-bold text-xl text-gray-700">Your Created Cover Letters:</h2>
        {/* Cover letters component here */}
        <UserSavedCL/>
      </div>

      {/* Saved Projects Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5 shadow-md my-5">
        <h2 className="font-bold text-xl text-gray-700">Saved Projects:</h2>
        <SavedProjects />
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
      <Footer />
    </>
  );
};

export default Profile;
