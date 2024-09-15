import React, { useEffect } from 'react'
import CompanyTaskCard from '../Components/CompanyTasks';

function CompanyTaskPage() {

   useEffect(()=>{

   },[])

  return (
    <div className="space-y-4">
    {data.map((task) => (
      <CompanyTaskCard key={task._id} task={task} />
    ))}
  </div>
  )
}


const data = [
    {
      _id: "66e676eda817037dc8991888",
      taskName: "Task 2",
      taskProgress: 2,
      priority: 1,
      dueDate: "2024-09-18T00:00:00.000Z",
      createdAt: "2024-09-15T05:55:57.992Z",
    }
  ];

export default CompanyTaskPage