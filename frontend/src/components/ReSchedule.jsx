import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeAppointmentDate } from "../features/auth/authSlice";
import { doctorsAppointments } from "../features/auth/authSlice";

const ReSchedule = ({ appointment, selectedDate }) => {
  const [reDate, setReDate] = useState(selectedDate);

  // const navigate = useNavigate()
  const dispatch = useDispatch();

  const reSchedule = (e) => {
    setReDate(e.target.value);
    const updatedAppointment = {
      ...appointment,
      date: e.target.value,
    };
    dispatch(changeAppointmentDate(updatedAppointment));
    dispatch(doctorsAppointments(selectedDate));
  };

  return (
    <form>
      <label>Select date to reschedule the appoinment: </label>
      <div>
        <input type="date" value={reDate} onChange={reSchedule} />
      </div>
    </form>
  );
};

export default ReSchedule;
