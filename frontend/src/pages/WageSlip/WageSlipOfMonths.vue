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

.slip-container {
  width: 1000px;
  height: 520px;
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
  <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <div class="hind-regular pt-2 h-100 scroll">
    <div class="border-bottom px-3">
      <h5 class="pt-2 hind-medium source-500">Wage Slip</h5>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div v-auto-animate class="container py-3">
          <div class="w-100 h-100 d-flex justify-content-center gap-3">
            <div>
              <VueDatePicker v-model="from" month-picker placeholder="Select From" />
            </div>
            <div>
              <div>
                <VueDatePicker v-model="to" month-picker placeholder="Select To" />
              </div>
            </div>

            <div>
              <button
                type="button"
                class="btn btn-primary border-0 button_bg"
                @click="handleGenerateSlip"
              >
                Generate
              </button>
            </div>
          </div>

          <div v-for="(attendance, i) in attendanceData" :key="i">
            <div class="my-3">
              <div
                v-if="showSlip"
                class="d-flex justify-content-center gap-2 py-2"
                :id="'slip' + i"
              >
                <div class="slip-container border border-dark overflow-hidden">
                  <div class="py-1 border-bottom border-dark text-center source-700 font18">
                    Wage Slip
                  </div>
                  <div class="py-1 border-bottom border-dark text-center source-700 font18">
                    Form IX (Rule 29 (2))
                  </div>
                  <div class="py-1 border-bottom border-dark text-center source-700 font18">
                    Name of the Establishment - {{ client.name }}
                  </div>
                  <div
                    class="py-1 border-bottom border-dark text-center source-700 font18"
                    style="font-size: 15px; font-weight: 400"
                  >
                    {{
                      (client.city ? client.city + ', ' : '') +
                      (client.address ? client.address + ', ' : '') +
                      (client.state ? client.state + ', ' : '') +
                      (client.country ? client.country + ', ' : '') +
                      (client.pin_code ? client.pin_code : '')
                    }}
                  </div>
                  <div class="border-bottom border-dark"></div>
                  <div class="border-bottom border-dark" style="padding: 0 11px">
                    <div class="row">
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        Name of Employee
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ employee.name }}
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        UAN No
                      </div>
                      <div class="col-3 d-flex align-items-center source-500">
                        {{ employee.uan_no ? employee.uan_no : '-' }}
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom border-dark" style="padding: 0 11px">
                    <div class="row">
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        Fathers/Husbands Name
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ employee.fatherHusband_name }}
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        PF No
                      </div>
                      <div class="col-3 d-flex align-items-center source-500 font12">
                        {{ employee.pf_no ? employee.pf_no : '-' }}
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom border-dark" style="padding: 0 11px">
                    <div class="row">
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        Designation
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ employee.designation ? employee.designation : '-' }}
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        ESIC No
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ employee.esic_no ? employee.esic_no : '-' }}
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom border-dark" style="padding: 0 11px">
                    <div class="row">
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        Wage Period
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ attendance.wagePeriod }}
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        Bank A/C No
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ employee.bank_ac_no }}
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom border-dark" style="padding: 0 11px">
                    <div class="row">
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        Days in Month
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ attendance.totalWorkingDays }}
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-700"
                      >
                        Total Attendance
                      </div>
                      <div
                        class="border-end border-dark col-3 d-flex align-items-center source-500"
                      >
                        {{ attendance.present }}
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom border-dark"></div>
                  <div class="" style="padding: 0 11px">
                    <div class="row">
                      <div class="col-5 border-end border-dark" style="padding: 0 11px">
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            PF Basic
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.pfBasic }}
                          </div>
                        </div>
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            Basic
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.payableBasic }}
                          </div>
                        </div>
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            D.A
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.payableDA }}
                          </div>
                        </div>
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            HRA
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.payableHra }}
                          </div>
                        </div>
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            Food Allow
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.payableFoodAllow }}
                          </div>
                        </div>
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            Conveyance
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.payableConveyance }}
                          </div>
                        </div>
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            Reimbursement
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.reimbursement }}
                          </div>
                        </div>
                        <div class="row border-bottom border-dark">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            Overtime Wages
                          </div>
                          <div class="col-5 d-flex align-items-center source-500">
                            {{ attendance.otEarnings }}
                          </div>
                        </div>
                        <div class="row">
                          <div
                            class="border-end border-dark col-7 d-flex align-items-center source-700"
                          >
                            Gross Wages
                          </div>
                          <div class="col-5 d-flex align-items-center source-700">
                            {{ attendance.grossSalary }}
                          </div>
                        </div>
                      </div>
                      <div class="col-7" style="padding: 0 11px">
                        <div class="row">
                          <div
                            class="border-end border-bottom border-dark col-6"
                            style="padding: 0 11px"
                          >
                            <div class="row">
                              <div class="border-bottom border-dark col-12 source-700 text-center">
                                Employee's Contribution
                              </div>

                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                EPF
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ attendance.pf }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                ESIC
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ attendance.esi }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                LWF
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ attendance.lwf }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                Advances
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ attendance.advances }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                Other Ded
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ attendance.tdsOther }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                Total Ded
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-700"
                              >
                                {{ attendance.totalDeduction }}
                              </div>
                              <div
                                class="border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                Net Wages
                              </div>
                              <div class="border-dark col-5 d-flex align-items-center source-700">
                                {{ attendance.netWages }}
                              </div>
                            </div>
                          </div>
                          <div class="col-6" style="padding: 0 11px">
                            <div class="row border-bottom border-dark">
                              <div class="border-bottom border-dark col-12 source-700 text-center">
                                Employer's Contribution
                              </div>

                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                E_EPF
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ attendance.e_pf }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                E_ESIC
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ attendance.e_esic }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                E_LWF
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-500"
                              >
                                {{ e_lfw }}
                              </div>
                              <div
                                class="border-bottom border-end border-dark col-7 d-flex align-items-center source-700"
                              >
                                Total
                              </div>
                              <div
                                class="border-bottom border-dark col-5 d-flex align-items-center source-700"
                              >
                                {{ attendance.e_pf + attendance.e_esic + e_lfw }}
                              </div>
                              <div class="col-12 source-700 text-center" style="height: 99px">
                                Employer's Signature
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="border-top border-dark text-center source-700">
                    This is a computer generated slip, seal & signature not required.
                  </div>
                </div>
              </div>
              <div class="mt-2 mb-1 px-5 d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-primary border-0 button_bg"
                  @click="handleDownloadWageSlip(i)"
                >
                  <i class="bi bi-download mx-1"></i>
                  {{ attendance.wagePeriod }}
                </button>
              </div>
            </div>
            <div
              v-if="i != attendanceData.length - 1"
              class="border-top border-secondary border-opacity-25 mb-3"
            ></div>
          </div>
          <div
            v-if="showSlip && attendanceData.length > 1"
            class="mt-4 mb-2 px-5 d-flex justify-content-center"
          >
            <button
              type="button"
              class="btn btn-dark btn-primary border-0 button_bg bg-gradient px-5"
              @click="handleDownloadAllWageSlips"
            >
              Download All
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ////////////////////////////////////////Modal////////////////////////////////////////////// -->
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { months } from '../../months';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosClient from '../../axiosClient';
import { pa } from 'element-plus/es/locales.mjs';
import { treeCellPrefix } from 'element-plus/es/components/table/src/config.mjs';

