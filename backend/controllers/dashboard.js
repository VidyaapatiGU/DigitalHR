const ExcelJS = require('exceljs');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');

// Reason codes as per instructions
const reasonCodes = [
	{ code: 0, reason: 'Without Reason', note: 'Leave last working day as blank' },
	{ code: 1, reason: 'On Leave', note: 'Leave last working day as blank' },
	{ code: 2, reason: 'Left Service', note: 'Please provide last working day (dd/mm/yyyy). IP will not appear from next wage period' },
	{ code: 3, reason: 'Retired', note: 'Please provide last working day (dd/mm/yyyy). IP will not appear from next contribution period.' },
	{ code: 4, reason: 'Out of Coverage', note: 'Please provide last working day (dd/mm/yyyy). IP will not appear from next wage period' },
	{ code: 5, reason: 'Expired', note: 'Please provide last working day (dd/mm/yyyy). IP will not appear from next wage period' },
	{ code: 6, reason: 'Not Implemented area', note: 'Leave last working day as blank' },
	{ code: 7, reason: 'Compliance by Immediate Employer', note: 'Leave last working day as blank' },
	{ code: 8, reason: 'Suspension of work', note: 'Leave last working day as blank' },
	{ code: 9, reason: 'Strike/Lockout', note: 'Leave last working day as blank' },
	{ code: 10, reason: 'Retrenchment', note: 'Please provide last working day (dd/mm/yyyy). IP will not appear from next wage period' },
	{ code: 11, reason: 'No Work', note: 'Leave last working day as blank' },
	{ code: 12, reason: 'Doesnt Belong To This Employer', note: 'Leave last working day as blank' },
	{ code: 13, reason: 'Duplicate IP', note: 'Leave last working day as blank' },
];

async function generateEsicReport(req, res) {
	try {
		const { month, year } = req.query; // Accept month/year as query params
		const employees = await Employee.find({});
		const workbook = new ExcelJS.Workbook();
		const sheet = workbook.addWorksheet('Sheet1');

		// Header row
		sheet.addRow([
			'IP Number',
			'IP Name',
			'No of Days for which wages paid/payable during the month',
			'Total Monthly Wages',
			'Reason Code for Zero workings days',
			'Last Working Day'
		]);

		for (const emp of employees) {
			const ipNumber = emp.ip_number || emp.esic_no || '';
			const ipName = emp.name || '';

			// Strictly use present days from Attendance for the given month/year
			let days = 0;
			if (month && year) {
				const attendance = await Attendance.findOne({
					emp_no: emp.emp_no,
					month: month,
					year: year
				});
				if (attendance && typeof attendance.present === 'number') {
					days = attendance.present;
				}
			}

			const wages = emp.monthly_wages || '';
			let reasonCode = 0;
			let lastWorkingDay = '';
			if (wages === 0) {
				reasonCode = emp.reason_code || 0;
				lastWorkingDay = emp.last_working_day || '';
			}
			sheet.addRow([ipNumber, ipName, days, wages, reasonCode, lastWorkingDay]);
		}

		// Instructions sheet
		const instructions = workbook.addWorksheet('Instructions & Reason Codes');
		instructions.addRow(['Reason', 'Code', 'Note']);
		reasonCodes.forEach(rc => {
			instructions.addRow([rc.reason, rc.code, rc.note]);
		});
		instructions.addRow([]);
		instructions.addRow(['Instructions to fill in the excel file:']);
		instructions.addRow(['1. Enter the IP number, IP name, No. of Days, Total Monthly Wages, Reason for 0 Wages (If Wages "0") & Last Working Day (only if employee has left service, Retired, Out of coverage, Expired, Not-Implemented area or Retrenchment. For other reasons, last working day must be left BLANK).']);
		instructions.addRow(['2. Number of days must be a whole number. Fractions should be rounded up to next higher whole number/integer']);
		instructions.addRow(['3. Excel sheet upload will lead to successful transaction only when all the Employees’ (who are currently mapped in the system) details are entered perfectly in the excel sheet']);

		// Send file
		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		res.setHeader('Content-Disposition', 'attachment; filename=ESIC_CHALLAN.xlsx');
		await workbook.xlsx.write(res);
		res.end();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

module.exports = { generateEsicReport };
