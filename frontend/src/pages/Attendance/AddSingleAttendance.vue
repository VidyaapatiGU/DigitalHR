<style scoped>
/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */

::-webkit-scrollbar {
  width: 10px; /* Set the width of the scrollbar */
  height: 90vh; /* Set the height of the scrollbar */
}
::-webkit-scrollbar-track {
  margin-top: 1rem;
  margin-bottom: 1rem;

  background: #c9c9c9;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(#000000, #5e5e5e);
  border-radius: 5px;
}

.customize-table {
  --easy-table-header-font-size: 1.1rem;
  --easy-table-body-row-font-size: 1rem;
}

.main {
}
.table-icon {
}
h1 {
}

.animated_input {
  height: 3rem;
  max-width: 19rem;
}

.table-icon:hover {
  transform: translateY(-2px) scale(1.15);
  transition: transform 0.3s ease-out;
}

.thumbs-down {
  color: rgb(235, 46, 21);
}

@media (max-width: 576px) {
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>

<template>
  <div class="source-400 pt-2 h-100 scroll">
    <div class="border-bottom px-4 d-flex justify-content-between align-items-center py-2">
      <div>
        <h5 class="source-500 page-title">Add Employee Attendance</h5>
      </div>
      <div class=""></div>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div v-auto-animate class="container py-3 h-100">
          <div class="w-100 d-flex justify-content-center align-items-center gap-3">
            <div class="">
              <div class="">
                <multiselect
                  v-model="selectedEmployee"
                  :options="employees"
                  placeholder="Select Employee"
                  label="name"
                  track-by="name"
                ></multiselect>
              </div>
            </div>
            <div>
              <VueDatePicker
                v-model="month_year"
                month-picker
                placeholder="Select Month and Year"
                @update:model-value="handleMonthDays"
              />
              <!-- <input type="date" class="form-control form-control-sm" v-model="form.month_year" /> -->
            </div>
            <div class="">
              <input
                v-model="form.totalWorkingDays"
                type="text"
                class="form-control border"
                id="state"
                placeholder="No. Of Total Working Days"
                @input="handleWorkingDays"
              />
            </div>
            <div class="">
              <input
                v-model="form.present"
                type="text"
                class="form-control border"
                id="state"
                placeholder="No. Of Days Present"
                @input="handlePresentDays"
              />
            </div>

            <div class="">
              <input
                v-model="form.remark"
                type="text"
                class="form-control border"
                id="state"
                placeholder="Add Remark"
              />
            </div>

            <div v-auto-animate>
              <button
                type="button"
                class="btn btn-primary border-0 button_bg"
                @click="handleAddSingleAttendance"
              >
                {{ items.length > 0 ? 'Add Another' : 'Add' }}
              </button>
            </div>
          </div>
          <div v-if="items.length > 0" class="table border rounded mt-3">
            <div class="w-100">
              <EasyDataTable
                table-class-name="customize-table text-capitalize"
                :headers="headers"
                :items="items"
                search-field="name"
                :search-value="search"
                :rows-per-page="10"
                border-cell
                buttons-pagination
              ></EasyDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

import 'vue-multiselect/dist/vue-multiselect.css';
import EasyDataTable from 'vue3-easy-data-table';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosClient from '../../axiosClient';
import { months } from '../../months';

export default {
  name: 'AddSingleAttendance',
  components: {
    EasyDataTable,
    VueDatePicker,
    Multiselect,
  },

  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Present', value: 'present' },
        { text: 'Total Working Days', value: 'totalWorkingDays' },
        { text: 'Month', value: 'month' },
        { text: 'Year', value: 'year' },
        { text: 'Remark', value: 'remark' },
      ],
      maxDays: 0,
      items: [],
      id: '',
      user: {},
      role: '',
      employees: [],
      selectedEmployee: '',
      month_year: '',
      excelData: [],
      form: {
        client_user_id: '',
        name: '',
        email: '',
        month: '',
        year: '',
        present: '',
        month_year: '',
        totalWorkingDays: '',
        month: '',
        year: '',
        remark: '',
        gross: null,
      },
      file: null,
    };
  },

  async created() {
    await this.getCurrent();

    try {
      const res = await axiosClient.get(
        `/api/v1/employee/client${this.user._id}`
      );
      console.log('res.data.data: ', res.data.data);
      this.originalItems = res.data.data;
      this.employees = res.data.data;
      const notifications = await axiosClient.get(`/api/v1/notification/getall/${this.user._id}`);
      this.notifications = notifications.data.data;
      console.log(' this.notifications: ', this.notifications);
    } catch (err) {
      console.log('error: ', err);
    }

    console.log(' this.employees: ', this.employees);
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.scroll', {
      opacity: 0,
      y: 50,
      duration: 1.2,
      scrollTrigger: {
        trigger: '.scroll',
        delay: 0.7,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  },

  setup() {},

  methods: {
    handleMonthDays() {
      const monthDays = {
        0: '31',
        1: '28',
        2: '31',
        3: '30',
        4: '31',
        5: '30',
        6: '31',
        7: '31',
        8: '30',
        9: '31',
        10: '30',
        11: '31',
      };
      this.maxDays = monthDays[this.month_year.month];
      console.log('MonthDays');
      console.log(this.month_year.month);
    },
    handlePresentDays() {
      if (this.maxDays < this.form.present) {
        toast.warn(`No. Of Days Present is Exceeded the Month Max Days!`, { autoClose: 2000 });
        this.form.present = '';
      }
    },
    handleWorkingDays() {
      if (this.maxDays < this.form.totalWorkingDays) {
        toast.warn(`No. Of Total Working Days is Exceeded the Month Max Days!`, {
          autoClose: 2000,
        });
        this.form.totalWorkingDays = '';
      }
    },
    async handleAddSingleAttendance() {
      console.log('this.selectedEmployee: ', this.selectedEmployee);
      console.log('months', months);
      // this.form.month_year = this.month_year.year + '-' + (this.month_year.month + 1) + '-' + '01';
      this.form.name = this.selectedEmployee.name;
      this.form.email = this.selectedEmployee.email;
      this.form.client_user_id = this.user._id;
      this.form.gross = this.selectedEmployee.gross;

      const temp = parseInt(this.month_year.month);
      if (temp >= 9) {
        this.form.month_year = this.month_year.year + '-' + (temp + 1) + '-' + '01';
      } else {
        this.form.month_year = this.month_year.year + '-' + '0' + (temp + 1) + '-' + '01';
      }

      this.form.month = months[temp].name;
      this.form.year = this.month_year.year;

      console.log('this.form: ', this.form);
      if (this.validateForm() == false) {
        return;
      }

      try {
        const res = await axiosClient.post(
          `/api/v1/attendance/add/single/${this.user._id}`,
          this.form
        );
        console.log('res: ', res);

        toast.success(`Attendance Added Successfully`, { autoClose: 1000 });
        this.selectedEmployee.present = this.form.present;
        console.log('this.selectedEmployee: ', this.selectedEmployee);
        this.items.push({
          name: this.selectedEmployee.name,
          present: this.form.present,
          email: this.selectedEmployee.email,
          totalWorkingDays: this.form.totalWorkingDays,
          month: this.form.month,
          year: this.form.year,
        });
        console.log(' this.item: ', this.item);
        this.selectedEmployee = '';
        this.form.present = '';

        this.employees = this.employees.filter((emp) => emp._id !== this.form.emp_id);
      } catch (err) {
        console.log('error: ', err);
      }

      console.log('this.form: ', this.form);
    },

    async getCurrent() {
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);

        this.user = token.data.user;
        if (token.data.user.industry_type) {
          this.role = 'client';
        } else if (token.data.user.designation) {
          this.role = 'employee';
        } else {
          this.role = this.user.roleType.name;
        }
        //this.role = this.user.roleType.name;
        //console.log('user', this.user, ' this.role ', this.role);
        if (!token) {
          this.$router.push('/login');
        }
        this.user = token.data.user;
        console.log(' this.user : ', this.user);
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }

      return;
    },

    validateForm() {
      console.log('validateForm');
      if (this.form.emp_id == '') {
        toast.info(`Select Employee`, { autoClose: 1000 });
        return false;
      }

      if (this.form.present == '') {
        toast.info(`Enter Present`, { autoClose: 1000 });
        return false;
      }

      if (this.form.month_year == '') {
        toast.info(`Enter Month Year`, { autoClose: 1000 });
        return false;
      }

      if (this.form.totalWorkingDays == '') {
        toast.info(`Enter Total Working Days`, { autoClose: 1000 });
        return false;
      }

      return true;
    },
  },
};
</script>
