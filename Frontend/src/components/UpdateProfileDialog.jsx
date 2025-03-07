import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/Constant';
import { setLoading, setUser } from '@/redux/authSlice';
// Adjust path accordingly

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setloading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phone: user?.phone || "",
        linkedIn: user?.linkedIn || "",
        github: user?.github || "",
        bio: user?.profile?.bio || "",
        interests:user?.profile?.interests || ""
    });

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        setloading(true);
        const formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("phone", input.phone);
        formdata.append("bio", input.bio);
        formdata.append("interests",input.interests);
        formdata.append("linkedIn",input.linkedIn);
        formdata.append("github",input.github);
        if (input.resume) {
            formdata.append("resume", input.resume);
        }
        if (input.profilepic) {
            formdata.append("profilepic", input.profilepic);
        }
    
        try {
            setloading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message,{
                    style: {
                      backgroundColor: '#28a745', // Green color
                      color: '#fff', // White text
                    },
                  });
            }
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || "An error occurred",{
                style: {
                  backgroundColor: 'red', // Green color
                  color: '#fff', // White text
                },
              });
        } finally {
            setloading(false);
            setOpen(false);
        }
    };
    const changeEventHandler = (e) => {
        const { name, type, files, value } = e.target;
        if (type === "file") {
            setInput({ ...input, [name]: files[0] }); // Handle file input
        } else {
            setInput({ ...input, [name]: value }); // Handle text input
        }
    };

    return (
        <Dialog open={open}>
            <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="fullname" className="text-right">Name</Label>
                            <Input id="fullname" name="fullname" className="col-span-3" value={input.fullname} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" className="col-span-3" value={input.email} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="phone" className="text-right">Number</Label>
                            <Input id="phone" name="phone" className="col-span-3" value={input.phone} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="bio" className="text-right">Bio</Label>
                            <Input id="bio" name="bio" className="col-span-3" value={input.bio} onChange={changeEventHandler} />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="interests" className="text-right">Interests</Label>
                            <Input id="interests" name="interests" className="col-span-3" value={input.interests} onChange={changeEventHandler} placeholder="HTML,CSS" />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="github" className="text-right">Github url:</Label>
                            <Input id="github" name="github" className="col-span-3" type="text"  onChange={changeEventHandler}  />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="linkedIn" className="text-right">LinkedIn:</Label>
                            <Input id="linkedIn" name="linkedIn" className="col-span-3" type="text"  onChange={changeEventHandler}  />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="resume" className="text-right">Resume:</Label>
                            <Input id="resume" name="resume" className="col-span-3" type="file"  onChange={changeEventHandler}  />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor="profilepic" className="text-right">Profile Pic:</Label>
                            <Input id="profilepic" name="profilepic" className="col-span-3" type="file" onChange={changeEventHandler}  />
                        </div>
                    </div>
                    <DialogFooter>
                        {loading ? (
                            <Button className="w-full my-4">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Update</Button>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
