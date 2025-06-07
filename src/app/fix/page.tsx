"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "../../contexts/UserContext";
import DateSelector, { DateTimeSlot } from "../../components/DateSelector";

type ServiceType = "plumbing-repair" | "installation-consultation" | null;
type Location =
  | "faucet"
  | "sink"
  | "toilet"
  | "shower"
  | "tub"
  | "appliance"
  | "pipes-valves-connections"
  | null;
type Appliance =
  | "clothes-washer"
  | "dishwasher"
  | "hot-water-heater"
  | "garbage-disposal"
  | "other"
  | null;

// interface ProblemSummary {
//   serviceType: ServiceType;
//   location: Location;
//   appliance?: Appliance;
// }

export default function Fix() {
  const router = useRouter();
  const { user } = useUser();
  const [serviceType, setServiceType] = useState<ServiceType>(null);
  const [location, setLocation] = useState<Location>(null);
  const [appliance, setAppliance] = useState<Appliance>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [selectedDates, setSelectedDates] = useState<DateTimeSlot[]>([]);

  const handleServiceTypeSelect = (type: ServiceType) => {
    setServiceType(type);
    setLocation(null);
    setAppliance(null);
    setShowSummary(false);
  };

  const handleLocationSelect = (loc: Location) => {
    setLocation(loc);
    if (loc === "appliance") {
      setAppliance(null);
    } else {
      setAppliance(null);
      setShowSummary(true);
    }
  };

  const handleApplianceSelect = (app: Appliance) => {
    setAppliance(app);
    setShowSummary(true);
  };

  const getProblemSummary = (): string => {
    if (!serviceType || !location) return "";

    const serviceText =
      serviceType === "plumbing-repair"
        ? "Plumbing Repair"
        : "Installation Consultation";
    const locationText = {
      faucet: "Faucet",
      sink: "Sink",
      toilet: "Toilet",
      shower: "Shower",
      tub: "Tub",
      appliance: "Appliance",
      "pipes-valves-connections": "Pipes/Valves/Connections",
    }[location];

    let summary = "";
    if (location === "appliance" && appliance) {
      const applianceText = {
        "clothes-washer": "Clothes Washer",
        dishwasher: "Dishwasher",
        "hot-water-heater": "Hot Water Heater",
        "garbage-disposal": "Garbage Disposal",
        other: "Other Appliance",
      }[appliance];

      summary = `${serviceText} for ${applianceText}`;
    } else {
      summary = `${serviceText} for ${locationText}`;
    }

    // Add selected dates to summary if any
    if (selectedDates.length > 0) {
      const formattedDates = selectedDates
        .map((slot) => {
          const date = new Date(slot.date + "T00:00:00");
          const dateStr = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          const timeStr =
            slot.times.length > 1
              ? `${slot.times.length} times`
              : slot.times.map((time) => {
                  const [hours, minutes] = time.split(":");
                  const hour = parseInt(hours);
                  const ampm = hour >= 12 ? "PM" : "AM";
                  const displayHour =
                    hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                  return `${displayHour}:${minutes} ${ampm}`;
                })[0];
          return `${dateStr} (${timeStr})`;
        })
        .join(", ");

      summary += ` - Available: ${formattedDates}`;
    }

    return summary;
  };

  const resetQuestionnaire = () => {
    setServiceType(null);
    setLocation(null);
    setAppliance(null);
    setShowSummary(false);
    setSelectedDates([]);
    setShowDateSelector(false);
  };

  const handleDatesChange = (dateTimeSlots: DateTimeSlot[]) => {
    setSelectedDates(dateTimeSlots);
  };

  const formatSelectedDates = () => {
    if (selectedDates.length === 0) return "No dates selected";

    return selectedDates
      .map((slot) => {
        const date = new Date(slot.date + "T00:00:00");
        const dateStr = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        const timeStr = slot.times
          .map((time) => {
            const [hours, minutes] = time.split(":");
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? "PM" : "AM";
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            return `${displayHour}:${minutes} ${ampm}`;
          })
          .join(", ");
        return `${dateStr} (${timeStr})`;
      })
      .join(" • ");
  };

  return (
    <div className="max-w-2xl mx-auto p-8 dark:bg-gray-900 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Fix Your Plumbing Issue
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          Let us help you identify and solve your plumbing problem
        </p>
        <div className="mb-6">
          <Link
            href="/common-issues"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
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
            Check Common Issues First
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            You might find a quick solution to your problem
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {!showSummary ? (
          <>
            {/* Question 1: Why are you here? */}
            {!serviceType && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
                  Why are you here?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleServiceTypeSelect("plumbing-repair")}
                    className="bg-blue-600 dark:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                  >
                    Plumbing Repair
                  </button>
                  <button
                    onClick={() =>
                      handleServiceTypeSelect("installation-consultation")
                    }
                    className="bg-green-600 dark:bg-green-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-800 transition-colors"
                  >
                    Installation Consultation
                  </button>
                </div>
              </div>
            )}

            {/* Question 2: Which location? */}
            {serviceType && !location && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
                  Which location?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleLocationSelect("faucet")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Faucet
                  </button>
                  <button
                    onClick={() => handleLocationSelect("sink")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Sink
                  </button>
                  <button
                    onClick={() => handleLocationSelect("toilet")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Toilet
                  </button>
                  <button
                    onClick={() => handleLocationSelect("shower")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Shower
                  </button>
                  <button
                    onClick={() => handleLocationSelect("tub")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Tub
                  </button>
                  <button
                    onClick={() => handleLocationSelect("appliance")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Appliance
                  </button>
                  <button
                    onClick={() =>
                      handleLocationSelect("pipes-valves-connections")
                    }
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg font-medium transition-colors col-span-2 sm:col-span-1"
                  >
                    Pipes/Valves/Connections
                  </button>
                </div>
              </div>
            )}

            {/* Question 3: What kind of machine? (only if appliance selected) */}
            {serviceType && location === "appliance" && !appliance && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-white">
                  What kind of machine?
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => handleApplianceSelect("clothes-washer")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Clothes Washer
                  </button>
                  <button
                    onClick={() => handleApplianceSelect("dishwasher")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Dishwasher
                  </button>
                  <button
                    onClick={() => handleApplianceSelect("hot-water-heater")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Hot Water Heater
                  </button>
                  <button
                    onClick={() => handleApplianceSelect("garbage-disposal")}
                    className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-3 rounded-lg font-medium transition-colors text-gray-900 dark:text-white"
                  >
                    Garbage Disposal
                  </button>
                  <button
                    onClick={() => handleApplianceSelect("other")}
                    className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg font-medium transition-colors col-span-2 sm:col-span-1"
                  >
                    Other
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Summary Display */
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Your Problem Summary
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg mb-6">
              <p className="text-lg font-medium text-blue-900 dark:text-blue-200 mb-4">
                {getProblemSummary()}
              </p>
            </div>

            {/* Date Selection Section */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Available Dates
                </h3>
                <button
                  onClick={() => setShowDateSelector(true)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  {selectedDates.length > 0 ? "Edit Dates" : "Select Dates"}
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedDates.length > 0
                  ? formatSelectedDates()
                  : 'No dates selected - Click "Select Dates" to choose when you&apos;re available'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const problemSummary = getProblemSummary();
                  const params = new URLSearchParams({
                    problem: problemSummary,
                    serviceType: serviceType || "",
                    location: location || "",
                    ...(appliance && { appliance }),
                    ...(selectedDates.length > 0 && {
                      availableDates: JSON.stringify(selectedDates),
                    }),
                  });

                  if (user) {
                    // User is logged in, go directly to home with problem data
                    router.push(`/?${params.toString()}`);
                  } else {
                    // User not logged in, go to signin with problem data
                    router.push(`/signin?${params.toString()}`);
                  }
                }}
                className="bg-red-600 dark:bg-red-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
              >
                Help Me
              </button>
              <button
                onClick={resetQuestionnaire}
                className="bg-gray-600 dark:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Date Selection Modal */}
      {showDateSelector && (
        <DateSelector
          selectedDates={selectedDates}
          onDatesChangeAction={handleDatesChange}
          onCloseAction={() => setShowDateSelector(false)}
        />
      )}
    </div>
  );
}
