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
import useGetAllResumeTemplates from "@/hooks/useGetAllResumeTemplates";
import { useSelector } from "react-redux";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { DeleteIcon, Edit2, MoreHorizontal, X } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Adminres = () => {
  useGetAllResumeTemplates();
  const { resumeTemplates } = useSelector((store) => store.templates);

  const [selectedImage, setSelectedImage] = useState(null);

  const openImageDialog = (image) => {
    setSelectedImage(image);
  };

  const closeDialog = () => {
    setSelectedImage(null);
  };
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex justify-end my-5 mr-7">
  <Button
    className="bg-blue-500"
    onClick={() => navigate("/admin/createResumeTemp")}
  >
    New template
  </Button>
</div>

      <div className="mt-7 max-w-7xl mx-auto px-4">
        <Table>
          <TableCaption>List of your recently added Resume Templates</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Template Image</TableHead>
              <TableHead>Template Name</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resumeTemplates?.map((template) => (
              <TableRow key={template._id}>
                {/* Template Image */}
                <TableCell>
                  <button
                    onClick={() => openImageDialog(template.image)}
                    className="focus:outline-none"
                  >
                    <Avatar className="w-24 h-24 rounded-md">
                      <AvatarImage
                        src={template.image}
                        className="object-cover w-full h-full"
                        alt={template.name}
                      />
                    </Avatar>
                  </button>
                </TableCell>

                {/* Template Name */}
                <TableCell>{template?.name}</TableCell>

                {/* Date & Time */}
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

                {/* Actions */}
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <DeleteIcon className="w-4" />
                        <span>Delete</span>
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
          onClick={closeDialog} // Close dialog when clicking outside the modal
        >
          <div
            className="relative bg-white p-6 rounded-lg shadow-lg w-96 max-w-full"
            onClick={(e) => e.stopPropagation()} // Prevent click propagation to the overlay
          >
            {/* Close Button */}
            <button
              onClick={closeDialog}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Image Display */}
            <img
              src={selectedImage}
              alt="Template"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Adminres;
