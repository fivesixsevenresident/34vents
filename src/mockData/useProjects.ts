import { useTasks } from "./useTasks";

const useProjects = () => {
    const tasksData = useTasks();
  return {
    tasks: tasksData,
    projects: [
      {
        id: "project-1",
        name: "Website Redesign",
        description:
          "Complete overhaul of the company website with improved UX and modern design",
        status: "active",
        startDate: "2025-04-15",
        endDate: "2025-07-30",
        progress: 35,
        teamMembers: ["alex.smith", "jamie.doe", "taylor.wong"],
        taskIds: ["task-2", "task-4", "task-5", "task-6"],
        tags: ["frontend", "ui", "design"],
        createdAt: "2025-04-10T09:00:00Z",
        updatedAt: "2025-05-16T14:30:00Z",
      },
      {
        id: "project-2",
        name: "API Integration",
        description:
          "Integrate third-party payment and shipping APIs into the platform",
        status: "active",
        startDate: "2025-05-01",
        endDate: "2025-06-15",
        progress: 60,
        teamMembers: ["sam.johnson", "alex.smith"],
        taskIds: ["task-3", "task-8"],
        tags: ["api", "backend", "integration"],
        createdAt: "2025-04-25T11:20:00Z",
        updatedAt: "2025-05-18T16:45:00Z",
      },
      {
        id: "project-3",
        name: "Mobile App Development",
        description:
          "Develop a cross-platform mobile application for iOS and Android",
        status: "planning",
        startDate: "2025-06-01",
        endDate: "2025-09-30",
        progress: 10,
        teamMembers: ["jamie.doe", "taylor.wong", "sam.johnson"],
        taskIds: ["task-7", "task-10"],
        tags: ["mobile", "development", "cross-platform"],
        createdAt: "2025-05-10T08:15:00Z",
        updatedAt: "2025-05-15T13:40:00Z",
      },
      {
        id: "project-4",
        name: "User Authentication System",
        description:
          "Implement secure authentication and authorization across the platform",
        status: "active",
        startDate: "2025-05-10",
        endDate: "2025-06-10",
        progress: 45,
        teamMembers: ["alex.smith", "sam.johnson"],
        taskIds: ["task-1", "task-9"],
        tags: ["security", "authentication", "backend", "frontend"],
        createdAt: "2025-05-05T10:30:00Z",
        updatedAt: "2025-05-19T10:30:00Z",
      },
    ],
    projectStatuses: [
      {
        id: "status-1",
        name: "planning",
        displayName: "Planning",
        color: "#E0E7FF",
      },
      {
        id: "status-2",
        name: "active",
        displayName: "Active",
        color: "#DBEAFE",
      },
      {
        id: "status-3",
        name: "on-hold",
        displayName: "On Hold",
        color: "#FEF3C7",
      },
      {
        id: "status-4",
        name: "completed",
        displayName: "Completed",
        color: "#D1FAE5",
      },
      {
        id: "status-5",
        name: "cancelled",
        displayName: "Cancelled",
        color: "#FEE2E2",
      },
    ],
  };
};

export { useProjects, useTasks };
