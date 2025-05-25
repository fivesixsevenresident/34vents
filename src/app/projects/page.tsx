"use client";

import { fetchProjects } from "@/mockData/fetchProjects";
import Link from "next/link";
import { useState } from "react";

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const projectsData = fetchProjects();
  const tasksData = projectsData.tasks;

  // Filter projects based on selected status
  const filteredProjects = projectsData.projects.filter((project) => {
    if (filter === "all") return true;
    return project.status === filter;
  });

  // Sort projects by progress (descending)
  const sortedProjects = [...filteredProjects].sort(
    (a, b) => b.progress - a.progress
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === "all"
              ? "bg-blue-100 text-blue-800 font-medium"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          All Projects
        </button>
        {projectsData.projectStatuses.map((status) => (
          <button
            key={status.id}
            onClick={() => setFilter(status.name)}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === status.name
                ? "bg-blue-100 text-blue-800 font-medium"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {status.displayName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProjects.map((project) => {
          // Get status color
          const statusData = projectsData.projectStatuses.find(
            (status) => status.name === project.status
          );
          const statusColor = statusData?.color || "#DBEAFE";

          // Calculate tasks stats
          const totalTasks = project.taskIds.length;
          const completedTasks = project.taskIds.filter(
            (taskId) =>
              tasksData.tasks.find((task) => task.id === taskId)?.status ===
              "completed"
          ).length;

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}?from=/projects`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-medium">{project.name}</h2>
                  <span
                    className="px-2 py-1 text-xs rounded-full"
                    style={{ backgroundColor: statusColor }}
                  >
                    {statusData?.displayName || project.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
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

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => {
                    const tagData = tasksData.tags.find((t) => t.name === tag);
                    return (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: tagData?.color || "#E5E7EB" }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div>
                    {project.startDate} - {project.endDate}
                  </div>
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((member, index) => {
                      const user = tasksData.users.find(
                        (user) => user.username === member
                      );
                      return (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"
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
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-medium">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {sortedProjects.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No projects match the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
