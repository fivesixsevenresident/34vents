"use client";

import { fetchTasks } from "@/mockData/fetchTasks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type TaskProps = ReturnType<typeof fetchTasks>["tasks"][number];

export default function TasksPage() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const tasksData = fetchTasks();
    const sortedTasks = [...tasksData.tasks].sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
    setTasks(sortedTasks);
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
        <p className="text-gray-600 mt-2">Manage and track your tasks</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">All Tasks</h2>
          <div className="flex space-x-2 text-sm">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-md ${
                filter === "all"
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("todo")}
              className={`px-3 py-1 rounded-md ${
                filter === "todo"
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              To Do
            </button>
            <button
              onClick={() => setFilter("in-progress")}
              className={`px-3 py-1 rounded-md ${
                filter === "in-progress"
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              In Progress
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskItem({ task }: { task: TaskProps }) {
  const tasksData = fetchTasks();
  const status = tasksData.statuses.find((s) => s.name === task.status);
  const statusColor = status?.color || "#E5E7EB";
  const assignee = tasksData.users.find(
    (user) => user.username === task.assignee
  );

  return (
    <Link
      href={`/tasks/${task.id}?from=/tasks`}
      className="block border border-gray-100 rounded-md p-4 hover:bg-gray-50 hover:border-blue-300 transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <span
          className="px-2 py-1 text-xs rounded-full"
          style={{ backgroundColor: statusColor }}
        >
          {status?.displayName || task.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          {assignee ? (
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                {assignee.avatarUrl ? (
                  <Image
                    src={assignee.avatarUrl}
                    alt={assignee.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center font-medium text-xs">
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
        <span className="text-gray-500">Due {task.dueDate}</span>
      </div>
    </Link>
  );
}
