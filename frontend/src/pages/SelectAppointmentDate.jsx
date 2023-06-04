import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doctorsAppointments } from "../features/auth/authSlice";
import axios from "axios";
// import { useNavigate } from 'react-router-dom'
import PatientDetailsCard from "../components/PatientDetailsCard";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Calendar from "../components/Calendar";

function SelectAppointmentDate() {
  const [selectedDate, setSelectedDate] = useState("");
  // const [date, setDate] = useState("");
  // const navigate = useNavigate()
  const dispatch = useDispatch();
  const { doctor, appointments } = useSelector((state) => state.auth);
  const [allAppointments, setAllAppointments] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${doctor.token}`,
      },
    };
    const getAllAppointments = async () => {
      await axios
        .get(`/api/appointments/get_all_appointments/`, config)
        .then((response) => setAllAppointments(response.data));
    };
    getAllAppointments();
  }, [appointments, doctor, dispatch]);

  const selectDate = (e) => {
    setSelectedDate(e.target.value);
    dispatch(doctorsAppointments({ date: e.target.value }));
  };

  const theme = createTheme();
  return (
    <div style={{ minHeight: "70vh" }}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="s"
          sx={{
            // marginTop: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            minHeight: "90vh",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              // marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: "20px", sm: "45px", md: "45px" },
                  marginTop: { sm: "45px", md: "45px" },
                }}
              >
                Welcome to your scheduled appointment
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "17px", sm: "25px", md: "25px" },
                  margin: { sm: "auto" },
                  marginTop: { xs: "25px", sm: "25px", md: "45px" },
                  display: { sm: "flex" },
                  justifyContent: { sm: "space-between" },
                  alignItems: { sm: "center" },
                  width: { sm: "60%" },
                }}
              >
                <label>Select date of appointment:</label>
                <input type="date" value={selectedDate} onChange={selectDate} />
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {appointments[0]
                ? appointments.map((appointment) => (
                    <PatientDetailsCard
                      key={appointment.id}
                      appointment={appointment}
                      selectedDate={selectedDate}
                    />
                  ))
                : selectedDate === ""
                ? ""
                : `No Appointments for the date: ${selectedDate}`}
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Calendar allAppointments={allAppointments} />
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SelectAppointmentDate;
