import React from 'react';

const TaskProgress = ({ tasks }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'bg-red-200 text-red-600'; // High
      case 2: return 'bg-orange-200 text-orange-600'; // Medium
      case 3: return 'bg-yellow-200 text-yellow-600'; // Low
      default: return '';
    }
  };

  const taskByProgress = {
    notStarted: tasks.filter((task) => task.progress === 1), // Not started
    inProgress: tasks.filter((task) => task.progress === 2), // In progress
    completed: tasks.filter((task) => task.progress === 3),  // Completed
  };

  return (
    <div className="task-container font-poppins grid grid-cols-3 gap-4">
      {/* Not Started Section */}
      <div className="not-started-section p-4 rounded-lg shadow-md bg-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Not Started</h2>
        {taskByProgress.notStarted.map((task, idx) => (
          <div key={idx} className={`task-item p-2 mb-2 rounded ${getPriorityColor(task.priority)}`}>
            <span className="font-semibold">{task.name}</span>
            <p className="text-sm">Priority: {task.priority}</p>
          </div>
        ))}
      </div>

      {/* In Progress Section */}
      <div className="in-progress-section p-4 rounded-lg shadow-md bg-blue-100">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">In Progress</h2>
        {taskByProgress.inProgress.map((task, idx) => (
          <div key={idx} className={`task-item p-2 mb-2 rounded ${getPriorityColor(task.priority)}`}>
            <span className="font-semibold">{task.name}</span>
            <p className="text-sm">Priority: {task.priority}</p>
          </div>
        ))}
      </div>

      {/* Completed Section */}
      <div className="completed-section p-4 rounded-lg shadow-md bg-green-100">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Completed</h2>
        {taskByProgress.completed.map((task, idx) => (
          <div key={idx} className={`task-item p-2 mb-2 rounded ${getPriorityColor(task.priority)}`}>
            <span className="font-semibold">{task.name}</span>
            <p className="text-sm">Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskProgress;
