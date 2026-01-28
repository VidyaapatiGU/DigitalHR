const User = require("./User.js");
const Client = require("./Client.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client_user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  emp_no: {
    type: String,
    required: true,
  },
  last_emp_no: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fatherHusband_name: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  whatsapp_no: {
    type: String,
  },
  designation: {
    type: String,
  },
  date_of_joining: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
  pin_code: {
    type: String,
  },

  adhar_card: {
    type: Number,
    required: true,
  },
  gross: {
    type: Number,
    required: true,
  },
  uan_no: {
    type: String,
  },
  pf_no: {
    type: String,
  },
  esic_no: {
    type: String,
  },
  ip_number: {
    type: String,
    maxlength: 10,
    minlength: 10,
    match: /^\d{10}$/,
    required: false,
  },
  bank_name: {
    type: String,
  },
  bank_ac_no: {
    type: Number,
  },
  bank_ifsc: {
    type: String,
  },
  pf_basic: {
    type: Number,
  },
  basic: {
    type: Number,
  },
  da: {
    type: Number,
  },
  hra: {
    type: Number,
  },
  food_allow: {
    type: Number,
  },
  conveyance: {
    type: Number,
  },
  epf: {
    type: Number,
  },
  esic: {
    type: Number,
  },
  lwf: {
    type: Boolean,
  },
  esi: {
    type: Boolean,
  },
  e_epf: {
    type: Number,
  },
  e_esic: {
    type: Number,
  },
  weeklyOff: {
    type: [String],
    default: [],
    enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  },
  leaves: {
    cl: { 
      balance: { type: String, default: "0" },
      absentDates: { type: [String], default: [] }
    },
    sl: { 
      balance: { type: String, default: "0" },
      absentDates: { type: [String], default: [] }
    },
    pl: { 
      balance: { type: String, default: "0" },
      absentDates: { type: [String], default: [] }
    },
  },  
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

  asci_proof: {
    type: Boolean,
    default: false,
  },
  asci_proof_url: {
    type: String,
  },
  asci_proof_url_id: {
    type: String,
  },

  bank_proof: {
    type: Boolean,
    default: false,
  },
  bank_proof_url: {
    type: String,
  },
  bank_proof_url_id: {
    type: String,
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
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
/*   form: {
        client_user_id: '',
        client_id: '',
        name: '',
        email: '',
        password: '',
        whatsapp_no: '',
        roleType: '',
        team: '',
        department: '',
        city: '',
        state: '',
        country: '',
        address: '',
        pin_code: '',
        designation: '',
        date_of_joining: '',

        uan_no: '',
        pf_no: '',
        esic_no: '',
        bank_name: '',
        bank_ac_no: '',
        bank_ifsc: '',
        pf_basic: '',
        basic: '',
        da: '',
        hra: '',
        food_allow: '',
        conveyance: '',
        epf: '',
        esic: '',
        lwf: '',
        e_epf: '',
        e_esic: '',
      }, */
