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
        <h5 class="source-500 page-title">Upload Excel</h5>
      </div>
      <div class=""></div>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3 h-100">
          <div class="w-100 h-100 d-flex justify-content-center gap-3">
            <span style="font-size: 14px; margin-top: 7px">
              <a href="https://technirmitisoftwares.com/employeeAttendanceFormat.xlsx">
                Upload Format
              </a>
            </span>
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
            <div class="">
              <input
                v-model="form.totalWorkingDays"
                type="text"
                class="form-control border"
                id="state"
                placeholder="No. Of Total Working Days"
              />
            </div>
            <!-- <div class="">
              <input
                v-model="form.remark"
                type="text"
                class="form-control border"
                id="state"
                placeholder="Add Remark"
              />
            </div> -->
            <div>
              <VueDatePicker v-model="month_year" month-picker />
              <!-- <input type="date" class="form-control form-control-sm" v-model="form.month_year" /> -->
            </div>

            <div>
              <button type="button" class="btn btn-primary border-0 button_bg" @click="uploadFile">
                Upload
              </button>
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
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosClient from '../../axiosClient';
import { months } from '../../months';

export default {
  name: 'UploadXl',
  components: {
    EasyDataTable,
    VueDatePicker,
  },

  data() {
    return {
      id: '',
      user: {},
      role: '',

      month_year: {
        month: new Date().getMonth() - 1,
        year: new Date().getFullYear(),
      },
      excelData: [],
      form: {
        employeeData: [],
        client_user_id: '',
        month: '',

        month_year: '',
        totalWorkingDays: '',
        month: '',
        year: '',
        remark: '',
      },
      file: null,
    };
  },

  async created() {
    await this.getCurrent();

    try {
      const res = await axiosClient.get(
        `/api/v1/employee/client/${this.user._id}`
      );
      console.log('res.data.data: ', res.data.data);
      this.originalItems = res.data.data;
      const notifications = await axiosClient.get(`/api/v1/notification/getall/${this.user._id}`);
      this.notifications = notifications.data.data;
      console.log(' this.notifications: ', this.notifications);
    } catch (err) {
      console.log('error: ', err);
    }

    this.items = this.originalItems;
    this.retrieveLeavesBalance();
    console.log('Employees: ', this.items);
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
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
        async uploadFile() {
      if (!this.file) {
        console.log("No file selected");
        toast.info("Select File", { autoClose: 1500 });
        return;
      }

      // Prepare additional form details (month_year, month, year)
      console.log("this.month_year: ", this.month_year);
      const temp = parseInt(this.month_year.month);
      if (temp >= 9) {
        this.form.month_year = this.month_year.year + "-" + (temp + 1) + "-01";
      } else {
        this.form.month_year = this.month_year.year + "-0" + (temp + 1) + "-01";
      }
      console.log("this.month_year1: ", this.month_year);
      this.form.month = months[temp].name;
      this.form.year = this.month_year.year;
      console.log("Form data:", this.form);

      const reader = new FileReader();
      reader.onload = async (event) => {
        // Read and parse Excel data
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log("Excel Data:", jsonData);

        // Map Excel data to extract leave records using employee code as key
        const leaveRecords = jsonData.map((row) => ({
          emp_code:
            row["emp_code"] ||
            row["Emp Code"] ||
            row["Employee Code"] ||
            "",
          noofCL: Number(row["numberOfCL"] || 0),
          noofSL: Number(row["numberOfSL"] || 0),
          noofPL: Number(row["numberOfPL"] || 0),

          absentDaysCL: row["absentDaysCL"] || "",
          absentDaysSL: row["absentDaysSL"] || "",
          absentDaysPL: row["absentDaysPL"] || ""
        }));
        console.log("Leave Records from Excel:", leaveRecords);

        // Save the raw Excel data and assign employeeData
        this.excelData = jsonData;
        this.form.employeeData = jsonData;

        // First, upload the attendance sheet data if available
        if (this.form.employeeData.length > 0) {
          console.log("Uploading attendance data...");
          try {
            const res = await axiosClient.post(
              `/api/v1/attendance/add/${this.user._id}`,
              this.form
            );
            //toast.success("Attendance Data Added", { autoClose: 1500 });
            console.log("Attendance res.data: ", res.data);
          } catch (err) {
            console.log("Error uploading attendance data: ", err);
            toast.error("Something Went Wrong with Attendance Upload", { autoClose: 1500 });
          }
        }

        console.log("this.leavesBalanceData", this.leavesBalanceData);
        // For each employee in your stored leavesBalanceData, find the matching record from the Excel data
        const updatedLeaveData = this.leavesBalanceData.map((employee) => {
          const empCode = employee.emp_no;
          // Convert both to strings to ensure a proper match
          const record = leaveRecords.find((r) => String(r.emp_code) === String(empCode));
          if (record) {
            // Parse current leave values (stored as strings in an array) to numbers
            const currentCL = parseInt(employee.leaves.cl.balance) || 0;
            const currentSL = parseInt(employee.leaves.sl.balance) || 0;
            const currentPL = parseInt(employee.leaves.pl.balance) || 0;
            // Subtract the leaves taken (allow negative values)
            const updatedCL = currentCL - record.noofCL;
            const updatedSL = currentSL - record.noofSL;
            const updatedPL = currentPL - record.noofPL;

            // Parse new absent days from the Excel record
            const newAbsentDaysCL = this.parseAbsentDays(record.absentDaysCL);
            const newAbsentDaysSL = this.parseAbsentDays(record.absentDaysSL);
            const newAbsentDaysPL = this.parseAbsentDays(record.absentDaysPL);
            
            // Retrieve existing absent dates from the employee data (or default to empty arrays)
            const existingAbsentDaysCL = employee.leaves.cl.absentDates || [];
            const existingAbsentDaysSL = employee.leaves.sl.absentDates || [];
            const existingAbsentDaysPL = employee.leaves.pl.absentDates || [];
            
            // Append (merge) new absent dates with the existing ones
            const combinedAbsentDaysCL = [...existingAbsentDaysCL, ...newAbsentDaysCL];
            const combinedAbsentDaysSL = [...existingAbsentDaysSL, ...newAbsentDaysSL];
            const combinedAbsentDaysPL = [...existingAbsentDaysPL, ...newAbsentDaysPL];
            
            return {
              emp_code: empCode,
              name: employee.name,
              updatedLeaves: {
                cl: {
                  balance: String(updatedCL),
                  absentDates: combinedAbsentDaysCL,
                },
                sl: {
                  balance: String(updatedSL),
                  absentDates: combinedAbsentDaysSL,
                },
                pl: {
                  balance: String(updatedPL),
                  absentDates: combinedAbsentDaysPL,
                },
              },
            };
          } else {
            // If no matching record, leave the employee's leave data unchanged
            return {
              emp_code: empCode,
              name: employee.name,
              updatedLeaves: {
                cl: { balance: employee.leaves.cl.balance, absentDates: employee.leaves.cl.absentDates || [] },
                sl: { balance: employee.leaves.sl.balance, absentDates: employee.leaves.sl.absentDates || [] },
                pl: { balance: employee.leaves.pl.balance, absentDates: employee.leaves.pl.absentDates || [] },
              },
            };
          }
        });

        console.log("Updated Leave Data:", updatedLeaveData);

        // Submit the updated leave data to your backend
        await this.submitLeaveDays(updatedLeaveData);

        const date = Date();
        console.log("date: ", Date());

        // Redirect after both operations complete
        setTimeout(() => {
          this.$router.push("/manage/attendance");
        }, 2000);
      };

      // Begin reading the file as an ArrayBuffer (triggers the onload callback)
      reader.readAsArrayBuffer(this.file);
    },

    handleEmployeeUpdate(id) {
      this.$router.push(`/update/employee/${id}`);
    },

    handleViewEmployee(id) {
      this.$router.push(`/view/employee/${id}`);
    },

    async retrieveLeavesBalance() {
        try {
          const res = await axiosClient.get(`/api/v1/employee/client/${this.user._id}`);
          console.log('Leaves Balance Data: ', res.data);
          this.leavesBalanceData = res.data.data;

        } catch (err) {
          console.log('Error retrieving leaves balance:', err);
          toast.error('Error retrieving leaves balance');
        }
    },

    async submitLeaveDays(updatedLeaveData) {
      try {
        for (const emp of updatedLeaveData) {
          const employee = this.leavesBalanceData.find(
            (e) => String(e.emp_no) === String(emp.emp_code)
          );
          if (employee) {
            const payload = {
              leaves: {
                cl: emp.updatedLeaves.cl,
                sl: emp.updatedLeaves.sl,
                pl: emp.updatedLeaves.pl,
              },
            };
            console.log(`Updating leaves for employee ${emp.emp_code}:`, payload);
            const res = await axiosClient.put(
              `/api/v1/employee/updateempwithcode/${emp.emp_code}`,
              payload
            );
            console.log("Update response for employee", emp.emp_code, ":", res.data);
          } else {
            console.warn("Employee not found for emp_code:", emp.emp_code);
          }
        }
      toast.success("Leave Days Updated Successfully!", { autoClose: 1000 });
      } catch (err) {
        console.error("Error submitting leave days:", err);
        toast.error("Internal Error!", { autoClose: 1000 });
      }
    },
    
    parseAbsentDays(value) {
      // Use the month and year from your month_year picker.
      // Note: the picker returns a zero-indexed month? In your code you use temp + 1.
      const year = this.month_year.year;
      const month = parseInt(this.month_year.month) + 1; 
      if (value == null) return [];
      let valueStr = String(value).trim();
      if (!valueStr) return [];
      // Split the cell value on comma, if provided.
      const days = valueStr.split(",").map(v => v.trim()).filter(v => v !== "");
      const formattedDates = days.map(dayStr => {
        let dayNumber;
        // If the value appears to be a full date, ignore its month/year parts and extract only the day.
        if(dayStr.includes("-")){
          const parts = dayStr.split("-");
          dayNumber = parts[2]; // assuming YYYY-MM-DD format
        } else if(dayStr.includes("/")){
          const parts = dayStr.split("/");
          // Assuming the day is the first part in DD/MM/YYYY format.
          dayNumber = parts[0];
        } else {
          // Otherwise, assume it's just a day number.
          dayNumber = dayStr;
        }
        dayNumber = parseInt(dayNumber);
        if (isNaN(dayNumber)) return ""; // skip if invalid
        // Ensure two-digit day string
        dayNumber = dayNumber < 10 ? "0" + dayNumber : String(dayNumber);
        // Ensure month is two-digit
        let monthStr = String(month);
        if (monthStr.length === 1) {
          monthStr = "0" + monthStr;
        }
        return `${year}-${monthStr}-${dayNumber}`;
      });
      return formattedDates.filter(d => d !== "");
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
  },
};
</script>
