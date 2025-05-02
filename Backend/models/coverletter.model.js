import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },

    templateId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Template", 
        required: true 
    },

    recipientName: { type: String, required: true },
    recipientTitle: { type: String, required: true },
  date:{type:String,required:true},
    company: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        introduction: { type: String, required: true },
    },

    body: [
        {
            paragraph: { type: String, required: true }
        }
    ],

    closing: { type: String, required: true },

    senderName: { type: String, required: true },
    senderTitle: { type: String, required: true },

    senderContact: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true }
    },

},{timestamps:true});

export const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);
