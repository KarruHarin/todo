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
const [CompanyDetails,setCompanyDetails] = useState([{}])
const {setProjectPopUp} = useContext(popUpContext)
useEffect(()=>{
  const fetchDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/company/getCompanyDetails",{companyId},{ withCredentials: true });
      console.log("res = ",res.data.data);
      setCompanyDetails(res.data.data); // Assuming res.data contains the list of companies
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
fetchDetails()



},[])
    console.log("details",CompanyDetails[0])
      const handleCreateProject = () => {

        console.log('Create Project button clicked');
        // Add logic to create a new project here
      //  const res = axios.post("http:/localhost:8000/company/createProject")
      
        };
    
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
{/* {!Loading&&CompanyDetails.length>0?(
      <ul className="mt-6 space-y-4">
  
      {
      CompanyDetails&&CompanyDetails.projects?.length>0?
         (CompanyDetails.projects?.map((project) => {
   <ProjectList projectName={project.name} projectDescription={project.description}/>
}))
  :<>No Projects</> }
    
    </ul>
)

:<>loading........</>

} */}
</div>
  );
};

export default CompanyProjects;


