const mongoose = require("mongoose");
const Client = require("./Client.js");

const { Schema } = mongoose;

const HolidaySchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  name: {
    type: String,
    required: true,
  },
  holidayDate: {
    type: Date,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Holiday", HolidaySchema);
