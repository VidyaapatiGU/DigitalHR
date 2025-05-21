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
  addSalaryStructure,
  sendOtp,
  validateOtp,
  testLeavesAPI,
  addLeaves,
  addOtRate,
  addMinimumWage,
  addWagePeriod,
  handleSalaryInspector,
  updateMonthlySalaryDate,
  handleRegistrationUpdate,
  updateShifts,
  getSettings,
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

//@desc Add or Update OT Rate
//@route POST /api/v1/settings/add/otrate
//@access Private: Needs Login
router.post("/add/otrate/:client_id", validateToken,addOtRate);

//@desc Add or Update Minimum Wage Rates
//@route POST /api/v1/settings/add/minimumwage/:client_id
//@access Private: Needs Login
router.post("/add/minimumwage/:client_id", validateToken, addMinimumWage);

//@desc Get All Settings for a Specific Client
//@route GET /api/v1/settings/getall/:client_id
//@access Private: Needs Login
router.get("/getall/:client_id", validateToken, getSettings);

//@desc Add or Update Wage Payment Period
//@route POST /api/v1/settings/wage/period/:client_id
//@access Private: Needs Login
router.post(
  "/wage/period/:client_id",
  [body("wagePeriod").notEmpty()],
  validateToken,
  addWagePeriod
);

//@desc Add or Update Salary Inspector Info
//@route POST /api/v1/settings/salary/inspector/:client_id
//@access Private: Needs Login
router.post(
  "/salary-inspector/:client_id",
  [body("name").notEmpty(), body("address").notEmpty()],
  validateToken,
  handleSalaryInspector
);

//@desc Update Monthly Salary Date
//@route POST /api/v1/settings/salary/monthly-date/:id
//@access Private
router.post(
  "/salary/monthly-date/:id",
  [body("monthly_salary_date").isInt({ min: 1, max: 31 })],
  validateToken,
  updateMonthlySalaryDate
);

//@desc Update weekly-off
//@route POST POST /api/v1/settings/weekly-off/:client_id
//@access Private
router.post(
  "/registration_no/:client_id",
  [
    body("registration_number").notEmpty(),
  ],
  validateToken,
  handleRegistrationUpdate
);

//@desc Update Shifts (Working Hours + Lunch Breaks)
//@route POST /api/v1/settings/shifts/:client_id
//@access Private
router.post(
  "/shifts/:client_id",
  [
    body("shifts").isArray({ min: 1 }).withMessage("Shifts must be a non-empty array"),
    body("shifts.*.type").isIn(["working", "lunch"]).withMessage("Each shift must have a valid type"),
    body("shifts.*.from").notEmpty().withMessage("From time is required"),
    body("shifts.*.to").notEmpty().withMessage("To time is required"),
  ],
  validateToken,
  updateShifts
);

module.exports = router;
