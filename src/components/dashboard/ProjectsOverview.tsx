"use client";

import { useEffect, useState } from "react";
import { useProjects } from "@/mockData/useProjects";

interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  teamMembers: string[];
  taskIds: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsOverview() {
  const projectsData = useProjects();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Get projects and sort by progress
    const sortedProjects = [...projectsData.projects].sort(
      (a, b) => b.progress - a.progress
    );
    setProjects(sortedProjects);
  }, [projectsData.projects]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Projects Overview</h2>

      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const projectsData = useProjects();
  const tasksData = projectsData.tasks;

  const statusColor =
    projectsData.projectStatuses.find(
      (status) => status.name === project.status
    )?.color || "#DBEAFE";

  // Get task count for this project
  const totalTasks = project.taskIds.length;
  const completedTasks = project.taskIds.filter(
    (taskId) =>
      tasksData.tasks.find((task) => task.id === taskId)?.status === "completed"
  ).length;

  return (
    <div className="border border-gray-100 rounded-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{project.name}</h3>
        <span
          className="px-2 py-1 text-xs rounded-full"
          style={{ backgroundColor: statusColor }}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {project.description}
      </p>

      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span>{project.progress}% complete</span>
          <span>
            {completedTasks}/{totalTasks} tasks
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
        <div>
          <span>Start: {project.startDate}</span>
          <span className="mx-2">|</span>
          <span>End: {project.endDate}</span>
        </div>
        <div className="flex -space-x-2">
          {project.teamMembers.slice(0, 3).map((member, index) => {
            const user = tasksData.users.find(
              (user) => user.username === member
            );
            return (
              <div
                key={index}
                className="w-6 h-6 rounded-full border border-white overflow-hidden bg-gray-200"
                title={user?.name || member}
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                    {member.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}
          {project.teamMembers.length > 3 && (
            <div className="w-6 h-6 rounded-full border border-white bg-gray-100 flex items-center justify-center text-xs font-medium">
              +{project.teamMembers.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
