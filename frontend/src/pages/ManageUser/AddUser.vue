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
      <h5 class="pt-2 hind-medium source-500 page-title">Add User</h5>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto d-flex justify-content-center">
        <div class="container">
          <form class="form-container">
            <div class="row source-400">
              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="name source-500" class="">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control border"
                  id="name"
                  placeholder="Enter name"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="email" class="mt-2 mt-sm-2 mt-md-0">Email address</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control border"
                  id="email"
                  placeholder="Enter email"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="pin_code" class="mt-2 mt-sm-2 mt-md-0">Pin Code</label>
                <input
                  v-model="form.pin_code"
                  @input="validatePinCode"
                  type="text"
                  class="form-control border"
                  id="pin_code"
                  placeholder="Enter pin code"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="state" class="mt-2 mt-sm-2 mt-lg-0">State</label>
                <input
                  v-model="form.state"
                  type="text"
                  class="form-control border"
                  id="state"
                  placeholder="Enter state"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="mt-2 mt-sm-2 mt-md-2">
                  <label for="department" class="">Department</label>
                  <multiselect
                    v-model="selected_department"
                    :options="departments"
                    placeholder="Select Department"
                    label="name"
                    track-by="name"
                  ></multiselect>
                </div>
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="mt-2 mt-sm-2 mt-md-2">
                  <label for="team" class="">Team</label>
                  <multiselect
                    v-model="selected_team"
                    :options="teams"
                    placeholder="Select Team"
                    label="name"
                    track-by="name"
                  ></multiselect>
                </div>
              </div>

              <!-- ///////////////////////////////////////////// -->
              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="phone_number " class="mt-2 mt-sm-2 mt-md-2">Phone Number</label>
                <input
                  v-model="form.whatsapp_no"
                  type="number"
                  class="form-control border"
                  id="phone_number"
                  placeholder="Enter phone number"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="password" class="mt-2 mt-sm-2 mt-md-2">Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  class="form-control border"
                  id="password"
                  placeholder="Password"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="city" class="mt-2 mt-sm-2 mt-md-2">City</label>
                <input
                  v-model="form.city"
                  type="text"
                  class="form-control border"
                  id="city"
                  placeholder="Enter city"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="country" class="mt-2 mt-sm-2 mt-md-2">Country</label>
                <input
                  v-model="form.country"
                  type="text"
                  class="form-control border"
                  id="country"
                  placeholder="Enter country"
                />
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <div class="mt-2 mt-sm-2 mt-md-2">
                  <label for="role_type" class="">Role Type</label>
                  <multiselect
                    v-model="selected_roleType"
                    :options="roles"
                    placeholder="Select Role"
                    label="name"
                    track-by="name"
                  ></multiselect>
                </div>
              </div>

              <div class="form-group col-12 col-sm-6 col-md-4 col-lg-3">
                <label for="address" class="mt-2 mt-sm-2 mt-md-2">Address</label>
                <textarea
                  v-model="form.address"
                  type="text"
                  class="form-control border"
                  id="address"
                  placeholder="Enter address"
                />
              </div>
            </div>
            <div class="w-100 d-flex justify-content-center align-items-center">
              <button
                @click="handleAddUser"
                type="button"
                class="btn btn-primary border-0 button_bg text-light mt-4 px-5"
              >
                Add User
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
  name: 'SignUp',
  components: {
    Multiselect,
  },
  data() {
    return {
      form: {
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
    this.getCurrent();
    try {
      const departments = await axiosClient.get(`/api/v1/department/getall`);
      this.departments = departments.data.data;

      const roles = await axiosClient.get(`/api/v1/role/getall`);
      this.roles = roles.data.data;

      const teams = await axiosClient.get(`/api/v1/team/getall`);
      this.teams = teams.data.data;
      console.log('departments : ', this.departments);
      console.log('roles : ', this.roles);
      console.log('teams : ', this.teams);
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

    async handleAddUser(e) {
      if (this.validateForm() == false) {
        return;
      }
      this.form.roleType = this.selected_roleType._id;
      this.form.department = this.selected_department._id;
      this.form.team = this.selected_team._id;
      console.log('form: ', this.form);

      try {
        const res = await axiosClient.post(`api/v1/user/add`, this.form);

        if (res) {
          console.log(res);
          toast.success(`User Added`, {
            autoClose: 1500,
          });

          setTimeout(() => {
            this.$router.push(`/manage/users`);
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

      if (this.form.password == '') {
        toast.info(`Enter Password`, { autoClose: 1000 });
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
        toast.info(`Select Role `, { autoClose: 1000 });
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
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);
        console.log('Token : ', token);
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
