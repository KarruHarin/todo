import React, { useContext, useState, useEffect } from "react";
import { popUpContext } from "../Context/PopUpContext";
import axios from "axios";

const TaskPopUpComp = ({ projectId, companyId }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [progress, setProgress] = useState("Not Started");
  const [assign, setAssign] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [users, setUsers] = useState([]);
  const { setTaskPopUp, setUpdated } = useContext(popUpContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.post("http://localhost:8000/company/getWorkers", { companyId }, { withCredentials: true });
        setUsers(response.data.data); // Assuming response.data contains user objects like { _id, name }
      } catch (error) {
        console.error("Unable to retrieve workers", error);
      }
    };

    fetchWorkers();
  }, [projectId, companyId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const priorityMap = {
      Low: 1,
      Medium: 2,
      High: 3
    };

    const progressMap = {
      "Not Started": 1,
      "In Progress": 2,
      Done: 3
    };

    try {
      const formattedDueDate = new Date(dueDate).toISOString();

      await axios.post(
        "http://localhost:8000/company/createTaskAndAssign",
        {
          taskName,
          projectId,
          userId: assign,
          taskProgress: progressMap[progress], // Convert progress to number
          priority: priorityMap[priority], // Convert priority to number
          dueDate: formattedDueDate,
          companyId
        },
        { withCredentials: true }
      );

      setUpdated(prev => !prev);
      setSuccess(true);
      setTimeout(() => setTaskPopUp(false), 2000);

      // Reset form fields
      setTaskName("");
      setPriority("Medium");
      setProgress("Not Started");
      setAssign("");
      setDueDate("");
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-200">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 text-2xl font-bold hover:text-gray-800 transition-colors"
          onClick={() => setTaskPopUp(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Create Task</h2>

        {/* Form */}
        <form onSubmit={handleCreateTask} className="space-y-6">
          {/* Task Name */}
          <div>
            <label htmlFor="taskName" className="block text-gray-700 text-sm font-medium mb-2">
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-gray-700 text-sm font-medium mb-2">
              Priority
            </label>
            <select
              id="priority"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Progress */}
          <div>
            <label htmlFor="progress" className="block text-gray-700 text-sm font-medium mb-2">
              Progress
            </label>
            <select
              id="progress"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          {/* Assign (Dropdown) */}
          <div>
            <label htmlFor="assign" className="block text-gray-700 text-sm font-medium mb-2">
              Assign To
            </label>
            <select
              id="assign"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={assign}
              onChange={(e) => setAssign(e.target.value)}
              required
            >
              <option value="">Select Assignee</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-gray-700 text-sm font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </button>

          {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
          {success && <p className="text-green-500 mt-4 text-sm">Task created successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default TaskPopUpComp;
