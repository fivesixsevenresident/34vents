"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "./constants";

interface UserProfileData {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    memberSince: string;
    preferredContactMethod?: string;
    licenseNumber?: string;
    specialties?: string[];
    certifications?: string[];
  };
  equipment: Array<{
    id: string;
    type: string;
    brand: string;
    model?: string;
    age?: string;
    location: string;
    lastService?: string;
    lastMaintenance?: string;
    warrantyExpires?: string;
    status?: string;
    condition?: string;
    purchaseDate?: string;
    description?: string;
    setupDate?: string;
    lastInspection?: string;
  }>;
  tools: Array<{
    id: string;
    name: string;
    brand: string;
    size?: string;
    sizes?: string;
    type?: string;
    model?: string;
    purchaseDate: string;
    condition: string;
    notes: string;
  }>;
  appliances: Array<{
    id: string;
    type: string;
    brand: string;
    model?: string;
    serialNumber?: string;
    installDate?: string;
    lastService?: string;
    warrantyExpires?: string;
    status?: string;
    location: string;
    description?: string;
    setupDate?: string;
    lastInspection?: string;
    condition?: string;
  }>;
  serviceStats?: {
    totalJobsCompleted: number;
    averageRating: number;
    yearsExperience: number;
    monthlyRevenue: string;
  };
}

export const useProfile = (userType: "client" | "technician" = "client") => {
  const { getAuthHeaders, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/profile?type=${userType}`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.data);
      } else {
        setError(data.message || "Failed to fetch profile");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Fetch profile error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthHeaders, isAuthenticated, userType]);

  const updateProfile = async (
    profileData: Partial<UserProfileData>
  ): Promise<UserProfileData> => {
    if (!isAuthenticated) throw new Error("Not authenticated");

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.data);
        return data.data;
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Network error occurred"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [fetchProfile, isAuthenticated, userType]);

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
  };
};
