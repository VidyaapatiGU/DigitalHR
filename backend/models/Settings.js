const mongoose = require("mongoose");
const Client = require("./Client.js");

const { Schema } = mongoose;

const SettingsSchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  holidayToDate: {
    type: Date,
  },
  holidayFromDate: {
    type: Date,
  },
  salary_logic: {
    type: String,
  },
  salary_structure: {
    type: String,
  },
  weeklyOff: {
    type: [String],
    default: [],
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  salaryInspectorName: {
    type: String,
  },
  salaryOptionDate: {
    type: Date,
  },
  monthlySalaryDate: {
    type: Date,
  },
  registrationNumber: {
    type: String,
  },
  employeeHolidayAssignments: [
    {
      employeeId: Schema.Types.ObjectId,
      employeeName: String,
      holidayDay: String,
      remarks: String,
    },
  ],
  // Working hours / notice of hours
  workingHours: {
    workingGeneralStart: String,
    workingGeneralEnd: String,
    shift1Start: String,
    shift1End: String,
    shift2Start: String,
    shift2End: String,
    shift3Start: String,
    shift3End: String,
    shift4Start: String,
    shift4End: String,
    shift5Start: String,
    shift5End: String,
    shift6Start: String,
    shift6End: String,
    shift7Start: String,
    shift7End: String,
    shift8Start: String,
    shift8End: String,
    lunchGeneralStart: String,
    lunchGeneralEnd: String,
    lunchShift1Start: String,
    lunchShift1End: String,
    lunchShift2Start: String,
    lunchShift2End: String,
    lunchShift3Start: String,
    lunchShift3End: String,
    lunchShift4Start: String,
    lunchShift4End: String,
    lunchShift5Start: String,
    lunchShift5End: String,
    lunchShift6Start: String,
    lunchShift6End: String,
    lunchShift7Start: String,
    lunchShift7End: String,
    lunchShift8Start: String,
    lunchShift8End: String,
    // allow storing additional shifts beyond the fixed 3
    extraShifts: [
      {
        start: String,
        end: String,
      },
    ],
    extraLunchShifts: [
      {
        start: String,
        end: String,
      },
    ],
  },
    minimumWages: {
    unskilled: {
      basic: String,
      vda: String,
      total: String
    },
    semiSkilled: {
      basic: String,
      vda: String,
      total: String
    },
    skilled: {
      basic: String,
      vda: String,
      total: String
    },
    highlySkilled: {
      basic: String,
      vda: String,
      total: String
    }
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Settings", SettingsSchema);

//salary_logic
// 1. calender_month (March = 31 days, per day salary = salary/31)
// 2. 30_days_month
// 3. 28_days_month
// 4. 26_days_month
// 5. excluding_weekOff_holiday_month

//salary_structure
// 1. esic_lwf
// 2. esic
// 3. lwf
// 4. cash
