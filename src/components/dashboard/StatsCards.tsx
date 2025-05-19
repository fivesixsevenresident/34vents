"use client";


import { useEffect, useState } from 'react';
import { useProjects } from '@/mockData/useProjects';




export default function StatsCards() {
 const [stats, setStats] = useState({
   totalProjects: 0,
   activeProjects: 0,
   completedTasks: 0,
   pendingTasks: 0
 });
 const projectsData = useProjects();
const tasksData = projectsData.tasks


 useEffect(() => {
   // Calculate stats from mock data
   const totalProjects = projectsData.projects.length;
   const activeProjects = projectsData.projects.filter(project => project.status === 'active').length;
   const completedTasks = tasksData.tasks.filter(task => task.status === 'completed').length;
   const pendingTasks = tasksData.tasks.filter(task => task.status !== 'completed').length;


   setStats({
     totalProjects,
     activeProjects,
     completedTasks,
     pendingTasks
   });
 }, []);


 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
     <StatCard
       title="Total Projects"
       value={stats.totalProjects}
       icon="📊"
       color="bg-blue-50"
       textColor="text-blue-700"
     />
     <StatCard
       title="Active Projects"
       value={stats.activeProjects}
       icon="🚀"
       color="bg-green-50"
       textColor="text-green-700"
     />
     <StatCard
       title="Completed Tasks"
       value={stats.completedTasks}
       icon="✅"
       color="bg-emerald-50"
       textColor="text-emerald-700"
     />
     <StatCard
       title="Pending Tasks"
       value={stats.pendingTasks}
       icon="⏳"
       color="bg-amber-50"
       textColor="text-amber-700"
     />
   </div>
 );
}


interface StatCardProps {
 title: string;
 value: number;
 icon: string;
 color: string;
 textColor: string;
}


function StatCard({ title, value, icon, color, textColor }: StatCardProps) {
 return (
   <div className={`${color} p-6 rounded-lg shadow-sm`}>
     <div className="flex items-center justify-between">
       <div>
         <p className="text-sm font-medium text-gray-600">{title}</p>
         <p className={`text-2xl font-bold ${textColor} mt-2`}>{value}</p>
       </div>
       <div className="text-3xl">{icon}</div>
     </div>
   </div>
 );
}