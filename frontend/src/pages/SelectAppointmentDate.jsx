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
// import Scrollbars from "react-custom-scrollbars";

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

  const theme = createTheme();
  return (
    <div style={{ eight: "70vh" }}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="s"
          sx={{
            display: "flex",
            flexDirection: "row",
            // alignItems: "center",
            justifyContent: "space-evenly",
            minHeight: "90vh",
            position: "relative",
          }}
        >
          <CssBaseline />
          <Box
          // sx={{
          //   display: "flex",
          //   flexDirection: "column",
          //   alignItems: "center",
          // }}
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

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2rem",
                maxHeight: "600px",
                overflow: "auto",
              }}
            >
              {appointments[0] ? (
                <Card sx={{ width: "400px", overflow: "hidden" }}>
                  {/* <Scrollbars style={{ width: "100%", height: "300px" }}> */}
                  <CardContent>
                    {appointments.map((appointment) => (
                      <PatientDetailsCard
                        key={appointment.id}
                        appointment={appointment}
                        selectedDate={selectedDate}
                      />
                    ))}
                  </CardContent>
                  {/* </Scrollbars> */}
                </Card>
              ) : selectedDate === "" ? null : (
                <Typography>
                  No Appointments for the date: {selectedDate}
                </Typography>
              )}
            </Box>
          </Box>
          <div
            style={{
              position: "sticky",
              top: "1200px",
              border: "1px solid red",
            }}
          >
            <Calendar allAppointments={allAppointments} />
          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default SelectAppointmentDate;
