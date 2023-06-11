import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const Calendar = ({ allAppointments, fromCalendar }) => {
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
    const handleClick = (date) => {
      fromCalendar(date);
    };

    const count = arg.event.extendedProps.count;
    const date = arg.event.start;

    return (
      <div
        className="calendar-count"
        style={{ textAlign: "center" }}
        onClick={() => handleClick(date)}
      >
        {count}
      </div>
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
        // selectable={true}
        // select={handleDate}
        // eventClick={handleClick}
      />
    </div>
  );
};

export default Calendar;
