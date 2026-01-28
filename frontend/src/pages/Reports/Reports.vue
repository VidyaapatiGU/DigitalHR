<template>
  <div class="reports-bg container-fluid mt-4" style="max-height: 90vh; overflow-y: auto; padding-right: 15px;">
    <h1 class="reports-title mb-4">Download Reports</h1>

    <!-- PDF Downloads Section -->
    <div class="reports-section mb-5">
      <h3 class="reports-section-title mb-3">📄 PDF Downloads</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="reports-card card">
            <div class="card-body">
              <h5 class="card-title">Standard Forms</h5>
              <div class="input-group mb-2">
                <select class="form-select" v-model="selectedPdfReport">
                  <option :value="null" disabled>-- Select a PDF --</option>
                  <option v-for="report in pdfReportsList" :key="report.file" :value="report.file">
                    {{ report.name }}
                  </option>
                </select>
                <a
                  :href="pdfDownloadUrl"
                  :class="['btn', 'btn-primary', { disabled: !selectedPdfReport }]"
                  download
                >
                  <i class="bi bi-download me-2"></i>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings Downloads Section -->
    <div class="reports-section mb-5">
      <h3 class="reports-section-title mb-3">⚙️ Settings & Notices</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="reports-card card mb-3">
            <div class="card-body">
              <h5 class="card-title">Notices</h5>
              <button class="btn btn-outline-primary btn-sm mb-2 w-100 reports-btn" @click="downloadCloseNotice" title="Download Notice of Close Day">
                <i class="bi bi-download me-2"></i>Notice of Close Day
              </button>
              <button class="btn btn-outline-primary btn-sm mb-2 w-100 reports-btn" @click="downloadNoticeOfHours" title="Download Notice of Hours">
                <i class="bi bi-download me-2"></i>Notice of Hours
              </button>
              <button class="btn btn-outline-primary btn-sm w-100 reports-btn" @click="downloadMonthlySalaryNotice" title="Download Monthly Salary Notice">
                <i class="bi bi-download me-2"></i>Monthly Salary Notice
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="reports-card card mb-3">
            <div class="card-body">
              <h5 class="card-title">Forms & Policy Documents</h5>
              <button class="btn btn-outline-primary btn-sm mb-2 w-100 reports-btn" @click="downloadSalaryInspectorForm" title="Download Area Labour Inspector Form">
                <i class="bi bi-download me-2"></i>Area Labour Inspector Form
              </button>
              <button class="btn btn-outline-primary btn-sm mb-2 w-100 reports-btn" @click="downloadMinimumWagesForm" title="Download Minimum Wages Form">
                <i class="bi bi-download me-2"></i>Minimum Wages Form
              </button>
              <button class="btn btn-outline-primary btn-sm w-100 reports-btn" @click="downloadHolidaysListWord" title="Download Holidays List">
                <i class="bi bi-download me-2"></i>Holidays List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Excel & Data Downloads Section -->
    <div class="reports-section mb-5">
      <h3 class="reports-section-title mb-3">📊 Excel & Data Downloads</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="reports-card card mb-3">
            <div class="card-body">
              <h5 class="card-title">Attendance Reports</h5>
              <button class="btn btn-outline-success btn-sm w-100 reports-btn" @click="downloadLeavesBalance" title="Download Leaves Balance">
                <i class="bi bi-download me-2"></i>Leaves Balance (CSV)
              </button>
              <!-- ESIC Month/Year Selection and Download -->
              <div class="row mb-2 mt-3">
                <div class="col-12">
                  <button class="btn btn-outline-danger btn-sm w-100 mt-2 reports-btn" @click="showEsicModal = true; fetchAttendancePeriods();" title="Download ESIC Challan Report">
                    <i class="bi bi-download me-2"></i>ESIC Challan (Excel)
                  </button>
                  <!-- ESIC Modal -->
                  <div v-if="showEsicModal" class="modal fade show" tabindex="-1" style="display:block; background:rgba(0,0,0,0.4);">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">Select Month/Year for ESIC Report</h5>
                          <button type="button" class="btn-close" @click="showEsicModal = false"></button>
                        </div>
                        <div class="modal-body">
                          <select class="form-select form-select-sm mb-3" v-model="esicPeriod">
                            <option v-if="!esicOptions.length" :value="null" disabled>No available periods</option>
                            <option v-for="opt in esicOptions" :key="opt.label" :value="opt">{{ opt.label }}</option>
                          </select>
                        </div>
                        <div class="modal-footer">
                          <button class="btn btn-secondary btn-sm" @click="showEsicModal = false">Cancel</button>
                          <button class="btn btn-danger btn-sm" :disabled="!esicPeriod" @click="showEsicModal = false; downloadEsicChallanReport();">Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="reports-card card mb-3">
            <div class="card-body">
              <h5 class="card-title">Employee & Holiday Data</h5>
              <button class="btn btn-outline-success btn-sm mb-2 w-100 reports-btn" @click="downloadEmployeesList" title="Download Employees List">
                <i class="bi bi-download me-2"></i>Employees List (Excel)
              </button>
              <button class="btn btn-outline-success btn-sm w-100 reports-btn" @click="downloadWeeklyHolidayExcel" title="Download Weekly Holiday Notice">
                <i class="bi bi-download me-2"></i>Weekly Holiday Notice (Excel)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import axiosClient from '../../axiosClient';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { jsPDF } from 'jspdf';

