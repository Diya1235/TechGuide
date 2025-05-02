import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/Constant";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    linkedIn: user?.profile?.linkedIn || "",
    github: user?.profile?.github || "",
    bio: user?.profile?.bio || "",
    interests: user?.profile?.interests || "",
    role: user?.role || "", // Ensure role is included
  });

  const [files, setFiles] = useState({
    resume: null,
    profilepic: null,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(input).forEach((key) => formData.append(key, input[key]));
    if (files.resume) formData.append("resume", files.resume);
    if (files.profilepic) formData.append("profilepic", files.profilepic);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user)); // Ensure updated role is stored
        console.log(res.data.user);
        toast.success(res.data.message, { style: { backgroundColor: "#28a745", color: "#fff" } });
        setOpen(false); // Close dialog on success
      }
    } catch (err) {
      console.error("Update Profile Error:", err);
      toast.error(err.response?.data?.message || "An error occurred", {
        style: { backgroundColor: "red", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  const changeEventHandler = (e) => {
    const { name, type, files, value } = e.target;
    if (type === "file") {
      setFiles((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { id: "fullname", label: "Name", type: "text" },
              { id: "email", label: "Email", type: "text" },
              { id: "phone", label: "Number", type: "text" },
              { id: "bio", label: "Bio", type: "text" },
              { id: "interests", label: "Interests", type: "text", placeholder: "HTML,CSS" },
              { id: "github", label: "GitHub URL", type: "text" },
              { id: "linkedIn", label: "LinkedIn", type: "text" },
              { id: "role", label: "Role", type: "text" }, // Include role field
              { id: "resume", label: "Resume", type: "file" },
              { id: "profilepic", label: "Profile Pic", type: "file" },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-right">{label}:</Label>
                <Input
                  id={id}
                  name={id}
                  className="col-span-3"
                  type={type}
                  value={type !== "file" ? input[id] : undefined}
                  onChange={changeEventHandler}
                  placeholder={placeholder}
                  {...(type === "file" ? { accept: id === "resume" ? ".pdf" : "image/*" } : {})}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full my-4" disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
