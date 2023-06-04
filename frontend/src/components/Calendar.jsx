import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

const Calendar = ({allAppointments}) => {
  const events = allAppointments.map((appointment) => {
    return { title: appointment.name, start: appointment.date };
  });

  //   const events = [
  //     { title: "Event 1", start: "2023-06-01" },
  //     { title: "Event 2", start: "2023-06-03" },
  //   ];

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  );
};

export default Calendar;
