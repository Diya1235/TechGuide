import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Progress } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import useSound from "use-sound";
import { Input } from "@/components/ui/input";
import Avatar3D from "./models/Avatar3D.jsx"
import OfficeScene from "./models/OfficeScene.jsx";
import LevelPath from "./models/LevelPath.jsx";

const roles = ["Developer", "Data Analyst", "HR", "Tester", "Manager", "Designer"];

const levels = {
  Developer: [
    "Attend a stand-up meeting",
    "Write and debug code",
    "Push code to repository",
    "Deploy and monitor application",
    "Optimize application performance"
  ],
  DataAnalyst: [
    "Collect data from various sources",
    "Clean and preprocess data",
    "Analyze trends and insights",
    "Prepare reports",
    "Present findings to management"
  ],
  HR: [
    "Review resumes and applications",
    "Conduct interviews",
    "Onboard new hires",
    "Resolve employee concerns",
    "Organize team events"
  ],
  Tester: [
    "Understand project requirements",
    "Create test cases",
    "Perform manual and automated tests",
    "Report bugs",
    "Ensure quality assurance"
  ],
  Manager: [
    "Create a project roadmap",
    "Assign tasks to team members",
    "Monitor progress and resolve issues",
    "Hold a review meeting",
    "Deliver the final project"
  ],
  Designer: [
    "Sketch initial concepts",
    "Create wireframes",
    "Design UI components",
    "Test usability",
    "Finalize and present design"
  ]
};

const ITRoles=() =>{
  const [role, setRole] = useState(null);
  const [level, setLevel] = useState(0);
  const [play, { stop }] = useSound("/background-music.mp3", { volume: 0.5, loop: true });
  const [progress, setProgress] = useState(0);
  const [taskInput, setTaskInput] = useState("");
  const [taskCompleted, setTaskCompleted] = useState(false);

  useEffect(() => {
    if (role) play();
  }, [role, play]);

  const handleNextLevel = () => {
    if (!taskCompleted) return;
    
    if (level < levels[role].length - 1) {
      setLevel(level + 1);
      setProgress(((level + 1) / levels[role].length) * 100);
      setTaskCompleted(false);
      setTaskInput("");
    } else {
      alert("Game Completed! You have successfully completed all levels.");
      setRole(null);
      setLevel(0);
      setProgress(0);
      setTaskCompleted(false);
      stop();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-gray-900 text-white relative" style={{ backgroundImage: "url('/office-background.jpg')" }}>
      {!role ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Select Your Role</h1>
          <div className="grid grid-cols-3 gap-4">
            {roles.map((r) => (
              <Button key={r} onClick={() => setRole(r)} className="p-3 bg-blue-500 hover:bg-blue-600">
                {r}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center relative w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">{role} Level {level + 1}</h2>
          <Canvas className="w-full h-[400px] bg-gray-800 rounded-lg shadow-lg mb-4">
            <ambientLight intensity={0.5} />
            <OrbitControls />
            <OfficeScene role={role} level={level} />
            <Avatar3D role={role} taskCompleted={taskCompleted} />
          </Canvas>
          <LevelPath level={level} totalLevels={levels[role].length} curved={true} />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-800 rounded-3xl shadow-lg mb-4 border border-gray-600"
          >
            <p className="text-lg">{levels[role][level]}</p>
          </motion.div>
          
          <div className="mb-4 w-1/2">
            {level === 0 && (
              <div>
                <Input
                  placeholder="Complete the task description..."
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="p-2 rounded bg-gray-700 w-full"
                />
                <Button onClick={() => setTaskCompleted(taskInput.length > 5)} className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                  Submit Task
                </Button>
              </div>
            )}
            {level > 0 && (
              <Button onClick={() => setTaskCompleted(true)} className="bg-yellow-500 hover:bg-yellow-600">
                Complete Task
              </Button>
            )}
          </div>

          <Progress value={progress} className="w-1/2 mb-4" />
          <Button 
            onClick={handleNextLevel} 
            disabled={!taskCompleted} 
            className={`p-3 ${taskCompleted ? "bg-green-500 hover:bg-green-600" : "bg-gray-500 cursor-not-allowed"}`}
          >
            {level < levels[role].length - 1 ? "Next Level" : "Finish"}
          </Button>
        </div>
      )}
    </div>
  );
}
export default ITRoles;