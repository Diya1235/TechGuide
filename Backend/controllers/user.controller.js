
//signup logic
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import {WebsiteStat} from "../models/website.model.js";
import { getDataUri } from "../utils/dataUri.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, password, phone, role } = req.body;
        if (!fullname || !email || !password || !phone || !role) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let profilePicUrl = "";
        let profilePicOriginalName = "";

        // Check if user uploaded a profile picture
        if (req.files?.profilepic?.[0]) {
            const file = req.files.profilepic[0];
            console.log("Uploading profile picture:", file.originalname);

            const fileUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUri, {
                public_id: `profilepic_${Date.now()}`,
                folder: "user_profiles/profile_pics",
            });

            profilePicUrl = cloudResponse.secure_url;
            profilePicOriginalName = file.originalname;
            console.log("✅ Profile picture uploaded successfully:", profilePicUrl);
        }

        // Create new user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            phone,
            role,
            profile: {
                profilePic: profilePicUrl || "", 
                profilePicOriginalName: profilePicOriginalName || "",
            },
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true,
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                phone: newUser.phone,
                role: newUser.role,
                profile: newUser.profile,
            },
        });
    } catch (error) {
        console.error("❌ Error in registration:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


//login logic

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Some fields are missing",
                success: false
            });
        }
       

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email/password",
                success: false
            })
        }
        const ispasswordmatched = await bcrypt.compare(password, user.password);
        if (!ispasswordmatched) {
            return res.status(400).json({
                message: "Incorrect email/password",
                success: false
            })
        }

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
            bio: user.bio
        }
        //storing token in cookies
        
        return res.status(200)
        .cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            httpOnly: true, // Secure cookie
            sameSite: 'strict'
        })
        .json({
            message: `Welcome back ${user.fullname}`,
            success: true,
            user,
            token
        });
        console.log(user)
    
    }
    catch (err) {
        console.log(err);
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

 // Ensure this is implemented as described earlier


 export const updateprofile = async (req, res) => {
    try {
        const { fullname, email, phone, bio, interests, linkedIn, github } = req.body;
        const userId = req.id; // Extract user ID from token

        console.log("Received body:", req.body);
        console.log("Received files:", req.files);

        if (!fullname || !email || !phone) {
            return res.status(400).json({ success: false, message: "Fullname, email, and phone are required." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const files = req.files;
        const uploadedFiles = {};

        // Upload Profile Picture (if provided)
        if (files?.profilepic?.[0]) {
            const file = files.profilepic[0];
          

            const fileUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUri, {
                public_id: `profilepic_${userId}_${Date.now()}`,
                folder: "user_profiles/profilepics",
            });

            uploadedFiles.profilepic = cloudResponse.secure_url;
            
        }

        // ✅ Upload Resume (Publicly Accessible)
        if (files?.resume?.[0]) {
            const file = files.resume[0];
            console.log("Uploading resume:", file.originalname);

            const fileUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
            const cloudResponse = await cloudinary.uploader.upload(fileUri, {
                public_id: `resume_${userId}_${Date.now()}`,
                folder: "user_profiles/resumes",
                resource_type: "raw",  
                format: "pdf",
                access_mode: "public", // ✅ Ensures public access
            });

            uploadedFiles.resume = cloudResponse.secure_url; // ✅ This link should now be publicly accessible
           
        }

        let interestsArray = [];
        if (typeof interests === "string") {
            interestsArray = interests.split(",").map((interest) => interest.trim());
        } else if (Array.isArray(interests)) {
            interestsArray = interests;
        } else {
            interestsArray = user.profile?.interests || [];
        }

        user.profile = user.profile || {};
        user.fullname = fullname;
        user.email = email;
        user.phone = phone;
        user.profile.bio = bio || user.profile.bio;
        user.profile.interests = interestsArray;
        user.profile.linkedIn = linkedIn || user.profile.linkedIn;
        user.profile.github = github || user.profile.github;
        user.profile.resume = uploadedFiles.resume || user.profile.resume;
        user.profile.profilepic = uploadedFiles.profilepic || user.profile.profilepic;

        await user.save();
       
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                profile: user.profile, 
            },
        });
    } catch (err) {
        console.error("❌ Error updating profile:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile. Please try again.",
        });
    }
};
export const totalUsers = async (req, res) => {
    try {
      const totalUsersCount = await User.countDocuments(); // Count all users in the database
      res.json({ success: true, totalUsers: totalUsersCount });
    } catch (error) {
      console.error("Error fetching total users:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

  export const resetpassword = async(req,res)=>{
    try {
        const { email, password } = req.body;
        console.log(req.body);
    
        // Validate Inputs
        if (!email || !password) {
          return res.status(400).json({ success: false, message: "All fields are required." });
        }
    
        // Password validation (1 letter, 1 number, 1+ special char, min 6 chars)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
          return res.status(400).json({
            success: false,
            message: "Password must contain at least one letter, one number, and one special character, and be at least 6 characters long.",
          });
        }
    
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ success: false, message: "User not found." });
        }
    
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Update user password
        user.password = hashedPassword;
        await user.save();
    
        return res.json({ success: true, message: "Password updated successfully." });
      } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
      }
    

  }
  


// ✅ Increment visit count
export const trackTime = async (req, res) => {
    try {
        const { timeSpent } = req.body;

        if (!timeSpent || isNaN(timeSpent) || timeSpent <= 0) {
            return res.status(400).json({ success: false, message: "Invalid time spent value" });
        }

        let stat = await WebsiteStat.findOne();

        if (!stat) {
            stat = new WebsiteStat({ visits: 0, totalTimeSpent: timeSpent });
        } else {
            stat.totalTimeSpent += timeSpent;
        }

        await stat.save();
        res.json({ success: true, message: "Time tracked successfully", totalTimeSpent: stat.totalTimeSpent });

    } catch (error) {
        console.error("Error tracking time:", error);
        res.status(500).json({ success: false, message: "Error tracking time", error: error.message });
    }
};


// ✅ Store time spent by a user
export const trackVisit = async (req, res) => {
    try {
        let stat = await WebsiteStat.findOne();

        if (!stat) {
            stat = new WebsiteStat({ visits: 1, totalTimeSpent: 0 });
        } else {
            stat.visits += 1;
        }

        await stat.save();
        res.json({ success: true, message: "Visit tracked successfully", visits: stat.visits });

    } catch (error) {
        console.error("Error tracking visit:", error);
        res.status(500).json({ success: false, message: "Error tracking visit", error: error.message });
    }
};


// ✅ Get website stats
export const getStats = async (req, res) => {
    try {
      const stats = await WebsiteStat.aggregate([
        {
          $group: {
            _id: null,
            totalVisits: { $sum: "$visits" },
            totalTimeSpent: { $sum: "$totalTimeSpent" }
          }
        }
      ]);
  
      if (stats.length === 0) {
        return res.status(200).json({ success: true, visits: 0, totalTimeSpent: 0 });
      }
  
      const { totalVisits, totalTimeSpent } = stats[0];
  
      res.status(200).json({
        success: true,
        visits: totalVisits,
        totalTimeSpent: totalTimeSpent
      });
  
    } catch (error) {
      console.error("Error fetching aggregated stats:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching stats",
        error: error.message
      });
    }
  };


