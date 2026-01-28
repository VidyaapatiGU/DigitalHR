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

/* Removed empty rulesets: .main, .table-icon, h1 */

.animated_input {
  height: 3rem;
  max-width: 19rem;
}

.table-icon:hover {
  transform: scale(1.15);
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

  <div
    class="modal fade"
    id="ModalAddAttendance"
    tabindex="-1"
    aria-labelledby="ModalAddAttendanceLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title source-400" id="ModalAddAttendanceLabel">Add Attendance</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <multiselect
              v-model="selectedEmployee"
              :options="employees"
              placeholder="Select Employee"
              label="name"
              track-by="name"
            ></multiselect>
          </div>
          <div class="mb-3">
            <label for="present" class="form-label source-400">Present</label>
            <input type="number" class="form-control" id="present" v-model="formAdd.present" />
          </div>
          <div class="mb-3">
            <label for="remark" class="form-label source-400">Remark</label>
            <input type="text" class="form-control" id="remark" v-model="formAdd.remark" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="handleAddAttendance"
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
            data-bs-dismiss="modal"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <div class="source-400 pt-2 h-100 scroll">
    <div class="border-bottom px-4 d-flex justify-content-between align-items-center py-2">
      <div>
        <h5 class="source-500 page-title">
          Employee Attendance
          {{ monthYear }}
        </h5>
      </div>
      <div class="">
        <div class="position-relative" data-bs-toggle="modal" data-bs-target="#ModalNotification">
          <i class="bi bi-bell-fill pointer text-danger" style="font-size: 1.2rem"></i>
          <span
            v-if="notifications.length > 0"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
          >
            {{ notifications.length }}
          </span>
          <span
            v-if="notifications.length > 99"
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
          >
            99+
          </span>
        </div>
      </div>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3">
          <div class="mt-5 mb-3 d-flex justify-content-between px-2 gap-2">
            <div class="d-flex">
              <input
                v-model="search"
                class="border form-control form-control-sm"
                size="small"
                placeholder="Type to search"
              />
            </div>
            <div class="d-flex justify-content-center align-items-center gap-2">
              <button
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                @click="downloadSalarySheet3"
              >
                <i class="bi bi-download"></i>
                Employee Attendance
              </button>
              <button
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                @click="downloadSalarySheet2"
              >
                <i class="bi bi-download"></i>
                Salary Sheet
              </button>
              <!-- <button
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#ModalAddAttendance"
              >
                Add Attendance
              </button> -->
            </div>
          </div>
          <div class="table border rounded">
            <div :key="renderKey" class="w-100">
              <EasyDataTable
                table-class-name="customize-table text-capitalize pointer"
                :headers="headers"
                :items="items"
                search-field="name"
                :search-value="search"
                :rows-per-page="10"
                border-cell
                buttons-pagination
              >
                <template #item-absent="item">
                  <div>
                    {{ months[month - 1].days - item.present }}
                  </div>
                </template>
                <template #item-action="item">
                  <div class="d-flex justify-content-evenly">
                    <div
                      class="table-icon action_icon_color"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalNotification"
                      @click="updateEmployee = JSON.parse(JSON.stringify(item))"
                    >
                      <el-tooltip content="Edit" placement="bottom">
                        <i class="bi bi-pen-fill pointer" style="font-size"></i>
                      </el-tooltip>
                    </div>
                    <div
                      class="table-icon action_icon_color"
                      @click="updateEmployee = JSON.parse(JSON.stringify(item))"
                    >
                      <el-tooltip content="Salary Slip" placement="bottom">
                        <router-link
                          :to="'/wage/slip/' + item._id + '/' + item.email"
                          :style="{ textDecoration: 'none' }"
                        >
                          <i
                            class="bi bi-receipt-cutoff pointer action_icon_color"
                            style="font-size"
                          ></i>
                        </router-link>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
              </EasyDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ////////////////////////////////////////Modal////////////////////////////////////////////// -->
  </div>
</template>

<script>
import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx'; // Import the XLSX library
import { saveAs } from 'file-saver';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import EasyDataTable from 'vue3-easy-data-table';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosClient from '../../axiosClient';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'EmployeeAttendance',
  props: {
    monthYear: {
      type: String,
      required: true,
    },
  },
  components: {
    EasyDataTable,
    Multiselect,
    VueDatePicker,
  },

  data() {
    return {
      gross: 100658,
      id: '',
      user: {},
      role: '',
      renderKey: 0,
      attendance_id: '',
      employees: [],
      selectedEmployee: '',

      notifications: [],
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Days Present', value: 'present', sortable: false },
        { text: 'Total Working Days', value: 'totalWorkingDays' },
        { text: 'CL', value: 'numberOfCL' },
        { text: 'CL Days', value: 'absentDaysCL' },
        { text: 'SL', value: 'numberOfSL' },
        { text: 'SL Days', value: 'absentDaysSL' },
        { text: 'PL', value: 'numberOfPL' },
        { text: 'PL Days', value: 'absentDaysPL' },
        { text: 'LOP', value: 'numberOfLOP' },
        { text: 'LOP Days', value: 'absentDaysLOP' },
        { text: 'Month', value: 'month' },
        { text: 'Year', value: 'year' },
        { text: 'Remark', value: 'remark' },
        { text: 'Action', value: 'action', sortable: false },
      ],
      optionTypes: ['success', 'warning', 'danger'],
      month_year: {
        month: '',
        year: '',
      },
      data: '',
      clientEmp: '',
      employeeHolidayAssignments: [],

      form: {
        name: '',
        present: '',
      },
      formAdd: {
        name: '',
        emp_id: '',
        email: '',
        present: '',
        month_year: '',
        totalWorkingDays: '',
        month: '',
        year: '',
        remark: '',
        gross: '',
      },
      months: [],
      month: '',
      newPassword: '',
      updateEmployee: {},
      showDeleteModal: false,

      search: '',

      items: [],
      originalItems: [],
    };
  },

  async created() {
    //console.log('monthYear: ', this.monthYear);
    await this.getCurrent();
    this.getMonths();

    try {
      const res = await axiosClient.get(
        `/api/v1/attendance/get/${this.user._id}/${this.monthYear}`
      );
      this.data = res.data;
      //console.log('res.data.data: ', this.data);

      const resClient = await axiosClient.get(
        `/api/v1/employee/client/${this.user._id}`
      );
      this.clientEmp = resClient.data;
      //console.log('Client EMP: ', this.clientEmp);
      
      // Fetch employee holiday assignments
      try {
        const resHolidayAssignments = await axiosClient.get(
          `/api/v1/settings/holiday/to_from/${this.user._id}`
        );
        if (resHolidayAssignments.data && Array.isArray(resHolidayAssignments.data.data) && resHolidayAssignments.data.data.length > 0) {
          this.employeeHolidayAssignments = resHolidayAssignments.data.data[0].employeeHolidayAssignments || [];
        }
      } catch (err) {
        console.log('Error fetching holiday assignments:', err);
      }
      for (let i in this.data) {
        this.data[i].month_year = this.data[i].month_year.slice(0, 10);
      }

      this.attendance_id = res.data._id;
      this.originalItems = this.data;
      const temp = this.data[0].month_year.split('-');
      this.month = temp[1];
      this.month_year = this.data[0].month_year;

      const resEmployees = await axiosClient.get(
        `/api/v1/employee/client/${this.user._id}`
      );
      // console.log('resEmployees.data.data: ', resEmployees.data.data);
      this.employees = resEmployees.data.data;

      //console.log('month_year: ', this.month_year, ' temp : ', temp);
      this.renderKey++;
    } catch (err) {
      console.log('error: ', err);
    }

    this.items = this.originalItems;
    //console.log('this.items : ', this.items);
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
    CalculatePayableWage(
      pBasic,
      pHra,
      pDA,
      pConvayance,
      pFoodAllow,
      pOtherAllowance = 0,
      pReimbursement = 0,
      pESI = 0,
      pLwf = 0,
      pAdvances = 0,
      pTdsOther = 9000
    ) {
      const gross = pBasic;
      const days = 30;
      const attendance = 30;
      const basic = Math.round((gross / days) * attendance);
      const DA = Math.round((pDA / days) * attendance);
      let pfBasic = basic + DA;
      if (pfBasic > 15000) pfBasic = 15000;
      const pf = Math.round((pfBasic * 12) / 100);

      const hra = Math.round((pHra / days) * attendance);
      const conveyance = Math.round((pConvayance / days) * attendance);
      const FoodAllow = Math.round((pFoodAllow / days) * attendance);
      const otherAllowance = Math.round((pOtherAllowance / days) * attendance);
      const payableGross =
        basic + hra + DA + conveyance + FoodAllow + otherAllowance + pReimbursement;
      const totalDeduction = pESI + pLwf + pAdvances + pf + pTdsOther;
      const netWages = payableGross - totalDeduction;
      console.log('payable basic: ', basic);
      console.log('payable hra: ', hra);
      console.log('payable DA, conveyance, FoodAllow: ', DA, conveyance, FoodAllow);
      console.log('pfBasic: ', pfBasic);
      console.log('payable pf: ', pf);
      console.log('payable otherAllowance: ', otherAllowance);
      console.log('payable Gross: ', payableGross);
      console.log('totalDeduction: ', totalDeduction);
      console.log('netWages: ', netWages);
    },

    calculateMinimumRateWage() {
      const gross = this.gross;

      const basic = Math.round((gross * 40) / 100);
      const hra = Math.round((gross * 30) / 100);
      const DA = Math.round((gross * 10) / 100);
      const conveyance = Math.round((gross * 10) / 100);
      const FoodAllow = Math.round((gross * 10) / 100);

      console.log('basic: ', basic);
      console.log('hra: ', hra);
      console.log('DA, conveyance, FoodAllow: ', DA, conveyance, FoodAllow);
      this.CalculatePayableWage(basic, hra, DA, conveyance, FoodAllow);
    },

    downloadSalarySheet() {
      console.log('downloadSalarySheet called');
      // Create a worksheet from the JSON data

      let tempItems = [];

      for (let i = 0; i < this.originalItems.length; i++) {
        const gross = this.originalItems[i].gross;
        const days = this.originalItems[i].totalWorkingDays;
        const attendance = this.originalItems[i].present;
        console.log('DownloadSalary');
        console.log(this.originalItems[i].numberOfLOP);

        const basic = Math.round((gross * 40) / 100);
        const hra = Math.round((gross * 30) / 100);
        const DA = Math.round((gross * 10) / 100);
        const conveyance = Math.round((gross * 10) / 100);
        const FoodAllow = Math.round((gross * 10) / 100);

        const payableBasic = Math.round((basic / days) * attendance);
        const payableDA = Math.round((DA / days) * attendance);

        let pfBasic = payableBasic + payableDA;
        if (pfBasic > 15000) pfBasic = 15000;
        const pf = Math.round((pfBasic * 12) / 100);
        const e_pf = Math.round((pfBasic * 13) / 100);

        const payableHra = Math.round((hra / days) * attendance);
        const payableConveyance = Math.round((conveyance / days) * attendance);
        const payableFoodAllow = Math.round((FoodAllow / days) * attendance);
        const payableOtherAllowance = 0;
        const otEarnings = 0;

        const reimbursement = 0;

        const grossSalary =
          payableBasic +
          payableDA +
          payableHra +
          payableConveyance +
          payableFoodAllow +
          payableOtherAllowance +
          otEarnings +
          reimbursement;

        let esi = 0;
        if (grossSalary <= 21000) esi = Math.round((grossSalary * 0.75) / 100);
        let lwf = 0;

        const tdsOther = 0;
        const totalDeduction = esi + pf + lwf + tdsOther;

        const netWages = grossSalary - totalDeduction;

        tempItems.push({
          name: this.originalItems[i].name,

          minimum_basic: basic,
          minimum_hra: hra,
          minimum_DA: DA,
          minimum_conveyance: conveyance,
          minimum_FoodAllow: FoodAllow,
          minimum_gross: gross,
          daysInMonth: days,
          attendance: attendance,
          payableBasic: payableBasic,
          payableDA: payableDA,
          payableHra: payableHra,
          payableConveyance: payableConveyance,
          payableFoodAllow: payableFoodAllow,
          payableOtherAllowance: payableOtherAllowance,
          otEarnings: otEarnings,
          reimbursement: reimbursement,
          grossSalary: grossSalary,
          esi: esi,
          pf: pf,
          lwf: lwf,
          tdsOther: tdsOther,
          totalDeduction: totalDeduction,
          netWages: netWages,
        });

        /* tempItems.push({
          name: this.originalItems[i].name,
          minimum: {
            minimum_basic: basic,
            minimum_hra: hra,
            minimum_DA: DA,
            minimum_conveyance: conveyance,
            minimum_FoodAllow: FoodAllow,
            minimum_gross: gross,
          },

          daysInMonth: days,
          attendance: attendance,
          payable_Salary: {
            payableBasic: payableBasic,
            payableDA: payableDA,
            payableHra: payableHra,
            payableConveyance: payableConveyance,
            payableFoodAllow: payableFoodAllow,
            payableOtherAllowance: payableOtherAllowance,
          },
          deduction: {
            otEarnings: otEarnings,
            reimbursement: reimbursement,
            grossSalary: grossSalary,
            esi: esi,
            pf: pf,
            lwf: lwf,
            tdsOther: tdsOther,
            totalDeduction: totalDeduction,
          },

          netWages: netWages,
        }); */
      }

      console.log('tempItems', tempItems);

      const worksheet = XLSX.utils.json_to_sheet(tempItems);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Write the workbook to binary string
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Create a Blob from the buffer and save it as an Excel file
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      // Use file-saver to download the file

      saveAs(blob, `SalarySheet-${this.items[0].month_year}.xlsx`);
    },

    downloadSalarySheet2() {
      let tempItems = [];
      for (let i = 0; i < this.originalItems.length; i++) {
        const item = this.originalItems[i];
        const empItem = this.clientEmp.data[i];

        console.log('empItem: ', empItem);
        console.log('item: ', item);
        const days = item.totalWorkingDays;
        const attendance = item.present;
        console.log(attendance);
        console.log('Item Data');
        console.log(item.numberOfLOP);
        //console.log(item.numberOfLOP);
        let calAtendence = 0;
        if (item.numberOfLOP > 0) {
          // it is Loss of pay
          calAtendence = days - item.numberOfLOP;
        } else {
          calAtendence = days;
        }

        const gross = empItem.gross;
        const basic = empItem.basic;
        const hra = empItem.hra;
        const DA = empItem.da;
        const conveyance = empItem.conveyance;
        const FoodAllow = empItem.food_allow;

        const payableBasic = Math.round((basic / days) * calAtendence);
        const payableDA = Math.round((DA / days) * calAtendence);
        let pfBasic = payableBasic + payableDA;
        if (pfBasic > 15000) pfBasic = 15000;
        const pf = Math.round((pfBasic * 12) / 100);
        const e_pf = Math.round((pfBasic * 13) / 100);

        const payableHra = Math.round((hra / days) * attendance);
        const payableConveyance = Math.round((conveyance / days) * attendance);
        const payableFoodAllow = Math.round((FoodAllow / days) * attendance);
        const payableOtherAllowance = 0;
        const otEarnings = 0;
        const reimbursement = 0;
        const lwf = attendance == 0 ? 0 : empItem.lwf ? 10 : 0;

        const grossSalary =
          payableBasic +
          payableDA +
          payableHra +
          payableConveyance +
          payableFoodAllow +
          payableOtherAllowance +
          otEarnings +
          reimbursement;

        let esi = 0;
        //if (grossSalary <= 21000) esi = Math.round((grossSalary * 0.75) / 100);
        if (grossSalary <= 21000 && empItem.esi) esi = Math.ceil((grossSalary * 0.75) / 100);
        //let lwf = 0;
        const tdsOther = 0;
        const totalDeduction = esi + pf + lwf + tdsOther;
        const netWages = grossSalary - totalDeduction;

        tempItems.push({
          name: item.name,
          fatherHusband_name: empItem.fatherHusband_name,
          designation: empItem.designation,
          minimum_basic: basic,
          minimum_hra: hra,
          minimum_DA: DA,
          minimum_conveyance: conveyance,
          minimum_FoodAllow: FoodAllow,
          minimum_gross: gross,
          daysInMonth: days,
          attendance: attendance,
          PF_basic: pfBasic,
          payableBasic: payableBasic,
          payableDA: payableDA,
          payableHra: payableHra,
          payableConveyance: payableConveyance,
          payableFoodAllow: payableFoodAllow,
          payableOtherAllowance: payableOtherAllowance,
          otEarnings: otEarnings,
          reimbursement: reimbursement,
          grossSalary: grossSalary,
          esi: esi,
          pf: pf,
          lwf: lwf,
          advances: 0,
          tdsOther: tdsOther,
          totalDeduction: totalDeduction,
          netWages: netWages,
        });
      }

      const headers = [
        [
          '',
          '',
          '',
          'Minimum Wage Rate',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          'Minimum Rates of Wages Payable',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          'Deductions',
          '',
          '',
          '',
          '',
          '',
        ],
        [
          'Name',
          'Father/ Husband Name',
          'Designation',
          'Basic',
          'DA',
          'HRA',
          'Food Allowance',
          'Conveyance',
          'Other Allow',
          'Gross',
          'Days In Month',
          'Total Attendance',
          'PF Basic',
          'Basic',
          'DA',
          'HRA',
          'Food Allowance',
          'Conveyance',
          'Other Allow',
          'OT Earning',
          'Reimbursement',
          'Gross Salary',
          'ESI',
          'PF',
          'LWF',
          'Advances',
          'TDS/Other',
          'Total Deduction',
          'Net Wages Paid',
          'Date of Payment',
          'Signature or thumb impression of employee',
        ],
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(headers);

      worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }, // "Name"
        { s: { r: 0, c: 1 }, e: { r: 0, c: 1 } }, // "Father Husband Name"
        { s: { r: 0, c: 2 }, e: { r: 0, c: 2 } }, // "Designation"
        { s: { r: 0, c: 3 }, e: { r: 0, c: 9 } }, // "Minimum Wage Rate"
        { s: { r: 0, c: 10 }, e: { r: 0, c: 10 } }, // "Days In Month"
        { s: { r: 0, c: 11 }, e: { r: 0, c: 11 } }, // "Total Attendance"
        { s: { r: 0, c: 12 }, e: { r: 0, c: 12 } }, // "PF Basic"
        { s: { r: 0, c: 13 }, e: { r: 0, c: 18 } }, // "Minimum Rates of Wages Payable"

        { s: { r: 0, c: 19 }, e: { r: 0, c: 19 } }, // "OT Earnings"
        { s: { r: 0, c: 20 }, e: { r: 0, c: 20 } }, // "Reimbursement"
        { s: { r: 0, c: 21 }, e: { r: 0, c: 21 } }, // "Gross Salary"

        { s: { r: 0, c: 22 }, e: { r: 0, c: 27 } }, // "Deductions"
        { s: { r: 0, c: 28 }, e: { r: 0, c: 28 } }, // "Net Wages"
        { s: { r: 0, c: 29 }, e: { r: 0, c: 29 } }, // "Date of Payment"
        { s: { r: 0, c: 30 }, e: { r: 0, c: 30 } }, // "Sign"
      ];

      const dataRows = tempItems.map((item) => [
        item.name,
        item.fatherHusband_name,
        item.designation,
        item.minimum_basic,
        item.minimum_DA,
        item.minimum_hra,
        item.minimum_FoodAllow,
        item.minimum_conveyance,
        '0',
        item.minimum_gross,
        item.daysInMonth,
        item.attendance,
        item.PF_basic,
        item.payableBasic,
        item.payableDA,
        item.payableHra,
        item.payableConveyance,
        item.payableFoodAllow,
        item.payableOtherAllowance,
        item.otEarnings,
        item.reimbursement,
        item.grossSalary,
        item.esi,
        item.pf,
        item.lwf,
        item.advances,
        item.tdsOther,
        item.totalDeduction,
        item.netWages,
      ]);

      XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: -1 });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `SalarySheet-${this.items[0].month_year}.xlsx`);
    },
    
    async downloadSalarySheet3() {
      // Parse month and year
      const parts = this.monthYear.split('-');
      const parsedYear = parts[0].length === 2 ? 2000 + parseInt(parts[0], 10) : parseInt(parts[0], 10);
      const parsedMonth = parseInt(parts[1], 10) - 1;
      const monthStart = new Date(parsedYear, parsedMonth, 1);
      const monthEnd = new Date(parsedYear, parsedMonth + 1, 0);
      const totalDaysInMonth = monthEnd.getDate();

      // Prepare employee rows
      let rows = [];
      for (let i = 0; i < this.originalItems.length; i++) {
        const item = this.originalItems[i];
        const empItem = this.clientEmp.data[i];
        if (!item || !empItem) continue;

        // Attendance per day
        let dailyAttendance = [];
        for (let d = 1; d <= totalDaysInMonth; d++) {
          // Determine status: Present, Absent, Weekly Off
          let status = 'P';
          // Weekly off logic
          const date = new Date(parsedYear, parsedMonth, d);
          const dayName = date.toLocaleString('en-US', { weekday: 'long' });
          if (empItem.weeklyOff && empItem.weeklyOff.includes(dayName)) {
            status = 'W/O';
          }
          // Absent logic
          if (item.absentDaysCL && item.absentDaysCL.includes(d)) status = 'A';
          if (item.absentDaysSL && item.absentDaysSL.includes(d)) status = 'A';
          if (item.absentDaysPL && item.absentDaysPL.includes(d)) status = 'A';
          if (item.absentDaysLOP && item.absentDaysLOP.includes(d)) status = 'A';
          dailyAttendance.push(status);
        }

        rows.push([
          i + 1,
          item.name || '',
          empItem.fatherHusband_name || '',
          empItem.sex || '',
          empItem.designation || '',
          ...dailyAttendance,
          item.remark || ''
        ]);
      }

      // Build headers for muster roll
      const headers = [
        'Sr.No.', 'Name of workman', 'Fathers name', 'Sex', 'Nature of work',
        ...Array.from({ length: totalDaysInMonth }, (_, i) => (i + 1).toString()),
        'Remark'
      ];

      // Create workbook and worksheet
      const ExcelJS = (await import('exceljs')).default;
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Muster Roll');

      // Calculate total columns for centering
      const totalCols = 5 + totalDaysInMonth + 1;
      const centerCol = Math.floor(totalCols / 2) + 1;

      // Add single title row with both headings combined
      worksheet.addRow([]);
      worksheet.addRow(Array(totalCols).fill(''));
      worksheet.mergeCells(2, 1, 2, totalCols);
      worksheet.getRow(2).getCell(1).value = 'FORM XI [See Rule 29 (5) ]\nMUSTER ROLL';
      worksheet.getRow(2).getCell(1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
      worksheet.getRow(2).height = 50;
      worksheet.getRow(2).font = { bold: true, size: 14 };

      worksheet.addRow([]);
      worksheet.addRow(['Name of Establishment: M/s/Bay 15']);
      worksheet.addRow([]);
      worksheet.addRow([`Month: ${monthStart.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`]);
      worksheet.addRow([]);

      // Add headers
      worksheet.addRow(headers);
      // Apply filters to all columns for row 9 (headers)
      worksheet.autoFilter = {
        from: {
          row: 8,
          column: 1
        },
        to: {
          row: 8,
          column: totalCols
        }
      };

      // Add employee rows
      rows.forEach(row => worksheet.addRow(row));

      // Style header row (should be row 8, not 10)
      const headerRow = worksheet.getRow(8);
      headerRow.font = { bold: true };
      headerRow.alignment = { horizontal: 'center', vertical: 'middle' };

      // Style title rows
      worksheet.getRow(2).font = { bold: true, size: 14 };
      worksheet.getRow(3).font = { bold: true, size: 12 };
      worksheet.getRow(5).font = { italic: true };
      worksheet.getRow(7).font = { bold: true };

      // Set column widths
      worksheet.columns = [
        { width: 7 }, // Sr.No.
        { width: 22 }, // Name of workman
        { width: 22 }, // Fathers name
        { width: 7 }, // Sex
        { width: 18 }, // Nature of work
        ...Array(totalDaysInMonth).fill({ width: 8 }), // Increased width for date columns
        { width: 12 } // Remark
      ];

      // Freeze first two columns (Sr.No. and Name of workman)
      worksheet.views = [{ state: 'frozen', xSplit: 2 }];

      // Borders for header (row 8), filter row (row 9), and data
      for (let r = 8; r <= worksheet.rowCount; r++) {
        worksheet.getRow(r).eachCell(cell => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      }

      // Save file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      saveAs(blob, `MusterRoll-${this.monthYear}.xlsx`);
    },

    async handleAddAttendance() {
      this.formAdd.name = this.selectedEmployee.name;
      this.formAdd.emp_id = this.selectedEmployee._id;
      this.formAdd.email = this.selectedEmployee.email;
      this.formAdd.month_year = this.month_year;
      this.formAdd.totalWorkingDays = this.items[0].totalWorkingDays;
      this.formAdd.month = this.items[0].month;
      this.formAdd.year = this.items[0].year;
      this.formAdd.gross = this.selectedEmployee.gross;

      console.log('formAdd', this.formAdd);

      if (this.validateFormAdd() == false) return;

      try {
        const res = await axiosClient.post(
          `/api/v1/attendance/add/single/${this.user._id}`,
          this.formAdd
        );
        //console.log('res.data.data: ', res.data);
        toast.success('Attendance Added Successfully', {
          autoClose: 1500,
        });

        setTimeout(() => {
          this.$router.go(0);
        });

        this.originalItems = res.data.AttendanceData;
        this.items = this.originalItems;
        this.selectedEmployee = '';
      } catch (err) {
        console.log('error: ', err);
        toast.error('Some Thing Went Wrong');
      }
    },

    async updateEmployeeAttendance() {
      this.form = {
        name: this.updateEmployee.name,
        present: this.updateEmployee.present,
        totalWorkingDays: this.updateEmployee.totalWorkingDays,
        numberOfLOP: this.updateEmployee.numberOfLOP,
        absentDaysLOP: this.updateEmployee.absentDaysLOP,
        weeklyoff: this.updateEmployee.weeklyoff,
        numberOfCL: this.updateEmployee.numberOfCL,
        absentDaysCL: this.updateEmployee.absentDaysCL,
        numberOfPL: this.updateEmployee.numberOfPL,
        absentDaysPL: this.updateEmployee.absentDaysPL,
        numberOfSL: this.updateEmployee.numberOfSL,
        absentDaysSL: this.updateEmployee.absentDaysSL,
        totalWorkingDays: this.updateEmployee.totalWorkingDays,
        totalWorkingDays: this.updateEmployee.totalWorkingDays,
        remark: this.updateEmployee.remark,
      };

      if (this.validateForm() == false) return;
      try {
        const res = await axiosClient.put(
          `/api/v1/attendance/edit/${this.updateEmployee._id}`,
          this.form
        );
        //console.log('res.data.data: ', res.data);
        toast.success('Attendance Updated Successfully', {
          autoClose: 1500,
        });
        for (let i in this.originalItems) {
          if (this.originalItems[i]._id == this.updateEmployee._id) {
            this.originalItems[i].name = this.form.name;
            this.originalItems[i].present = this.form.present;
            this.originalItems[i].totalWorkingDays = this.form.totalWorkingDays;
            this.originalItems[i].remark = this.form.remark;
            this.originalItems[i].numberOfLOP = this.form.numberOfLOP;
            this.originalItems[i].absentDaysLOP = this.form.absentDaysLOP;
            this.originalItems[i].weeklyoff = this.form.weeklyoff;
            this.originalItems[i].numberOfCL = this.form.numberOfCL;
            this.originalItems[i].absentDaysCL = this.form.absentDaysCL;
            this.originalItems[i].numberOfSL = this.form.numberOfSL;
            this.originalItems[i].absentDaysSL = this.form.absentDaysSL;
            this.originalItems[i].numberOfPL = this.form.numberOfPL;
            this.originalItems[i].absentDaysPL = this.form.absentDaysPL;
          }
        }

        this.items = this.originalItems;
      } catch (err) {
        console.log('error: ', err);
      }
    },

    handleViewEmployee(id) {
      this.$router.push(`/view/employee/${id}`);
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
        //console.log(' this.user : ', this.user);
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }

      return;
    },

    getMonths() {
      const months = [
        { month: 1, days: 31 },
        { month: 2, days: 28 },
        { month: 3, days: 31 },
        { month: 4, days: 30 },
        { month: 5, days: 31 },
        { month: 6, days: 30 },
        { month: 7, days: 31 },
        { month: 8, days: 31 },
        { month: 9, days: 30 },
        { month: 10, days: 31 },
        { month: 11, days: 30 },
        { month: 12, days: 31 },
      ];
      this.months = months;
    },

    validateFormAdd() {
      console.log('validateFormAdd called');
      if (this.formAdd.name == '') {
        toast.info('Please Enter Employee Name', {
          autoClose: 1500,
        });
        return false;
      }

      if (this.formAdd.emp_id == '') {
        toast.info('Please Enter Employee Id', {
          autoClose: 1500,
        });
        return false;
      }

      if (this.formAdd.present == '') {
        toast.info('Please Enter Present', {
          autoClose: 1500,
        });
        return false;
      }

      return true;
    },

    validateForm() {
      console.log('validateFormAdd called');
      if (this.form.name == '') {
        toast.info('Please Enter Employee Name', {
          autoClose: 1500,
        });
        return false;
      }

      if (this.form.present == '') {
        toast.info('Please Enter Present', {
          autoClose: 1500,
        });
        return false;
      }

      return true;
    },
  },
};
</script>
