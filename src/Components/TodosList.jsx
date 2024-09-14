import axios from "axios";
import React, { useContext, useState } from "react";
import { popUpContext } from "../Context/PopUpContext";

const TaskCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState(task.taskId);

  // Independent states for each task field
  const [taskName, setTaskName] = useState(task.todoId);
  const [priority, setPriority] = useState(task.priority);
  const [progress, setProgress] = useState(task.taskProgress);
  const [asign, setAsign] = useState(task.asign);
  const [dueDate, setDueDate] = useState(task.duedate);
  const { setUpdated } = useContext(popUpContext);

  const Mdate = new Date(dueDate);
  const priorityMap = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const progressMap = {
    1: "Not Started",
    2: "In Progress",
    3: "Done",
  };

  const handleSave = async () => {
    try {
      await axios.post(
        "http://localhost:8000/company/task/edit",
        { taskId, taskName, priority, asign, progress, dueDate },
        { withCredentials: true }
      );
      setUpdated((prev) => !prev);
    } catch (error) {
      console.error("Unable to Edit", error);
    } finally {
      setIsEditing(false);
    }
  };

  const deleteTask = async () => {
    try {
      await axios.post(
        "http://localhost:8000/company/task/delete",
        { taskId },
        { withCredentials: true }
      );
      setUpdated((prev) => !prev);
    } catch (error) {
      console.error("Unable to delete Task", error);
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 shadow-md rounded-xl p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
      <div>
        {/* Task Name */}
        <div className="mb-4">
          {isEditing ? (
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full text-lg font-semibold bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          ) : (
            <h3 className="text-xl font-bold text-gray-800">{task.todoId}</h3>
          )}
        </div>

        {/* Task Priority */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Priority:</span>
            {isEditing ? (
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="ml-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>
            ) : (
              <span className="ml-2">{priorityMap[task.priority]}</span>
            )}
          </p>
        </div>

        {/* Task Progress */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Progress:</span>
            {isEditing ? (
              <select
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                className="ml-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option value={1}>Not Started</option>
                <option value={2}>In Progress</option>
                <option value={3}>Done</option>
              </select>
            ) : (
              <span className="ml-2">{progressMap[task.taskProgress]}</span>
            )}
          </p>
        </div>

        {/* Assigned To */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Assigned To:</span>
            {isEditing ? (
              <input
                type="text"
                value={asign}
                onChange={(e) => setAsign(e.target.value)}
                className="ml-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            ) : (
              <span className="ml-2">{task.asign}</span>
            )}
          </p>
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Due Date:</span>
            {isEditing ? (
              <input
                type="date"
                value={new Date(dueDate).toISOString().substr(0, 10)}
                onChange={(e) => setDueDate(e.target.value)}
                className="ml-2 bg-gray-100 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            ) : (
              <span className="ml-2">{Mdate.toLocaleDateString()}</span>
            )}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-3 mt-4">
        {isEditing ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300"
          onClick={deleteTask}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
