const ProgressBar = ({ progress }) =>{
    return (
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  }
export default ProgressBar;