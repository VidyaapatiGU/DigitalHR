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
        <h5 class="source-500 page-title">Upload Employee Excel</h5>
      </div>
      <div class=""></div>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3 h-100">
          <div class="w-100 d-flex justify-content-center gap-3">
            <div class="row w-100">
              <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div>
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    @change="handleFileUpload"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="employeesToSelect.length > 0 && showResponse == false"
            class="table border rounded mt-3"
          >
            <div class="w-100">
              <EasyDataTable
                table-class-name="customize-table text-capitalize"
                v-model:items-selected="itemsSelected"
                :headers="employeesToSelectHeaders"
                :items="employeesToSelect"
                search-field="name"
                :search-value="search"
                :rows-per-page="10"
                @row-click="getByRow"
                border-cell
                buttons-pagination
              ></EasyDataTable>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center" v-if="handleUploadButton">
            <div :key="showSpinner">
              <button
                v-if="showSpinner == false"
                type="button"
                class="btn btn-primary border-0 button_bg"
                @click="uploadFile"
              >
                <span>Upload</span>
              </button>
              <div v-if="showSpinner" class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>

          <div v-if="employeesNotToSelect.length > 0 && showResponse == false">
            <div class="p-2 mt-3 source-500">Employess With Required Feilds Missing</div>

            <div class="table border rounded">
              <div class="w-100">
                <EasyDataTable
                  table-class-name="customize-table text-capitalize"
                  :headers="employeesNotToSelectHeaders"
                  :items="employeesNotToSelect"
                  search-field="name"
                  :search-value="search"
                  :rows-per-page="10"
                  @row-click="getByRow"
                  border-cell
                  buttons-pagination
                >
                  <template #item-nameActions="item">
                    <div v-if="!item.name || item.name == '' || item.name == undefined">
                      <i class="bi bi-x-lg"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check-lg"></i>
                    </div>
                  </template>

                  <template #item-emailActions="item">
                    <div v-if="!item.email || item.email == '' || item.email == undefined">
                      <i class="bi bi-x-lg"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check-lg"></i>
                    </div>
                  </template>
                  <template #item-whatsappActions="item">
                    <div
                      v-if="
                        !item.whatsapp_no || item.whatsapp_no == '' || item.whatsapp_no == undefined
                      "
                    >
                      <i class="bi bi-x-lg"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check-lg"></i>
                    </div>
                  </template>
                  <template #item-adhar_noActions="item">
                    <div
                      v-if="
                        !item.adhar_card || item.adhar_card == '' || item.adhar_card == undefined
                      "
                    >
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check text-primary"></i>
                    </div>
                  </template>
                </EasyDataTable>
              </div>
            </div>
          </div>
          <div v-if="savedEmployees.length > 0 && showResponse == true">
            <div class="p-2 mt-3 source-500">Saved Employess</div>

            <div class="table border rounded">
              <div class="w-100">
                <EasyDataTable
                  table-class-name="customize-table text-capitalize"
                  :headers="employeesToSelectHeaders"
                  :items="savedEmployees"
                  search-field="name"
                  :search-value="search"
                  :rows-per-page="10"
                  @row-click="getByRow"
                  border-cell
                  buttons-pagination
                ></EasyDataTable>
              </div>
            </div>
          </div>
          <div v-if="unSavedEmployees.length > 0 && showResponse == true">
            <div class="p-2 mt-3 source-500">Duplicate Entries</div>

            <div class="table border rounded">
              <div class="w-100">
                <EasyDataTable
                  table-class-name="customize-table text-capitalize"
                  :headers="employeesToSelectHeaders"
                  :items="unSavedEmployees"
                  search-field="name"
                  :search-value="search"
                  :rows-per-page="10"
                  @row-click="getByRow"
                  border-cell
                  buttons-pagination
                ></EasyDataTable>
              </div>
            </div>
          </div>
          <div v-if="showResponse == true">
            <div class="row w-100">
              <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center"></div>
              <div class="col-12 col-sm-6 col-md-3"></div>
              <div class="col-12 col-sm-6 col-md-3"></div>

              <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center justify-content-end">
                <router-link to="/manage/employees">
                  <button type="button" class="btn btn-primary border-0 button_bg">
                    <span>Done</span>
                  </button>
                </router-link>
              </div>
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

import 'vue-multiselect/dist/vue-multiselect.css';
import EasyDataTable from 'vue3-easy-data-table';

import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosClient from '../../axiosClient';
import { de } from 'element-plus/es/locales.mjs';

