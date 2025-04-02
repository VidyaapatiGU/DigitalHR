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
  leaves: {
    cl: [
      {
        type: String ,
      },
    ],
    sl: [
      {
        type: String ,
      },
    ],
    pl: [
      {
        type: String ,
      },
    ],
  },
  ot_rate: {
    type: Number,
    required: true,
  },
  minimumWageRates: {
    unskilled: {
      basic: { type: Number, default: null },
      vda: { type: Number, default: null },
    },
    semiSkilled: {
      basic: { type: Number, default: null },
      vda: { type: Number, default: null },
    },
    skilled: {
      basic: { type: Number, default: null },
      vda: { type: Number, default: null },
    },
    clerical: {
      basic: { type: Number, default: null },
      vda: { type: Number, default: null },
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
});

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
