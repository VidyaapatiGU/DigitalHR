<style scoped></style>

<template>
  <div class="login-container">
    <div class="container">
      <form>
        <div class="form-group">
          <label for="file">Upload file:</label>
          <div class="mb-3">
            <label for="formFileSm" class="form-label">Small file input example</label>
            <input
              class="form-control form-control-sm"
              accept="image/png, image/jpeg, application/pdf"
              type="file"
              id="file"
              ref="file"
              v-on:change="handleFile()"
            />
          </div>
        </div>
        <button type="button" @click="downloadSalarySheet()" class="btn btn-sm btn-dark">
          Download
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axiosClient from '../axiosClient';
import { ToastifyContainer } from 'vue3-toastify';
import { toast } from 'vue3-toastify';

import * as XLSX from 'xlsx'; // Import the XLSX library
import { saveAs } from 'file-saver';

export default {
  name: 'LoginForm',
  data() {
    return {
      file: '',
      data: [],
    };
  },

  created() {
    this.data = this.getData();
    console.log('data: ', this.data);
  },

  methods: {
    downloadSalarySheet() {
      console.log('downloadSalarySheet called');

      // Define headers and data structure as an array of arrays
      const headers = [
        [
          'Employee Details',
          '',
          '',
          '',
          'Minimum Wages',
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
          'Net Wages',
          '',
        ],
        [
          'ID',
          'Name',
          'Position',
          'Department',
          'Gross Salary',
          'HRA',
          'DA',
          '',
          '',
          '',
          'LWF',
          'PF',
          'TDS',
          'EPF',
          '',
          'Basic',
          'Net Salary',
        ],
      ];

      // Convert headers to worksheet format
      const worksheet = XLSX.utils.aoa_to_sheet(headers);

      // Merge cells for grouped headers
      worksheet['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } }, // Merge "Employee Details" header
        { s: { r: 0, c: 4 }, e: { r: 0, c: 9 } }, // Merge "Minimum Wages" header
        { s: { r: 0, c: 10 }, e: { r: 0, c: 14 } }, // Merge "Deductions" header
        { s: { r: 0, c: 15 }, e: { r: 0, c: 16 } }, // Merge "Net Wages" header
      ];

      // Prepare data rows
      const dataRows = this.data.map((item) => [
        item.id,
        item.name,
        item.position,
        item.department,
        item.gross_salary,
        item.hra,
        item.da,
        '', // Empty cells for alignment with "Minimum Wages" group
        '',
        '',
        item.lwf,
        item.pf,
        item.tds,
        item.e_pf,
        '', // Empty cells for alignment with "Deductions" group
        item.basic,
        item.net_salary,
      ]);

      // Append data rows to worksheet starting from the 3rd row to place them after the headers
      XLSX.utils.sheet_add_aoa(worksheet, dataRows, { origin: -1 });

      // Create a new workbook and add the worksheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Generate the Excel file and trigger the download
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `tempSalarySheet.xlsx`);
    },

    getData() {
      const tempData = [
        {
          id: 1,
          name: 'John Doe',
          position: 'Manager',
          department: 'Sales',

          gross_salary: 75000,
          hra: 15000,
          da: 5000,
          lwf: 200,
          pf: 9000,
          tds: 5000,
          e_pf: 11700,
          basic: 30000,
          net_salary: 67000,
        },
        {
          id: 2,
          name: 'Jane Smith',
          position: 'Developer',
          department: 'IT',
          gross_salary: 60000,
          hra: 12000,
          da: 4000,
          lwf: 200,
          pf: 7200,
          tds: 3000,
          e_pf: 9360,
          basic: 24000,
          net_salary: 53600,
        },
        {
          id: 3,
          name: 'Alice Johnson',
          position: 'Designer',
          department: 'Marketing',
          gross_salary: 55000,
          hra: 11000,
          da: 3500,
          lwf: 200,
          pf: 6600,
          tds: 2500,
          e_pf: 8580,
          basic: 22000,
          net_salary: 49100,
        },
        {
          id: 4,
          name: 'Chris Lee',
          position: 'Analyst',
          department: 'Finance',
          gross_salary: 58000,
          hra: 11600,
          da: 3800,
          lwf: 200,
          pf: 6960,
          tds: 2700,
          e_pf: 9048,
          basic: 23200,
          net_salary: 51840,
        },
        {
          id: 5,
          name: 'Sara White',
          position: 'HR',
          department: 'Human Resources',
          gross_salary: 53000,
          hra: 10600,
          da: 3300,
          lwf: 200,
          pf: 6360,
          tds: 2300,
          e_pf: 8268,
          basic: 21200,
          net_salary: 47640,
        },
        {
          id: 6,
          name: 'Michael Brown',
          position: 'Support',
          department: 'Customer Service',
          gross_salary: 50000,
          hra: 10000,
          da: 3000,
          lwf: 200,
          pf: 6000,
          tds: 2000,
          e_pf: 7800,
          basic: 20000,
          net_salary: 44800,
        },
        {
          id: 7,
          name: 'Emily Davis',
          position: 'Executive',
          department: 'Management',
          gross_salary: 85000,
          hra: 17000,
          da: 6000,
          lwf: 200,
          pf: 10200,
          tds: 5500,
          e_pf: 13260,
          basic: 34000,
          net_salary: 75900,
        },
        {
          id: 8,
          name: 'David Wilson',
          position: 'Clerk',
          department: 'Administration',
          gross_salary: 45000,
          hra: 9000,
          da: 2700,
          lwf: 200,
          pf: 5400,
          tds: 1800,
          e_pf: 7020,
          basic: 18000,
          net_salary: 40500,
        },
        {
          id: 9,
          name: 'Emma Taylor',
          position: 'Consultant',
          department: 'Consulting',
          gross_salary: 65000,
          hra: 13000,
          da: 4500,
          lwf: 200,
          pf: 7800,
          tds: 3500,
          e_pf: 10140,
          basic: 26000,
          net_salary: 57700,
        },
        {
          id: 10,
          name: 'Daniel Anderson',
          position: 'Technician',
          department: 'Maintenance',
          gross_salary: 48000,
          hra: 9600,
          da: 2900,
          lwf: 200,
          pf: 5760,
          tds: 1900,
          e_pf: 7488,
          basic: 19200,
          net_salary: 43240,
        },
      ];

      return tempData;
    },

    async uploadFile() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        const data = await axiosClient.post('/api/v1/document/upload', formData);
        console.log(data);
        toast.success(`File uploaded successfully`, {
          autoClose: 1500,
        });
      } catch (err) {
        console.log('');
      }
    },

    handleFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.container {
  width: 500px;
  height: 300px;
  border: 1px solid black;
  padding: 20px;
}
</style>
