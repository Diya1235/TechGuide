import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LinearProgress } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";

const ResumeChecker = () => {
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();
  const resumeFile = location.state?.file;

  const [score, setScore] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [role, setRole] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (resumeFile) {
      const fileUrl = URL.createObjectURL(resumeFile);
      setPdfUrl(fileUrl);
      analyzeAndSetResume(resumeFile, role);
    }
  }, [resumeFile]);

  useEffect(() => {
    if (resumeFile && role) {
      analyzeAndSetResume(resumeFile, role);
    }
  }, [role]);

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item) => item.str).join(" ") + " ";
          }
          console.log(text); // Log the extracted text for debugging
          resolve(text);
        } catch (error) {
          console.error("Error extracting PDF text:", error);
          reject(error);
        }
      };
      reader.onerror = reject;
    });
  };

  const analyzeResume = useCallback((text, role) => {
    let baseScore = 100;
    let suggestions = [];
    let errors = [];
    let bonusPoints = 0;

    const sectionPatterns = {
      education: /(education|academic background|academics|educational qualifications|university|degree|school)/i,
      experience: /(experience|work experience|professional experience|employment history|career summary|work history|past positions)/i,
      projects: /(projects|project experience|personal projects|technical projects|portfolio)/i,
      certifications: /(certifications|certified|licenses|accreditations|credentials)/i,
      skills: /(skills|technical skills|toolkit|technologies|competencies)/i,
      summary: /(summary|professional summary|profile summary|about me|overview)/i,
      objective: /(objective|career objective|goal|aim|professional goals)/i,
    };

    const missingSections = [];

    Object.entries(sectionPatterns).forEach(([section, regex]) => {
      if (!regex.test(text)) {
        baseScore -= 5;
        missingSections.push(section);
        errors.push(`${section.charAt(0).toUpperCase() + section.slice(1)} section missing.`);
        suggestions.push(`Include a clear ${section} section (e.g., "${sectionPatterns[section].source.split('|').join('", "')}").`);
      }
    });

    // Check technical skills
    const detectedSkills = text.match(/\b(JavaScript|React|Node\.js|API|Git|Database|SQL|TypeScript|Figma|Adobe|Wireframe|UX\/UI|Illustrator|Photoshop|Agile|Scrum|QA|Testing|Python|Analytics)\b/gi) || [];
    if (detectedSkills.length < 5) {
      baseScore -= 10;
      errors.push("Not enough technical skills mentioned.");
      suggestions.push("Add more technical skills relevant to your field.");
    } else if (detectedSkills.length >= 7) {
      bonusPoints += 5;
    }

    // Length check
    if (text.length < 500) {
      baseScore -= 10;
      errors.push("Resume is too short.");
      suggestions.push("Add more details about projects, experience, and skills.");
    }

    // Final score calculation (clamped between 50 and 100)
    const finalScore = Math.min(100, Math.max(50, baseScore + bonusPoints));

    return {
      score: finalScore,
      suggestions,
      errors
    };
  }, []);

  const analyzeAndSetResume = async (file, role) => {
    setScore(null);
    setAnalysis(null);

    const text = await extractTextFromPDF(file);
    const resumeAnalysis = analyzeResume(text, role);

    setScore(resumeAnalysis.score);
    setAnalysis(resumeAnalysis);
  };

  return (
    <>
      <Navbar />
      <Button className="ml-40 mt-7 px-7"><Link to="/scorechecker">Back</Link></Button>
      <div className="max-w-7xl mt-5 mb-5 gap-3 mx-auto bg-gradient-to-r from-white via-gray-100 to-purple-100 rounded-xl shadow-lg p-6 flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between items-start w-full min-h-screen lg:min-h-[600px]">
        
        {/* Left Panel */}
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
            <span className="text-blue-500">{user?.fullname}</span>, your score
          </h1>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mb-4 p-2 border rounded w-full mt-5"
          >
            <option value="">Match with Your Role (Optional)</option>
            <option value="developer">Developer</option>
            <option value="designer">UI/UX Designer</option>
            <option value="manager">Project Manager</option>
            <option value="tester">QA Tester</option>
            <option value="analyst">Business Analyst</option>
          </select>
        </div>

        {/* Progress Bar Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center">
          <div className="w-40 mx-auto">
            {score !== null ? (
              <motion.div>
                <CircularProgressbar
                  value={score}
                  text={`${score}%`}
                  styles={buildStyles({
                    textColor: "#333",
                    pathColor: score > 70 ? "#4CAF50" : "#FF9800",
                    trailColor: "#ddd",
                  })}
                />
              </motion.div>
            ) : (
              <LinearProgress className="w-40" />
            )}
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="mt-4 text-gray-700 bg-white p-4 rounded shadow w-full">
              <h4 className="font-bold text-lg">Errors</h4>
              <ul>{analysis.errors.map((error, i) => <li key={i} className="text-red-600">❌ {error}</li>)}</ul>
              <h4 className="font-bold text-lg mt-3">Suggestions</h4>
              <ul>{analysis.suggestions.map((suggestion, i) => <li key={i} className="text-green-600">🔗 {suggestion}</li>)}</ul>
            </div>
          )}
        </div>

        {/* Resume Preview */}
        {pdfUrl && <iframe src={pdfUrl} className="w-full lg:w-1/3 h-[600px]" title="Resume"></iframe>}
      </div>
      <Footer />
    </>
  );
};

export default ResumeChecker;
