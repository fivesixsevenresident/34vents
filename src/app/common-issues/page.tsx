"use client";
import React from "react";
import { useCommonIssues } from "../../hooks/useContent";
import IssueCard from "../../components/IssueCard";

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

export default function CommonIssues() {
  const { commonIssuesData: issuesData, isLoading, error } = useCommonIssues();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!issuesData) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="text-lg text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {issuesData.title}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          {issuesData.subtitle}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {issuesData.description}
        </p>
      </div>

      <div className="space-y-4 mb-12">
        {issuesData.issues.map((issue: Issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Emergency Situations
          </h3>
          <p className="text-red-700 dark:text-red-300 text-sm">
            {issuesData.emergencyNote}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Important Disclaimer
          </h3>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            {issuesData.disclaimer}
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Still Need Help?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            If you can&apos;t find a solution to your problem or need
            professional assistance:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/fix"
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Get Professional Help
            </a>
            <a
              href="/tools"
              className="bg-gray-600 dark:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              Shop for Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
