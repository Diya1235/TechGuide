import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import Footer from './Footer';
import ProjectList from './ProjectList';
import useGetAllProjects from '@/hooks/useGetAllProjects';

const ProjectCard = () => {
  useGetAllProjects(); // Fetch all projects

  const { allProjects } = useSelector((store) => store.projects);
  const [filterProjects, setFilterProjects] = useState([]); // Stores filtered or all projects
  const [searchText, setSearchText] = useState(''); // Search input state

  // Handle project filtering logic
  useEffect(() => {
    if (searchText.trim()) {
      // Filter based on searchText
      const lowercasedQuery = searchText.toLowerCase();
      const filtered = allProjects.filter((project) => {
        return (
          project.title.toLowerCase().includes(lowercasedQuery) ||
          project.description?.toLowerCase().includes(lowercasedQuery) ||
          project.category?.toLowerCase().includes(lowercasedQuery) ||
          project.technologies?.some((tech) => tech.toLowerCase().includes(lowercasedQuery)) ||
          project.roles?.some((role) => role.toLowerCase().includes(lowercasedQuery))
        );
      });
      setFilterProjects(filtered);
    } else {
      // Show all projects when no search query
      setFilterProjects(allProjects);
    }
    console.log(filterProjects);
  }, [searchText, allProjects]);

  return (
    <>
      <Navbar />
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          {/* Trending Button with Animation */}
          <button className="bg-gray-500 text-white py-2 px-5 rounded-full flex items-center justify-center gap-2 mx-auto transform transition-all duration-300 ease-in-out hover:scale-105 hover:bg-yellow-500 shadow-lg">
            <span className="text-xl font-bold">⚡</span>
            <span className="sparkling-text mr-1">NEW</span>
          </button>

          {/* Main Title */}
          <h1 className="text-4xl font-bold">
            <span>
              WORRIED OF <span className="text-blue-500">PROJECTS?</span>
            </span>
            <br />
            <span className="text-blue-800">THEN</span> <br /> YOU ARE AT THE <br />
            <span className="text-blue-500">CORRECT DESTINATION..</span>
          </h1>
          <p>Projects are the key to the door of getting a great job!</p>

          {/* Search Bar */}
          <div className="w-[60%] flex shadow-lg border border-blue-500 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Search projects... (e.g., Portfolio)"
              className="outline-none border-none w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button className="rounded-r-full bg-blue-600">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Display Project List */}
      <div>
        {searchText && (
          <p className="text-center text-lg font-semibold mb-4">
            {filterProjects.length} project{filterProjects.length !== 1 ? 's' : ''} found.
          </p>
        )}
        <ProjectList filterProjects={filterProjects} />
      </div>

      <Footer />
    </>
  );
};

export default ProjectCard;
