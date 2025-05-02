import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    position:{type:String, required: true},
    github: { type: String },


    education: [
        {
            schoolName: { type: String, required: true },
            degree: { type: String, required: true },
            fieldOfStudy: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            percentage:{type:String,required:true}
        }
    ],

    workHistory: [
        {
            title: { type: String},
            location: { type: String },
            employer: { type: String },
            startDate: { type: Date },
            endDate: { type: Date},
            description:{ type:String},
        }
    ],

    skills: [{ type: String, required: true }],
    languages: [{ type: String, required: true }], // Array of skill names

    projects: [
        {
            title: { type: String, required: true},
            description: { type: String, required: true },
            
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true}
        }
    ],

    certifications: [{ type: String }], // Array of certification names

    awards: [{ type: String }], // Array of award names

    interests: [{ type: String }], // Array of interests

    summary: { type: String, required: true },

    templateId: { type: mongoose.Schema.Types.ObjectId, ref: "Template", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  
},{timestamps:true});

export const Resume  = mongoose.model("Resume", resumeSchema);
