"use client";

import { fetchProjects } from "@/mockData/fetchProjects";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;
  const [task, setTask] = useState<(typeof tasksData.tasks)[0] | null>(null);
  const [project, setProject] = useState<
    (typeof projectsData.projects)[0] | null
  >(null);
  const projectsData = fetchProjects();
  const tasksData = projectsData.tasks;

  useEffect(() => {
    // Find the task by ID
    const foundTask = tasksData.tasks.find((t) => t.id === taskId);

    if (!foundTask) {
      // If task not found, redirect to the tasks list page
      router.push("/tasks");
      return;
    }

    setTask(foundTask);

    // Find the project this task belongs to
    const foundProject = projectsData.projects.find((p) =>
      p.taskIds.includes(foundTask.id)
    );

    if (foundProject) {
      setProject(foundProject);
    }
  }, [taskId, router, tasksData.tasks, projectsData.projects]);
  if (!task) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center py-16">
          <p className="text-gray-500">Loading task...</p>
        </div>
      </div>
    );
  }
  // Get status
  const status = tasksData.statuses.find((s) => s.name === task.status);
  const statusColor = status?.color || "#E5E7EB";
  // Get priority
  const priority = tasksData.priorities.find((p) => p.name === task.priority);
  const priorityColor = priority?.color || "#E5E7EB";
  // Get assignee
  const assignee = tasksData.users.find(
    (user) => user.username === task.assignee
  );
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link
          href="/tasks"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          ← Back to Tasks
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>

          <div className="flex gap-3">
            <span
              className="px-3 py-1 text-sm rounded-full font-medium"
              style={{ backgroundColor: statusColor }}
            >
              {status?.displayName || task.status}
            </span>
            <span
              className="px-3 py-1 text-sm rounded-full font-medium"
              style={{ backgroundColor: priorityColor }}
            >
              {priority?.displayName || task.priority}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {task.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-lg font-medium mb-3">Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Due Date</span>
                <span className="font-medium">{formatDate(task.dueDate)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Created</span>
                <span>{formatDateTime(task.createdAt)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Last Updated</span>
                <span>{formatDateTime(task.updatedAt)}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-gray-500">Tags</span>
                <div className="flex flex-wrap justify-end gap-1">
                  {task.tags.map((tag) => {
                    const tagData = tasksData.tags.find((t) => t.name === tag);
                    return (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full"
                        style={{ backgroundColor: tagData?.color || "#E5E7EB" }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-3">Assignment</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              {assignee ? (
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      {assignee.avatarUrl ? (
                        <Image
                          src={assignee.avatarUrl}
                          alt={assignee.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center font-medium">
                          {assignee.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{assignee.name}</h3>
                      <p className="text-sm text-gray-500">{assignee.role}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="flex items-center mb-1">
                      <span className="text-gray-500 w-16">Username:</span>
                      <span>{assignee.username}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-500 w-16">Email:</span>
                      <a
                        href={`mailto:${assignee.email}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {assignee.email}
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-2">
                    This task is not assigned to anyone
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Assign Task
                  </button>
                </div>
              )}
            </div>

            {project && (
              <div className="mt-6">
                <h2 className="text-lg font-medium mb-3">Project</h2>
                <Link
                  href={`/projects/${project.id}`}
                  className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-500">
                      Progress: {project.progress}%
                    </span>
                    <span className="text-gray-500">{project.status}</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Edit Task
          </button>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-md text-amber-700 hover:bg-amber-100">
              Change Status
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              {task.status === "completed"
                ? "Reopen Task"
                : "Mark as Completed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
