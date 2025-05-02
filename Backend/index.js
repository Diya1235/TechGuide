import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { connectDb } from './utils/db.js';
import userRoute from "./routes/user.routes.js";
import resumeRoute from "./routes/resume.route.js"
import projectRoute from "./routes/project.route.js"
import coverletterRoute from "./routes/coverletter.route.js"

// Initializing the express object
const app = express();

dotenv.config();
app.use(express.json()); // this indicates use of JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // used for storing and retrieving web token

const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOption));

app.get("/home", (req, res) => {
    return res.status(200).json({
        message: "Data coming from backend"
    });
});

const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send email route
app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "diyasingh20041@gmail.com", // Change this to the recipient
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email." });
    }
});

// APIs
app.use("/api/v1/user", userRoute);
app.use("/api/v1/resume", resumeRoute);
app.use("/api/v1/coverletter", coverletterRoute);
app.use("/api/v1/project", projectRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});
