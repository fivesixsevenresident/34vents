"use client";


import { useEffect, useState } from 'react';
import { useTasks } from '@/mockData/useTasks';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  tags: string[];
  assignee?: string;
  createdAt: string;
  updatedAt: string;
}


export default function TasksOverview() {
 const [tasks, setTasks] = useState<Task[]>([]);
 const [filter, setFilter] = useState('all');
  const tasksData = useTasks();


 useEffect(() => {
   // Sort tasks by due date (closest first) and ensure assignee is a string
   const sortedTasks = [...tasksData.tasks]
     .map(task => ({
       ...task,
       assignee: task.assignee === null ? "" : task.assignee
     }))
     .sort((a, b) => {
       return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
     });
  
   setTasks(sortedTasks);
 }, [tasksData.tasks]);


 const filteredTasks = tasks.filter(task => {
   if (filter === 'all') return true;
   return task.status === filter;
 }).slice(0, 6); // Limit to 6 tasks


 return (
   <div className="bg-white rounded-lg shadow-sm p-6">
     <div className="flex justify-between items-center mb-4">
       <h2 className="text-xl font-semibold">Recent Tasks</h2>
       <div className="flex space-x-2 text-sm">
         <button
           onClick={() => setFilter('all')}
           className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
         >
           All
         </button>
         <button
           onClick={() => setFilter('todo')}
           className={`px-3 py-1 rounded-md ${filter === 'todo' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
         >
           To Do
         </button>
         <button
           onClick={() => setFilter('in-progress')}
           className={`px-3 py-1 rounded-md ${filter === 'in-progress' ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`}
         >
           In Progress
         </button>
       </div>
     </div>
    
     <div className="space-y-3">
       {filteredTasks.map(task => (
         <TaskItem key={task.id} task={task} />
       ))}
      
       {filteredTasks.length === 0 && (
         <div className="text-center py-6 text-gray-500">
           No tasks found matching the selected filter.
         </div>
       )}
     </div>
    
     {tasks.length > 6 && (
       <div className="mt-4 text-center">
         <button className="text-sm text-blue-600 hover:text-blue-800">
           View all tasks →
         </button>
       </div>
     )}
   </div>
 );
}


function TaskItem({ task }: { task: Task }) {
    const tasksData = useTasks();

 // Get status info
 const status = tasksData.statuses.find(s => s.name === task.status);
 const statusColor = status?.color || '#E5E7EB';
  // Get priority info
 const priority = tasksData.priorities.find(p => p.name === task.priority);
 const priorityColor = priority?.color || '#E5E7EB';
  // Get assignee info
 const assignee = tasksData.users.find(user => user.username === task.assignee);
  // Calculate if task is due soon (within 3 days)
 const now = new Date();
 const dueDate = new Date(task.dueDate);
 const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
 const isDueSoon = diffDays >= 0 && diffDays <= 3;
 const isOverdue = diffDays < 0;
  return (
   <div className="border border-gray-100 rounded-md p-3 hover:bg-gray-50 transition-colors">
     <div className="flex justify-between items-start mb-2">
       <h3 className="font-medium text-gray-900">{task.title}</h3>
       <div className="flex space-x-2">
         <span
           className="px-2 py-0.5 text-xs rounded-full"
           style={{ backgroundColor: statusColor }}
         >
           {status?.displayName || task.status}
         </span>
         <span
           className="px-2 py-0.5 text-xs rounded-full"
           style={{ backgroundColor: priorityColor }}
         >
           {priority?.displayName || task.priority}
         </span>
       </div>
     </div>
    
     <p className="text-sm text-gray-600 mb-3 line-clamp-1">{task.description}</p>
    
     <div className="flex justify-between items-center text-xs">
       <div className="flex items-center">
         {assignee ? (
           <div className="flex items-center">
             <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
               {assignee.avatarUrl ? (
                 <img src={assignee.avatarUrl} alt={assignee.name} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full bg-gray-200 flex items-center justify-center font-medium">
                   {assignee.name.charAt(0)}
                 </div>
               )}
             </div>
             <span className="text-gray-600">{assignee.name}</span>
           </div>
         ) : (
           <span className="text-gray-400">Unassigned</span>
         )}
       </div>
      
       <div className={`
         ${isOverdue ? 'text-red-600 font-medium' : ''}
         ${isDueSoon && !isOverdue ? 'text-amber-600 font-medium' : ''}
         ${!isDueSoon && !isOverdue ? 'text-gray-500' : ''}
       `}>
         {isOverdue ? '⚠ Overdue: ' : ''}
         Due {task.dueDate}
       </div>
     </div>
   </div>
 );
}



