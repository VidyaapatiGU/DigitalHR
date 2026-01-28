<style scoped>
.main h-100 {
}

.form-container {
  width: 100%;
}

.form-group label {
  color: #333;
}

.form-control {
  background-color: #ffffff;
  border: none;

  color: #333;
}

@media (max-width: 576px) {
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
  .form-container {
    padding: 30px;
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>

<template>
  <div class="main h-100">
    <div class="border-bottom px-4">
      <h5 class="pt-2 hind-medium source-500 page-title">Add Employee</h5>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto d-flex justify-content-center align-items-start my-auto">
        <div class="container">
          <form class="form-container">
            <div class="row source-400">
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="name " class="mt-2">Name</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control border"
                  id="name"
                  placeholder="Enter Name"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="name " class="mt-2">Father/Husbands Name</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.fatherHusband_name"
                  type="text"
                  class="form-control border"
                  id="name"
                  placeholder="Enter Father/Husband Name"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="gender" class="mt-2">Gender</label>
                <span class="text-danger">*</span>
                <select v-model="form.gender" class="form-control border" id="gender">
                  <option disabled value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
                <div class="form-group col-12 col-sm-6 col-md-4">
                  <label for="ip_number" class="mt-2">ESIC IP Number</label>
                  <input
                    v-model="form.ip_number"
                    type="text"
                    class="form-control border"
                    id="ip_number"
                    maxlength="10"
                    pattern="\d{10}"
                    placeholder="Enter 10-digit ESIC IP Number"
                  />
                </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="email" class="mt-2">Email address</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control border"
                  id="email"
                  placeholder="Enter Email"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="password" class="mt-2">Password</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control border"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="pin_code" class="mt-2">Designation</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.designation"
                  type="text"
                  class="form-control border"
                  id="pin_code"
                  placeholder="Enter Designation"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="phone_number  " class="mt-2">Whats App Number</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.whatsapp_no"
                  type="number"
                  class="form-control border"
                  id="phone_number"
                  placeholder="Enter Whats App number"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="date_of_joining" class="mt-2">Date of Joining</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.date_of_joining"
                  type="date"
                  class="form-control border"
                  id="date_of_joining"
                  placeholder="Enter Date of Joining"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="city" class="mt-2">City</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.city"
                  type="text"
                  class="form-control border"
                  id="city"
                  placeholder="Enter City"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="address" class="mt-2">Address</label>
                <span class="text-danger">*</span>
                <textarea
                  v-model="form.address"
                  type="text"
                  class="form-control border"
                  id="address"
                  placeholder="Enter Address"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="state" class="mt-2">State</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.state"
                  type="text"
                  class="form-control border"
                  id="state"
                  placeholder="Enter State"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="country" class="mt-2">Country</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.country"
                  type="text"
                  class="form-control border"
                  id="country"
                  placeholder="Enter Country"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="pin_code" class="mt-2">Pin Code</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.pin_code"
                  @input="validatePinCode"
                  type="text"
                  class="form-control border"
                  id="pin_code"
                  placeholder="Enter Pincode"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="weekly_off" class="mt-2">Weekly Off</label>
                <multiselect
                  v-model="form.weeklyOff"
                  :options="weekOffOptions"
                  placeholder="Select Weekly Off"
                  label="label"
                  track-by="value"
                  :multiple="true"
                ></multiselect>
              </div>

              <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                <div class="mt-2">
                  <label for="department" class="">Department</label>
                  <multiselect
                    v-model="selected_department"
                    :options="departments"
                    placeholder="Select Department"
                    label="name"
                    track-by="name"
                  ></multiselect>
                </div>
              </div> -->
              <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                <div class="mt-2">
                  <label for="team" class="">Team</label>
                  <multiselect
                    v-model="selected_team"
                    :options="teams"
                    placeholder="Select Team"
                    label="name"
                    track-by="name"
                  ></multiselect>
                </div>
              </div> -->
            </div>
            <hr />
            <!-- ///////////////////////////////////////////////////////////////////////////////////////// -->
            <div class="row source-400 mt-3">
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="Adhar " class="mt-2">Adhar No</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.adhar_card"
                  type="number"
                  class="form-control border"
                  id="Adhar"
                  placeholder="Enter Adhar No"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="UAN " class="mt-2">UAN No</label>
                <input
                  v-model="form.uan_no"
                  type="number"
                  class="form-control border"
                  id="UAN"
                  placeholder="Enter UAN No"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="PF" class="mt-2">PF No</label>
                <input
                  v-model="form.pf_no"
                  type="number"
                  class="form-control border"
                  id="PF"
                  placeholder="Enter PF No"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="ESIC No" class="mt-2">ESIC No</label>
                <input
                  v-model="form.esic_no"
                  type="number"
                  class="form-control border"
                  id="ESIC No"
                  placeholder="ESIC No"
                />
              </div>
            </div>
            <hr />
            <div class="row source-400 mt-3">
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="Bank_name" class="mt-2">Bank Name</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.bank_name"
                  type="text"
                  class="form-control border"
                  id="Bank_name"
                  placeholder="Enter Bank Name"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="bankAc" class="mt-2">Bank A/C No</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.bank_ac_no"
                  type="number"
                  class="form-control border"
                  id="bankAc"
                  placeholder="Enter Bank A/C No"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="bankIfsc" class="mt-2">Bank IFSC</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.bank_ifsc"
                  type="text"
                  class="form-control border"
                  id="bankIfsc"
                  placeholder="Enter Bank IFSC"
                />
              </div>
            </div>
            <hr />
            <div class="row source-400 mt-3">
              <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                <label for=" PFBasic" class="mt-2">PF Basic</label>
                <input
                  v-model="form.pf_basic"
                  type="number"
                  class="form-control border"
                  id="PFBasic"
                  placeholder="Enter  PF Basic"
                />
              </div> -->
              <div class="form-group col-12 col-sm-6 col-md-4">
                <div class="">
                  <label for=" number" class="mt-2">Basic</label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="form.basic"
                    type="number"
                    class="form-control border"
                    id="Basic"
                    placeholder="Enter Basic"
                    @change="handleGrossCal"
                  />
                </div>
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <div class="">
                  <label for="  D.A" class="mt-2">D.A</label>
                  <span class="text-danger">*</span>
                  <input
                    v-model="form.da"
                    type="number"
                    class="form-control border"
                    id=" D.A"
                    placeholder="Enter D.A"
                    @change="handleGrossCal"
                  />
                </div>
              </div>

              <!-- ///////////////////////////////////////////// -->
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="HRA  " class="mt-2">HRA</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.hra"
                  type="number"
                  class="form-control border"
                  id="HRA"
                  placeholder="Enter HRA"
                  @change="handleGrossCal"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for=" FoodAllow" class="mt-2">Food Allow</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.food_allow"
                  type="number"
                  class="form-control border"
                  id=" FoodAllow"
                  placeholder="Enter Food Allow"
                  @change="handleGrossCal"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="Conveyance" class="mt-2">Conveyance</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.conveyance"
                  type="number"
                  class="form-control border"
                  id="Conveyance"
                  placeholder="Enter Conveyance"
                  @change="handleGrossCal"
                />
              </div>
              <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="EPF" class="mt-2">EPF</label>
                <input
                  v-model="form.epf"
                  type="number"
                  class="form-control border"
                  id="EPF"
                  placeholder="Enter EPF"
                />
              </div> -->
              <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="ESIC" class="mt-2">ESIC</label>
                <input
                  v-model="form.esic"
                  type="number"
                  class="form-control border"
                  id="ESIC"
                  placeholder="Enter ESIC"
                />
              </div> -->

              <!--  <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="E_EPF" class="mt-2">E_EPF</label>
                <input
                  v-model="form.e_epf"
                  type="number"
                  class="form-control border"
                  id="E_EPF"
                  placeholder="Enter E_EPF"
                />
              </div> -->
              <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="E_ESIC" class="mt-2">E_ESIC</label>
                <input
                  v-model="form.e_esic"
                  type="number"
                  class="form-control border"
                  id="E_ESIC"
                  placeholder="Enter E_ESIC"
                />
              </div> -->
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="E_ESIC" class="mt-2">Gross</label>
                <span class="text-danger">*</span>
                <input
                  v-model="form.gross"
                  disabled
                  type="number"
                  class="form-control border"
                  id="E_ESIC"
                  placeholder="Enter Gross"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4 d-flex align-items-center py-3">
                <div class="form-check">
                  <input v-model="form.lwf" type="checkbox" class="form-check-input" id="LWF" />
                  <label class="form-check-label" for="LWF">LWF</label>
                </div>
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4 d-flex align-items-center py-3">
                <div class="form-check">
                  <input v-model="form.esi" type="checkbox" class="form-check-input" id="ESIC" />
                  <label class="form-check-label" for="LWF">ESIC</label>
                </div>
              </div>
            </div>

            <div class="w-100 d-flex justify-content-center align-items-center">
              <button
                @click="handleAddEmployee"
                type="button"
                class="btn btn-primary border-0 button_bg source-500 text-light mt-4 px-5"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../../axiosClient';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default {
  name: 'AddEmployee',
  components: {
    Multiselect,
  },
  data() {
    return {
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
      form: {
        ip_number: '',
        client_user_id: '',
        client_id: '',
        name: '',
        fatherHusband_name: '',
        gender: '',
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
        gross: 0,
        adhar_card: '',
        uan_no: '',
        pf_no: '',
        esic_no: '',
        bank_name: '',
        bank_ac_no: '',
        bank_ifsc: '',
        pf_basic: '',
        basic: 0,
        da: 0,
        hra: 0,
        food_allow: 0,
        conveyance: 0,
        epf: '',
        esic: '',
        lwf: false,
        esi: false,
        e_epf: '',
        e_esic: '',
        weeklyOff: [],
      },
      weekOffOptions: [
        { label: 'Sunday', value: 'Sunday' },
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' }
      ],
      selected_roleType: '',
      selected_team: '',
      selected_department: '',
      departments: [],
      roles: [],
      teams: [],
    };
  },

  async created() {
    await this.getCurrent();
    try {
      const departments = await axiosClient.get(`/api/v1/department/getall`);
      this.departments = departments.data.data;

      const roles = await axiosClient.get(`/api/v1/role/getall`);
      this.roles = roles.data.data;

      const teams = await axiosClient.get(`/api/v1/team/getall`);
      this.teams = teams.data.data;
      /*  console.log('departments : ', this.departments);
      console.log('roles : ', this.roles);
      console.log('teams : ', this.teams); */
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[i].name === 'employee') {
          this.selected_roleType = this.roles[i];
          break;
        }
      }

      for (let i = 0; i < this.departments.length; i++) {
        if (this.departments[i].name == 'Employee') {
          this.selected_department = this.departments[i];
        }
      }

      for (let i = 0; i < this.teams.length; i++) {
        if (this.teams[i].name == 'Employee') {
          this.selected_team = this.teams[i];
        }
      }

      console.log('form: ', this.form);
    } catch (err) {}
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.form-container', {
      opacity: 0,
      y: 50,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.form-container',
        delay: 0.5,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  },

  methods: {
    handleGrossCal() {
      const gross = this.form.gross;
      const food_allow = this.form.food_allow;
      const basic = this.form.basic;
      const da = this.form.da;
      const hra = this.form.hra;
      const conveyance = this.form.conveyance;

      this.form.gross = food_allow + basic + da + hra + conveyance;
    },
    async validatePinCode() {
      if (this.form.pin_code.length >= 6) {
        try {
          const res = await axiosClient.get(`https://dev.apiman.in/pincode/${this.form.pin_code}`);
          console.log('res: ', res);
          if (res.data[0]) {
            // this.form.city = res.data[0].PostOffice[0].name;
            this.form.state = res.data.PostOffice[0].State;
            this.form.country = res.data.PostOffice[0].Country;
          }
        } catch (err) {
          console.log('error: ', err);
        }
      }
    },

    async handleAddEmployee(e) {
      if (this.validateForm() == false) {
        return;
      }

      this.form.team = this.selected_team._id;
      this.form.roleType = this.selected_roleType._id;
      this.form.department = this.selected_department._id;
      this.form.weeklyOff = this.form.weeklyOff.map(option => option.value);

      console.log('form: ', this.form);

      try {
        const res = await axiosClient.post(`api/v1/employee/add`, this.form);

        if (res) {
          console.log(res);
          toast.success(`Employee Added`, {
            autoClose: 1500,
          });

          setTimeout(() => {
            //this.$router.push(`/manage/employees`);
          }, 2000);
        }
      } catch (err) {
        console.log('error: ', err);
        if (err.response.status == 409) {
          toast.error(`User Already Exist`, {
            autoClose: 1500,
          });
        } else {
          toast.error(`Something Went Wrong`, {
            autoClose: 1500,
          });
        }
      }
    },

    validateForm() {
      console.log('validateForm');
      if (this.form.name == '') {
        toast.info(`Enter Name, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.fatherHusband_name == '') {
        toast.info(`Enter Fathers Name, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.whatsapp_no == '') {
        toast.info(`Enter Number, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.email == '') {
        toast.info(`Enter Email, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.form.email)) {
        toast.info(`Enter Valid Email Address!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.password == '') {
        toast.info(`Enter Password, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.password.length < 5) {
        toast.info(`Password Must Contain At Least 5 Characters!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.designation == '') {
        toast.info(`Enter Designation, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.date_of_joining == '') {
        toast.info(`Select Date of Joining!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.pin_code == '') {
        toast.info(`Enter Pin Code, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.city == '') {
        toast.info(`Enter City, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.state == '') {
        toast.info(`Enter State, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.country == '') {
        toast.info(`Enter Country, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.address == '' || this.form.address.length < 4) {
        toast.info(`Enter Valid Address, Must Contain At Least 4 Characters!`, { autoClose: 1000 });
        return false;
      }
      /* if (this.selected_department == '') {
        toast.info(`Select Department, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      } */
      /* if (this.selected_roleType == '') {
        toast.info(`Something Went Wrong `, { autoClose: 1000 });
        console.error('unable to get role type');
        return false;
      } */
      /* if (this.selected_team == '') {
        toast.info(`Select Team `, { autoClose: 1000 });
        return false;
      } */
      // if (this.form.weeklyOff == '') {
      //   toast.info(`Enter weeklyoff, Field Cannot Be Empty!`, { autoClose: 1000 });
      //   return false;
      // }
      if (this.form.adhar_card == '') {
        toast.info(`Enter ADHAR Card No., Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }
      if (this.form.bank_name == '') {
        toast.info(`Enter Bank Name, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.bank_ac_no == '') {
        toast.info(`Enter Bank Account Number, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.bank_ifsc == '') {
        toast.info(`Enter Bank IFSC Code, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.basic == '') {
        toast.info(`Enter Basic, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.da.length < 1) {
        toast.info(`Enter DA, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      if (this.form.hra.length < 1) {
        toast.info(`Enter HRA, Field Cannot Be Empty!`, { autoClose: 1000 });
        return false;
      }

      return true;
    },

    nameWithLang({ name }) {
      console.log(name);
      return `${name} `;
    },

    async getCurrent() {
      let token = '';
      try {
        token = await axiosClient.get(`api/v1/user/getCurrent/`);
        this.form.client_user_id = token.data.user._id;
        // console.log('Token : ', token);
        //console.log('form.user_id: ', this.form.user_id);

        if (!token) {
          this.$router.push('/login');
        }
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }

      try {
        const client = await axiosClient.get(`/api/v1/client/get/${this.form.client_user_id}`);
        // console.log('client : ', client);
        this.form.client_id = client.data.data[0]._id;
        // console.log('form.client_id: ', this.form.client_id);
      } catch (err) {
        console.log('error: ', err);
      }
    },
  },
};
</script>
