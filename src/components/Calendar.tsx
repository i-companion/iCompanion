"use client";

import React, { useState, useEffect } from "react";
import "/src/app/calendarStyle.css";
import axios from "axios";

function Calendar() {
  const [sDate, setsDate] = useState(new Date());
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

//list of time slots
  const timeSlots = [
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ];

  const findMonthDays = (y: any, m: any) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const findFirstDay = (y: any, m: any) => {
    return new Date(y, m, 1).getDay();
  };

  const changeToPrevMonth = () => {
    setsDate((pDate) => {
      const pMonth = pDate.getMonth() - 1;
      const pYear = pDate.getFullYear();
      return new Date(pYear, pMonth);
    });
  };

  const changeToNextMonth = () => {
    setsDate((pDate) => {
      const nMonth = pDate.getMonth() + 1;
      const nYear = pDate.getFullYear();
      return new Date(nYear, nMonth);
    });
  };

  const handleDateClick = (date: any) => {
    setsDate(date);
    fetchAvailableTimes(date); // Fetch available times for the selected date
  };

  const fetchAvailableTimes = async (date: Date) => {
    try {
      const response = await axios.get(`/api/available-times?date=${date.toISOString()}`);
      if (response.status === 200) {
        setAvailableTimes(response.data);  // Update the available times list
      }
    } catch (error) {
      console.error("Error fetching available times", error);
    }
  };

  const handleTimeSelect = async (time: string) => {
    setSelectedTime(time);

    try {
      // Save the selected available time
      const response = await axios.post('/api/save-time', {
        date: sDate.toISOString(),
        time,
      });

      if (response.status === 200) {
        alert('Available time saved successfully!');
      } else {
        console.error("Error saving available time", response.data);
      }
    } catch (error) {
      console.error("Error saving available time", error);
    }
  };

  const showCalendar = () => {
    const currDate = new Date();
    const y = sDate.getFullYear();
    const m = sDate.getMonth();
    const mDays = findMonthDays(y, m);
    const fDay = findFirstDay(y, m);

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
          <button onClick={changeToPrevMonth}>{'<'}</button>
          <h2>
            {sDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={changeToNextMonth}>{'>'}</button>
        </div>

        <div className="body">{showCalendar()}</div>

        {sDate && (
          <div className="selected-date">
            <h4>Available Times for {sDate.toLocaleDateString()}</h4>
            {availableTimes.length > 0 ? (
              <ul>
                {availableTimes.map((time, index) => (
                  <li
                    key={index}
                    onClick={() => handleTimeSelect(time)}
                    className={selectedTime === time ? "selected-time" : ""}
                  >
                    {time}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No available times</p>
            )}

            {/* Display predefined time slots */}
            <div>
              <h5>Select an available time slot:</h5>
              <ul>
                {timeSlots.map((slot, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleTimeSelect(slot)}
                      className={selectedTime === slot ? "selected-time" : ""}
                    >
                      {slot}
                    </button>
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
