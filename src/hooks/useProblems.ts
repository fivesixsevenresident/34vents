"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "./constants";

interface Problem {
  id: string;
  clientId: string;
  technicianId?: string;
  summary: string;
  serviceType: "plumbing-repair" | "installation-consultation";
  location:
    | "toilet"
    | "faucet"
    | "shower"
    | "appliance"
    | "pipes-valves-connections";
  appliance?: string;
  status: "scheduled" | "in-progress" | "completed";
  priority?: "urgent" | "high" | "medium" | "low";
  createdDate: string;
  scheduledDate?: string;
  completedDate?: string;
  description: string;
  customerNotes?: string;
  estimatedCost?: string;
  finalCost?: string;
  customerRating?: number;
  clientName?: string;
  clientEmail?: string;
}

interface ClientProblemsData {
  title: string;
  problems: Problem[];
  stats: {
    totalServices: number;
    completedServices: number;
    averageRating: number;
    totalSpent: string;
    memberSince: string;
  };
}

interface TechnicianProblemsData {
  title: string;
  technician: {
    name: string;
    id: string;
    specialties: string[];
    rating: number;
    completedJobs: number;
    memberSince: string;
  };
  problems: Problem[];
  stats: {
    totalAssignedJobs: number;
    completedToday: number;
    scheduledToday: number;
    urgentJobs: number;
    averageRating: number;
    totalRevenueThisMonth: string;
  };
  todaySchedule: Array<{
    time: string;
    client: string;
    type: string;
    location: string;
    priority: string;
  }>;
}

interface CreateProblemData {
  serviceType: "plumbing-repair" | "installation-consultation";
  location:
    | "toilet"
    | "faucet"
    | "shower"
    | "appliance"
    | "pipes-valves-connections";
  appliance?: string;
  description: string;
  customerNotes?: string;
  priority?: "urgent" | "high" | "medium" | "low";
  scheduledDate?: Date;
  scheduledTime?: string;
  address?: string;
}

export const useProblems = () => {
  const { getAuthHeaders, isAuthenticated } = useAuth();
  const [clientProblems, setClientProblems] =
    useState<ClientProblemsData | null>(null);
  const [technicianProblems, setTechnicianProblems] =
    useState<TechnicianProblemsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientProblems = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/problems/client`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });

      const data = await response.json();

      if (response.ok) {
        setClientProblems(data.data);
      } else {
        setError(data.message || "Failed to fetch client problems");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Fetch client problems error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, getAuthHeaders]);

  const fetchTechnicianProblems = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/problems/technician`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTechnicianProblems(data.data);
      } else {
        setError(data.message || "Failed to fetch technician problems");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Fetch technician problems error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, getAuthHeaders]);

  const createProblem = useCallback(
    async (problemData: CreateProblemData): Promise<Problem> => {
      if (!isAuthenticated) throw new Error("Not authenticated");

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/problems`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(problemData),
        });

        const data = await response.json();

        if (response.ok) {
          // Refresh client problems after creating
          await fetchClientProblems();
          return data.data;
        } else {
          throw new Error(data.message || "Failed to create problem");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Network error occurred"
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [isAuthenticated, getAuthHeaders, fetchClientProblems]
  );

  const updateProblem = useCallback(
    async (
      problemId: string,
      updateData: Partial<Problem>
    ): Promise<Problem> => {
      if (!isAuthenticated) throw new Error("Not authenticated");

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/problems/${problemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (response.ok) {
          // Refresh problems after updating
          await fetchClientProblems();
          await fetchTechnicianProblems();
          return data.data;
        } else {
          throw new Error(data.message || "Failed to update problem");
        }
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Network error occurred"
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [
      isAuthenticated,
      getAuthHeaders,
      fetchClientProblems,
      fetchTechnicianProblems,
    ]
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchClientProblems();
      fetchTechnicianProblems();
    }
  }, [isAuthenticated, fetchClientProblems, fetchTechnicianProblems]);

  return {
    clientProblems,
    technicianProblems,
    isLoading,
    error,
    fetchClientProblems,
    fetchTechnicianProblems,
    createProblem,
    updateProblem,
  };
};
