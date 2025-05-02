import mongoose from 'mongoose';
import {Project} from '../models/project.model.js';
import {User} from '../models/user.model.js';

// Add a new project
export const addProject = async (req, res) => {
  try {
    const { 
      title, 
      category, 
      roles, 
      description, 
      prerequisites, 
      roadmap, 
      scope, 
      technology, 
      images, 
      resources, 
      linksyt 
    } = req.body;

    // Validate required fields
    if (!title || !category || !description) {
      return res.status(400).json({ message: 'Title, category, and description are required' });
    }

    const project = new Project({
      title,
      category,
      roles: Array.isArray(roles) ? roles : [roles], // Ensure roles is an array
      description,
      prerequisites,
      roadmap: Array.isArray(roadmap) ? roadmap : [roadmap], // Ensure roadmap is an array
      scope: Array.isArray(scope) ? scope : [scope], // Ensure scope is an array
      technology: Array.isArray(technology) ? technology : [technology], // Ensure technology is an array
      images: Array.isArray(images) ? images : [images], // Ensure images is an array
      resources: Array.isArray(resources) ? resources : [resources], // Ensure resources is an array
      linksyt: Array.isArray(linksyt) ? linksyt : [linksyt], // Ensure linksyt is an array
      created_by: req.id, // Assuming user is authenticated
    });

    const savedProject = await project.save();
    res.status(201).json({ message: 'Project added successfully', project: savedProject,success:true });
  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error: error.message ,success:false});
  }
};


export const getAllProjects = async (req, res) => {
  try {
    const Allprojects = await Project.find();
    res.status(200).json({
      success:true,
      message:"Fetched all projects",
      projects: Allprojects
    }
    );
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching projects', 
      error: error.message,success:true,
      });
  }
};

// Get admin-created projects
export const getAdminProjects = async (req, res) => {
  try {
    const adminProjects = await Project.find({ created_by: req.id });

    res.status(200).json({
      success: true,
      message: "Admin projects fetched successfully",
      projects: adminProjects, // Changed `data` to `projects` for consistency
    });
  } catch (error) {
    // Sending an empty array in case of an error
    res.status(500).json({
      success: false,
      message: "Error fetching admin projects",
      error: error.message,
      projects: [], // Always send projects key
    });
  }
};



// Get a single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params; // Extract projectId from URL

    // Find project by ID
    const project = await Project.findById(id);

    // If project not found, return 404
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: error.message,
    });
  }
};
//Save a project for a user

export const saveProject = async (req, res) => {
  try {
    const  {id}  = req.params;
    const userId = req.id; 
    console.log(userId);// Ensure userId is properly extracted

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authenticated", userId });
    }

    const user = await User.findById(userId).select("profile.savedProjects");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.profile) {
      user.profile = { savedProjects: [] };
    }
    if (!Array.isArray(user.profile.savedProjects)) {
      user.profile.savedProjects = [];
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    if (user.profile.savedProjects.includes(id)) {
      return res.status(400).json({ success: false, message: "Project already saved" });
    }

    user.profile.savedProjects.push(id);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Project saved successfully",
      savedProjects: user.profile.savedProjects,
    });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({
      success: false,
      message: "Error saving project",
      error: error.message,
    });
  }
};



// Get saved projects of a user
export const getSavedProjects = async (req, res) => {
  try {
    // Ensure the user is authenticated
    if (!req.id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Fetch user and populate savedProjects
    const user = await User.findById(req.id)
      .select("profile.savedProjects") // Select only savedProjects field
      .populate({
        path: "profile.savedProjects",
        model: "Project", // Ensure this matches your Project model
        select: "-__v" // Optional: Exclude __v field from response
      })
      .lean(); // Convert Mongoose document to plain object (better performance)

    // Debugging: Check what the user object contains
   

    // If user not found
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Extract savedProjects (ensure profile exists)
    const savedProjects = user.profile?.savedProjects || [];

    return res.status(200).json({
      success: true,
      message: savedProjects.length > 0 ? "Saved projects fetched successfully" : "No saved projects found",
      data: savedProjects, // ✅ Return full project objects, not just IDs
    });

  } catch (error) {
    console.error("Error fetching saved projects:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching saved projects",
      error: error.message,
    });
  }
};

export const removeSavedProject = async (req, res) => {
  try {
    const userId = req.id; // Extract user ID from authenticated request
    const projectId = req.params.id; // Get project ID from params

    // ✅ Update user's profile.savedProjects instead of savedProjects directly
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { "profile.savedProjects": projectId } }, // Correct path to savedProjects
      { new: true }
    ).populate("profile.savedProjects"); // Populate updated list

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Project removed from saved list",
      savedProjects: updatedUser.profile.savedProjects // Return updated list
    });
  } catch (error) {
    console.error("Error removing saved project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Ensure only the creator can delete
    if (project.created_by.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this project",
      });
    }

    // Delete the project
    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
};