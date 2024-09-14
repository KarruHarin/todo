import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProjectList({ projectName, projectDescription, ProjectId }) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/Project/${ProjectId}`);
  };

  return (
    <li
      onClick={onClick}
      className="cursor-pointer bg-white shadow-lg rounded-lg p-4 mb-4 transition-transform transform hover:shadow-xl hover:bg-gray-50"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{projectName}</h2>
      <p className="text-gray-600">{projectDescription}</p>
    </li>
  );
}

export default ProjectList;
