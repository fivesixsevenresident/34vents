"use client";

import React, { useState } from "react";

interface DateTimeSlot {
  date: string;
  times: string[];
}

interface DateSelectorProps {
  onDatesChangeAction: (dateTimeSlots: DateTimeSlot[]) => void;
  onCloseAction: () => void;
  selectedDates: DateTimeSlot[];
}

interface TimeSelectorProps {
  date: string;
  selectedTimes: string[];
  onTimeSelection: (times: string[]) => void;
  onCancel: () => void;
  formatDisplayDate: (date: string) => string;
  formatTimeSlot: (time: string) => string;
  getAvailableTimeSlots: () => string[];
}

function TimeSelector({
  date,
  selectedTimes,
  onTimeSelection,
  onCancel,
  formatDisplayDate,
  formatTimeSlot,
  getAvailableTimeSlots,
}: TimeSelectorProps) {
  const [tempSelectedTimes, setTempSelectedTimes] =
    useState<string[]>(selectedTimes);

  const toggleTime = (time: string) => {
    const newTimes = tempSelectedTimes.includes(time)
      ? tempSelectedTimes.filter((t) => t !== time)
      : [...tempSelectedTimes, time].sort();
    setTempSelectedTimes(newTimes);
  };

  const handleConfirm = () => {
    if (tempSelectedTimes.length > 0) {
      onTimeSelection(tempSelectedTimes);
    }
  };

  const timeSlots = getAvailableTimeSlots();
  const morningSlots = timeSlots.filter(
    (time) => parseInt(time.split(":")[0]) < 12
  );
  const afternoonSlots = timeSlots.filter(
    (time) => parseInt(time.split(":")[0]) >= 12
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Select Times for {formatDisplayDate(date)}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Morning (8 AM - 12 PM)
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {morningSlots.map((time) => (
              <button
                key={time}
                onClick={() => toggleTime(time)}
                className={`
                 p-2 text-xs rounded-lg border transition-colors
                 ${
                   tempSelectedTimes.includes(time)
                     ? "bg-blue-600 text-white border-blue-600"
                     : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                 }
               `}
              >
                {formatTimeSlot(time)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Afternoon (12 PM - 6 PM)
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {afternoonSlots.map((time) => (
              <button
                key={time}
                onClick={() => toggleTime(time)}
                className={`
                 p-2 text-xs rounded-lg border transition-colors
                 ${
                   tempSelectedTimes.includes(time)
                     ? "bg-blue-600 text-white border-blue-600"
                     : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                 }
               `}
              >
                {formatTimeSlot(time)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tempSelectedTimes.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
          <p className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
            Selected Times ({tempSelectedTimes.length}):
          </p>
          <div className="text-xs text-blue-700 dark:text-blue-300">
            {tempSelectedTimes.map((time, index) => (
              <span key={time}>
                {index > 0 ? ", " : ""}
                {formatTimeSlot(time)}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        Select one or more time slots when you would be available for service on
        this date.
      </p>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          disabled={tempSelectedTimes.length === 0}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Times ({tempSelectedTimes.length})
        </button>
      </div>
    </div>
  );
}

export default function DateSelector({
  onDatesChangeAction,
  onCloseAction,
  selectedDates,
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempSelectedDates, setTempSelectedDates] =
    useState<DateTimeSlot[]>(selectedDates);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showTimeSelector, setShowTimeSelector] = useState(false);

  // Get current date and minimum selectable date (today)
  const today = new Date();
  const minDate = new Date(today);
  // Get days in current month
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  const isDateSelectable = (date: Date | null) => {
    if (!date) return false;
    return date >= minDate;
  };

  const isDateSelected = (date: Date | null) => {
    if (!date) return false;
    return tempSelectedDates.some((slot) => slot.date === formatDate(date));
  };

  const toggleDate = (date: Date | null) => {
    if (!date || !isDateSelectable(date)) return;

    const dateString = formatDate(date);
    const existingSlot = tempSelectedDates.find(
      (slot) => slot.date === dateString
    );

    if (existingSlot) {
      // Date already selected, remove it
      const newDates = tempSelectedDates.filter(
        (slot) => slot.date !== dateString
      );
      setTempSelectedDates(newDates);
    } else {
      // Date not selected, open time selector
      setSelectedDate(dateString);
      setShowTimeSelector(true);
    }
  };

  const handleTimeSelection = (times: string[]) => {
    if (!selectedDate || times.length === 0) return;

    const newSlot: DateTimeSlot = {
      date: selectedDate,
      times: times,
    };

    const updatedDates = tempSelectedDates.filter(
      (slot) => slot.date !== selectedDate
    );
    updatedDates.push(newSlot);
    updatedDates.sort((a, b) => a.date.localeCompare(b.date));

    setTempSelectedDates(updatedDates);
    setShowTimeSelector(false);
    setSelectedDate(null);
  };

  const removeDate = (dateString: string) => {
    const newDates = tempSelectedDates.filter(
      (slot) => slot.date !== dateString
    );
    setTempSelectedDates(newDates);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(
      currentMonth.getMonth() + (direction === "next" ? 1 : -1)
    );
    setCurrentMonth(newMonth);
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getAvailableTimeSlots = () => {
    return [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
    ];
  };

  const handleConfirm = () => {
    onDatesChangeAction(tempSelectedDates);
    onCloseAction();
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {!showTimeSelector ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Select Available Dates
                </h3>
                <button
                  onClick={onCloseAction}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  disabled={
                    currentMonth.getMonth() === today.getMonth() &&
                    currentMonth.getFullYear() === today.getFullYear()
                  }
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {monthNames[currentMonth.getMonth()]}{" "}
                  {currentMonth.getFullYear()}
                </h4>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
                  >
                    {day}
                  </div>
                ))}
                {getDaysInMonth(currentMonth).map((date, index) => {
                  const isSelectable = isDateSelectable(date);
                  const isSelected = isDateSelected(date);

                  return (
                    <button
                      key={index}
                      onClick={() => toggleDate(date)}
                      disabled={!isSelectable}
                      className={`
                       aspect-square text-sm rounded-lg transition-colors
                       ${!date ? "invisible" : ""}
                       ${
                         !isSelectable
                           ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                           : "hover:bg-gray-100 dark:hover:bg-gray-700"
                       }
                       ${
                         isSelected
                           ? "bg-blue-600 text-white hover:bg-blue-700"
                           : "text-gray-900 dark:text-white"
                       }
                       ${
                         isSelectable && !isSelected
                           ? "hover:bg-blue-50 dark:hover:bg-blue-900"
                           : ""
                       }
                     `}
                    >
                      {date?.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Selected Dates Display */}
              {tempSelectedDates.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Selected Dates & Times ({tempSelectedDates.length}):
                  </h4>
                  <div className="max-h-32 overflow-y-auto space-y-2">
                    {tempSelectedDates.map((slot) => (
                      <div
                        key={slot.date}
                        className="bg-blue-50 dark:bg-blue-900 p-2 rounded-md"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-blue-800 dark:text-blue-200">
                            {formatDisplayDate(slot.date)}
                          </span>
                          <button
                            onClick={() => removeDate(slot.date)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs"
                          >
                            ×
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {slot.times.map((time) => (
                            <span
                              key={time}
                              className="inline-block px-1.5 py-0.5 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded"
                            >
                              {formatTimeSlot(time)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                Select dates when you would be available for service. After
                selecting a date, you&apos;ll choose specific time slots. You
                can select dates starting from today.
              </p>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={onCloseAction}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-blue-700 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                >
                  Confirm ({tempSelectedDates.length} dates)
                </button>
              </div>
            </>
          ) : (
            <TimeSelector
              date={selectedDate!}
              selectedTimes={[]}
              onTimeSelection={handleTimeSelection}
              onCancel={() => {
                setShowTimeSelector(false);
                setSelectedDate(null);
              }}
              formatDisplayDate={formatDisplayDate}
              formatTimeSlot={formatTimeSlot}
              getAvailableTimeSlots={getAvailableTimeSlots}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export type { DateTimeSlot };