export default {
  name: 'WageSlip',
  components: {
    VueDatePicker,
  },

  props: {
    employeeId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      id: '',
      client: '',
      user: {},
      showSlip: false,
      months: [],
      month: '',
      year: '',
      attendance: {},
      attendanceData: '',
      employee: '',
      columns: [
        { title: 'Name', field: 'name', sortable: true },
        { title: 'Actions', field: 'actions', sortable: false, slot: 'actions' },
      ],
      from: {
        month: '0',
        year: new Date().getFullYear().toString(),
      },
      to: {
        month: '11',
        year: new Date().getFullYear().toString(),
      },
      form: {
        name: '',
        from: '',
        to: '',
      },
      newPassword: '',
      updateUser: {},
      showDeleteModal: false,
      e_lfw: 30,
      search: '',
      entries: 0,
      entriesPerPage: 5,
      entriesPerPageOptions: [5, 10, 15, 20],
      page: 1,
      items: [],
      originalItems: [],

      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Email', value: 'email' },
        { text: 'Department', value: 'department.name' },
        { text: 'Team', value: 'team.name' },
        { text: 'Role', value: 'roleType.name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },

  async created() {
    this.getCurrent();
    this.getMonths();
    console.log('months', months);

    try {
      const employee = await axiosClient.get(`/api/v1/employee/get/${this.employeeId}`);
      this.employee = employee.data.data;

      console.log('employee: ', this.employee);

      const client = await axiosClient.get(`/api/v1/client/get/${this.employee.client_user_id}`);
      this.client = client.data.data[0];
      console.log('client: ', this.client);
    } catch (err) {
      console.log('error: ', err);
    }

    //console.log(this.items);
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
    async handleGenerateSlip() {
      console.log('this.from: ', this.from, ' this.to: ', this.to);

      let temp = parseInt(this.to.month);
      if (temp >= 9) {
        this.form.to = this.to.year + '-' + (temp + 1) + '-' + months[temp].days;
      } else {
        this.form.to = this.to.year + '-' + '0' + (temp + 1) + '-' + months[temp].days;
      }
      console.log('form: ', this.form);
      temp = parseInt(this.from.month);

      if (temp >= 9) {
        this.form.from = this.from.year + '-' + (temp + 1) + '-' + '01';
      } else {
        this.form.from = this.from.year + '-' + '0' + (temp + 1) + '-' + '01';
      }

      console.log('form: ', this.form);

      if (this.validateForm() == false) {
        return;
      }

      try {
        this.showSlip = false;

        const response = await axiosClient.post(
          `/api/v1/attendance/get/from/to/${this.user._id}/${this.employee.email}`,
          this.form
        );

        console.log('response.data: ', response.data);
        const fromDate = this.form.from.slice(5, 7);
        const toDate = this.form.to.slice(5, 7);
        console.log('fromDate: ', fromDate, ' toDate: ', toDate);
        let totalDays = 0;
        let totalPresent = 0;
        for (let i = fromDate - 1; i < toDate; i++) {
          totalDays += this.months[i].days;
        }
        this.attendance.totalDays = totalDays;
        this.attendanceData = response.data;
        for (let i = 0; i < this.attendanceData.length; i++) {
          this.attendanceData[i].month_year = this.attendanceData[i].month_year.slice(0, 10);

          this.attendanceData[i].totalDays =
            months[parseInt(this.attendanceData[i].month_year.slice(5, 7)) - 1].days;
          const temp = parseInt(this.attendanceData[i].present);

          this.attendanceData[i].wagePeriod =
            months[parseInt(this.attendanceData[i].month_year.slice(5, 7)) - 1].short +
            '-' +
            this.attendanceData[i].month_year.slice(2, 4);
          totalPresent += temp;
        }

        //calculating salarys
        for (let i = 0; i < this.attendanceData.length; i++) {
          const gross = this.attendanceData[i].gross;
          const days = this.attendanceData[i].totalWorkingDays;
          const attendance = this.attendanceData[i].present;

          //const basic = Math.round((gross * 40) / 100);
          //const hra = Math.round((gross * 30) / 100);
          //const DA = Math.round((gross * 10) / 100);
          //const conveyance = Math.round((gross * 10) / 100);
          //const FoodAllow = Math.round((gross * 10) / 100);
          const basic = this.employee.basic;
          const hra = this.employee.hra;
          const DA = this.employee.da;
          const conveyance = this.employee.conveyance;
          const FoodAllow = this.employee.food_allow;

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
          if (this.employee.lwf == true) lwf = 10;
          const tdsOther = 0;
          const totalDeduction = esi + pf + lwf + tdsOther;

          const netWages = grossSalary - totalDeduction;

          this.attendanceData[i].minimum_basic = basic;
          this.attendanceData[i].minimum_hra = hra;
          this.attendanceData[i].minimum_DA = DA;
          this.attendanceData[i].minimum_conveyance = conveyance;
          this.attendanceData[i].minimum_FoodAllow = FoodAllow;
          this.attendanceData[i].minimum_gross = gross;
          this.attendanceData[i].pfBasic = pfBasic;
          this.attendanceData[i].pf = pf;
          this.attendanceData[i].e_pf = e_pf;
          this.attendanceData[i].e_esic = 0;
          this.attendanceData[i].daysInMonth = days;
          this.attendanceData[i].attendance = attendance;
          this.attendanceData[i].payableBasic = payableBasic;
          this.attendanceData[i].payableDA = payableDA;
          this.attendanceData[i].payableHra = payableHra;
          this.attendanceData[i].payableConveyance = payableConveyance;
          this.attendanceData[i].payableFoodAllow = payableFoodAllow;
          this.attendanceData[i].payableOtherAllowance = payableOtherAllowance;
          this.attendanceData[i].otEarnings = otEarnings;
          this.attendanceData[i].reimbursement = reimbursement;
          this.attendanceData[i].grossSalary = grossSalary;
          this.attendanceData[i].esi = esi;
          this.attendanceData[i].pf = pf;
          this.attendanceData[i].lwf = lwf;
          this.attendanceData[i].tdsOther = tdsOther;
          this.attendanceData[i].totalDeduction = totalDeduction;
          this.attendanceData[i].netWages = netWages;
          this.attendanceData[i].advances = 0;

          /*  tempItems.push({
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
        }); */
        }

        console.log('this.attendanceData: ', this.attendanceData);
        this.attendance.totalPresent = totalPresent;

        //creating wage period
        this.attendance.wagePeriod =
          this.months[fromDate - 1].short +
          '-' +
          this.form.from.slice(2, 4) +
          ' to ' +
          this.months[toDate - 1].short +
          '-' +
          this.form.to.slice(2, 4);
        console.log('totalDays: ', totalDays, ' totalPresent: ', totalPresent);
        console.log('response: ', this.attendanceData);
        this.showSlip = true;
      } catch (err) {
        console.log('error: ', err);
        toast.error('something went wrong', {
          autoClose: 1500,
        });
      }
    },

    async handleDownloadAllWageSlips() {
      for (let i = 0; i < this.attendanceData.length; i++) {
        const element = document.getElementById('slip' + i);
        const canvas = await html2canvas(element, {
          scale: 2, // Higher scale for better resolution
        });
        const imgData = canvas.toDataURL('image/png');

        // Get element's width and height in pixels
        const elementWidth = canvas.width;
        const elementHeight = canvas.height;

        // A4 paper size dimensions in mm (portrait)
        const a4Width = 210;
        const a4Height = 297;

        // Calculate the aspect ratio of the element
        const aspectRatio = elementWidth / elementHeight;

        // Calculate PDF width and height based on A4 dimensions and the element's aspect ratio
        let pdfWidth = a4Width;
        let pdfHeight = a4Width / aspectRatio;

        // If the calculated height is larger than A4, adjust to fit within A4
        if (pdfHeight > a4Height) {
          pdfHeight = a4Height;
          pdfWidth = a4Height * aspectRatio;
        }

        // Create a PDF with A4 format and portrait orientation
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4', // Standard A4 format
        });

        // Add the image to the PDF, centered within the A4 dimensions
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${this.employee.name}-${this.attendanceData[i].wagePeriod}.pdf`);
      }
    },

    async handleDownloadWageSlip(i) {
      const element = document.getElementById('slip' + i);
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better resolution
      });
      const imgData = canvas.toDataURL('image/png');

      const elementWidth = canvas.width;
      const elementHeight = canvas.height;

      const a4Width = 210;
      const a4Height = 297;

      const aspectRatio = elementWidth / elementHeight;

      let pdfWidth = a4Width;
      let pdfHeight = a4Width / aspectRatio;

      if (pdfHeight > a4Height) {
        pdfHeight = a4Height;
        pdfWidth = a4Height * aspectRatio;
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4', // Standard A4 format
      });

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${this.employee.name}-${this.attendanceData[i].wagePeriod}.pdf`);
    },

    getMonths() {
      const months = [
        { month: 1, name: 'January', short: 'Jan', days: 31 },
        { month: 2, name: 'February', short: 'Feb', days: 28 },
        { month: 3, name: 'March', short: 'Mar', days: 31 },
        { month: 4, name: 'April', short: 'Apr', days: 30 },
        { month: 5, name: 'May', short: 'May', days: 31 },
        { month: 6, name: 'June', short: 'Jun', days: 30 },
        { month: 7, name: 'July', short: 'Jul', days: 31 },
        { month: 8, name: 'August', short: 'Aug', days: 31 },
        { month: 9, name: 'September', short: 'Sep', days: 30 },
        { month: 10, name: 'October', short: 'Oct', days: 31 },
        { month: 11, name: 'November', short: 'Nov', days: 30 },
        { month: 12, name: 'December', short: 'Dec', days: 31 },
      ];
      this.months = months;
    },

    validateForm() {
      if (this.form.from == '') {
        toast.info('Please select from date');
        return false;
      }

      if (this.form.from == '') {
        toast.info('Please select from date');
        return false;
      }

      if (this.form.to == '') {
        toast.info('Please select to date');
        return false;
      }

      return true;
    },

    async getCurrent() {
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);
        console.log('Token : ', token);
        this.user = token.data.user;
        this.id = this.user._id;
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
