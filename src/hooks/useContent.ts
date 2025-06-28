"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "./constants";

interface AboutData {
  title: string;
  mission: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
  contact: {
    email: string;
    location: string;
    social: {
      twitter: string;
      github: string;
    };
  };
}

interface CommonIssuesData {
  title: string;
  subtitle: string;
  description: string;
  issues: Array<{
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
  }>;
  emergencyNote: string;
  disclaimer: string;
}

interface ToolsData {
  title: string;
  subtitle: string;
  description: string;
  tools: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    buyLink: string;
    features: string[];
  }>;
  disclaimer: string;
  tips: string[];
}

interface WhyData {
  title: string;
  subtitle: string;
  reasons: Array<{
    heading: string;
    content: string;
    benefits: string[];
  }>;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  callToAction: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export const useAbout = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/content/about`);
      const data = await response.json();

      if (response.ok) {
        setAboutData(data.data);
      } else {
        setError(data.message || "Failed to fetch about data");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Fetch about error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return { aboutData, isLoading, error, refetch: fetchAbout };
};

export const useCommonIssues = () => {
  const [commonIssuesData, setCommonIssuesData] =
    useState<CommonIssuesData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCommonIssues = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/content/common-issues`);
      const data = await response.json();

      if (response.ok) {
        setCommonIssuesData(data.data);
      } else {
        setError(data.message || "Failed to fetch common issues data");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Fetch common issues error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCommonIssues();
  }, []);

  return { commonIssuesData, isLoading, error, refetch: fetchCommonIssues };
};

export const useTools = () => {
  const [toolsData, setToolsData] = useState<ToolsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTools = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/content/tools`);
      const data = await response.json();

      if (response.ok) {
        setToolsData(data.data);
      } else {
        setError(data.message || "Failed to fetch tools data");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Fetch tools error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return { toolsData, isLoading, error, refetch: fetchTools };
};

export const useWhy = () => {
  const [whyData, setWhyData] = useState<WhyData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWhy = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/content/why`);
      const data = await response.json();

      if (response.ok) {
        setWhyData(data.data);
      } else {
        setError(data.message || "Failed to fetch why data");
      }
    } catch (error) {
      setError("Network error occurred");
      console.error("Fetch why error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWhy();
  }, []);

  return { whyData, isLoading, error, refetch: fetchWhy };
};
