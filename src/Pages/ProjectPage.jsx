import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { popUpContext } from '../Context/PopUpContext';
import axios from 'axios';
import TaskCard from '../Components/TodosList';
import { setCookie } from '../cookie';
 // Import the TaskCard component

function ProjectPage() {
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const { setTaskPopUp } = useContext(popUpContext);
  const { setProjectId } = useContext(popUpContext);
  const { companyId, updated } = useContext(popUpContext);


  useEffect(() => {
    setProjectId(projectId);
    setCookie("projectId",projectId,1)
    

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.post(
          `http://localhost:8000/company/project/${projectId}`,
          {},
          { withCredentials: true }
        );

        setProjectDetails(res.data.data[0]); // Assuming res.data contains the project details
        setTasks(res.data.data[0].todos); // Assuming 'todos' contains the list of tasks
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [projectId, updated]);

  return (
    <div className="bg-blue-50 text-black p-6 rounded-lg shadow-lg w-full mx-auto h-screen overflow-auto">
      {/* Project Details */}
      <div className="border-b border-green-300 pb-4 mb-4">
        <h1 className="text-3xl font-bold text-green-700">{projectDetails.projectName}</h1>
        <p className="text-sm text-green-500">{projectDetails.projectDescription}</p>
      </div>

      {/* Create Task Button */}
      <button
        onClick={() => setTaskPopUp(true)}
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 shadow-md"
      >
        + Create Task
      </button>

      {/* Task List */}
      {!loading ? (
        tasks.length > 0 ? (
          <ul className="mt-6 space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-6">No tasks found.</p>
        )
      ) : (
        <div className="flex justify-center items-center mt-10">
          <svg
            className="animate-spin h-8 w-8 text-green-600"
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
}

export default ProjectPage;
