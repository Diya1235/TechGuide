import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LinearProgress } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
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

  const analyzeAndSetResume = async (file, role) => {
    setScore(null); // Reset score for loading effect
    setAnalysis(null); // Reset analysis to show loading state

    const text = await extractTextFromPDF(file);
    const resumeAnalysis = analyzeResume(text, role);

    setScore(resumeAnalysis.score);
    setAnalysis(resumeAnalysis);
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item) => item.str).join(" ") + " ";
        }
        resolve(text);
      };
      reader.onerror = reject;
    });
  };

  const analyzeResume = useCallback((text, role) => {
    let score = 100;
    let suggestions = [];
    let errors = [];

    const repeatedWords = text.match(/\b(\w+)\b(?=.*\b\1\b)/gi);
    if (repeatedWords && repeatedWords.length > 5) {
      score -= 10;
      errors.push("Excessive repetition of words detected.");
      suggestions.push("Reduce redundancy by varying word usage.");
    }

    const skills = text.match(/\b(Javascript|React|Node\.js|API|Git|Database|SQL|Typescript|Figma|Adobe|Wireframe|UX\/UI|Illustrator|Photoshop|Agile|Scrum|QA|Testing|Python|Analytics)\b/gi) || [];
    if (skills.length < 5) {
      score -= 15;
      errors.push("Not enough technical skills listed.");
      suggestions.push("Add more relevant keywords based on your field.");
    }

    const sections = ["Education", "Experience", "Projects", "Certifications", "Skills", "Profile Summary", "Career Objective"];
    sections.forEach((section) => {
      if (!text.match(new RegExp(`\\b(${section}|${section.toUpperCase()})\\b`, "gi"))) {
        score -= 10;
        errors.push(`${section} section missing.`);
        suggestions.push(`Include a clear ${section} section.`);
      }
    });

    if (!text.match(/\n{2,}/)) {
      score -= 5;
      errors.push("Resume text appears cluttered.");
      suggestions.push("Use proper spacing between sections.");
    }

    if (text.length < 500) {
      score -= 10;
      errors.push("Resume too short.");
      suggestions.push("Expand on your experiences and projects.");
    }

    const roleChecks = {

      developer: ["javascript", "react", "node.js", "api", "git", "database", "sql", "mern", "java", "c", "c\\+\\+"],
      designer: ["Figma", "Adobe", "Wireframe", "UX/UI", "Illustrator", "Photoshop"],
      manager: ["Agile", "Scrum", "Leadership", "Budgeting", "Risk Management"],
      tester: ["QA", "Testing", "Automation", "Selenium", "JIRA", "Bug Tracking"],
      analyst: ["Python", "Analytics", "Data Analysis", "SQL", "BI Tools", "Visualization"],
    };

    if (roleChecks[role]) {
      const missingSkills = roleChecks[role].filter(skill => !text.match(new RegExp(`\\b(${skill})\\b`, "gi")));
      if (missingSkills.length > 0) {
        score -= 15;
        errors.push(`${role} skills missing.`);
        suggestions.push(`Add ${missingSkills.join(", ")} to your resume.`);
      }
    }

    score = Math.max(30, score);
    return { score, suggestions, errors };
  }, []);

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
