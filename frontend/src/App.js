import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import {ToastContainer} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import BookAppointment from './pages/BookAppointment'
import Footer from './components/Footer'
import SelectAppointmentDate from './pages/SelectAppointmentDate'

function App() {
  return (
    <>
      <Router>
          <Header/>
          <Routes>
            <Route path = '/' element={<Home />}/>
            <Route path = '/login' element={<Login />}/>
            <Route path = '/book_appointment' element={<BookAppointment />}/>
            <Route path = '/select_appointment_date' element={<SelectAppointmentDate />}/>
          </Routes>
          <Footer/>
      </Router>
      
      {/* <ToastContainer/> */}
    </>
  );
}

export default App;
