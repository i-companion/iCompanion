"use client";

import React, { useState } from "react";
import "/src/app/calendarStyle.css";
import axios from "axios";

function Calendar() {
  const [sDate, setsDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ]);

  const [dateTimesMap, setDateTimesMap] = useState<Record<string, string[]>>(
    {}
  );

  const availableTimesForDate = dateTimesMap[sDate.toDateString()] || [];

  const handleDateClick = (date: Date) => {
    setsDate(date);
  };

  const handleTimeSelect = async (time: string) => {
    const dateKey = sDate.toDateString();

    // Update the available times for the current date
    setDateTimesMap((prevMap) => ({
      ...prevMap,
      [dateKey]: [...(prevMap[dateKey] || []), time].sort(),
    }));

    // Remove the selected time from the general time slots
    setTimeSlots((prevSlots) => prevSlots.filter((slot) => slot !== time));

    try {
      // Save the selected available time to the backend
      const response = await axios.post("/api/save-time", {
        date: sDate.toISOString(),
        time,
      });

      if (response.status === 200) {
        console.log("Available time saved successfully!");
      } else {
        console.error("Error saving available time", response.data);
      }
    } catch (error) {
      console.error("Error saving available time", error);
    }
  };

  const handleRemoveTime = async (time: string) => {
    const dateKey = sDate.toDateString();

    // Update the available times for the current date
    setDateTimesMap((prevMap) => ({
      ...prevMap,
      [dateKey]: (prevMap[dateKey] || []).filter(
        (availableTime) => availableTime !== time
      ),
    }));

    // Add the removed time back to the general time slots
    setTimeSlots((prevSlots) => [...prevSlots, time].sort());

    try {
      // Inform the backend that the time is no longer available
      const response = await axios.post("/api/remove-time", {
        date: sDate.toISOString(),
        time,
      });

      if (response.status === 200) {
        console.log("Available time removed successfully!");
      } else {
        console.error("Error removing available time", response.data);
      }
    } catch (error) {
      console.error("Error removing available time", error);
    }
  };

  const showCalendar = () => {
    const y = sDate.getFullYear();
    const m = sDate.getMonth();
    const mDays = new Date(y, m + 1, 0).getDate();
    const fDay = new Date(y, m, 1).getDay();

    const allDays = [];

    // For empty cells
    for (let p = 0; p < fDay; p++) {
      allDays.push(<div key={`em-${p}`} className="box empty"></div>);
    }

    // Show actual days
    for (let d = 1; d <= mDays; d++) {
      const date = new Date(y, m, d);
      const isSelected = sDate && date.toDateString() === sDate.toDateString();

      allDays.push(
        <div
          key={`d-${d}`}
          className={`box ${isSelected ? "selected" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {d}
        </div>
      );
    }

    return allDays;
  };

  return (
    <div>
      <h3>Schedule</h3>
      <div className="main">
        <div className="header">
          <button onClick={() => setsDate(new Date(sDate.getFullYear(), sDate.getMonth() - 1))}>
            {"<"}
          </button>
          <h2>
            {sDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={() => setsDate(new Date(sDate.getFullYear(), sDate.getMonth() + 1))}>
            {">"}
          </button>
        </div>

        <div className="body">{showCalendar()}</div>

        {sDate && (
          <div className="selected-date">
            <h4>Available Times for {sDate.toLocaleDateString()}</h4>
            {availableTimesForDate.length > 0 ? (
              <ul>
                {availableTimesForDate.map((time, index) => (
                  <li key={index}>
                    {time}{" "}
                    <button onClick={() => handleRemoveTime(time)}>x</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No available times</p>
            )}

            <div>
              <h5>Select an available time slot:</h5>
              <ul>
                {timeSlots.map((slot, index) => (
                  <li key={index}>
                    <button onClick={() => handleTimeSelect(slot)}>{slot}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
