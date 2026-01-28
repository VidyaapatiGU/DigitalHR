const mongoose = require("mongoose");
const Department = require("../models/Department.js");
const Team = require("../models/Team.js");
const Role = require("../models/Role.js");
const User = require("./User.js");

const { Schema } = mongoose;

const ContactPersonSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  contact_no: {
    type: String,
  },
  designation: {
    type: String,
  },
});

const ClientSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  username: {
    type: String,
    required: true,
  },
  client_code: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  whatsapp_no: {
    type: String,
  },
  address: {
    type: String,
  },
  pin_code: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pan_card: {
    type: String,
  },
  adhar_card: {
    type: Number,
  },
  gst_no: {
    type: String,
  },
  cin_no: {
    type: String,
  },
  industry_type: {
    type: String,
  },
  employee_count_range: {
    type: String,
  },
  contact_person: {
    type: ContactPersonSchema,
  },
  incorporation_type: {
    type: String,
  },
  pf_enable: {
    type: Boolean,
    default: true,
  },
  esic_enable: {
    type: Boolean,
    default: true,
  },

  /* /////////////Proofs//////////////// */
  adhar_proof: {
    type: Boolean,
    default: false,
  },
  adhar_proof_url: {
    type: String,
  },
  adhar_proof_url_id: {
    type: String,
  },
  pan_proof: {
    type: Boolean,
    default: false,
  },
  pan_proof_url: {
    type: String,
  },
  pan_proof_url_id: {
    type: String,
  },
  gst_proof: {
    type: Boolean,
    default: false,
  },
  gst_proof_url: {
    type: String,
  },
  gst_proof_url_id: {
    type: String,
  },
  cin_proof: {
    type: Boolean,
    default: false,
  },
  cin_proof_url: {
    type: String,
  },
  cin_proof_url_id: {
    type: String,
  },
  /* /////////////Proofs//////////////// */

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

module.exports = mongoose.model("Client", ClientSchema);
