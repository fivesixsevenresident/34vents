"use client";

import React, { useState } from "react";

interface Issue {
  id: string;
  name: string;
  category: string;
  resolution: {
    overview: string;
    difficulty: string;
    timeRequired: string;
    toolsNeeded: string[];
    steps: string[];
    warnings: string[];
  };
}

interface IssueCardProps {
  issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900";
      case "moderate":
        return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900";
      case "hard":
        return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900";
      default:
        return "text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header - Always Visible */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={toggleExpanded}
      >
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {issue.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {issue.category}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
              issue.resolution.difficulty
            )}`}
          >
            {issue.resolution.difficulty}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
              isExpanded ? "rotate-90" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
          <div className="space-y-4">
            {/* Overview */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Overview
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {issue.resolution.overview}
              </p>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Time Required
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {issue.resolution.timeRequired}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Difficulty
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    issue.resolution.difficulty
                  )}`}
                >
                  {issue.resolution.difficulty}
                </span>
              </div>
            </div>

            {/* Tools Needed */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Tools Needed
              </h4>
              <div className="flex flex-wrap gap-2">
                {issue.resolution.toolsNeeded.map((tool, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs rounded-md"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Step-by-Step Instructions
              </h4>
              <ol className="space-y-2">
                {issue.resolution.steps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 dark:bg-blue-700 text-white text-xs rounded-full flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Warnings */}
            {issue.resolution.warnings.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Important Warnings
                </h4>
                <ul className="space-y-1">
                  {issue.resolution.warnings.map((warning, index) => (
                    <li
                      key={index}
                      className="text-sm text-yellow-700 dark:text-yellow-300 flex items-start"
                    >
                      <span className="text-yellow-500 dark:text-yellow-400 mr-2">
                        •
                      </span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
