import React, { useContext, useState } from "react";
import { popUpContext } from "../Context/PopUpContext";
import axios from "axios";

const TaskPopUp = (projectId,companyId) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [progress, setProgress] = useState("Not Started");
  const [assign, setAssign] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [users,setUsers]=useState([]);
  const {setTaskPopUp} = useContext(popUpContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Mock list of users to assign the task
 
  const handleCreateTask = async(e) => {


    e.preventDefault();
    // Logic for creating the task


    const createProject = await axios.post("http://localhost:8000/company/createTaskAndAssign",{
        taskName:taskName, projectId:projectId, userId:assign, taskProgress:progress, priority:priority, dueDate:dueDate
    },{withCredentials:true})

    // Reset form fields
    setTaskName("");
    setPriority("Medium");
    setProgress("Not Started");
    setAssign("");
    setDueDate("");
    setSuccess(true);
    setTimeout(() => setTaskPopUp(false), 2000);
     // Close the popup after task creation
  };


  const retrieveWorkers = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/company/getWorkers",{companyId},{withCredentials:true});
      setUsers(response.data)
      console.log(users);
      
    } catch (error) {
      console.log("Unable to retrieve",error);
      
      
    }
   

    
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-black text-2xl font-bold"
          onClick={()=>setJoinPopUp(false)}
        >
          &times;
        </button>

        <h2 className="text-3xl font-semibold mb-6 text-black">Create Task</h2>

        {/* Form */}
        <form onSubmit={handleCreateTask}>
          {/* Task Name */}
          <div className="mb-4">
            <label htmlFor="taskName" className="block text-black mb-2">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              className="w-full p-3 border border-black rounded-lg focus:outline-none"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          {/* Priority */}
          <div className="mb-4">
            <label htmlFor="priority" className="block text-black mb-2">
              Priority
            </label>
            <select
              id="priority"
              className="w-full p-3 border border-black rounded-lg focus:outline-none"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <label htmlFor="progress" className="block text-black mb-2">
              Progress
            </label>
            <select
              id="progress"
              className="w-full p-3 border border-black rounded-lg focus:outline-none"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          {/* Assign (Dropdown) */}
          <div className="mb-4">
            <label htmlFor="assign" className="block text-black mb-2">
              Assign To
            </label>
            <select
              id="assign"
              className="w-full p-3 border border-black rounded-lg focus:outline-none"
              value={assign}
              onChange={(e) => setAssign(e.target.value)}
              required
            >
              <option value="">Select Assignee</option>
              {users.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div className="mb-4">
            <label htmlFor="dueDate" className="block text-black mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full p-3 border border-black rounded-lg focus:outline-none"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskPopUp;