export default {
  name: 'Reports',
  data() {
    return {
      selectedPdfReport: null,
      user: {},
      
      // PDF Reports list
      pdfReportsList: [
        { file: 'FORM V_Abstract_MW.pdf', name: 'FORM V - Abstract of MW' },
        { file: 'FORM-V-Abstract-Under-The-Payment-Of-Wages-Act-1936-English-Version.pdf', name: 'FORM V - Payment of Wages Act 1936' },
      ],
      esicMonth: new Date().getMonth() + 1, // <-- number, not string (kept for fallback)
      esicYear: new Date().getFullYear().toString(),
      availableAttendancePeriods: [],
      showAttendancePeriods: false,

      // New: structured ESIC period options and selected period
      esicOptions: [], // { label: '04-2024', month: 4, year: 2024, monthName: 'April', padded: '04' }
      esicPeriod: null, // selected option object

      // Modal state
      showEsicModal: false,
    };
  },
  computed: {
    pdfDownloadUrl() {
      if (!this.selectedPdfReport) {
        return null;
      }
      return `/reports/${this.selectedPdfReport}`;
    },
    esicYearOptions() {
      const current = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) => (current - i).toString());
    },
  },
  async created() {
    await this.getCurrent();
    await this.fetchAttendancePeriods(); // populate ESIC options on load
  },
    methods: {
      async getCurrent() {
        try {
          const token = await axiosClient.get(`api/v1/user/getCurrent/`);
          this.user = token.data.user;
        } catch (err) {
          console.log('error: ', err);
        }
      },

      // Settings Downloads
      async downloadCloseNotice() { /* ...existing code... */ },
      // ...other methods...

      async downloadEsicChallanReport() {
        try {
          const empRes = await axiosClient.get(`/api/v1/employee/client/${this.user._id}`);
          const employees = empRes.data.data || [];
          if (!employees.length) {
            toast.error('No employees found for ESIC report!', { autoClose: 2000 });
            return;
          }

          // use selected esicPeriod when available, else fallback to current selection
          const year = this.esicPeriod?.year ? Number(this.esicPeriod.year) : Number(this.esicYear);
          const month = this.esicPeriod?.month ? Number(this.esicPeriod.month) : Number(this.esicMonth);

          // map numeric month -> month name (if backend stores names) and padded form
          const monthNames = [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
          ];
          const monthName = this.esicPeriod?.monthName || monthNames[month - 1];
          const paddedMonth = this.esicPeriod?.padded || String(month).padStart(2, '0');

          // Fetch attendance — try sensible formats (number, padded, name)
          let attRes;
          try {
            attRes = await axiosClient.get(`/api/v1/attendance/client/${this.user._id}?year=${year}&month=${month}`);
            if (!attRes.data.data?.length) {
              attRes = await axiosClient.get(`/api/v1/attendance/client/${this.user._id}?year=${year}&month=${paddedMonth}`);
            }
            if (!attRes.data.data?.length) {
              attRes = await axiosClient.get(`/api/v1/attendance/client/${this.user._id}?year=${year}&month=${monthName}`);
            }
          } catch (err) {
            console.error('Attendance API error:', err);
            if (err.response && err.response.status === 404) {
              toast.error('Attendance API not found (404). Please check backend!', { autoClose: 4000 });
            } else {
              toast.error('Attendance data not available for ESIC report!', { autoClose: 2000 });
            }
            return;
          }

          const attendanceRecords = attRes.data.data || [];
          console.log('Attendance API returned', attendanceRecords.length, 'records');

          if (!attendanceRecords.length) {
            await this.fetchAttendancePeriods();
            toast.error('No attendance records found for selected month/year. See available periods above.', { autoClose: 5000 });
            return;
          }

          // Build present days map: support several attendance shapes
          const presentDaysMap = {};
          attendanceRecords.forEach(rec => {
            const empNo = rec.emp_no || rec.emp_no?.toString() || rec.empCode || rec.empCode?.toString();
            if (!empNo) return;

            // Prefer numeric present field; fallback to summing inner arrays if present
            let presentCount = 0;
            if (typeof rec.present === 'number') presentCount = rec.present;
            else if (typeof rec.present === 'string' && rec.present.match(/^\d+$/)) presentCount = Number(rec.present);
            else if (Array.isArray(rec.AttendanceData)) {
              // sum 'present' flags / days inside AttendanceData
              presentCount = rec.AttendanceData.reduce((s, it) => {
                if (typeof it.present === 'number') return s + it.present;
                if (typeof it.present === 'string' && it.present.match(/^\d+$/)) return s + Number(it.present);
                return s;
              }, 0);
            } else if (rec.days || rec.presentDays) {
              presentCount = Number(rec.days || rec.presentDays || 0);
            }

            presentDaysMap[empNo] = (presentDaysMap[empNo] || 0) + (presentCount || 0);
          });

          // Helper to format last working day as DD/MM/YYYY (accept Date or string)
          const formatDate = (d) => {
            if (!d) return '';
            const dt = (d instanceof Date) ? d : new Date(d);
            if (isNaN(dt)) return String(d);
            const dd = String(dt.getDate()).padStart(2, '0');
            const mm = String(dt.getMonth() + 1).padStart(2, '0');
            const yyyy = dt.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
          };

          // Prepare workbook with ESIC required columns and order
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('ESIC Challan');

          worksheet.columns = [
            { header: 'IP Number (10 Digits)', key: 'ip_number', width: 18 },
            { header: 'IP Name', key: 'ip_name', width: 30 },
            { header: 'No of Days for which wages paid/payable during the month', key: 'present_days', width: 18 },
            { header: 'Total Monthly Wages', key: 'total_monthly_wages', width: 18 },
            { header: 'Reason Code for Zero workings days (numeric only; provide 0 for all other reasons)', key: 'reason_code', width: 18 },
            { header: 'Last Working Day (Format DD/MM/YYYY or DD-MM-YYYY)', key: 'last_working_day', width: 18 },
          ];

          // Fill rows using employees list; use ESIC number and wages from employee record
          employees.forEach(emp => {
            const empCode = emp.emp_no || emp.empCode || '';
            const ipNumber = emp.esic_no || emp.ip_number || emp.ipNumber || '';
            const name = emp.name || '';
            const present = presentDaysMap[empCode] ?? presentDaysMap[String(empCode)] ?? 0;
            // Prefer gross fields (allow 0). Fallback to monthly_wages or salary.
            const totalWages = (emp.gross ?? emp.gross_amount ?? emp.gross_salary ?? emp.monthly_wages ?? emp.salary ?? '');
            const reason = (totalWages === 0 || totalWages === '0') ? (emp.reason_code ?? '') : '';
            const lastWorking = (emp.last_working_day || emp.lastWorkingDay || emp.last_working_date) ? formatDate(emp.last_working_day || emp.lastWorkingDay || emp.last_working_date) : '';

            worksheet.addRow({
              ip_number: ipNumber,
              ip_name: name,
              present_days: present,
              total_monthly_wages: totalWages,
              reason_code: reason,
              last_working_day: lastWorking
            });
          });

          // Add simple styling: header bold
          worksheet.getRow(1).font = { bold: true };

          const buffer = await workbook.xlsx.writeBuffer();
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const filename = `ESIC_CHALLAN_${paddedMonth}_${year}.xlsx`;
          saveAs(blob, filename);
          toast.success('ESIC Challan downloaded successfully!', { autoClose: 1000 });
        } catch (err) {
          console.error('Download ESIC Challan error:', err);
          toast.error('Failed to download ESIC Challan!', { autoClose: 1000 });
        }
      },

    async downloadNoticeOfHours() {
      try {
        const res = await axiosClient.get(`/api/v1/settings/holiday/to_from/${this.user._id}`);
        const settings = res.data.data[0] || {};
        
        const shopName = this.user.name || '';
        const shopAddress = `${this.user.address || ''}, ${this.user.city || ''}`;
        const workingHours = settings.workingHours || '09:00 AM - 06:00 PM';

        const content = `
          <html>
            <head>
              <style>
                /* Professional Report Window Styles */
                .reports-bg {
                  background: linear-gradient(135deg, #f4f6fa 0%, #e9ecef 100%);
                  border-radius: 18px;
                  box-shadow: 0 4px 24px rgba(79,140,255,0.08);
                  padding: 2rem 2.5rem;
                }
                .reports-title {
                  font-size: 2.2rem;
                  font-weight: 700;
                  color: #22223b;
                  letter-spacing: 1px;
                  text-shadow: 0 2px 8px rgba(79,140,255,0.08);
                }
                .reports-section {
                  background: #fff;
                  border-radius: 14px;
                  box-shadow: 0 2px 12px rgba(79,140,255,0.06);
                  padding: 1.5rem 1.5rem 1rem 1.5rem;
                }
                .reports-section-title {
                  font-size: 1.3rem;
                  font-weight: 600;
                  color: #0c1526;
                  margin-bottom: 1rem;
                }
                .reports-card {
                  border-radius: 12px !important;
                  box-shadow: 0 2px 8px rgba(79,140,255,0.10);
                  border: none !important;
                }
                .reports-btn {
                  font-size: 1rem;
                  font-weight: 500;
                  border-radius: 8px;
                  transition: box-shadow 0.2s, background 0.2s;
                }
                .reports-btn:hover {
                  box-shadow: 0 4px 16px rgba(79,140,255,0.12);
                  background: #e9ecef;
                }
                .card-title {
                  font-size: 1.1rem;
                  font-weight: 600;
                  color: #22223b;
                }
                .input-group .form-select {
                  border-radius: 8px 0 0 8px;
                }
                .input-group .btn {
                  border-radius: 0 8px 8px 0;
                }
                @media (max-width: 768px) {
                  .reports-bg {
                    padding: 1rem 0.5rem;
                  }
                  .reports-section {
                    padding: 1rem 0.5rem 0.5rem 0.5rem;
                  }
                }
                body { font-family: Arial, sans-serif; padding: 50px; }
                .title { font-size: 28px; font-weight: bold; text-align: center; margin-bottom: 20px; }
              </style>
            </head>
            <body>
              <div class="title">NOTICE OF HOURS OF WORK</div>
              
              <div style="margin: 30px 0;">
                <p><strong>Establishment:</strong> ${shopName}</p>
                <p><strong>Address:</strong> ${shopAddress}</p>
                <p><strong>Working Hours:</strong> ${workingHours}</p>
              </div>
              
              <div style="margin-top: 80px;">
                <p>_____________________________</p>
                <p>Signature of employer</p>
              </div>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.download = 'Notice_of_Hours.doc';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        toast.success('Notice of Hours downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download Notice of Hours!', { autoClose: 1000 });
      }
    },

    async downloadMonthlySalaryNotice() {
      try {
        const res = await axiosClient.get(`/api/v1/settings/holiday/to_from/${this.user._id}`);
        const settings = res.data.data[0] || {};
        const monthlySalaryDate = settings.monthlySalaryDate || 1;

        const getOrdinalSuffix = (day) => {
          if (day > 3 && day < 21) return 'th';
          switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        };

        const dateText = `ON OR BEFORE ${monthlySalaryDate}${getOrdinalSuffix(monthlySalaryDate)} OF EVERY MONTH`;
        const companyName = this.user.name || '';

        const content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .title { font-size: 48px; font-weight: bold; text-decoration: underline; margin-bottom: 80px; }
                .content { font-size: 24px; margin: 100px 0; }
              </style>
            </head>
            <body>
              <div class="title">NOTICE</div>
              <div class="content">DATE OF PAYMENT: ${dateText}</div>
              <div style="position: absolute; bottom: 40px; right: 40px; text-align: right;">
                <div><strong>M/s. ${companyName}</strong></div>
              </div>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Monthly_Salary_Notice.doc`;
        link.click();
        
        toast.success('Monthly Salary Notice downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download Monthly Salary Notice!', { autoClose: 1000 });
      }
    },

    async downloadSalaryInspectorForm() {
      try {
        const res = await axiosClient.get(`/api/v1/settings/holiday/to_from/${this.user._id}`);
        const settings = res.data.data[0] || {};
        
        const inspectorName = settings.salaryInspectorName || 'Inspector Name';
        const companyName = this.user.name || '';
        const companyAddress = `${this.user.address || ''}, ${this.user.city || ''} - ${this.user.pin_code || ''}`;

        const content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; padding: 50px; }
                .title { font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 50px auto; }
                th, td { border: 2px solid black; padding: 15px; text-align: center; }
              </style>
            </head>
            <body>
              <div class="title">FORM VI - Area Labour Inspector Details</div>
              
              <table>
                <tr>
                  <th>Inspector Name</th>
                  <th>Establishment Address</th>
                </tr>
                <tr>
                  <td>${inspectorName}</td>
                  <td><strong>${companyName}</strong><br>${companyAddress}</td>
                </tr>
              </table>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Area_Labour_Inspector_Form.doc`;
        link.click();
        
        toast.success('Area Labour Inspector Form downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download form!', { autoClose: 1000 });
      }
    },

    async downloadMinimumWagesForm() {
      try {
        const res = await axiosClient.get(`/api/v1/settings/holiday/to_from/${this.user._id}`);
        const settings = res.data.data[0] || {};
        const minimumWages = settings.minimumWages || {
          unskilled: { basic: 0, vda: 0, total: 0 },
          semiSkilled: { basic: 0, vda: 0, total: 0 },
          skilled: { basic: 0, vda: 0, total: 0 },
          highlySkilled: { basic: 0, vda: 0, total: 0 },
        };

        const content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px auto; }
                th, td { border: 2px solid black; padding: 12px; text-align: center; }
                th { background-color: #f0f0f0; }
              </style>
            </head>
            <body>
              <div class="title">Form IV - Minimum Rates of Wages</div>
              
              <table>
                <tr>
                  <th>Category</th>
                  <th>BASIC</th>
                  <th>VDA</th>
                  <th>TOTAL</th>
                </tr>
                <tr>
                  <td>UNSKILLED</td>
                  <td>${minimumWages.unskilled.basic}</td>
                  <td>${minimumWages.unskilled.vda}</td>
                  <td>${minimumWages.unskilled.total}</td>
                </tr>
                <tr>
                  <td>SEMI-SKILLED</td>
                  <td>${minimumWages.semiSkilled.basic}</td>
                  <td>${minimumWages.semiSkilled.vda}</td>
                  <td>${minimumWages.semiSkilled.total}</td>
                </tr>
                <tr>
                  <td>SKILLED/CLERICAL</td>
                  <td>${minimumWages.skilled.basic}</td>
                  <td>${minimumWages.skilled.vda}</td>
                  <td>${minimumWages.skilled.total}</td>
                </tr>
                <tr>
                  <td>HIGHLY SKILLED</td>
                  <td>${minimumWages.highlySkilled.basic}</td>
                  <td>${minimumWages.highlySkilled.vda}</td>
                  <td>${minimumWages.highlySkilled.total}</td>
                </tr>
              </table>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Minimum_Wages_Form.doc`;
        link.click();
        
        toast.success('Minimum Wages Form downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download form!', { autoClose: 1000 });
      }
    },

    async downloadHolidaysListWord() {
      try {
        const res = await axiosClient.get(`/api/v1/holiday/getall/client/${this.user._id}`);
        const holidays = res.data.data || [];
        
        let holidayRows = '';
        holidays.forEach((holiday, index) => {
          const date = new Date(holiday.date).toLocaleDateString('en-GB');
          holidayRows += `
            <tr>
              <td>${index + 1}</td>
              <td>${holiday.name}</td>
              <td>${date}</td>
            </tr>
          `;
        });

        const currentYear = new Date().getFullYear();
        const content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .title { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin: 20px auto; }
                th, td { border: 1px solid black; padding: 10px; text-align: center; }
                th { background-color: #f0f0f0; font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="title">Holidays List - ${currentYear}</div>
              
              <table>
                <tr>
                  <th>Sl. No.</th>
                  <th>Holiday Name</th>
                  <th>Date</th>
                </tr>
                ${holidayRows}
              </table>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Holidays_List_${currentYear}.doc`;
        link.click();
        
        toast.success('Holidays List downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download holidays list!', { autoClose: 1000 });
      }
    },

    async downloadWeeklyHolidayExcel() {
      try {
        const res = await axiosClient.get(`/api/v1/settings/holiday/to_from/${this.user._id}`);
        const settings = res.data.data[0] || {};
        const assignments = settings.employeeHolidayAssignments || [];

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Weekly Holiday Notice');
        
        worksheet.columns = [
          { header: 'Sl. No.', key: 'slno', width: 10 },
          { header: 'Employee Name', key: 'name', width: 30 },
          { header: 'Holiday Day', key: 'day', width: 15 },
          { header: 'Remarks', key: 'remarks', width: 30 },
        ];

        assignments.forEach((assign, index) => {
          worksheet.addRow({
            slno: index + 1,
            name: assign.employeeName,
            day: assign.holidayDay,
            remarks: assign.remarks || '',
          });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Weekly_Holiday_Notice.xlsx');
        
        toast.success('Weekly Holiday Notice downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download Weekly Holiday Notice!', { autoClose: 1000 });
      }
    },

    // Attendance & Employee Data Downloads
    async downloadAttendanceSheet() {
      try {
        toast.info('Please navigate to Attendance section to download attendance sheet', { autoClose: 2000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to process request!', { autoClose: 1000 });
      }
    },

    async downloadSalarySheet() {
      try {
        toast.info('Please navigate to Attendance section to download salary sheet', { autoClose: 2000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to process request!', { autoClose: 1000 });
      }
    },

    async downloadLeavesBalance() {
      try {
        const res = await axiosClient.get(`/api/v1/employee/client/${this.user._id}`);
        const leavesData = res.data.data || [];
        
        let csv = "Emp Code,Name,CL,SL,PL\n";
        leavesData.forEach(emp => {
          const empCode = emp.emp_no || '';
          const name = emp.name || '';
          const cl = emp.leaves?.cl?.balance || '';
          const sl = emp.leaves?.sl?.balance || '';
          const pl = emp.leaves?.pl?.balance || '';
          csv += `"${empCode}","${name}","${cl}","${sl}","${pl}"\n`;
        });

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "Leaves_Balance.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success('Leaves Balance downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download leaves balance!', { autoClose: 1000 });
      }
    },

    async downloadEmployeesList() {
      try {
        const res = await axiosClient.get(`/api/v1/employee/client/${this.user._id}`);
        const employees = res.data.data || [];

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employees');
        
        worksheet.columns = [
          { header: 'Employee Code', key: 'emp_no', width: 15 },
          { header: 'Name', key: 'name', width: 25 },
          { header: 'Designation', key: 'designation', width: 20 },
          { header: 'Department', key: 'department', width: 20 },
          { header: 'Email', key: 'email', width: 25 },
          { header: 'Phone', key: 'phone', width: 15 },
        ];

        employees.forEach(emp => {
          worksheet.addRow({
            emp_no: emp.emp_no,
            name: emp.name,
            designation: emp.designation,
            department: emp.department,
            email: emp.email,
            phone: emp.phone,
          });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, 'Employees_List.xlsx');
        
        toast.success('Employees List downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download employees list!', { autoClose: 1000 });
      }
    },

    async fetchAttendancePeriods() {
      try {
        // try primary endpoint that returns all attendance for client
        let res;
        try {
          res = await axiosClient.get(`/api/v1/attendance/get/all/${this.user._id}`);
        } catch (err) {
          console.warn('Primary attendance endpoint failed, trying client attendance endpoint', err);
        }

        // fallback: try client endpoint without month/year to get all records
        if (!res || (!res.data && !res.data?.length && !res.data?.data)) {
          try {
            res = await axiosClient.get(`/api/v1/attendance/client/${this.user._id}`);
          } catch (err) {
            console.warn('Fallback attendance endpoint also failed', err);
          }
        }

        // Normalize response payload
        let records = [];
        if (!res) {
          records = [];
        } else if (Array.isArray(res.data)) {
          records = res.data;
        } else if (Array.isArray(res.data?.data)) {
          records = res.data.data;
        } else if (Array.isArray(res)) {
          records = res;
        } else {
          // handle nested shapes
          records = res.data?.data || res.data || [];
        }

        // Debug log full response when no records found
        if (!records || !records.length) {
          console.debug('fetchAttendancePeriods: no records returned from APIs', { res });
        }

        const monthNames = [
          "January","February","March","April","May","June",
          "July","August","September","October","November","December"
        ];

        const map = {};
        records.forEach(a => {
          let m = null, y = null;
          // Case 1: month as number or string month name, year as string/number
          if (a.year && a.month) {
            y = Number(a.year);
            if (typeof a.month === 'number' || a.month.match(/^\d+$/)) {
              m = Number(a.month);
            } else if (typeof a.month === 'string') {
              const idx = monthNames.findIndex(n => n.toLowerCase() === a.month.toLowerCase());
              if (idx !== -1) m = idx + 1;
            }
          }
          // Case 2: month_year as ISO string or formatted string
          else if (a.month_year) {
            // Try ISO date string
            const d = new Date(a.month_year);
            if (!isNaN(d)) {
              m = d.getMonth() + 1;
              y = d.getFullYear();
            } else {
              // Try MM-YYYY or YYYY-MM
              const mmYYYY = /^(\d{2})-(\d{4})$/;
              const yyyyMM = /^(\d{4})-(\d{2})$/;
              if (mmYYYY.test(a.month_year)) {
                const [, mm, yy] = a.month_year.match(mmYYYY); m = Number(mm); y = Number(yy);
              } else if (yyyyMM.test(a.month_year)) {
                const [, yy, mm] = a.month_year.match(yyyyMM); m = Number(mm); y = Number(yy);
              } else {
                const parts = String(a.month_year).split(/[\s-]+/);
                if (parts.length >= 2) {
                  const idx = monthNames.findIndex(n => n.toLowerCase() === parts[0].toLowerCase());
                  if (idx !== -1) { m = idx + 1; y = Number(parts[1]); }
                }
              }
            }
          }
          // Case 3: month_name and year
          else if (a.month_name && a.year) {
            const idx = monthNames.findIndex(n => n.toLowerCase() === String(a.month_name).toLowerCase());
            if (idx !== -1) { m = idx + 1; y = Number(a.year); }
          }

          if (m && y) {
            const label = `${String(m).padStart(2,'0')}-${y}`;
            if (!map[label]) {
              map[label] = { label, month: m, year: y, monthName: monthNames[m - 1], padded: String(m).padStart(2,'0') };
            }
          }
        });

        const opts = Object.values(map).sort((a,b) => b.year - a.year || b.month - a.month);
        this.esicOptions = opts;
        this.availableAttendancePeriods = opts.map(o => o.label);
        this.showAttendancePeriods = true;
        if (opts.length && !this.esicPeriod) this.esicPeriod = opts[0];

        // If still empty, surface helpful debug info
        if (!opts.length) {
          console.debug('fetchAttendancePeriods: computed esicOptions empty. sample records:', records.slice(0,5));
          toast.info('No available attendance periods found. Check backend attendance data or auth.', { autoClose: 4000 });
        }
      } catch (err) {
        this.availableAttendancePeriods = [];
        this.showAttendancePeriods = false;
        toast.error('Failed to fetch attendance periods', { autoClose: 2000 });
      }
    },
  },
};
</script>