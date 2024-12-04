"use client";

import React, { useState } from "react";
import "/src/app/calendarStyle.css";

function Calendar() {
   const [sDate, setsDate] = useState(new Date());

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
         allDays.push(<div key = {`em-${p}`} className = "box empty"></div>);
      }

      // Show actual days
      for (let d = 1; d <= mDays; d++) {
         const date = new Date(y, m, d);
         const isSelected = sDate && date.toDateString() === sDate.toDateString();

         allDays.push(
            <div
               key = {`d-${d}`}
               className = {`box ${isSelected ? "selected" : ""}`}
               onClick = {() => handleDateClick(date)}
               >
               {d}
            </div>
         );
      }

      return allDays;
   };

   return (
      <div>
      <h3>
            Schedule
      </h3>
      <div className = "main">
         <div className = "header">
            <button onClick = {changeToPrevMonth}>{'<'}</button>
            <h2>
               {sDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
               })}
            </h2>
            <button onClick = {changeToNextMonth}>{'>'}</button>
         </div>
         
         <div className = "body">{showCalendar()} </div>
            {sDate && (
               <div className = "selected-date">
                {/*
                  Selected Date: {sDate.toLocaleDateString()}
                  */}
               </div>

            )}
         </div>
      </div>
   );
}

export default Calendar;