// @desc Delete Attendance
// @route DELETE /api/v1/attendance/delete/:id
// @access Private: Needs Login
const express = require("express");
const router = express.Router();
const { deleteAttendance } = require("../controllers/attendance");
const validateToken = require("../middleware/validateTokenHandler");
router.delete("/delete/:id", validateToken, deleteAttendance);
//@desc Delete Attendance
//@route DELETE /api/v1/attendance/delete/:id
//@access Private: Needs Login
// DELETE route is defined below after all requires
const { body } = require("express-validator");
const {
  testAttendanceAPI,

  addAttendance,
  addSingleAttendance,

  getAllAttendanceByClient,
  getAttendanceById,
  getLatestAttendance,
  editAttendanceData,
  addRecordInAttendanceData,
  getEmployeeAttendance,

  getAttendaceFromTo2,
} = require("../controllers/attendance");
const { getClientAttendance } = require('../controllers/attendance');

//@desc Test Attendance API
//@route GET /api/v1/attendance
//@access Private: Needs Login
router.get("/", validateToken, testAttendanceAPI);

//@desc Test Attendance API
//@route POST /api/v1/attendance/add/:id
//@access Private: Needs Login
router.post(
  "/add/:id",
  validateToken,
  [body("month_year", "Enter a valid month_year").notEmpty()],
  [body("employeeData", "Enter a valid employeeData").notEmpty()],
  [body("totalWorkingDays", "Enter a valid totalWorkingDays").notEmpty()],
  [body("month", "Enter a valid month").notEmpty()],
  [body("year", "Enter a valid year").notEmpty()],
  [body("absentDaysLOP")],
  [body("absentDaysCL")],
  [body("absentDaysPL")],
  [body("absentDaysSL")],
  [body("numberOfLOP")],
  [body("numberOfCL")],
  [body("numberOfPL")],
  [body("numberOfSL")],

  addAttendance
);

//@desc Create New Attendance
//@route POST /api/v1/attendance/add/single/:client_user_id
//@access Private: Needs Login
router.post(
  "/add/single/:client_user_id",
  validateToken,

  [body("month_year", "Enter a valid month_year").notEmpty()],
  [body("name", "Enter a valid name").notEmpty()],
  [body("emp_no", "Enter a valid emp_no").notEmpty()],
  [body("email", "Enter a valid email").notEmpty()],
  [body("present", "Enter a valid present").notEmpty()],
  [body("totalWorkingDays", "Enter a valid totalWorkingDays").notEmpty()],
  [body("month", "Enter a valid month").notEmpty()],
  [body("year", "Enter a valid year").notEmpty()],
  [body("gross", "Enter a valid gross").notEmpty()],
  [body("remark")],

  addSingleAttendance
);

//@desc Test Attendance API
//@route GET /api/v1/attendance/get/all/:client_user_id
//@access Private: Needs Login
router.get(
  "/get/all/:client_user_id",
  validateToken,

  getAllAttendanceByClient
);

//@desc Test Attendance API
//@route GET /api/v1/attendance/get/:client_user_id/:month_year
//@access Private: Needs Login
router.get(
  "/get/:client_user_id/:month_year",
  validateToken,

  getAttendanceById
);

//@desc Get AttendanceData by from month_year to to month_year
//@route GET /api/v1/attendance/get/from/to/:email
//@access Private: Needs Login
router.post(
  "/get/from/to/:id/:email",
  validateToken,
  [body("from", "Enter a valid from").notEmpty()],
  [body("to", "Enter a valid to").notEmpty()],
  getAttendaceFromTo2
);

//@desc Test Attendance API
//@route GET /api/v1/attendance/get/employee/:attendance_id
//@access Private: Needs Login
router.post(
  "/get/employee/:attendance_id",
  validateToken,

  getEmployeeAttendance
);

//@desc Test Attendance API
//@route GET /api/v1/attendance/get/:id
//@access Private: Needs Login
router.get(
  "/get/latest/:id",
  validateToken,

  getLatestAttendance
);

//@desc Test Attendance API
//@route PUT /api/v1/attendance/edit/:id/:attendance_id
//@access Private: Needs Login
router.put(
  "/edit/:attendance_id",
  validateToken,
  [body("name", "Enter a valid name").notEmpty()],
  [body("emp_no")],
  [body("present", "Enter a valid present").notEmpty()],
  [body("totalWorkingDays")],
  [body("remark")],
  [body("numberOfLOP")],
  [body("absentDaysLOP")],
  [body("numberOfCL")],
  [body("absentDaysCL")],
  [body("numberOfSL")],
  [body("absentDaysSL")],
  [body("numberOfPL")],
  [body("absentDaysPL")],

  editAttendanceData
);

//@desc Test Attendance API
//@route POST /api/v1/attendance/add/record/:id
//@access Private: Needs Login
router.post(
  "/add/record/:id",
  validateToken,
  [body("emp_id", "Enter a valid emp_id").notEmpty()],
  [body("present", "Enter a valid present").notEmpty()],
  [body("name", "Enter a valid name").notEmpty()],

  addRecordInAttendanceData
);

//@desc Get Client Attendance
//@route GET /api/v1/attendance/client/:clientId
//@access Private: Needs Login
router.get("/client/:clientId", getClientAttendance);

module.exports = router;
