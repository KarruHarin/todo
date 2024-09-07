import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCompanies } from '../Authentication/company';
import ProjectList from '../Components/ProjectList';
import { popUpContext } from '../Context/PopUpContext';

const CompanyProjects = () => {
  const [Loading,setLoading] = useState(false)
const {companyId} = useParams()
const [Projects, setProjects] = useState([]);
const [CompanyDetails,setCompanyDetails] = useState([{}])
const {setProjectPopUp} = useContext(popUpContext)
useEffect(()=>{
  
  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/company/getCompanyDetails",{companyId},{ withCredentials: true });
      console.log("res = ",res.data.data[0].projects);
      setCompanyDetails(res.data.data); // Assuming res.data contains the list of companies
      if (res.data.data[0].projects && res.data.data[0].projects.length > 0) {
        await fetchProjects(res.data.data[0].projects);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  };


fetchDetails()



},[companyId])

const fetchProjects=async(projects)=>{
  try {
    const projectDetails = await Promise.all(
      projects.map(async (project) => {
      
        const res = await axios.post(
          `http://localhost:8000/company/${project.projectId}`,
       
        );
        console.log("pr = ",res.data.data)
        return res.data.data;
      })
    );
    
    const pro = projectDetails.map((p)=>(
      {
          projectId :p[0].projectId,
      projectDescription:p[0].projectDescription,
      projectName:p[0].projectName,
      todos:p[0].todos
    }))
    setProjects([pro][0])

  } catch (error) {
    console.error('Error fetching project details:', error);
  }
}
console.log(Projects)

    
  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full mx-auto">
      <div className="border-b border-gray-700 pb-4 mb-4">
        <h1 className="text-3xl font-bold">{CompanyDetails[0].companyName}</h1>
        <p className="text-sm text-gray-400">{CompanyDetails[0].companyCode}</p>
      </div>
      <button
        onClick={()=>setProjectPopUp(true)}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Create Project
      </button>
      {!Loading && CompanyDetails.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {Projects.length > 0 ? (
            Projects.map((project, index) => (
              <ProjectList
              
                key={index} // Adding key prop
                ProjectId = {project.projectId}
                projectName={project.projectName}
                projectDescription={project.projectDescription}
              />
            ))
          ) : (
            <>No Projects</>
          )}
        </ul>
      ) : (
        <>loading........</>
      )}
</div>
  );
};

export default CompanyProjects;


