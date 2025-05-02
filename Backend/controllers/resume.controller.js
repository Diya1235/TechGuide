import mongoose from "mongoose";
import { Resume } from "../models/resume.model.js";
import { User } from "../models/user.model.js";

// Create Resume and save its ID in the user's profile
export const createResume = async (req, res) => {
    try {
        // Ensure skills are stored as an array of strings
        if (req.body.skills) {
            req.body.skills = req.body.skills.map(skill => skill.skill);
        }

        // Convert startDate and endDate to ISO format
        if (req.body.education) {
            req.body.education = req.body.education.map(edu => ({
                ...edu,
                startDate: edu.startDate ? new Date(edu.startDate).toISOString() : null,
                endDate: edu.endDate ? new Date(edu.endDate).toISOString() : null,
            }));
        }

        if (req.body.workHistory) {
            req.body.workHistory = req.body.workHistory.map(job => ({
                ...job,
                startDate: job.startDate ? new Date(job.startDate).toISOString() : null,
                endDate: job.endDate ? new Date(job.endDate).toISOString() : null,
            }));
        }

        // Extract userId and templateId separately
        const { userId, templateId, ...resumeData } = req.body;
        
        // Create and save the new resume
        const resume = new Resume({ userId, templateId, ...resumeData });
        await resume.save();

        // Update the user's profile to add this resume ID
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { "profile.createdResume": resume._id } }, // No need for `.toString()`
            { new: true, upsert: true } // Ensures the field exists
        );

       

        res.status(201).json({
            success: true,
            message: "Resume created successfully",
            resume,
        });

    } catch (error) {
        console.error("Error creating resume:", error); // Better error logging
        res.status(500).json({ message: "Server error", error });
    }
};

  
// Get all resumes created by a specific user
export const getUserResumes = async (req, res) => {
  try {
      const { id } = req.params; 
     

      if (!id) {
          return res.status(400).json({ success: false, message: "User ID is required" });
      }

      const resumes = await Resume.find({ userId: id }); 

     // Log the fetched resumes

      if (!resumes.length) {
          return res.status(404).json({ success: false, message: "No resumes found for this user." });
      }

      res.status(200).json({
          success: true,
          message: "Resumes fetched successfully",
          data: resumes
      });
  } catch (error) {
      console.error("Server Error:", error);
      res.status(500).json({ success: false, message: "Server error", error });
  }
};


// Get a specific resume by ID
export const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
        success:true,
        message:"found",
        data: resume
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a resume by ID
export const updateResumeById = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
  
      console.log("Updating resume with ID:", id);
  
      // Check if the provided ID is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid resume ID format" });
      }
  
      // Find and update the resume
      const updatedResume = await Resume.findByIdAndUpdate(id, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules apply
      });
  
      if (!updatedResume) {
        return res.status(404).json({ message: "Resume not found" });
      }
  
      
  
      res.status(200).json({ 
        success: true, 
        message: "Resume updated successfully", 
        data: updatedResume 
      });
  
    } catch (error) {
      console.error("Error updating resume:", error);
      res.status(500).json({ message: "Server error", error });
    }
  };
// Delete a resume by ID and remove it from user's profile


export const deleteResumeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Resume ID received:", id);

    // ✅ Ensure ID is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume ID format" });
    }

    const objectId = new mongoose.Types.ObjectId(id); // ✅ Convert to ObjectId

    // ✅ Find the resume first
    const resume = await Resume.findById(objectId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // ✅ Delete the resume
    await Resume.findByIdAndDelete(objectId);

    // ✅ Remove the resume ID from the user's profile
    await User.findByIdAndUpdate(
      resume.userId,
      { $pull: { "profile.createdResume": objectId } }, // Use ObjectId here
      { new: true }
    );

    console.log("Resume deleted successfully:", objectId);

    res.status(200).json({ 
      success: true, 
      message: "Resume deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

