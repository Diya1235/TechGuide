import mongoose from 'mongoose';
import {cltemplates} from '../models/coverlettertemp.model.js';



export const createTemplate = async (req, res) => {
    try {
      const { name, image } = req.body;
      const createdBy = req.id; // Extract user ID from request
  
      if (!name || !image) {
        return res.status(400).json({ message: 'Name and image are required' });
      }
  
      const newTemplate = new cltemplates({
        name,
        image,
        createdBy,
      });
  
      const savedTemplate = await newTemplate.save();
  
      // ✅ Explicitly returning createdAt and updatedAt
      res.status(201).json({
        success:true,
        data:savedTemplate,
        message:"created"  // ✅ Included
          // ✅ Included
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating template', error: error.message });
    }
  };
  

/**
 * @desc    Get all resume templates
 * @route   GET /api/resume-templates
 * @access  Private (Requires Authentication)
 */
export const getAllTemplates = async (req, res) => {
    try {
        // Fetch all templates without filtering by user ID
        const templatesList = await cltemplates.find({}, 'name image createdBy createdAt updatedAt'); // Fetch all documents

        res.status(200).json({
            
            data: templatesList, // Returns all templates
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error fetching templates", 
            error: error.message 
        });
    }
};
export const deleteTemplate = async (req, res) => {
  try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, message: "Invalid template ID format" });
      }

      // Convert ID to ObjectId
      const objectId = new mongoose.Types.ObjectId(id);

      // Try finding the template before deleting
      const existingTemplate = await cltemplates.findById(objectId);
      if (!existingTemplate) {
          return res.status(404).json({ success: false, message: "Template not found" });
      }

      // Proceed to delete
      await cltemplates.findByIdAndDelete(objectId);

      res.status(200).json({ success: true, message: "Template deleted successfully" });
  } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ success: false, message: "Error deleting template", error: error.message });
  }
};