"use client";

import { useState } from "react";

// Helper function to generate days for a calendar
const generateCalendar = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendar = [];
  let day = 1;

  for (let i = 0; i < 6; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        week.push(null); // Empty days before the 1st of the month
      } else if (day > daysInMonth) {
        week.push(null); // Empty days after the last day of the month
      } else {
        week.push(day++);
      }
    }
    calendar.push(week);
  }

  return calendar;
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const calendar = generateCalendar(currentYear, currentMonth);

  // Navigate to the previous month
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 0 ? 11 : prev - 1;
      if (prev === 0) setCurrentYear((prevYear) => prevYear - 1);
      return newMonth;
    });
  };

  // Navigate to the next month
  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = prev === 11 ? 0 : prev + 1;
      if (prev === 11) setCurrentYear((prevYear) => prevYear + 1);
      return newMonth;
    });
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

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar-container p-4 max-w-md mx-auto bg-white shadow-lg rounded">
      <div className="header flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <h2 className="text-lg font-bold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {weekDays.map((day) => (
              <th key={day} className="text-center text-sm text-gray-600">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, index) => (
            <tr key={index}>
              {week.map((day, idx) => {
                const isToday =
                  day === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();
                return (
                  <td
                    key={idx}
                    className={`text-center p-2 ${
                      day
                        ? isToday
                          ? "bg-blue-500 text-white font-bold rounded"
                          : "text-gray-800"
                        : "text-gray-300"
                    }`}
                  >
                    {day || ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
