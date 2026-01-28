const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  testHolidayAPI,
  addHoliday,
  getHolidays,
  getHolidaysClient,
  deleteHoliday,
} = require("../controllers/holidays.js");
const validateToken = require("../middleware/validateTokenHandler");

//@desc Test Holiday API
//@route GET /api/v1/holiday
//@access Private: Needs Login
router.get("/", validateToken, testHolidayAPI);

//@desc Create New Holiday
//@route POST /api/v1/holiday/add
//@access Private: Needs Login
router.post(
  "/add",
  [
    body("name", "Enter a valid name! Min length 3.").isLength({ min: 3 }),
    body("holidayDate").notEmpty(),
    body("client_id").notEmpty(),
  ],
  validateToken,
  addHoliday
);

//@desc Delete Holiday with id (we are updating active to false )
//@route PUT /api/v1/holiday/delete/:id
//@access private: Needs Login
router.put("/delete/:id", validateToken, deleteHoliday);

//@desc Get all Holidays
//@route GET /api/v1/holiday/getall
//@access private: Needs Login
router.get("/getall", validateToken, getHolidays);

//@desc Get all Client Holidays
//@route GET /api/v1/holiday/getall/cient/:id
//@access private: Needs Login
router.get("/getall/client/:id", validateToken, getHolidaysClient);

module.exports = router;
