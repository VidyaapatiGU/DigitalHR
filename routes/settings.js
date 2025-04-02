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

module.exports = router;
