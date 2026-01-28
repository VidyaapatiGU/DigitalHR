const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  testSettingsAPI,
  addHolidayToFrom,
  getHolidaysPolicy,
  updateHolidayToFrom,
  addSalaryLogic,
  updateWeeklyOff,
  getWeeklyOff,
  addSalaryStructure,
  updateWorkingHours,
  sendOtp,
  validateOtp,
  testLeavesAPI,
  updateMinimumWages,
  addLeaves,
  getLeavesClient,
  updateSalaryInspector,
  updateMonthlySalaryDate,
  updateRegistrationNumber,
  updateEmployeeHolidayAssignments,
} = require("../controllers/settings.js");
const validateToken = require("../middleware/validateTokenHandler");

//@desc Test Settings API
//@route GET /api/v1/setting
//@access Private: Needs Login
router.get("/", validateToken, testSettingsAPI);

//@desc Add Settings Holiday to, from
//@route POST /api/v1/settings/holiday/to_from
//@access Private: Needs Login
router.post(
  "/holiday/to_from",
  [body("holidayDateTo").notEmpty(), body("holidayDateFrom").notEmpty()],
  validateToken,
  addHolidayToFrom
);

//@desc Add Settings weekoff
//@route POST /api/v1/settings/weeklyoff/update/:Clientid
//@access Private: Needs Login
router.put(
  "/weekly_off/update/:Clientid",
  [body("weeklyOff").isArray().notEmpty()],
  validateToken,
  updateWeeklyOff
);

//@desc Get Settings weekoff
//@route GET /api/v1/settings/weeklyoff/:Clientid
//@access Private: Needs Login
router.get("/weekly_off/:_id",validateToken,getWeeklyOff);

//@desc Get Client Settings Holiday to, from
//@route GET /api/v1/settings/holiday/to_from/:id
//@access private: Needs Login
router.get("/holiday/to_from/:id", validateToken, getHolidaysPolicy);

//@desc Update Client Settings Holiday to, from
//@route PUT /api/v1/settings/holiday/to_from/update/:Clientid
//@access Private:Needs Login
router.put(
  "/holiday/to_from/update/:Clientid",
  [body("holidayToDate").notEmpty(), body("holidayFromDate").notEmpty()],
  validateToken,
  updateHolidayToFrom
);

// Update working hours (Notice of Hours)
router.put(
  "/working-hours/:Clientid",
  validateToken,
  updateWorkingHours
);

//@desc Add Settings Salary Logic
//@route POST /api/v1/settings/salary/logic
//@access Private: Needs Login
router.post(
  "/salary/logic",
  [body("salary_logic").notEmpty()],
  validateToken,
  addSalaryLogic
);

//@desc Add Settings Salary structure
//@route POST /api/v1/settings/salary/struct
//@access Private: Needs Login
router.post(
  "/salary/struct",
  [body("salary_structure").notEmpty()],
  validateToken,
  addSalaryStructure
);

//test
router.post(
  "/sendotp",
  [body("countryCode").notEmpty(), body("mobileNumber").notEmpty()],
  validateToken,
  sendOtp
);

router.post(
  "/validateotp",
  [
    body("countryCode").notEmpty(),
    body("mobileNumber").notEmpty(),
    body("verificationId").notEmpty(),
    body("code").notEmpty(),
  ],
  validateToken,
  validateOtp
);

//@desc Create New Leaves record
//@route POST /api/v1/leaves/add
//@access Private: Needs Login
router.post(
  "/add",
  [
    body("client_id", "Client id is required").notEmpty(),
    body("leaves.cl.balance", "CL balance is required").notEmpty(),
    body("leaves.cl.absentDates", "CL absentDates must be an array").isArray(),
    body("leaves.sl.balance", "SL balance is required").notEmpty(),
    body("leaves.sl.absentDates", "SL absentDates must be an array").isArray(),
    body("leaves.pl.balance", "PL balance is required").notEmpty(),
    body("leaves.pl.absentDates", "PL absentDates must be an array").isArray(),
  ],
  validateToken,
  addLeaves
);

//@desc Update Salary Inspector
//@route PUT /api/v1/settings/salary_inspector/update/:Clientid
//@access Private: Needs Login
router.put(
  "/salary_inspector/update/:Clientid",
  [
    body("salaryInspectorName").notEmpty(),
    body("salaryOptionDate").notEmpty()
  ],
  validateToken,
  updateSalaryInspector
);

router.put(
  "/minimum_wages/update/:Clientid",
  [body("minimumWages").notEmpty()],
  validateToken,
  updateMinimumWages
);

//@desc Update Monthly Salary Date
//@route PUT /api/v1/settings/monthly_salary_date/update/:Clientid
//@access Private: Needs Login
router.put(
  "/monthly_salary_date/update/:Clientid",
  [body("monthlySalaryDate").notEmpty()],
  validateToken,
  updateMonthlySalaryDate
);

//@desc Update Registration Number
//@route PUT /api/v1/settings/registration_number/update/:Clientid
//@access Private: Needs Login
router.put(
  "/registration_number/update/:Clientid",
  [body("registrationNumber").notEmpty()],
  validateToken,
  updateRegistrationNumber
);

//@desc Update Employee Holiday Assignments
//@route PUT /api/v1/settings/employee_holiday_assignments/update/:Clientid
//@access Private: Needs Login
router.put(
  "/employee_holiday_assignments/update/:Clientid",
  [body("employeeHolidayAssignments").isArray().notEmpty()],
  validateToken,
  updateEmployeeHolidayAssignments
);

//@desc Get all Leaves records for a specific Client
//@route GET /api/v1/leaves/getall/client/:id
//@access Private: Needs Login
router.get("/get", validateToken, getLeavesClient);

module.exports = router;
