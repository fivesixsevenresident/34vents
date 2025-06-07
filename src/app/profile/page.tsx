"use client";

import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { useTheme } from "../../contexts/ThemeContext";
import { fetchUserProfile } from "../../mockData/fetchUserProfile";

interface EquipmentItem {
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
}

interface ToolItem {
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
}

interface ApplianceItem {
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
}

export default function Profile() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("personal");

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const profileData = fetchUserProfile(user.type);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "good":
      case "excellent":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300";
      case "needs repair":
      case "warranty expired":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300";
      case "fair":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {user.type === "technician"
            ? "Manage your professional information and equipment"
            : "Manage your account and equipment information"}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("personal")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "personal"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab("equipment")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "equipment"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Equipment
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "tools"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => setActiveTab("appliances")}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === "appliances"
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Appliances
          </button>
        </nav>
      </div>

      {/* Personal Information Tab */}
      {activeTab === "personal" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <p className="text-gray-900">{profileData.personalInfo.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{profileData.personalInfo.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <p className="text-gray-900">{profileData.personalInfo.phone}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Member Since
              </label>
              <p className="text-gray-900">
                {new Date(
                  profileData.personalInfo.memberSince
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            {user.type === "technician" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    License Number
                  </label>
                  <p className="text-gray-900">
                    {profileData.personalInfo.licenseNumber}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Specialties
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.personalInfo.specialties?.map(
                      (specialty: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
                        >
                          {specialty}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Certifications
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.personalInfo.certifications?.map(
                      (cert: string, index: number) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"
                        >
                          {cert}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Preferences Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Theme Preference
                </label>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {theme === "light" ? (
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-blue-400 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      )}
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {theme === "light" ? "Light Mode" : "Dark Mode"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 dark:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    <span
                      className={`${
                        theme === "dark" ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Switch between light and dark mode for better viewing
                  experience
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Tab */}
      {activeTab === "equipment" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Equipment</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Equipment
            </button>
          </div>
          <div className="grid gap-6">
            {profileData.equipment.map((item: EquipmentItem) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{item.type}</h3>
                    <p className="text-gray-600">
                      {item.brand} {item.model}
                    </p>
                  </div>
                  {(item.status || item.condition) && (
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                        item.status || item.condition || ""
                      )}`}
                    >
                      {item.status || item.condition}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {item.age && (
                    <div>
                      <span className="font-medium text-gray-700">Age:</span>
                      <p className="text-gray-900">{item.age}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-900">{item.location}</p>
                  </div>
                  {(item.lastService || item.lastMaintenance) && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Last Service:
                      </span>
                      <p className="text-gray-900">
                        {new Date(
                          item.lastService || item.lastMaintenance || ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {item.warrantyExpires && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Warranty:
                      </span>
                      <p className="text-gray-900">
                        {new Date(item.warrantyExpires).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tools Tab */}
      {activeTab === "tools" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tools</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Tool
            </button>
          </div>
          <div className="grid gap-6">
            {profileData.tools.map((tool: ToolItem) => (
              <div key={tool.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{tool.name}</h3>
                    <p className="text-gray-600">
                      {tool.brand} {tool.model}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                      tool.condition
                    )}`}
                  >
                    {tool.condition}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                  {(tool.size || tool.sizes) && (
                    <div>
                      <span className="font-medium text-gray-700">Size:</span>
                      <p className="text-gray-900">{tool.size || tool.sizes}</p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">
                      Purchase Date:
                    </span>
                    <p className="text-gray-900">
                      {new Date(tool.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  {tool.type && (
                    <div>
                      <span className="font-medium text-gray-700">Type:</span>
                      <p className="text-gray-900">{tool.type}</p>
                    </div>
                  )}
                </div>
                {tool.notes && (
                  <div className="bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">Notes:</span>
                    <p className="text-gray-900 mt-1">{tool.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appliances Tab */}
      {activeTab === "appliances" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Appliances</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Appliance
            </button>
          </div>
          <div className="grid gap-6">
            {profileData.appliances.map((appliance: ApplianceItem) => (
              <div
                key={appliance.id}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{appliance.type}</h3>
                    <p className="text-gray-600">
                      {appliance.brand} {appliance.model}
                    </p>
                    {appliance.serialNumber && (
                      <p className="text-sm text-gray-500">
                        Serial: {appliance.serialNumber}
                      </p>
                    )}
                  </div>
                  {(appliance.status || appliance.condition) && (
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${getStatusColor(
                        appliance.status || appliance.condition || ""
                      )}`}
                    >
                      {appliance.status || appliance.condition}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Location:</span>
                    <p className="text-gray-900">{appliance.location}</p>
                  </div>
                  {(appliance.installDate || appliance.setupDate) && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Install Date:
                      </span>
                      <p className="text-gray-900">
                        {new Date(
                          appliance.installDate || appliance.setupDate || ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {(appliance.lastService || appliance.lastInspection) && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Last Service:
                      </span>
                      <p className="text-gray-900">
                        {new Date(
                          appliance.lastService ||
                            appliance.lastInspection ||
                            ""
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {appliance.warrantyExpires && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Warranty:
                      </span>
                      <p className="text-gray-900">
                        {new Date(
                          appliance.warrantyExpires
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
                {appliance.description && (
                  <div className="mt-4 bg-gray-50 p-3 rounded">
                    <span className="font-medium text-gray-700">
                      Description:
                    </span>
                    <p className="text-gray-900 mt-1">
                      {appliance.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technician Stats */}
      {user.type === "technician" && profileData.serviceStats && (
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Service Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {profileData.serviceStats.totalJobsCompleted}
              </div>
              <div className="text-sm text-blue-800">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {profileData.serviceStats.averageRating}
              </div>
              <div className="text-sm text-blue-800">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {profileData.serviceStats.yearsExperience}
              </div>
              <div className="text-sm text-blue-800">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {profileData.serviceStats.monthlyRevenue}
              </div>
              <div className="text-sm text-blue-800">Monthly Revenue</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
