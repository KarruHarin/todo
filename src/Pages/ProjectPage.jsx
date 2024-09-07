import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { popUpContext } from '../Context/PopUpContext';
import axios from 'axios';

function ProjectPage() {
    const [Loading,setLoading] = useState(false)
  const {projectId} = useParams()
  const [Task, setTask] = useState([]);
  const [ProjectDetails,setProjectDetails] = useState([{}])
  const {setProjectPopUp} = useContext(popUpContext)
  useEffect(()=>{
    
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.post(`http://localhost:8000/company/${projectId}`,{ withCredentials: true });
    
        setProjectDetails(res.data.data[0]); // Assuming res.data contains the list of companies
        if (res.data.data[0].Task && res.data.data[0].Task.length > 0) {
            console.log("here",res.data.data[0].Task)
                    
          const res = await axios.post(
            `http://localhost:8000/company/Task/${projectId}`,{withCredentials:true}
          );
console.log(res);
        //   await fetchTask(res.data.data[0].Task);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
  
    };
  
  
  fetchDetails()
  
  
  
  },[projectId])
  

console.log("len",ProjectDetails.todos)
  
      
    return (
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full mx-auto">
        <div className="border-b border-gray-700 pb-4 mb-4">
            
          <h1 className="text-3xl font-bold">{ProjectDetails.projectName}</h1>
          <p className="text-sm text-gray-400">{ProjectDetails.projectDescription}</p>
            
        
        </div>
        <button
          onClick={()=>setTaskPopUp(true)}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Create Task
        </button>
        {!Loading && ProjectDetails.todos > 0 ? (
          <ul className="mt-6 space-y-4">
            {Task.length > 0 ? (
              Task.map((project, index) => (
                <TodosList
                
                  key={index} // Adding key prop

                  TodoName={Todo.TodoName}
                  Assignedto={Todo.assign}
                />
              ))
            ) : (
              <>No Task</>
            )}
          </ul>
        ) : (
          <>loading........</>
        )}
  </div>
    );
  };
  

export default ProjectPage
