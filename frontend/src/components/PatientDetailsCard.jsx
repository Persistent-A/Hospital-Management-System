import { FaCheck } from "react-icons/fa";
import { useState } from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import ReSchedule from "./ReSchedule";
import { useDispatch } from "react-redux";
import { changeAppointmentDate } from "../features/auth/authSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PatientDetailsCard = ({ appointment, selectedDate }) => {
  const [isRescheduled, setIsReschedule] = useState(false);

  const toggleReminder = () => {
    setIsReschedule(!isRescheduled);
  };

  const dispatch = useDispatch();

  return (
    <Card
      container
      spacing={5}
      sx={{
        minWidth: 265,
        margin: { xs: "5px", sm: "20px" },
        backgroundColor: isRescheduled ? "#f59c42" : "#efcc4f",
        // color: isRescheduled ? "white" : "black",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
          Name: {appointment.name}{" "}
          <FaCheck
            style={{ float: "right", cursor: "pointer" }}
            onClick={() =>
              dispatch(
                changeAppointmentDate({
                  _id: appointment._id,
                  isComplete: true,
                })
              )
            }
          />
        </Typography>
        <Typography variant="h6" component="div">
          Age: {appointment.age}
        </Typography>
        <Typography sx={{ mb: 1.5, fontWeight: "bold" }} color="text.secondary">
          Email: {appointment.email}
        </Typography>
        <Typography variant="body2">
          <BsCalendarDateFill onClick={() => toggleReminder(appointment.id)} />
          <br />
          {isRescheduled && (
            <ReSchedule
              toggleReminder={toggleReminder}
              appointment={appointment}
              selectedDate={selectedDate}
            />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PatientDetailsCard;
