"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./constants";

interface User {
  id: string;
  email: string;
  type: "client" | "technician";
  name: string;
}

interface LoginResponse {
  data: User;
  token: string;
  message: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuthState({
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));

        setAuthState({
          user: data.data,
          token: data.token,
          isAuthenticated: true,
          isLoading: false,
        });
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string
  ): Promise<unknown> => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const getAuthHeaders = (): Record<string, string> => {
    const token = authState.token || localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return {
    ...authState,
    login,
    register,
    logout,
    getAuthHeaders,
  };
};
