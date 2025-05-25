"use client";

import { fetchProjects, fetchTasks } from "@/mockData/fetchProjects";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Projects = ReturnType<typeof fetchProjects>;
type Project = ReturnType<typeof fetchProjects>["projects"][number];
type TasksProps = ReturnType<typeof fetchTasks>;
type TaskProps = ReturnType<typeof fetchTasks>["tasks"][number];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [projectTasks, setProjectTasks] = useState<TaskProps[]>([]);
  const [taskFilter, setTaskFilter] = useState("all");
  const [projectsData, setProjectsData] = useState<Projects | undefined>(
    undefined
  );
  const [tasksData, setTasksData] = useState<TasksProps | undefined>(undefined);
  const [backUrl, setBackUrl] = useState("/projects");
  const [backLabel, setBackLabel] = useState("Back to Projects");

  useEffect(() => {
    // Check for referrer query parameter first, then fallback to document.referrer
    const searchParams = new URLSearchParams(window.location.search);
    const referrerParam = searchParams.get("from");

    if (referrerParam) {
      if (referrerParam === "/dashboard") {
        setBackUrl("/dashboard");
        setBackLabel("Back to Dashboard");
      } else if (referrerParam === "/projects") {
        setBackUrl("/projects");
        setBackLabel("Back to Projects");
      }
    } else if (typeof window !== "undefined") {
      // Fallback to document.referrer
      const referrer = document.referrer;
      if (referrer.includes("/dashboard")) {
        setBackUrl("/dashboard");
        setBackLabel("Back to Dashboard");
      }
      // Default is already set to /projects
    }
  }, []);

  useEffect(() => {
    const fetchedProjectsData = fetchProjects();
    const fetchedTasksData = fetchedProjectsData.tasks;

    setProjectsData(fetchedProjectsData);
    setTasksData(fetchedTasksData);

    // Find the project by ID
    const foundProject = fetchedProjectsData.projects.find(
      (p: Project) => p.id === projectId
    );

    if (!foundProject) {
      // If project not found, redirect to the projects list page
      router.push("/projects");
      return;
    }

    setProject(foundProject);

    // Find all tasks that belong to this project
    const task = fetchedTasksData.tasks.filter((task: TaskProps) =>
      foundProject.taskIds.includes(task.id)
    );

    setProjectTasks(task);
  }, [projectId, router]);
  // Filter tasks based on selected status
  const filteredTasks = projectTasks.filter((task) => {
    if (taskFilter === "all") return true;
    return task.status === taskFilter;
  });

  if (!project || !projectsData || !tasksData) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center py-16">
          <p className="text-gray-500">Loading project...</p>
        </div>
      </div>
    );
  }
  // Get status color
  const statusData = projectsData.projectStatuses.find(
    (status) => status.name === project.status
  );
  const statusColor = statusData?.color || "#DBEAFE";
  // Calculate tasks stats
  const totalTasks = project.taskIds.length;
  const completedTasks = project.taskIds.filter(
    (taskId) =>
      tasksData.tasks.find((task) => task.id === taskId)?.status === "completed"
  ).length;
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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link
          href={backUrl}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          ← {backLabel}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <span
                className="px-3 py-1 text-sm rounded-full font-medium"
                style={{ backgroundColor: statusColor }}
              >
                {statusData?.displayName || project.status}
              </span>
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Edit Project
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">
                  {project.progress}% complete
                </span>
                <span>
                  {completedTasks} of {totalTasks} tasks completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">Start Date</p>
                <p className="font-medium">{formatDate(project.startDate)}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">End Date</p>
                <p className="font-medium">{formatDate(project.endDate)}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-700 mb-1">Last Updated</p>
                <p className="font-medium">
                  {formatDateTime(project.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Team</h2>
            <ul className="space-y-3">
              {project.teamMembers.map((member) => {
                const user = tasksData.users.find(
                  (user) => user.username === member
                );
                return (
                  <li
                    key={member}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      {user?.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-medium">
                          {member.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user?.name || member}</p>
                      <p className="text-sm text-gray-500">
                        {user?.role || "Team Member"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
            {project.teamMembers.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                No team members assigned
              </p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold">Tags</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => {
              const tagData = tasksData.tags.find((t) => t.name === tag);
              return (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full"
                  style={{ backgroundColor: tagData?.color || "#E5E7EB" }}
                >
                  {tag}
                </span>
              );
            })}
            {project.tags.length === 0 && (
              <p className="text-gray-500">No tags added</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Project Tasks</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTaskFilter("all")}
              className={`px-3 py-1 rounded-md text-sm ${
                taskFilter === "all"
                  ? "bg-blue-100 text-blue-800 font-medium"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              All Tasks
            </button>
            {tasksData.statuses.map((status) => (
              <button
                key={status.id}
                onClick={() => setTaskFilter(status.name)}
                className={`px-3 py-1 rounded-md text-sm ${
                  taskFilter === status.name
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {status.displayName}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredTasks.map((task) => {
            // Get status color
            const status = tasksData.statuses.find(
              (s) => s.name === task.status
            );
            const statusColor = status?.color || "#E5E7EB";

            // Get priority color
            const priority = tasksData.priorities.find(
              (p) => p.name === task.priority
            );
            const priorityColor = priority?.color || "#E5E7EB";

            // Get assignee info
            const assignee = tasksData.users.find(
              (user) => user.username === task.assignee
            );

            // Calculate if task is due soon (within 3 days)
            const now = new Date();
            const dueDate = new Date(task.dueDate);
            const diffDays = Math.ceil(
              (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
            );
            const isDueSoon = diffDays >= 0 && diffDays <= 3;
            const isOverdue = diffDays < 0;

            return (
              <Link
                key={task.id}
                href={`/tasks/${task.id}?from=/projects/${projectId}`}
                className="block border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-gray-900">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {task.tags.map((tag) => {
                        const tagData = tasksData.tags.find(
                          (t) => t.name === tag
                        );
                        return (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{
                              backgroundColor: tagData?.color || "#E5E7EB",
                            }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 min-w-32">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Status:</span>
                      <span
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: statusColor }}
                      >
                        {status?.displayName || task.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Priority:</span>
                      <span
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: priorityColor }}
                      >
                        {priority?.displayName || task.priority}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Due:</span>
                      <span
                        className={`text-xs font-medium ${
                          isOverdue
                            ? "text-red-600"
                            : isDueSoon
                            ? "text-amber-600"
                            : ""
                        }`}
                      >
                        {formatDate(task.dueDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Assignee:</span>
                      {assignee ? (
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
                            {assignee.avatarUrl ? (
                              <Image
                                src={assignee.avatarUrl}
                                alt={assignee.name}
                                width={20}
                                height={20}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center font-medium text-xs">
                                {assignee.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="text-xs">{assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">
                          Unassigned
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tasks match the selected filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
