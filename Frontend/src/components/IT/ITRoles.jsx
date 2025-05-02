import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import useSound from "use-sound";
import successSound from "../sounds/success.mp3";
import dragSound from "../sounds/drag.mp3";
import dropSound from "../sounds/drop.mp3";
import errorSound from "../sounds/error.mp3";
import backgroundMusic from "../sounds/background.mp3";
import devCharacter from "../images/deve.png";
import testerCharacter from "../images/tester.png";
import uxCharacter from "../images/ux.png";
import pmCharacter from "../images/pm.png";
import dataAnalystCharacter from "../images/analyst.png"; // New Image for Data Analyst Role
import muteIcon from "../images/mute.png";
import unmuteIcon from "../images/unmute.png";
import Navbar from "../shared/Navbar";
import Footer from "../Footer";

// Roles and tasks
const roles = {
  Developer: [
    "Understand Requirements",
    "Design Software Architecture",
    "Setup Development Environment",
    "Write Code",
    "Test Code",
    "Review Code",
    "Fix Bugs",
    "Deploy Code",
    "Monitor Performance",
    "Maintain Software",
  ],
  Tester: [
    "Understand Testing Requirements",
    "Create Test Cases",
    "Set Up Testing Environment",
    "Execute Test Cases",
    "Log Defects",
    "Retest Fixed Defects",
    "Perform Regression Testing",
    "Generate Test Reports",
    "Sign Off Testing",
    "Provide Maintenance Support",
  ],
  UX_Designer: [
    "Conduct User Research",
    "Define User Personas",
    "Create Wireframes",
    "Design UI Mockups",
    "Prototype User Flows",
    "Conduct Usability Testing",
    "Iterate on Feedback",
    "Collaborate with Developers",
    "Ensure Accessibility Compliance",
    "Deliver Final Designs",
  ],
  Project_Manager: [
    "Define Project Scope",
    "Set Goals & Milestones",
    "Create Project Timeline",
    "Allocate Resources",
    "Monitor Project Progress",
    "Communicate with Stakeholders",
    "Manage Risks & Issues",
    "Ensure Quality Control",
    "Facilitate Team Collaboration",
    "Deliver Final Project",
  ],
  Data_Analyst: [
    "Collect Data",
    "Clean Data",
    "Analyze Data",
    "Create Data Visualizations",
    "Interpret Results",
    "Generate Reports",
    "Identify Trends",
    "Build Dashboards",
    "Collaborate with Stakeholders",
    "Present Findings",
  ],
};

const roleImages = {
  Developer: devCharacter,
  Tester: testerCharacter,
  UX_Designer: uxCharacter,
  Project_Manager: pmCharacter,
  Data_Analyst: dataAnalystCharacter,
};

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

// Sortable Item Component
const SortableItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const [playDrag] = useSound(dragSound);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseDown={playDrag}
      className="p-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg shadow-lg cursor-grab transition-transform transform hover:scale-105 flex items-center gap-2"
    >
      {id}
    </div>
  );
};

// Droppable Cell Component
const DroppableCell = ({ index, placedStep }) => {
  const { setNodeRef } = useDroppable({ id: index.toString() });
  return (
    <div
      ref={setNodeRef}
      className={`p-4 border rounded bg-gray-600 text-center min-h-[60px] font-semibold text-lg text-white-100 transition-all ${
        placedStep ? "bg-blue-500" : "bg-gray-800"
      }`}
    >
      {placedStep || index + 1}
    </div>
  );
};

export default function DragDropGame() {
  const [selectedRole, setSelectedRole] = useState("Developer");
  const [steps, setSteps] = useState(shuffleArray([...roles[selectedRole]]));
  const [placedSteps, setPlacedSteps] = useState(Array(10).fill(null));
  const [success, setSuccess] = useState(false);
  const [playSuccess] = useSound(successSound);
  const [playDrop] = useSound(dropSound);
  const [playError] = useSound(errorSound);
  const [playBackground, { stop }] = useSound(backgroundMusic, { loop: true });
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setSteps(shuffleArray([...roles[selectedRole]]));
    setPlacedSteps(Array(10).fill(null));
    setSuccess(false);
    if (!isMuted) playBackground();
    return () => stop();
  }, [selectedRole, isMuted]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const draggedStep = active.id;
    const targetIndex = parseInt(over.id);
    const correctStep = roles[selectedRole][targetIndex];

    if (draggedStep === correctStep) {
      playDrop();
      const newPlacedSteps = [...placedSteps];
      newPlacedSteps[targetIndex] = draggedStep;
      setPlacedSteps(newPlacedSteps);
      setSteps(steps.filter((step) => step !== draggedStep));

      if (JSON.stringify(newPlacedSteps) === JSON.stringify(roles[selectedRole])) {
        setSuccess(true);
        playSuccess();
      }
    } else {
      playError();
    }
  };

  return (
    <>
    <Navbar/>
    <div className="p-6 text-center bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src={roleImages[selectedRole]}
        alt={`${selectedRole} Character`}
        className="absolute top-5 right-4 w-1/4 opacity-80 hidden md:block"
        width="40px"
        height="50px"
      />
      <h2 className="text-3xl font-extrabold mb-4 animate-bounce">Become a <span className="text-blue-500">{selectedRole}!</span></h2>
      <p className="text-lg italic mb-6">"Drag and drop the steps in the correct order."</p>
      <button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
      >
        <img src={isMuted ? muteIcon : unmuteIcon} alt="Mute Toggle" className="w-6 h-6" />
      </button>
      <select
        className="mb-6 p-3 border rounded bg-gray-800 text-white"
        onChange={(e) => setSelectedRole(e.target.value)}
      >
        {Object.keys(roles).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps}>
          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4 lg:grid-cols-5 mt-20">
            {steps.map((step) => (
              <SortableItem key={step} id={step} />
            ))}
          </div>
        </SortableContext>
        <div className="grid grid-cols-1 gap-2 p-6 bg-gray-700 rounded-lg shadow-lg md:grid-cols-5">
          {Array.from({ length: 10 }, (_, i) => (
            <DroppableCell key={i} index={i} placedStep={placedSteps[i]} />
          ))}
        </div>
      </DndContext>
      {success && (
        <div className="text-green-400 font-bold mt-6 text-xl animate-pulse">
          🎉 Success! You completed the sequence! 🎉
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}
