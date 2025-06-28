"use client";
import React from "react";
import { useTools } from "../../hooks/useContent";
import ToolCard from "../../components/ToolCard";

interface Tool {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  buyLink: string;
  features: string[];
}

export default function Tools() {
  const { toolsData, isLoading, error } = useTools();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!toolsData) {
    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <div className="text-lg text-gray-600">No data available</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">{toolsData.title}</h1>
        <p className="text-lg text-gray-700 mb-2">{toolsData.subtitle}</p>
        <p className="text-gray-600">{toolsData.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {toolsData.tools.map((tool: Tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Plumbing Tips</h3>
          <ul className="space-y-2">
            {toolsData.tips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start text-sm">
                <span className="text-yellow-500 mr-2 mt-1">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Important Notice</h3>
          <p className="text-sm text-gray-700">{toolsData.disclaimer}</p>
          <div className="mt-4 p-3 bg-blue-100 rounded text-sm text-blue-800">
            <strong>Need Help?</strong> If you&apos;re unsure about which tools
            to buy or how to use them, consider consulting with a professional
            plumber.
          </div>
        </div>
      </div>
    </div>
  );
}
