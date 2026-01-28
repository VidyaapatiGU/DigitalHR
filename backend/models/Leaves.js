const mongoose = require("mongoose");
const Client = require("./Client.js");
const { Schema } = mongoose;

const LeavesSchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
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

module.exports = mongoose.model("Leaves", LeavesSchema);
