import React, { useEffect, useState } from 'react';
import RealProjects from './RealProjects';
import Filter from './Filter';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
const ProjectList = ({ filterProjects }) => {
  const { allProjects, searchedQuery } = useSelector((store) => store.projects);
  const [filtersProjects, setfilterProjects] = useState(allProjects);

  // Sync filtersProjects state with the prop filterProjects
  useEffect(() => {
    if (filterProjects && filterProjects.length >= 0) {
      setfilterProjects(filterProjects);
    }
  }, [filterProjects]);

  // Additional filtering logic (if needed) based on Redux searchedQuery
  useEffect(() => {
    if (searchedQuery) {
      const filteredProjects = allProjects.filter((project) => {
        return (
          project.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          project.category.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          project.technologies?.some((tech) =>
            tech.toLowerCase().includes(searchedQuery.toLowerCase())
          ) ||
          project.roles?.some((role) =>
            role.toLowerCase().includes(searchedQuery.toLowerCase())
          )
        );
      });
      setfilterProjects(filteredProjects);
    } else {
      setfilterProjects(allProjects);
    }
  }, [allProjects, searchedQuery]);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-3xl font-bold px-8">
        <span className="text-blue-600">Projects</span>: Find and build
      </h1>

      <div className="mt-5">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full sm:w-1/4 bg-gray-100 p-4 rounded-md shadow-md sm:ml-5">
            <Filter />
          </div>

          <div className="flex-1 sm:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:ml-8 sm:mr-2 ml-2 mr-2">
              {filtersProjects.length === 0 ? (
                <h2 className="col-span-full text-center text-lg font-semibold text-gray-600">
                  No projects found
                </h2>
              ) : (
                filtersProjects.map((project) => (
                  <motion.div initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={project._id}
                    className="border border-gray-400 rounded-md p-4 shadow-sm bg-white 
                               transition-transform transform hover:scale-105 hover:shadow-lg"
                  >
                    <RealProjects project={project} data={project} />
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
