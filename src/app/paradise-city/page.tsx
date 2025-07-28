"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { useRouter } from "next/navigation";

interface UserData {
  _id: string;
  email: string;
  role: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    memberSince: string;
    licenseNumber?: string;
    specialties?: string[];
    certifications?: string[];
  };
  serviceStats?: {
    totalJobsCompleted: number;
    averageRating: number;
    yearsExperience: number;
    monthlyRevenue: string;
  };
}

export default function ParadiseCity() {
  const { user } = useUser();
  const router = useRouter();
  const [clients, setClients] = useState<UserData[]>([]);
  const [technicians, setTechnicians] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }
    if (user.type !== "admin") {
      router.push("/");
      return;
    }
  }, [user, router]);

  useEffect(() => {
    if (user && user.type === "admin") {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const API_BASE_URL = "https://ts-mongoose-sample-production.up.railway.app";
      
      // Note: Since we don't have JWT tokens stored yet, we'll use mock data for now
      // When authentication is properly integrated, use these API calls:
      
      // const token = localStorage.getItem('authToken'); // Get JWT token
      // const headers = {
      //   'Authorization': `Bearer ${token}`,
      //   'Content-Type': 'application/json'
      // };
      
      // const [clientsResponse, techniciansResponse] = await Promise.all([
      //   fetch(`${API_BASE_URL}/users/role/client`, { headers }),
      //   fetch(`${API_BASE_URL}/users/role/technician`, { headers })
      // ]);
      
      // if (!clientsResponse.ok || !techniciansResponse.ok) {
      //   throw new Error('Failed to fetch users');
      // }
      
      // const clientsData = await clientsResponse.json();
      // const techniciansData = await techniciansResponse.json();
      
      // setClients(clientsData.data || []);
      // setTechnicians(techniciansData.data || []);
      
      // For now, using mock data until JWT authentication is properly integrated
      const mockClients: UserData[] = [
        {
          _id: "1",
          email: "client@example.com",
          role: "client",
          personalInfo: {
            name: "John Smith",
            email: "client@example.com",
            phone: "(555) 123-4567",
            address: "123 Main St, Springfield, IL",
            memberSince: "2024-01-15"
          }
        }
      ];

      const mockTechnicians: UserData[] = [
        {
          _id: "2",
          email: "technician@example.com",
          role: "technician",
          personalInfo: {
            name: "Mike Johnson",
            email: "technician@example.com",
            phone: "(555) 456-7890",
            address: "789 Pine St, Springfield, IL",
            memberSince: "2019-03-15",
            licenseNumber: "PLB-2019-4567",
            specialties: ["Plumbing Repair", "Installation"],
            certifications: ["Master Plumber", "Water Heater Specialist"]
          },
          serviceStats: {
            totalJobsCompleted: 847,
            averageRating: 4.8,
            yearsExperience: 15,
            monthlyRevenue: "$8,450"
          }
        }
      ];

      setClients(mockClients);
      setTechnicians(mockTechnicians);
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.type !== "admin") {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🏝️ Paradise City - Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage all users in the system
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Clients Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                👥 Clients ({clients.length})
              </h2>
            </div>
            <div className="p-6">
              {clients.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No clients found
                </p>
              ) : (
                <div className="space-y-4">
                  {clients.map((client) => (
                    <div
                      key={client._id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {client.personalInfo.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {client.email}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {client.personalInfo.phone}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            Member since: {client.personalInfo.memberSince}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                          Client
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Technicians Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                🔧 Technicians ({technicians.length})
              </h2>
            </div>
            <div className="p-6">
              {technicians.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No technicians found
                </p>
              ) : (
                <div className="space-y-4">
                  {technicians.map((technician) => (
                    <div
                      key={technician._id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {technician.personalInfo.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {technician.email}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {technician.personalInfo.phone}
                          </p>
                          {technician.personalInfo.licenseNumber && (
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                              License: {technician.personalInfo.licenseNumber}
                            </p>
                          )}
                        </div>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                          Technician
                        </span>
                      </div>
                      
                      {technician.personalInfo.specialties && (
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {technician.personalInfo.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {technician.serviceStats && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-500 dark:text-gray-500">Jobs:</span>
                              <span className="ml-1 font-medium text-gray-900 dark:text-white">
                                {technician.serviceStats.totalJobsCompleted}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-500">Rating:</span>
                              <span className="ml-1 font-medium text-gray-900 dark:text-white">
                                ⭐ {technician.serviceStats.averageRating}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-500">Experience:</span>
                              <span className="ml-1 font-medium text-gray-900 dark:text-white">
                                {technician.serviceStats.yearsExperience}y
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 dark:text-gray-500">Revenue:</span>
                              <span className="ml-1 font-medium text-gray-900 dark:text-white">
                                {technician.serviceStats.monthlyRevenue}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {clients.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-1">Total Clients</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {technicians.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-1">Total Technicians</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {clients.length + technicians.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400 mt-1">Total Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}