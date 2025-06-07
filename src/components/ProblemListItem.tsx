"use client";

import React from "react";

interface Problem {
  id: string;
  summary: string;
  serviceType: string;
  location: string;
  appliance: string | null;
  status: "completed" | "in-progress" | "scheduled";
  createdDate: string;
  completedDate: string | null;
  technician: string;
  cost: string;
  rating: number | null;
  description: string;
  notes: string;
}

interface ProblemListItemProps {
  problem: Problem;
}

export default function ProblemListItem({ problem }: ProblemListItemProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300";
      case "in-progress":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300";
      case "scheduled":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "in-progress":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "scheduled":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            {problem.summary}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {problem.description}
          </p>
        </div>
        <div className="ml-4 flex items-center">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              problem.status
            )}`}
          >
            {getStatusIcon(problem.status)}
            <span className="ml-1 capitalize">{problem.status}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Date:
          </span>
          <br />
          {formatDate(problem.createdDate)}
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Technician:
          </span>
          <br />
          {problem.technician}
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Cost:
          </span>
          <br />
          <span className="font-semibold text-green-600 dark:text-green-400">
            {problem.cost}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-900 dark:text-white">
            Rating:
          </span>
          <br />
          {problem.rating ? (
            <div className="flex items-center">
              {renderStars(problem.rating)}
              <span className="ml-1 text-xs">({problem.rating}/5)</span>
            </div>
          ) : (
            <span className="text-gray-400 dark:text-gray-500">Pending</span>
          )}
        </div>
      </div>

      {problem.notes && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded p-3 text-sm">
          <span className="font-medium text-gray-900 dark:text-white">
            Notes:
          </span>
          <p className="text-gray-700 dark:text-gray-300 mt-1">
            {problem.notes}
          </p>
        </div>
      )}
    </div>
  );
}
