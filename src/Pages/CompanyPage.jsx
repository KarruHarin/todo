import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCompanies } from '../Authentication/company';
import ProjectList from '../Components/ProjectList';
import { popUpContext } from '../Context/PopUpContext';
import { setCookie } from '../cookie';
const CompanyProjects = () => {
  const [loading, setLoading] = useState(false);
  const { companyId } = useParams();
  const [projects, setProjects] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const { setProjectPopUp } = useContext(popUpContext);
  const { setCompanyId } = useContext(popUpContext);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    setCompanyId(companyId);
    setCookie("companyId",companyId,1)
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.post("http://localhost:8000/company/getCompanyDetails", { companyId }, { withCredentials: true });
        setProjects(res.data.data[0].projects);
        console.log(projects);
        
        setCompanyDetails(res.data.data[0]);
        console.log(companyDetails);
        
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [companyId]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(companyDetails.companyCode);
    setCopySuccess('Copied to clipboard!');
    setTimeout(() => setCopySuccess(''), 3000);
  };

  return (
    <div className="bg-blue-50 text-gray-900 p-6 rounded-lg shadow-lg w-full mx-auto">
      <div className="border-b border-gray-300 pb-4 mb-6">
        {/* Company Name and Code */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{companyDetails.companyName}</h1>
            <div className="flex items-center mt-2">
              <p className="text-sm text-gray-500">{companyDetails.companyCode}</p>
              <button
                onClick={handleCopyCode}
                className="ml-3 text-blue-500 hover:text-blue-600 transition-colors duration-300"
              >
                Copy Code
              </button>
            </div>
            {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}
          </div>
        </div>
        {/* Info Message */}
        <p className="text-sm text-gray-400 mt-2">
          Share this code with your colleagues so they can join the company.
        </p>
      </div>

      {/* Create Project Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={() => setProjectPopUp(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          + Create Project
        </button>
      </div>

      {/* Project List or Loading */}
      {!loading ? (
        <ul className="mt-6 space-y-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectList
                key={index}
                ProjectId={project.projectId}
                projectName={project.projectName}
                projectDescription={project.projectDescription}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center">No projects found. Start by creating a new project.</p>
          )}
        </ul>
      ) : (
        <div className="flex justify-center items-center mt-10">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default CompanyProjects;
