import React from 'react';
import { useState } from 'react';

const CompanyProjects = () => {

    let companyName = "Adithya";
     let companyCode = "ggggg"
     const [projects, setProjects] = useState([
        { id: 1, name: 'Project One', description: 'Description for project one' },
        { id: 2, name: 'Project Two', description: 'Description for project two' },
        // Add more projects here
      ]);
    
      const handleCreateProject = () => {
        console.log('Create Project button clicked');
        // Add logic to create a new project here
      };
    

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full mx-auto">
      <div className="border-b border-gray-700 pb-4 mb-4">
        <h1 className="text-3xl font-bold">{companyName}</h1>
        <p className="text-sm text-gray-400">{companyCode}</p>
      </div>
      <button
        onClick={handleCreateProject}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Create Project
      </button>
      <ul className="mt-6 space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="bg-gray-300 p-4 rounded-lg shadow hover:bg-gray-500 transition duration-300"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-800">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyProjects;
