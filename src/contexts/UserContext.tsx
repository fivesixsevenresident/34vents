"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  type: "client" | "technician";
  name: string;
  id: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  createAccount: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock users database
const mockUsers: Record<
  string,
  {
    email: string;
    password: string;
    type: "client" | "technician";
    name: string;
    id: string;
  }
> = {
  "client@example.com": {
    email: "client@example.com",
    password: "password",
    type: "client" as const,
    name: "John Smith",
    id: "client-001",
  },
  "technician@example.com": {
    email: "technician@example.com",
    password: "password",
    type: "technician" as const,
    name: "Mike Johnson",
    id: "tech-001",
  },
};

// Load additional users from localStorage
const loadStoredUsers = () => {
  try {
    const stored = localStorage.getItem("registeredUsers");
    if (stored) {
      const parsedUsers = JSON.parse(stored);
      Object.assign(mockUsers, parsedUsers);
    }
  } catch (error) {
    console.error("Error loading stored users:", error);
  }
};

// Save new user to localStorage
const saveUserToStorage = (
  email: string,
  userData: {
    email: string;
    password: string;
    type: "client" | "technician";
    name: string;
    id: string;
  }
) => {
  try {
    const stored = localStorage.getItem("registeredUsers");
    const users = stored ? JSON.parse(stored) : {};
    users[email] = userData;
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  } catch (error) {
    console.error("Error saving user to storage:", error);
  }
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load registered users from localStorage
    loadStoredUsers();

    // Check for stored user on app load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userData = mockUsers[email as keyof typeof mockUsers];

    if (userData && userData.password === password) {
      const user: User = {
        email: userData.email,
        type: userData.type,
        name: userData.name,
        id: userData.id,
      };

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const createAccount = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers[email]) {
      setIsLoading(false);
      return {
        success: false,
        error: "An account with this email already exists",
      };
    }

    // Validate password length
    if (password.length < 6) {
      setIsLoading(false);
      return {
        success: false,
        error: "Password must be at least 6 characters long",
      };
    }

    // Create new user (always as client for account creation)
    const newUserId = `client-${Date.now()}`;
    const newUserData = {
      email,
      password,
      type: "client" as const,
      name: `${firstName} ${lastName}`,
      id: newUserId,
    };

    // Add to mock database and save to localStorage
    mockUsers[email] = newUserData;
    saveUserToStorage(email, newUserData);

    // Auto-login the new user
    const user: User = {
      email: newUserData.email,
      type: newUserData.type,
      name: newUserData.name,
      id: newUserData.id,
    };

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoading(false);

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, login, createAccount, logout, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
