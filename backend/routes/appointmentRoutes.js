const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  getAppointments,
  setAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(setAppointment);
router.route("/get_appointments/").post(protect, getAppointments);
router.route("/get_all_appointments/").get(protect, getAllAppointments);

router
  .route("/:id")
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

module.exports = router;
