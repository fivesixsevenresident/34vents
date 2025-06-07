import React, { useState } from "react";

interface Tool {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  buyLink: string;
  features: string[];
}

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [imageError, setImageError] = useState(false);
  const defaultImage =
    "https://images.unsplash.com/photo-1609205807107-e8ec4648c64b?w=400&h=300&fit=crop&auto=format";
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-w-16 aspect-h-12">
        <img
          src={imageError ? defaultImage : tool.image}
          alt={tool.name}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{tool.name}</h3>
          <span className="text-lg font-bold text-green-600">{tool.price}</span>
        </div>

        <p className="text-gray-700 mb-4">{tool.description}</p>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Features:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {tool.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={tool.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block text-center"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}
