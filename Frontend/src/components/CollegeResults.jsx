import { useLocation } from "react-router-dom";

const CollegeResults = () => {
  const location = useLocation();
  const colleges = location.state?.colleges || [];

  return (
    <div>
      <h1>College Results</h1>
      {colleges.length === 0 ? <p>No colleges found</p> : (
        <ul>
          {colleges.map((college, index) => (
            <li key={index}>
              <a href={college.web_pages?.[0]} target="_blank" rel="noopener noreferrer">
                {college.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default CollegeResults;