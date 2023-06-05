import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doctorsAppointments } from "../features/auth/authSlice";
import PatientDetailsCard from "../components/PatientDetailsCard";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Calendar from "../components/Calendar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function SelectAppointmentDate() {
  const [selectedDate, setSelectedDate] = useState("");
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

  const handleEventClick = (clickInfo) => {
    console.log("clickInfo", clickInfo);
  };

  const theme = createTheme();
  return (
    <div style={{ minHeight: "70vh" }}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="s"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            minHeight: "90vh",
          }}
        >
          <CssBaseline />
          <Box>
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
                  margin: "auto",
                  marginTop: { xs: "25px", sm: "25px", md: "45px" },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "60%",
                }}
              >
                <label>Select date of appointment:</label>
                <input type="date" value={selectedDate} onChange={selectDate} />
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2rem",
                maxHeight: "60vh",
                overflow: "auto",
              }}
            >
              <Box>
                {appointments[0] ? (
                  <Card sx={{ width: "450px" }}>
                    <CardContent>
                      {appointments.map((appointment) => (
                        <PatientDetailsCard
                          key={appointment.id}
                          appointment={appointment}
                          selectedDate={selectedDate}
                        />
                      ))}
                    </CardContent>
                  </Card>
                ) : selectedDate === "" ? null : (
                  <Typography>
                    No Appointments for the date: {selectedDate}
                  </Typography>
                )}
              </Box>
              <style>
                {`
                  div::-webkit-scrollbar {
                    width: 8px;
                  }
                
                  div::-webkit-scrollbar-thumb {
                    background-color: #888;
                    border-radius: 4px;
                  }
                
                  div::-webkit-scrollbar-thumb:hover {
                    background-color: #555;
                  }
                  `}
              </style>
            </div>
          </Box>

          <div
            style={{
              position: "sticky",
              height: "45vh",
              top: "100px",
            }}
          >
            <Calendar
              allAppointments={allAppointments}
              onDateClick={setSelectedDate}
              handleEventClick={handleEventClick}
            />
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SelectAppointmentDate;
