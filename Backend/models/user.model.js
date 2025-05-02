import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    profile: {
        bio: { type: String },
        createdResume: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }],
        createdCL: [{ type: String }],
        interests: [{ type: String }],
        resume:{
            type: String,
            default: ""
        },
        savedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
        profilepic: {
            type: String,
            default: ""
        },
        linkedIn: { type: String,default:"" }, // Added LinkedIn
        github: { type: String,default:"" } // Added GitHub
    }
}, { timestamps: true });

export const User = mongoose.model('User', UserSchema);
