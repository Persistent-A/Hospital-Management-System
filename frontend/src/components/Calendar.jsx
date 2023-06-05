import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = ({ allAppointments }) => {
  const appointmentsByDay = {};

  // Count appointments for each day
  allAppointments.forEach((appointment) => {
    const appointmentDate = appointment.date;
    if (appointmentsByDay[appointmentDate]) {
      appointmentsByDay[appointmentDate]++;
    } else {
      appointmentsByDay[appointmentDate] = 1;
    }
  });

  const eventContent = (arg) => {
    return (
      <>
        <div style={{textAlign:"center"}}>{arg.event.extendedProps.count}</div>
      </>
    );
  };

  const events = Object.entries(appointmentsByDay).map(([date, count]) => ({
    title: "",
    count: count,
    start: date,
  }));

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={eventContent}
      />
    </div>
  );
};

export default Calendar;
