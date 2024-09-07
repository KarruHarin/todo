import React from 'react'

function ProjectList({projectName,projectDescription}) {
    return (
        <li
     
        className="bg-gray-300 p-4 rounded-lg shadow hover:bg-gray-500 transition duration-300"
      >
        <h2 className="text-xl font-semibold">{projectName}</h2>
        <p className="text-gray-800">{projectDescription}</p>
      </li>
    )
}

export default ProjectList
