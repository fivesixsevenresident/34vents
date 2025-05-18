import TasksOverview from '@/components/dashboard/TasksOverview';
import ProjectsOverview from '@/components/dashboard/ProjectsOverview';
import StatsCards from '@/components/dashboard/StatsCards';


export default function Dashboard() {
 return (
   <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
     <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
    
     <StatsCards />
    
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
       <ProjectsOverview />
       <TasksOverview />
     </div>
   </div>
 );
}



