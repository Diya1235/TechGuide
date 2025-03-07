import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import {
    Table,
    TableBody,
    TableCaption,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "../ui/table";

import { useSelector } from "react-redux";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, X } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useGetallCoverletter from "@/hooks/useGetallCoverletter";
import { COVERLETTER_API_END_POINT } from "@/utils/Constant";
import axios from "axios";
import { toast } from "sonner";

const Admincl = () => {
    const fetchCoverLetters = useGetallCoverletter(); // ✅ Store function to manually re-fetch

    const { cLTemplates } = useSelector((store) => store.templates);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const openImageDialog = (image) => {
        setSelectedImage(image);
    };

    const handleDelete = async (id) => {
        if (!id) return;
        try {
            const res = await axios.post(
                `${COVERLETTER_API_END_POINT}/deleteTemplate/${id}`,
                {}, 
                { withCredentials: true }
            );
            if(res.data.success)
            {
                toast.message("Template Deleted successfully");
            }

            console.log("Delete Response:", res.data);
            fetchCoverLetters(); // ✅ Manually re-fetch data
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-end my-5 mr-7">
                <Button className="bg-blue-500" onClick={() => navigate("/admin/createCLTemp")}>
                    New template
                </Button>
            </div>

            <div className="mt-7 max-w-7xl mx-auto px-4">
                <Table>
                    <TableCaption>List of your recently added Cover Letter Templates</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Template Image</TableHead>
                            <TableHead>Template Name</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cLTemplates?.map((template) => (
                            <TableRow key={template._id}>
                                <TableCell>
                                    <button onClick={() => openImageDialog(template.image)} className="focus:outline-none">
                                        <Avatar className="w-24 h-24 rounded-md">
                                            <AvatarImage src={template.image} className="object-cover w-full h-full" alt={template.name} />
                                        </Avatar>
                                    </button>
                                </TableCell>
                                <TableCell>{template?.name}</TableCell>
                                <TableCell>
                                    {new Date(template?.createdAt).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true,
                                    })}
                                </TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Button onClick={() => handleDelete(template?._id)}>Delete</Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Dialog for showing image */}
            {selectedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative bg-white p-6 rounded-lg shadow-lg w-96 max-w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent click propagation to the overlay
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img src={selectedImage} alt="Template" className="w-full h-auto rounded-md" />
                    </div>
                </div>
            )}
        </>
    );
};

export default Admincl;
