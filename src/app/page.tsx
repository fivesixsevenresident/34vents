"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchClientProblems } from "../mockData/fetchClientProblems";
import { fetchTechnicianProblems } from "../mockData/fetchTechnicianProblems";
import { useUser } from "../contexts/UserContext";
import ProblemListItem from "../components/ProblemListItem";
import { DateTimeSlot } from "../components/DateSelector";

export default function Home() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const problem = searchParams.get("problem");
  const serviceType = searchParams.get("serviceType");
  const location = searchParams.get("location");
  const appliance = searchParams.get("appliance");
  const availableDatesParam = searchParams.get("availableDates");
  // Parse available dates from JSON if present
  let availableDates: DateTimeSlot[] = [];
  if (availableDatesParam) {
    try {
      availableDates = JSON.parse(availableDatesParam);
    } catch (error) {
      console.error("Failed to parse available dates:", error);
      // Fallback: treat as comma-separated date strings (legacy format)
      availableDates = availableDatesParam.split(",").map((dateStr) => ({
        date: dateStr.trim(),
        times: [],
      }));
    }
  }
  const clientProblemsData = fetchClientProblems();
  const technicianProblemsData = fetchTechnicianProblems();
  // Determine which data to show based on user type
  const isClient = user?.type === "client";
  const isTechnician = user?.type === "technician";
  const problemsData = isTechnician
    ? technicianProblemsData
    : clientProblemsData;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {problem && (
        <div className="mb-8 p-6 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                Welcome! We&apos;ve Received Your Request
              </h3>
              <div className="bg-white dark:bg-gray-800 p-4 rounded border-l-4 border-green-400 mb-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Your Problem:</strong> {problem}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Service Type: {serviceType} • Location: {location}
                  {appliance && ` • Appliance: ${appliance}`}
                </div>
                {availableDates.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded">
                    <p className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                      Your Available Dates & Times:
                    </p>
                    <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                      {availableDates.map((slot, index) => {
                        const date = new Date(slot.date + "T00:00:00");
                        const dateStr = date.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });

                        const timeStr =
                          slot.times.length > 0
                            ? slot.times
                                .map((time) => {
                                  const [hours, minutes] = time.split(":");
                                  const hour = parseInt(hours);
                                  const ampm = hour >= 12 ? "PM" : "AM";
                                  const displayHour =
                                    hour === 0
                                      ? 12
                                      : hour > 12
                                      ? hour - 12
                                      : hour;
                                  return `${displayHour}:${minutes} ${ampm}`;
                                })
                                .join(", ")
                            : "No specific times selected";

                        return (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center gap-1"
                          >
                            <span className="font-medium">{dateStr}:</span>
                            <span className="text-blue-600 dark:text-blue-400">
                              {timeStr}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                <p className="mb-3">
                  <strong>What happens next:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Our expert plumbing team will review your request</li>
                  <li>
                    You&apos;ll receive a call within 24 hours to schedule an
                    appointment
                  </li>
                  <li>
                    A certified plumber will arrive at your scheduled time
                  </li>
                  <li>
                    We&apos;ll provide a detailed estimate before starting any
                    work
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/common-issues"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    Try DIY Solutions
                  </Link>
                  <Link
                    href="/tools"
                    className="inline-flex items-center px-4 py-2 bg-gray-600 dark:bg-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Get Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {user
              ? `Welcome ${user.name}${
                  isTechnician ? " - Technician Dashboard" : ""
                }`
              : "Welcome to SamplePlay Plumbing"}
          </h1>
          {user && (
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {isTechnician
                ? "Manage your assigned service calls"
                : "Track your plumbing service history"}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {isClient && (
            <Link
              href="/fix"
              className="bg-red-600 dark:bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-800 transition-colors inline-flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Fix My Problem
            </Link>
          )}
        </div>
      </div>

      <p className="mb-8 text-gray-700 dark:text-gray-300">
        {problem
          ? "We're committed to solving your plumbing issues quickly and professionally. Feel free to explore our resources while you wait for our team to contact you."
          : user
          ? "Welcome back! Here's your dashboard with your latest activity."
          : "This is the home page of our sample application. Use the navigation bar above to explore different pages."}
      </p>

      {/* Quick Actions for Non-Logged In Users */}
      {!user && !problem && (
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Get Started
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Need plumbing help? Get professional assistance or try our DIY
            solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/fix"
              className="bg-red-600 dark:bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-800 transition-colors inline-flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Fix My Problem
            </Link>
            <Link
              href="/signin"
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors inline-flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Login / Sign Up
            </Link>
          </div>
          <div className="mt-4 text-sm text-blue-700 dark:text-blue-300">
            <p className="mb-1">
              <strong>Demo Accounts:</strong>
            </p>
            <p>Client: client@example.com / password</p>
            <p>Technician: technician@example.com / password</p>
          </div>
        </div>
      )}

      {/* Problems/Service History Section */}
      {user && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {problemsData.title}
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {isTechnician
                ? `Technician since ${new Date(
                    technicianProblemsData.technician.memberSince
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}`
                : `Member since ${new Date(
                    clientProblemsData.stats.memberSince
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}`}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {isTechnician ? (
              <>
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {technicianProblemsData.stats.totalAssignedJobs}
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    Assigned Jobs
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {technicianProblemsData.stats.completedToday}
                  </div>
                  <div className="text-sm text-green-800 dark:text-green-300">
                    Completed Today
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {technicianProblemsData.stats.averageRating}
                  </div>
                  <div className="text-sm text-yellow-800 dark:text-yellow-300">
                    Avg Rating
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {technicianProblemsData.stats.totalRevenueThisMonth}
                  </div>
                  <div className="text-sm text-purple-800 dark:text-purple-300">
                    Monthly Revenue
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {clientProblemsData.stats.totalServices}
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    Total Services
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {clientProblemsData.stats.completedServices}
                  </div>
                  <div className="text-sm text-green-800 dark:text-green-300">
                    Completed
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {clientProblemsData.stats.averageRating}
                  </div>
                  <div className="text-sm text-yellow-800 dark:text-yellow-300">
                    Avg Rating
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {clientProblemsData.stats.totalSpent}
                  </div>
                  <div className="text-sm text-purple-800 dark:text-purple-300">
                    Total Spent
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Today's Schedule for Technicians */}
          {isTechnician && (
            <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-700 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-800 dark:text-orange-200 mb-3">
                Today&apos;s Schedule
              </h3>
              <div className="space-y-2">
                {technicianProblemsData.todaySchedule.map(
                  (appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {appointment.time} - {appointment.client}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {appointment.type}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">
                          {appointment.location}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          appointment.priority === "urgent"
                            ? "bg-red-100 text-red-800"
                            : appointment.priority === "high"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {appointment.priority}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Problems List */}
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {problemsData.problems.map((problem: any) => (
              <ProblemListItem key={problem.id} problem={problem} />
            ))}
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Need Help?
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link
            href="/common-issues"
            className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          >
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Common Issues
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                DIY solutions
              </div>
            </div>
          </Link>

          <Link
            href="/tools"
            className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          >
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Get Tools
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Shop equipment
              </div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="flex items-center p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          >
            <svg
              className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                Contact Us
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Get in touch
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
