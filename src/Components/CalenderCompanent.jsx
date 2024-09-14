import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs'; // Library to handle dates
import 'dayjs/locale/en'; // For date localization

const Calendar = ({ tasks }) => {
  const [currentWeek, setCurrentWeek] = useState(dayjs()); // This will represent the current week
  const [dates, setDates] = useState([]);

  useEffect(() => {
    generateWeek(currentWeek);
  }, [currentWeek]);

  // Function to generate the current week (7 days)
  const generateWeek = (weekStart) => {
    const startOfWeek = dayjs(weekStart).startOf('week'); // Start of the current week
    const tempDates = [];

    for (let i = 0; i < 7; i++) {
      tempDates.push(startOfWeek.add(i, 'day')); // Add each day of the week
    }

    setDates(tempDates); // Set the 7 days for the week
  };

  const getTasksForDate = (date) => {
    return tasks.filter((task) => dayjs(task.dueDate).isSame(date, 'day')); // Filter tasks by date
  };

  // Function to determine task color based on priority
  const getTaskColor = (priority) => {
    switch (priority) {
      case 3:
        return 'bg-red-300';
      case 2:
        return 'bg-yellow-300';
      case 1:
        return 'bg-green-300';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="calendar-container font-poppins p-4">
      <div className="header flex justify-between items-center mb-4">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-transform duration-300"
          onClick={() => setCurrentWeek(currentWeek.subtract(1, 'week'))}
        >
          Prev
        </button>
        <h2 className="text-2xl font-semibold">{currentWeek.format('MMMM YYYY')}</h2>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-transform duration-300"
          onClick={() => setCurrentWeek(currentWeek.add(1, 'week'))}
        >
          Next
        </button>
      </div>
      
      <div className="calendar-grid grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
          <div key={idx} className="day-header text-center font-bold text-gray-600">{day}</div>
        ))}

        {dates.map((date, idx) => (
          <div 
            key={idx} 
            className={`calendar-day border p-4 min-h-[150px] flex flex-col justify-between rounded-lg shadow-lg transition-transform duration-300 ease-in-out ${
              date.isSame(dayjs(), 'day') ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            <span className="date-number text-xl font-bold text-gray-800">{date.date()}</span>
            <div className="task-list flex-1 overflow-auto mt-2">
              {getTasksForDate(date).map((task, idx) => (
                <div key={idx} className={`task-item ${getTaskColor(task.priority)} text-sm rounded px-2 py-1 mb-1 shadow-md transition-transform duration-300 ease-in-out`}>
                  {task.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
