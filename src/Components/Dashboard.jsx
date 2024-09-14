import React, { useContext, useEffect, useState } from 'react';
import Calendar from './CalenderCompanent';
import axios from 'axios';
import { authContext } from '../Context/authContext';
import TaskProgress from './Progress';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('calendar'); // To toggle between Calendar and Progress views
  const { user } = useContext(authContext);

  const getMyTasks = async () => {
    try {
      const res = await axios.post("http://localhost:8000/v1/users/getAllTasks", { userId: user._id }, { withCredentials: true });
      console.log(res);
      setTasks(res.data.data);
    } catch (error) {
      console.log("Error fetching Tasks", error);
    }
  };

  useEffect(() => {
    getMyTasks();
  }, [user?._id]);

  return (
    <div className="w-full">
      {/* Stylish NavBar */}
      <nav className="navbar flex justify-between items-center bg-white text-black p-4">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <div className="view-selector flex gap-4">
          <button 
            className={`px-4 py-2 rounded-md text-lg ${view === 'calendar' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600 transition-all text-white`}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-lg ${view === 'progress' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600 transition-all text-white`}
            onClick={() => setView('progress')}
          >
            Progress View
          </button>
        </div>
      </nav>

      {/* Conditional Rendering based on selected view */}
      <div className="content mt-6 p-4">
        {view === 'calendar' ? (
          <Calendar tasks={tasks} />
        ) : (
          <TaskProgress tasks={tasks} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
