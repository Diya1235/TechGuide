import { User } from "../models/user.model.js";
import { CoverLetter } from "../models/coverletter.model.js";


export const createCoverLetter = async (req, res) => {
    try {
        // ✅ Ensure `body` is always an array of objects with `paragraph` field
        if (!Array.isArray(req.body.body)) {
            req.body.body = [{ paragraph: req.body.body || "" }]; // Ensure it's not empty
        } else {
            req.body.body = req.body.body.map(p =>
                typeof p === "string" ? { paragraph: p } : p
            );
        }

        // ✅ Ensure `company` fields are properly structured
        req.body.company = {
            name: req.body.company?.name || req.body.companyName || "",
            address: req.body.company?.address || req.body.companyAddress || "",
            introduction: req.body.company?.introduction || req.body.introduction || ""
        };

        // ✅ Ensure `senderContact` fields are correctly structured
        req.body.senderContact = {
            email: req.body.senderContact?.email || req.body.senderEmail || "",
            phone: req.body.senderContact?.phone || req.body.senderPhone || "",
            address: req.body.senderContact?.address || req.body.senderAddress || ""
        };

        // ✅ Remove duplicate/incorrect fields (optional)
        delete req.body.companyName;
        delete req.body.companyAddress;
        delete req.body.introduction;
        delete req.body.senderEmail;
        delete req.body.senderPhone;
        delete req.body.senderAddress;

        // ✅ Save the cover letter
        const coverLetter = new CoverLetter(req.body);
        await coverLetter.save();

        // ✅ Link cover letter to user
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { createdCL: coverLetter._id }
        });

        res.status(201).json({
            success: true,
            message: "Cover letter created successfully",
            data: coverLetter
        });
    } catch (error) {
        console.error("Error creating cover letter:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get Cover Letter by ID
export const getCoverLetterById = async (req, res) => {
    try {
        const coverLetter = await CoverLetter.findById(req.params.id);
        if (!coverLetter) return res.status(404).json({ message: 'Cover Letter not found' });
        res.json({
            success: true,
            message:"Successful",
           data: coverLetter});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Cover Letter
export const updateCoverLetter = async (req, res) => {
    try {
        // ✅ Ensure `body` is an array of objects with `paragraph` fields
        if (req.body.body) {
            if (!Array.isArray(req.body.body)) {
                req.body.body = [{ paragraph: req.body.body }];
            } else {
                req.body.body = req.body.body.map(p => 
                    typeof p === "string" ? { paragraph: p } : p
                );
            }
        }

        // ✅ Ensure `company` fields are properly structured
        req.body.company = {
            name: req.body.company?.name || req.body.companyName || "",
            address: req.body.company?.address || req.body.companyAddress || "",
            introduction: req.body.company?.introduction || req.body.introduction || ""
        };

        // ✅ Ensure `senderContact` fields are correctly structured
        req.body.senderContact = {
            email: req.body.senderContact?.email || req.body.senderEmail || "",
            phone: req.body.senderContact?.phone || req.body.senderPhone || "",
            address: req.body.senderContact?.address || req.body.senderAddress || ""
        };

        // ✅ Remove duplicate/incorrect fields (optional cleanup)
        delete req.body.companyName;
        delete req.body.companyAddress;
        delete req.body.introduction;
        delete req.body.senderEmail;
        delete req.body.senderPhone;
        delete req.body.senderAddress;

        // ✅ Update Cover Letter with structured data
        const updatedCoverLetter = await CoverLetter.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedCoverLetter) {
            return res.status(404).json({ success: false, message: "Cover Letter not found" });
        }

        res.json({ success: true, message: "Cover Letter updated successfully", data: updatedCoverLetter });
    } catch (error) {
        console.error("Error updating cover letter:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Delete Cover Letter
export const deleteCoverLetter = async (req, res) => {
    try {
        const deletedCoverLetter = await CoverLetter.findByIdAndDelete(req.params.id);
        
        if (!deletedCoverLetter) {
            return res.status(404).json({ 
                success:true,
                message: 'Cover Letter not found' });
        }

        // Remove the deleted cover letter ID from the user's profile
        await User.findByIdAndUpdate(deletedCoverLetter.userId, {
            $pull: { createdCL: deletedCoverLetter._id }
        });

        res.json({ success: true, message: 'Cover Letter deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get All Cover Letters for a User
export const getAllCoverLettersByUser = async (req, res) => {
    try {
    

        const coverLetters = await CoverLetter.find({ userId: req.params.id });

       
        if (coverLetters.length > 0) {
            return res.status(200).json({
                success: true,
                status: 200,
                message: "Cover letters found successfully",
                data: coverLetters,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No cover letters found for this user.",
                data: [],
            });
        }
    } catch (error) {
        console.error("Error fetching cover letters:", error);
        res.status(500).json({ success: false, message: "Server error", error });
    }
};
