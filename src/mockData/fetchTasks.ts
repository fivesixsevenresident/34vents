const fetchTasks = () => {
  return {
    tasks: [
      {
        id: "task-1",
        title: "Implement user authentication",
        description:
          "Set up user login, registration, and password reset functionality using NextAuth.js",
        priority: "high",
        status: "in-progress",
        dueDate: "2025-06-01",
        tags: ["authentication", "security", "frontend"],
        assignee: "alex.smith",
        createdAt: "2025-05-10T09:00:00Z",
        updatedAt: "2025-05-15T14:30:00Z",
      },
      {
        id: "task-2",
        title: "Create responsive dashboard layout",
        description:
          "Design and implement a responsive dashboard with sidebar navigation that works well on mobile and desktop",
        priority: "medium",
        status: "todo",
        dueDate: "2025-06-05",
        tags: ["ui", "responsive", "design"],
        assignee: "jamie.doe",
        createdAt: "2025-05-12T11:20:00Z",
        updatedAt: "2025-05-12T11:20:00Z",
      },
      {
        id: "task-3",
        title: "Set up API routes for task CRUD operations",
        description:
          "Implement API endpoints for creating, reading, updating, and deleting tasks with proper validation",
        priority: "high",
        status: "completed",
        dueDate: "2025-05-20",
        tags: ["api", "backend", "database"],
        assignee: "sam.johnson",
        createdAt: "2025-05-05T08:15:00Z",
        updatedAt: "2025-05-18T16:45:00Z",
      },
      {
        id: "task-4",
        title: "Add data visualization components",
        description:
          "Integrate chart.js or d3.js to display project metrics and task status distributions",
        priority: "low",
        status: "todo",
        dueDate: "2025-06-15",
        tags: ["charts", "frontend", "ui"],
        assignee: null,
        createdAt: "2025-05-14T13:40:00Z",
        updatedAt: "2025-05-14T13:40:00Z",
      },
      {
        id: "task-5",
        title: "Implement dark mode support",
        description:
          "Add dark mode toggle and ensure all components render properly in both light and dark themes",
        priority: "medium",
        status: "todo",
        dueDate: "2025-06-10",
        tags: ["ui", "accessibility", "theme"],
        assignee: "alex.smith",
        createdAt: "2025-05-16T10:30:00Z",
        updatedAt: "2025-05-16T10:30:00Z",
      },
      {
        id: "task-6",
        title: "Optimize image loading performance",
        description:
          "Implement lazy loading and proper image optimization using next/image for all product images",
        priority: "medium",
        status: "in-progress",
        dueDate: "2025-05-25",
        tags: ["performance", "optimization", "images"],
        assignee: "taylor.wong",
        createdAt: "2025-05-08T15:20:00Z",
        updatedAt: "2025-05-17T09:10:00Z",
      },
      {
        id: "task-7",
        title: "Set up automated testing pipeline",
        description:
          "Configure Jest and React Testing Library for unit tests and set up GitHub Actions for CI/CD",
        priority: "high",
        status: "todo",
        dueDate: "2025-06-08",
        tags: ["testing", "ci-cd", "automation"],
        assignee: "sam.johnson",
        createdAt: "2025-05-15T11:00:00Z",
        updatedAt: "2025-05-15T11:00:00Z",
      },
      {
        id: "task-8",
        title: "Implement user notification system",
        description:
          "Create a notification component and backend service for real-time user notifications",
        priority: "low",
        status: "todo",
        dueDate: "2025-06-20",
        tags: ["notifications", "backend", "frontend"],
        assignee: null,
        createdAt: "2025-05-17T14:15:00Z",
        updatedAt: "2025-05-17T14:15:00Z",
      },
      {
        id: "task-9",
        title: "Add drag-and-drop functionality to task board",
        description:
          "Implement drag-and-drop for tasks between different status columns using react-dnd or a similar library",
        priority: "medium",
        status: "in-progress",
        dueDate: "2025-06-03",
        tags: ["ui", "interaction", "frontend"],
        assignee: "jamie.doe",
        createdAt: "2025-05-11T09:45:00Z",
        updatedAt: "2025-05-19T10:30:00Z",
      },
      {
        id: "task-10",
        title: "Create comprehensive documentation",
        description:
          "Document API endpoints, component usage, and setup instructions in the project README and wiki",
        priority: "medium",
        status: "todo",
        dueDate: "2025-06-25",
        tags: ["documentation", "developer-experience"],
        assignee: "taylor.wong",
        createdAt: "2025-05-18T16:20:00Z",
        updatedAt: "2025-05-18T16:20:00Z",
      },
    ],
    users: [
      {
        id: "user-1",
        username: "alex.smith",
        name: "Alex Smith",
        email: "alex.smith@example.com",
        role: "developer",
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        id: "user-2",
        username: "jamie.doe",
        name: "Jamie Doe",
        email: "jamie.doe@example.com",
        role: "designer",
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        id: "user-3",
        username: "sam.johnson",
        name: "Sam Johnson",
        email: "sam.johnson@example.com",
        role: "lead developer",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      },
      {
        id: "user-4",
        username: "taylor.wong",
        name: "Taylor Wong",
        email: "taylor.wong@example.com",
        role: "product manager",
        avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
      },
    ],
    statuses: [
      {
        id: "status-1",
        name: "todo",
        displayName: "To Do",
        color: "#E5E7EB",
      },
      {
        id: "status-2",
        name: "in-progress",
        displayName: "In Progress",
        color: "#DBEAFE",
      },
      {
        id: "status-3",
        name: "completed",
        displayName: "Completed",
        color: "#D1FAE5",
      },
    ],
    priorities: [
      {
        id: "priority-1",
        name: "low",
        displayName: "Low",
        color: "#D1FAE5",
      },
      {
        id: "priority-2",
        name: "medium",
        displayName: "Medium",
        color: "#FEF3C7",
      },
      {
        id: "priority-3",
        name: "high",
        displayName: "High",
        color: "#FEE2E2",
      },
    ],
    tags: [
      {
        id: "tag-1",
        name: "frontend",
        color: "#DBEAFE",
      },
      {
        id: "tag-2",
        name: "backend",
        color: "#E0E7FF",
      },
      {
        id: "tag-3",
        name: "ui",
        color: "#FEF3C7",
      },
      {
        id: "tag-4",
        name: "api",
        color: "#D1FAE5",
      },
      {
        id: "tag-5",
        name: "security",
        color: "#FEE2E2",
      },
      {
        id: "tag-6",
        name: "performance",
        color: "#FED7AA",
      },
      {
        id: "tag-7",
        name: "testing",
        color: "#DDD6FE",
      },
    ],
  };
};

export { fetchTasks };