export default {
  name: 'UploadXl',
  components: {
    EasyDataTable,
    VueDatePicker,
    Multiselect,
  },

  data() {
    return {
      id: '',
      user: {},
      role: '',
      handleUploadButton: false,

      showResponse: false,
      showSpinner: false,
      itemsSelected: [],
      employeesToSelectHeaders: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Email', value: 'email' },
        { text: 'Designation', value: 'designation' },
        { text: 'Adhar_Card', value: 'adhar_card' },
      ],
      employeesNotToSelectHeaders: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Email', value: 'email' },
        { text: 'Name', value: 'nameActions', sortable: false, width: 250 },
        { text: 'Email', value: 'emailActions', sortable: false, width: 250 },
        { text: 'Whatsapp', value: 'whatsappActions', sortable: false, width: 250 },
        { text: 'Adhar Card', value: 'adhar_cardActions', sortable: false, width: 250 },
      ],
      employeesToSelect: [],
      employeesNotToSelect: [],
      savedEmployees: [],
      unSavedEmployees: [],

      month_year: {
        month: new Date().getMonth() - 1,
        year: new Date().getFullYear(),
      },
      excelData: [],
      form: {
        employeeData: [],
        client_user_id: '',
        client_id: '',
        team: '',
        roleType: '',
      },
      file: null,
      roles: [],
      teams: [],
      departments: [],
      selected_roleType: '',
      selected_team: '',
      selected_department: '',
    };
  },

  async created() {
    await this.getCurrent();

    try {
      const res = await axiosClient.get(
        `/api/v1/employee/get/employees/by/client/${this.user._id}`
      );

      const roles = await axiosClient.get(`/api/v1/role/getall`);
      this.roles = roles.data.data;

      const departments = await axiosClient.get(`/api/v1/department/getall`);
      this.departments = departments.data.data;

      const teams = await axiosClient.get(`/api/v1/team/getall`);
      this.teams = teams.data.data;

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

      console.log('res.data.data: ', res.data.data);
      this.originalItems = res.data.data;
      const notifications = await axiosClient.get(`/api/v1/notification/getall/${this.user._id}`);
      this.notifications = notifications.data.data;
      console.log(' this.notifications: ', this.notifications);
    } catch (err) {
      console.log('error: ', err);
    }

    // this.items = this.originalItems;
  },

  async getByRow(row) {
    console.log(row);
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
    async handleFileUpload(event) {
      this.handleUploadButton = true;
      this.file = event.target.files[0];
      this.showSpinner = true;
      setTimeout(async () => {
        this.showResponse = false;
        await this.extractEmployeesFromExcel();
      }, 200);
    },
    async extractEmployeesFromExcel() {
      if (!this.file) {
        toast.info(`Select File`, {
          autoClose: 1500,
        });
        this.showSpinner = false;
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        this.excelData = jsonData;

        let tempEmployeesToSelect = jsonData;
        let tempEmployeesNotToSelect = [];

        for (let i = 0; i < tempEmployeesToSelect.length; i++) {
          if (
            tempEmployeesToSelect[i].name != undefined &&
            tempEmployeesToSelect[i].email != undefined &&
            tempEmployeesToSelect[i].whatsapp_no != undefined &&
            tempEmployeesToSelect[i].adhar_card != undefined &&
            tempEmployeesToSelect[i].name != '' &&
            tempEmployeesToSelect[i].email != '' &&
            toString(tempEmployeesToSelect[i].whatsapp_no) != '' &&
            toString(tempEmployeesToSelect[i].adhar_card) != ''
          ) {
            this.employeesToSelect.push(tempEmployeesToSelect[i]);
          } else {
            this.employeesNotToSelect.push(tempEmployeesToSelect[i]);
          }
        }
        this.showSpinner = false;
      };
      reader.readAsArrayBuffer(this.file);
      return;
    },

    async uploadFile() {
      this.form.team = this.selected_team._id;
      this.form.department = this.selected_department._id;
      this.form.roleType = this.selected_roleType._id;
      if (this.validateForm() == false) return;

      this.form.employeeData = this.itemsSelected;
      try {
        const res = await axiosClient.post(`/api/v1/employee/add/employees/excel`, this.form);
        toast.success(`Employees Added`, {
          autoClose: 1500,
        });
        this.savedEmployees = res.data.newUsers;
        this.unSavedEmployees = res.data.existingUsers;

        this.handleUploadButton = false;
        this.showResponse = true;
      } catch (err) {
        console.log('error: ', err);
        toast.error(`Something Went Wrong`, {
          autoClose: 1500,
        });
      }
    },

    handleEmployeeUpdate(id) {
      this.$router.push(`/update/employee/${id}`);
    },

    handleViewEmployee(id) {
      this.$router.push(`/view/employee/${id}`);
    },

    validateForm() {
      if (this.employeesToSelect.length <= 0) {
        toast.info(`Select Excel File`, {
          autoClose: 1500,
        });
        return false;
      }

      if (this.form.team == '' || this.form.team == undefined) {
        toast.info(`Select Team`, {
          autoClose: 1500,
        });
        return false;
      }

      if (this.form.department == '' || this.form.department == undefined) {
        toast.info(`Select Department`, {
          autoClose: 1500,
        });
        return false;
      }

      if (this.itemsSelected.length <= 0) {
        toast.info(`Select Employees`, {
          autoClose: 1500,
        });
        return false;
      }

      return true;
    },

    async getCurrent() {
      let token = '';
      try {
        token = await axiosClient.get(`api/v1/user/getCurrent/`);
        this.form.client_user_id = token.data.user._id;
        this.user = token.data.user;
        // console.log('Token : ', token);
        console.log('form.user_id: ', this.form.client_user_id);

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
        console.log('form.client_id: ', this.form.client_id);
      } catch (err) {
        console.log('error: ', err);
      }
    },
  },
};
</script>
