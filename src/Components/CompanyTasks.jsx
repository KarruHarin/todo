import React, { useState } from 'react';

const CompanyTaskCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = useState(task.taskProgress);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleProgressChange = (e) => {
    setProgress(Number(e.target.value));
  };

  const handleSaveClick = () => {
    // Handle save logic (API call, etc.)
    console.log('New progress:', progress);
    setIsEditing(false);
  };

  // Dynamic color based on task priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1:
        return 'bg-red-100 text-red-500';
      case 2:
        return 'bg-yellow-100 text-yellow-500';
      case 3:
        return 'bg-green-100 text-green-500';
      default:
        return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{task.taskName}</h3>

        <div className="flex justify-between items-center mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(task.priority)}`}>
            Priority: {task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}
          </span>
          <span className="text-gray-500 text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>

        {isEditing ? (
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Progress: </label>
            <select
              value={progress}
              onChange={handleProgressChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value={1}>Not Started</option>
              <option value={2}>In Progress</option>
              <option value={3}>Done</option>
            </select>
          </div>
        ) : (
          <p className="text-gray-600 mb-4">
            Progress: {progress === 1 ? 'Not Started' : progress === 2 ? 'In Progress' : 'Done'}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
            <button
              onClick={handleEditClick}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyTaskCard;
