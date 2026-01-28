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
                <label for="name " class="">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control border"
                  id="name"
                  placeholder="Enter Name"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="email" class="mt-2">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control border"
                  id="email"
                  placeholder="Enter Email Address"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="password" class="mt-2">Password</label>
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
                <input
                  v-model="form.designation"
                  type="text"
                  class="form-control border"
                  id="pin_code"
                  placeholder="Enter Designation"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="pin_code" class="mt-2">Pin Code</label>
                <input
                  v-model="form.pin_code"
                  @input="validatePinCode"
                  type="text"
                  class="form-control border"
                  id="pin_code"
                  placeholder="Enter Pin Code"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="state" class="mt-2">State</label>
                <input
                  v-model="form.state"
                  type="text"
                  class="form-control border"
                  id="state"
                  placeholder="Enter State"
                />
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

              <!-- ///////////////////////////////////////////// -->
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="phone_number  " class="mt-2">Phone Number</label>
                <input
                  v-model="form.whatsapp_no"
                  type="number"
                  class="form-control border"
                  id="phone_number"
                  placeholder="Enter Phone Number"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="date_of_joining" class="mt-2">Date of Joining</label>
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
                <input
                  v-model="form.city"
                  type="text"
                  class="form-control border"
                  id="city"
                  placeholder="Enter City"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="country" class="mt-2">Country</label>
                <input
                  v-model="form.country"
                  type="text"
                  class="form-control border"
                  id="country"
                  placeholder="Enter Country"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-md-4">
                <label for="address" class="mt-2">Address</label>
                <textarea
                  v-model="form.address"
                  type="text"
                  class="form-control border"
                  id="address"
                  placeholder="Enter Address"
                />
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
  name: 'AddEmployeeBySuperAdmin',

  props: {
    clientId: {
      type: String,
      required: true,
    },
  },

  components: {
    Multiselect,
  },
  data() {
    return {
      form: {
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
      },
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
      const getClient = await axiosClient.get(`/api/v1/client/get/${this.clientId}`);
      console.log('getClient: ', getClient);
      this.form.client_id = this.clientId;
      this.form.client_user_id = getClient.data.data[0].user_id;
      const departments = await axiosClient.get(`/api/v1/department/getall`);
      this.departments = departments.data.data;

      const roles = await axiosClient.get(`/api/v1/role/getall`);
      this.roles = roles.data.data;

      const teams = await axiosClient.get(`/api/v1/team/getall`);
      this.teams = teams.data.data;
      /* console.log('departments : ', this.departments);
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

      console.log('form: ', this.form);

      try {
        const res = await axiosClient.post(`api/v1/employee/add`, this.form);

        if (res) {
          console.log(res);
          toast.success(`Employee Added`, {
            autoClose: 1500,
          });

          setTimeout(() => {
            this.$router.push(`/manage/employees`);
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
        toast.info(`Enter Name`, { autoClose: 1000 });
        return false;
      }
      if (this.form.whatsapp_no == '') {
        toast.info(`Enter Number`, { autoClose: 1000 });
        return false;
      }
      if (this.form.email == '') {
        toast.info(`Enter Email`, { autoClose: 1000 });
        return false;
      }

      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.form.email)) {
        toast.info(`Enter Valid Email`, { autoClose: 1000 });
        return false;
      }

      if (this.form.password == '') {
        toast.info(`Enter Password`, { autoClose: 1000 });
        return false;
      }
      if (this.form.password.length < 6) {
        toast.info(`Password Must Contain At Least 6 Characters`, { autoClose: 1000 });
        return false;
      }

      if (this.form.designation == '') {
        toast.info(`Enter Designation`, { autoClose: 1000 });
        return false;
      }

      if (this.form.date_of_joining == '') {
        toast.info(`Enter Date of Joining`, { autoClose: 1000 });
        return false;
      }
      if (this.form.pin_code == '') {
        toast.info(`Enter Pin Code`, { autoClose: 1000 });
        return false;
      }
      if (this.form.city == '') {
        toast.info(`Enter city`, { autoClose: 1000 });
        return false;
      }
      if (this.form.state == '') {
        toast.info(`Enter state`, { autoClose: 1000 });
        return false;
      }
      if (this.form.country == '') {
        toast.info(`Enter country`, { autoClose: 1000 });
        return false;
      }
      if (this.form.address == '' || this.form.address.length < 10) {
        toast.info(`Enter address properly`, { autoClose: 1000 });
        return false;
      }
      if (this.selected_department == '') {
        toast.info(`Select Department `, { autoClose: 1000 });
        return false;
      }
      if (this.selected_roleType == '') {
        toast.info(`Something Went Wrong `, { autoClose: 1000 });
        console.error('unable to get role type');
        return false;
      }
      if (this.selected_team == '') {
        toast.info(`Select Team `, { autoClose: 1000 });
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

        // console.log('Token : ', token);
        //console.log('form.user_id: ', this.form.user_id);

        if (!token) {
          this.$router.push('/login');
        }
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }
    },
  },
};
</script>
