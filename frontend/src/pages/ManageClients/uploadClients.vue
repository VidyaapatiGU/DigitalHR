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
        <h5 class="source-500 page-title">Upload Client Excel</h5>
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
            v-if="clientsToSelect.length > 0 && showResponse == false"
            class="table border rounded mt-3"
          >
            <div class="w-100">
              <EasyDataTable
                table-class-name="customize-table text-capitalize"
                v-model:items-selected="itemsSelected"
                :headers="employeesToSelectHeaders"
                :items="clientsToSelect"
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

          <div v-if="clientsNotToSelect.length > 0 && showResponse == false">
            <div class="p-2 mt-3 source-500">Cleints With Required Feilds Missing</div>

            <div class="table border rounded">
              <div class="w-100">
                <EasyDataTable
                  table-class-name="customize-table text-capitalize"
                  :headers="employeesNotToSelectHeaders"
                  :items="clientsNotToSelect"
                  search-field="name"
                  :search-value="search"
                  :rows-per-page="10"
                  @row-click="getByRow"
                  border-cell
                  buttons-pagination
                >
                  <template #item-name="item">
                    <div v-if="!item.name || item.name == '' || item.name == undefined">
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check-lg text-primary"></i>
                    </div>
                  </template>

                  <template #item-password="item">
                    <div v-if="!item.password || item.password == '' || item.password == undefined">
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check-lg text-primary"></i>
                    </div>
                  </template>
                  <template #item-pan_card="item">
                    <div v-if="!item.pan_card || item.pan_card == '' || item.pan_card == undefined">
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check-lg text-primary"></i>
                    </div>
                  </template>
                  <template #item-industry_type="item">
                    <div
                      v-if="
                        !item.industry_type ||
                        item.industry_type == '' ||
                        item.industry_type == undefined
                      "
                    >
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check text-primary"></i>
                    </div>
                  </template>
                  <template #item-incorporation_type="item">
                    <div
                      v-if="
                        !item.incorporation_type ||
                        item.incorporation_type == '' ||
                        item.incorporation_type == undefined
                      "
                    >
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check text-primary"></i>
                    </div>
                  </template>
                  <template #item-employee_count_range="item">
                    <div
                      v-if="
                        !item.employee_count_range ||
                        item.employee_count_range == '' ||
                        item.employee_count_range == undefined
                      "
                    >
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check text-primary"></i>
                    </div>
                  </template>
                  <template #item-contact_name="item">
                    <div
                      v-if="
                        !item.contact_name ||
                        item.contact_name == '' ||
                        item.contact_name == undefined
                      "
                    >
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check text-primary"></i>
                    </div>
                  </template>
                  <template #item-contact_number="item">
                    <div
                      v-if="
                        !item.contact_number ||
                        item.contact_number == '' ||
                        item.contact_number == undefined
                      "
                    >
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check text-primary"></i>
                    </div>
                  </template>
                  <template #item-contact_email="item">
                    <div
                      v-if="
                        !item.contact_email ||
                        item.contact_email == '' ||
                        item.contact_email == undefined
                      "
                    >
                      <i class="bi bi-x-lg text-danger"></i>
                    </div>
                    <div v-else>
                      <i class="bi bi-check text-primary"></i>
                    </div>
                  </template>
                  <template #item-contact_designation="item">
                    <div
                      v-if="
                        !item.contact_designation ||
                        item.contact_designation == '' ||
                        item.contact_designation == undefined
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
                <router-link to="/manage/clients">
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
        { text: 'Password', value: 'password' },
        { text: 'Incorporation Type', value: 'incorporation_type' },
        { text: 'Industry Type', value: 'industry_type' },
        { text: 'Pan Card', value: 'pan_card' },
        { text: 'Employee Count Range', value: 'employee_count_range' },
        { text: 'Contact Name', value: 'contact_name' },
        { text: 'Contact Number', value: 'contact_number' },
        { text: 'Contact Email', value: 'contact_email' },
        { text: 'Contact Designation', value: 'contact_designation' },
      ],
      employeesNotToSelectHeaders: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Password', value: 'password' },
        { text: 'Incorporation Type', value: 'incorporation_type' },
        { text: 'Industry Type', value: 'industry_type' },
        { text: 'Pan Card', value: 'pan_card' },
        { text: 'Employee Count Range', value: 'employee_count_range' },
        { text: 'Contact Name', value: 'contact_name' },
        { text: 'Contact Number', value: 'contact_number' },
        { text: 'Contact Email', value: 'contact_email' },
        { text: 'Contact Designation', value: 'contact_designation' },
      ],
      clientsToSelect: [],
      clientsNotToSelect: [],
      savedEmployees: [],
      unSavedEmployees: [],

      month_year: {
        month: new Date().getMonth() - 1,
        year: new Date().getFullYear(),
      },
      excelData: [],
      form: {
        clientData: [],
        username_prefix: '',
        contact_name: '',
        contact_email: '',
        contact_number: '',
        contact_designation: '',
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
        await this.extractClientFromExcel();
      }, 200);
    },
    async extractClientFromExcel() {
      if (!this.file) {
        console.log('No file selected');
        toast.info(`Select File`, {
          autoClose: 1500,
        });
        this.showSpinner = false;
        return;
      }

      console.log(' this.showSpinner : ', this.showSpinner);

      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming you want the first sheet's data
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Parse Excel data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        this.excelData = jsonData;

        // Console the Excel data
        let tempClientToSelect = jsonData;
        console.log('Excel Data:', tempClientToSelect);
        let tempEmployeesNotToSelect = [];

        for (let i = 0; i < tempClientToSelect.length; i++) {
          if (
            tempClientToSelect[i].name != undefined &&
            tempClientToSelect[i].password != undefined &&
            tempClientToSelect[i].name != '' &&
            tempClientToSelect[i].password != '' &&
            tempClientToSelect[i].incorporation_type != undefined &&
            tempClientToSelect[i].industry_type != undefined &&
            tempClientToSelect[i].incorporation_type != '' &&
            tempClientToSelect[i].industry_type != '' &&
            tempClientToSelect[i].pan_card != undefined &&
            tempClientToSelect[i].employee_count_range != undefined &&
            tempClientToSelect[i].pan_card != '' &&
            tempClientToSelect[i].employee_count_range != '' &&
            tempClientToSelect[i].contact_name != undefined &&
            tempClientToSelect[i].contact_email != undefined &&
            tempClientToSelect[i].contact_name != '' &&
            tempClientToSelect[i].contact_email != '' &&
            tempClientToSelect[i].contact_number != undefined &&
            tempClientToSelect[i].contact_designation != undefined &&
            tempClientToSelect[i].contact_number != '' &&
            tempClientToSelect[i].contact_designation != ''
          ) {
            this.clientsToSelect.push(tempClientToSelect[i]);
          } else {
            this.clientsNotToSelect.push(tempClientToSelect[i]);
          }
        }

        console.log(' this.clientToSelect: ', this.clientsToSelect);
        this.showSpinner = false;
        console.log(' this.showSpinner : ', this.showSpinner);
      };

      reader.readAsArrayBuffer(this.file);

      return;
    },

    async uploadFile() {
      this.form.clientData = this.itemsSelected;
      try {
        const res = await axiosClient.post(`/api/v1/client/upload`, this.form);
        if (res.data.msg == 'DONE') {
          toast.success(`Clients Added`, {
            autoClose: 1500,
          });
        } else {
          toast.error(`Errors`, {
            autoClose: 1500,
          });
        }
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
      if (this.clientsToSelect.length <= 0) {
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
        console.log('Token: ', token);
        console.log('Token: ', token.data.user._id);
        this.user = token.data.user;
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
