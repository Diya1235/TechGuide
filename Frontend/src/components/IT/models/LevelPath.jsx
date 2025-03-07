import { motion } from "framer-motion";

const LevelPath=({ level, totalLevels, curved })=> {
  return (
    <div className="flex items-center justify-center my-4 w-full">
      {[...Array(totalLevels)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-12 h-12 mx-2 rounded-full ${
            i <= level ? "bg-green-500" : "bg-gray-400"
          } transition-all duration-300 ease-in-out`}
          style={{ borderRadius: curved ? "50%" : "5px" }}
        />
      ))}
    </div>
  );
}
export default LevelPath;