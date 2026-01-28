<style scoped>
/* Notice of Hours Modal Styles */
.time-input {
  width: 150px;
}

.modal-content {
  /* keep modal content layout default; additional styles can be added here */
}

.main {
}
.table-icon {
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
  <div
    class="modal fade"
    id="ModalUpdate"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title source-400 text-capitalize" id="ModalLabel">List of Holidays</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Holiday Name"
                aria-label="Holiday Name"
                aria-describedby="addon-wrapping"
                v-model="holidayName"
              />
            </div>
            <div class="col-md-6">
              <input type="date" class="form-control" id="datePicker" v-model="holidayDate" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" style="text-align: end; padding: 10px">
              <button
                @click="handleAddHoliday"
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in holidays" :key="index">
                    <td>{{ row.name }}</td>
                    <td>{{ getHolidayDate(row.holidayDate) }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalDelete"
                        @click="DeleteHoliday(row._id)"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalDelete"
    tabindex="-1"
    aria-labelledby="ModalDeleteLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title source-400 text-capitalize" id="ModalDeleteLabel">
            Are you sure that you want to delete?
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="handleDelete(deleteHoliday)"
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalHolidayToFrom"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title source-400 text-capitalize" id="ModalLabel">Holiday Policy</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <label for="name source-500" class="">Holiday From Date:</label>
              <input
                type="date"
                class="form-control"
                id="datePicker"
                v-model="holidayDateFromRetrived"
              />
            </div>
            <div class="col-md-6">
              <label for="name source-500" class="">Holiday To Date:</label>
              <input
                type="date"
                class="form-control"
                id="datePicker"
                v-model="holidayDateToRetrived"
              />
            </div>
          </div>
          <div class="row">
            <div
              class="col-md-12"
              style="text-align: end; padding: 10px"
              v-if="holidayDateFromRetrivedUp != '' && holidayDateToRetrivedUp != ''"
            >
              <button
                @click="handleUpdateHolidayPolicy"
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-dismiss="modal"
              >
                Update
              </button>
            </div>
            <div class="col-md-12" style="text-align: end; padding: 10px" v-else>
              <button
                @click="handleAddHolidayPolicy"
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalSalaryLogic"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title source-400 text-capitalize" id="ModalLabel">Salary Logic</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <label for="name source-500" class="">Salary Logic:</label>
              <select
                class="form-select mb-3 custom-disabled"
                aria-label="salary_logic"
                v-model="salary_logic"
              >
                <option value="0" selected>Select Salary Logic</option>
                <option value="calender_month" selected>Calender Month</option>
                <option value="30_days_month" selected>Month with 30 Days</option>
                <option value="28_days_month" selected>Month with 28 Days</option>
                <option value="26_days_month" selected>Month with 26 Days</option>
                <option value="excluding_weekOff_holiday_month" selected>
                  Exclude Weekly Off ad Holidays
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <span v-if="salary_logic == 'calender_month'">
                <p>If for e.g Jan has 31 days</p>
                <p>per_day_salary = salary/31</p>
              </span>
              <span v-if="salary_logic == '30_days_month'">
                <p>per_day_salary = salary/30</p>
              </span>
              <span v-if="salary_logic == '28_days_month'">
                <p>per_day_salary = salary/28</p>
              </span>
              <span v-if="salary_logic == '26_days_month'">
                <p>per_day_salary = salary/26</p>
              </span>
              <span v-if="salary_logic == 'excluding_weekOff_holiday_month'">
                <p>If for e.g Jan has 31 days, 2 Holidays and 4 Weekly off</p>
                <p>per_day_salary = salary/(31 - 2 - 4); salary/25</p>
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" style="text-align: end; padding: 10px">
              <button
                @click="handleAddSalaryLogic"
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-dismiss="modal"
                v-if="salary_logicRetrived == ''"
              >
                Add
              </button>
              <button
                @click="handleAddSalaryLogic"
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-dismiss="modal"
                v-else
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalSalaryStructure"
    tabindex="-1"
    aria-labelledby="ModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title source-400 text-capitalize" id="ModalLabel">Salary Structure</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <label for="name source-500" class="">Salary Structure:</label>
              <select
                class="form-select mb-3 custom-disabled"
                aria-label="salary_logic"
                v-model="salary_structure"
              >
                <option value="0" selected>Select Salary Structure</option>
                <option value="esic_lwf" selected>ESIC & LWF Both</option>
                <option value="esic" selected>ESIC Only</option>
                <option value="lwf" selected>LWF Only</option>
                <option value="cash" selected>Cash</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12" style="text-align: end; padding: 10px">
              <button
                @click="handleAddSalaryStructure"
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-dismiss="modal"
                v-if="salary_structureRetrived == ''"
              >
                Add
              </button>
              <button
                @click="handleAddSalaryStructure"
                type="button"
                class="btn text-light border-0 button_bg btn-sm"
                data-bs-dismiss="modal"
                v-else
              >
                Update
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Weekly Off Modal -->
  <div
    class="modal fade"
    id="ModalWeeklyOff"
    tabindex="-1"
    aria-labelledby="ModalWeeklyOffLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalWeeklyOffLabel">Set Weekly Off</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <multiselect
            v-model="selectedWeekOff"
            :options="weekOffOptions"
            placeholder="Select weekly off days"
            label="label"
            track-by="value"
            :multiple="true"
          ></multiselect>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
            @click="saveWeeklyOff"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- Minimum Wages Modal -->
<div
  class="modal fade"
  id="ModalMinimumWages"
  tabindex="-1"
  aria-labelledby="ModalMinimumWagesLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalMinimumWagesLabel">Minimum Wages</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Basic</th>
              <th>VDA</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Unskilled</strong></td>
              <td><input type="number" class="form-control" v-model="minimumWages.unskilled.basic" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.unskilled.vda" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.unskilled.total" /></td>
            </tr>
            <tr>
              <td><strong>Semi-Skilled</strong></td>
              <td><input type="number" class="form-control" v-model="minimumWages.semiSkilled.basic" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.semiSkilled.vda" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.semiSkilled.total" /></td>
            </tr>
            <tr>
              <td><strong>Skilled/Clerical</strong></td>
              <td><input type="number" class="form-control" v-model="minimumWages.skilled.basic" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.skilled.vda" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.skilled.total" /></td>
            </tr>
            <tr>
              <td><strong>Highly Skilled</strong></td>
              <td><input type="number" class="form-control" v-model="minimumWages.highlySkilled.basic" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.highlySkilled.vda" /></td>
              <td><input type="number" class="form-control" v-model="minimumWages.highlySkilled.total" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
          Close
        </button>
        <button
          @click="handleMinimumWages"
          type="button"
          class="btn text-light border-0 button_bg btn-sm"
          data-bs-dismiss="modal"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</div>
  <!-- Leave Day Selection Modal -->
  <div
  class="modal fade"
  id="ModalLeaveDays"
  tabindex="-1"
  aria-labelledby="ModalLeaveDaysLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalLeaveDaysLabel">Leave Day Selection</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-4">
            <label for="clDays" class="form-label">CL Days</label>
            <input
              type="number"
              class="form-control"
              id="clDays"
              v-model="clDays"
              placeholder="Enter CL Days"
            />
          </div>
          <div class="col-md-4">
            <label for="slDays" class="form-label">SL Days</label>
            <input
              type="number"
              class="form-control"
              id="slDays"
              v-model="slDays"
              placeholder="Enter SL Days"
            />
          </div>
          <div class="col-md-4">
            <label for="plDays" class="form-label">PL Days</label>
            <input
              type="number"
              class="form-control"
              id="plDays"
              v-model="plDays"
              placeholder="Enter PL Days"
            />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary btn-sm"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          @click="submitLeaveDays"
          data-bs-dismiss="modal"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</div>
  <!-- Area Labour Inspector Modal -->
  <div
    class="modal fade"
    id="ModalAreaLabourInspector"
    tabindex="-1"
    aria-labelledby="ModalAreaLabourInspectorLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalAreaLabourInspectorLabel">Area Labour Inspector</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="inspectorName" class="form-label">Inspector Name</label>
            <input
              type="text"
              class="form-control"
              id="inspectorName"
              v-model="salaryInspectorName"
              placeholder="Enter inspector name"
            />
          </div>
          <div class="mb-3">
            <label for="salaryOptionDate" class="form-label">Salary Option Date</label>
            <input
              type="date"
              class="form-control"
              id="salaryOptionDate"
              v-model="salaryOptionDate"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="handleSalaryInspector"
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
            data-bs-dismiss="modal"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
<!-- Monthly Salary Date Modal -->
  <div
    class="modal fade"
    id="monthlySalaryModal"
    tabindex="-1"
    aria-labelledby="monthlySalaryModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="monthlySalaryModalLabel">Select Monthly Salary Date</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex align-items-center">
            <input
              type="date"
              class="form-control me-2"
              id="monthlySalaryDatePicker"
              v-model="monthlySalaryDate"
            />
            <button
              type="button"
              class="btn btn-success"
              @click="handleMonthlySalaryDate"
              data-bs-dismiss="modal"
            >
              Submit
            </button>
          </div>
        </div>
          
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

<!-- Registration Number Modal -->
<div
  class="modal fade"
  id="ModalRegistrationNumber"
  tabindex="-1"
  aria-labelledby="ModalRegistrationNumberLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalRegistrationNumberLabel">Enter Shops and Establishment Registration Number</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Shops and Establishment Registration Number</label>
          <input
            type="text"
            class="form-control"
            v-model="registrationNumber"
            placeholder="Enter registration number"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="handleRegistrationNumber"
          data-bs-dismiss="modal"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Close Day Notice Modal -->
<div
  class="modal fade"
  id="ModalCloseNotice"
  tabindex="-1"
  aria-labelledby="ModalCloseNoticeLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalCloseNoticeLabel">Generate Notice of Close Day</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Effective Date</label>
          <input
            type="date"
            class="form-control"
            v-model="closeNoticeDate"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Close Day Type</label>
          <input
            type="text"
            class="form-control"
            v-model="closeNoticeType"
            disabled
          />
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="downloadCloseNotice"
          data-bs-dismiss="modal"
        >
          Generate & Download
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Weekly Holiday Assignment Modal -->
<div
  class="modal fade"
  id="ModalWeeklyHolidayAssignment"
  tabindex="-1"
  aria-labelledby="ModalWeeklyHolidayAssignmentLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalWeeklyHolidayAssignmentLabel">Assign Weekly Holidays to Employees</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>Sl. No.</th>
                <th>Name of the Employee</th>
                <th>Day on which holiday is allowed</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(emp, idx) in employees" :key="emp._id">
                <td>{{ idx + 1 }}</td>
                <td>{{ emp.name }}</td>
                <td>
                  <select
                    class="form-control form-control-sm"
                    v-model="emp.holidayDay"
                  >
                    <option value="">-- Select Day --</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder="Enter remarks"
                    v-model="emp.remarks"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="saveEmployeeHolidayAssignments"
          data-bs-dismiss="modal"
        >
          Save & Close
        </button>
      </div>
    </div>
  </div>
</div>

 <!-- Notice of Hours Modal -->
<div
  class="modal fade"
  id="ModalNoticeOfHours"
  tabindex="-1"
  aria-labelledby="ModalNoticeOfHoursLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header border-0 py-3">
        <h5 class="modal-title" style="font-size: 1.1rem;" id="ModalNoticeOfHoursLabel">Notice of Hours</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-4">
        
        <!-- WORKING HOURS SECTION -->
        <h6 class="mb-3 text-primary">Working Hours</h6>
        
        <!-- Working General - CANNOT BE REMOVED -->
        <div class="mb-3">
          <label class="form-label mb-2">General Shift (required)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input v-model="noticeOfHours.workingGeneralStart" type="time" class="form-control" />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input v-model="noticeOfHours.workingGeneralEnd" type="time" class="form-control" />
            </div>
          </div>
        </div>

        <!-- Working Shift 1 -->
        <div class="mb-3" v-if="noticeOfHours.shift1Start || noticeOfHours.shift1End">
          <label class="form-label mb-2">Shift 1 (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.shift1Start" 
                @input="noticeOfHours.shift1Start = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.shift1End" 
                @input="noticeOfHours.shift1End = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeShift(1)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Working Shift 2 -->
        <div class="mb-3" v-if="noticeOfHours.shift2Start || noticeOfHours.shift2End">
          <label class="form-label mb-2">Shift 2 (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.shift2Start" 
                @input="noticeOfHours.shift2Start = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.shift2End" 
                @input="noticeOfHours.shift2End = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeShift(2)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Working Shift 3 -->
        <div class="mb-3" v-if="noticeOfHours.shift3Start || noticeOfHours.shift3End">
          <label class="form-label mb-2">Shift 3 (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.shift3Start" 
                @input="noticeOfHours.shift3Start = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.shift3End" 
                @input="noticeOfHours.shift3End = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeShift(3)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Extra Working Shifts (4+) -->
        <div v-for="(s, idx) in noticeOfHours.extraShifts" :key="`extra-shift-${idx}`" class="mb-3">
          <label class="form-label mb-2">Shift {{ 1 + idx }} (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input v-model="s.start" type="time" class="form-control" />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input v-model="s.end" type="time" class="form-control" />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeExtraShift(idx)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Add Working Shift Button -->
        <div class="mb-4">
          <button class="btn btn-sm btn-outline-primary" type="button" @click="addExtraShift">
            <i class="bi bi-plus-circle"></i> Add Working Shift
          </button>
        </div>

        <hr />

        <!-- LUNCH HOURS SECTION -->
        <h6 class="mb-3 text-primary">Lunch / Break Time</h6>

        <!-- Lunch General - CANNOT BE REMOVED -->
        <div class="mb-3">
          <label class="form-label mb-2">General Lunch (required)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input v-model="noticeOfHours.lunchGeneralStart" type="time" class="form-control" />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input v-model="noticeOfHours.lunchGeneralEnd" type="time" class="form-control" />
            </div>
          </div>
        </div>

        <!-- Lunch Shift 1 -->
        <div class="mb-3" v-if="noticeOfHours.lunchShift1Start || noticeOfHours.lunchShift1End">
          <label class="form-label mb-2">Lunch Shift 1 (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.lunchShift1Start" 
                @input="noticeOfHours.lunchShift1Start = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.lunchShift1End" 
                @input="noticeOfHours.lunchShift1End = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeLunchShift(1)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Lunch Shift 2 -->
        <div class="mb-3" v-if="noticeOfHours.lunchShift2Start || noticeOfHours.lunchShift2End">
          <label class="form-label mb-2">Lunch Shift 2 (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.lunchShift2Start" 
                @input="noticeOfHours.lunchShift2Start = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.lunchShift2End" 
                @input="noticeOfHours.lunchShift2End = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeLunchShift(2)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Lunch Shift 3 -->
        <div class="mb-3" v-if="noticeOfHours.lunchShift3Start || noticeOfHours.lunchShift3End">
          <label class="form-label mb-2">Lunch Shift 3 (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.lunchShift3Start" 
                @input="noticeOfHours.lunchShift3Start = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input 
                :value="noticeOfHours.lunchShift3End" 
                @input="noticeOfHours.lunchShift3End = $event.target.value"
                type="time" 
                class="form-control" 
              />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeLunchShift(3)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Extra Lunch Shifts (4+) -->
        <div v-for="(s, idx) in noticeOfHours.extraLunchShifts" :key="`extra-lunch-${idx}`" class="mb-3">
          <label class="form-label mb-2">Lunch Shift {{ 1 + idx }} (optional)</label>
          <div class="d-flex align-items-center gap-2">
            <div class="time-input" style="width: 140px">
              <input v-model="s.start" type="time" class="form-control" />
            </div>
            <span class="text-muted">to</span>
            <div class="time-input" style="width: 140px">
              <input v-model="s.end" type="time" class="form-control" />
            </div>
            <button class="btn btn-sm btn-outline-danger ms-2" type="button" @click="removeExtraLunchShift(idx)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- Add Lunch Shift Button -->
        <div class="mb-3">
          <button class="btn btn-sm btn-outline-primary" type="button" @click="addExtraLunchShift">
            <i class="bi bi-plus-circle"></i> Add Lunch Shift
          </button>
        </div>

      </div>
      <div class="modal-footer border-0 bg-light">
        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" @click="saveNoticeOfHours" data-bs-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>


  <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <div class="source-400 pt-2 h-100 scroll">
    <div class="border-bottom px-4 d-flex justify-content-between align-items-center py-2">
      <div>
        <h5 class="source-500 page-title">Settings</h5>
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
          <div class="mt-5 mb-3 row justify-content-between">
            <table class="table table-bordered table-striped">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Setting Name</th>
                  <th scope="col">Selected Option</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>List of Holidays</td>
                  <td v-if="holidays.length > 1">{{ holidays.length }} Holidays Added</td>
                  <td v-if="holidays.length == 0">No Holiday Added</td>
                  <td v-if="holidays.length == 1">1 Holiday Added</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalUpdate"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                    <button
                      v-if="holidays.length > 0"
                      type="button"
                      class="btn btn-success btn-sm ms-2"
                      @click="downloadHolidaysListWord"
                      title="Download Holidays List as Word Document"
                    >
                      <i class="bi bi-download"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Holiday Policy</td>
                  <td v-if="holidayDateFromRetrived != '' && holidayDateToRetrived != ''">
                    <span style="font-weight: 500">From Date:</span>
                    {{ holidayDateFromRetrived }}
                    <br />
                    <span style="font-weight: 500">To Date:</span>
                    {{ holidayDateToRetrived }}
                  </td>
                  <td v-else>Holiday Policy Not Added</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalHolidayToFrom"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Salary Logic</td>
                  <td v-if="!salary_logicRetrieved">No Salary Logic Added</td>
                  <td v-else>{{ salary_logic }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalSalaryLogic"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Salary Structure</td>
                  <td v-if="!salary_structureRetrieved">No Salary Structure Added</td>
                  <td v-else>{{ salary_structure }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalSalaryStructure"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Set Weekly Off</td>
                  <td v-if="!selectedWeekOff || selectedWeekOff.length === 0">No Weekly Off Selected</td>
                  <td v-else>{{ selectedWeekOff.map(option => option.label || option).join(', ') }}</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalWeeklyOff"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Select Leaves</td>
                  <td v-if="selectedLeaveOption === 'custom' || hasCustomLeaves">
                    CL [ {{ clDays }} ] , SL [ {{ slDays }} ] , PL [ {{ plDays }} ]
                  </td>
                  <td v-else>
                    No Custom Leaves Set
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalLeaveDays"
                      title="Edit Leaves"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                  </td>
                </tr>
                <!-- New Inspector and Salary Option Date Row -->
                <tr>
                  <td>Area Labour Inspector</td>
                  <td v-if="salaryInspectorName && salaryOptionDate">
                    <span style="font-weight: 500">Name:</span> {{ salaryInspectorName }}<br />
                    <span style="font-weight: 500">Date:</span> {{ salaryOptionDate }}
                  </td>
                  <td v-else>Not Set</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalAreaLabourInspector"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                    <button
                      v-if="salaryInspectorName && salaryOptionDate"
                      type="button"
                      class="btn btn-success btn-sm ms-2"
                      @click="downloadSalaryInspectorForm"
                      title="Download Area Labour Inspector"
                    >
                      <i class="bi bi-download"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Monthly Salary Date</td>
                  <td v-if="monthlySalaryDate">
                    <span style="font-weight: 500">Date:</span> {{ monthlySalaryDate }}
                  </td>
                  <td v-else>Not Set</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#monthlySalaryModal"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                    <button
                      v-if="monthlySalaryDate"
                      type="button"
                      class="btn btn-success btn-sm ms-2"
                      @click="downloadMonthlySalaryNotice"
                      title="Download Monthly Salary Notice"
                    >
                      <i class="bi bi-download"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Shops and Establishment Registration Number</td>
                  <td v-if="registrationNumber">
                    <span style="font-weight: 500">Reg No:</span> {{ registrationNumber }}
                  </td>
                  <td v-else>Not Set</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalRegistrationNumber"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Notice of Hours</td>
                  <td v-if="noticeOfHoursSet">
                    <div><strong>Working:</strong> {{ noticeOfHours.workingGeneral }}</div>
                    <div><strong>Lunch:</strong> {{ noticeOfHours.lunchGeneral }}</div>
                  </td>
                  <td v-else>Not Set</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalNoticeOfHours"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                    <button
                      v-if="showNoticeDownload"
                      type="button"
                      class="btn btn-success btn-sm ms-2"
                      @click="downloadNoticeOfHours"
                      title="Download Notice of Hours"
                    >
                      <i class="bi bi-download"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Notice of Close Day</td>
                  <td>Generate Close Day Document</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalCloseNotice"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Weekly Holiday Assignment</td>
                  <td>Assign holidays to employees</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalWeeklyHolidayAssignment"
                      @click="loadEmployeesForHolidayAssignment"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                    <button
                      v-if="employeeHolidayAssignments.length > 0"
                      type="button"
                      class="btn btn-success btn-sm ms-2"
                      @click="downloadWeeklyHolidayExcel"
                      title="Download Weekly Holiday Excel"
                    >
                      <i class="bi bi-download"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Minimum Wages</td>
                  <td v-if="minimumWagesRetrieved">Minimum Wages Set</td>
                  <td v-else>Not Set</td>
                  <td>
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="modal"
                      data-bs-target="#ModalMinimumWages"
                    >
                      <i class="bi bi-pen-fill pointer" style="font-size: 16px;"></i>
                    </button>
                    <button
                      v-if="minimumWagesRetrieved"
                      type="button"
                      class="btn btn-success btn-sm ms-2"
                      @click="downloadMinimumWagesForm"
                      title="Download Minimum Wages"
                    >
                      <i class="bi bi-download"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="table border rounded"></div> -->
        </div>
      </div>
    </div>
    <!-- ////////////////////////////////////////Modal////////////////////////////////////////////// -->
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import EasyDataTable from 'vue3-easy-data-table';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosClient from '../axiosClient';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { Document, Packer, Table, TableRow, TableCell, Paragraph, TextRun, AlignmentType, BorderStyle, WidthType } from 'docx';

export default {
  name: 'Settings',
  components: {
    EasyDataTable,
    Multiselect
  },

  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Date', value: 'holidayDate' },
        { text: 'Actions', value: 'actions', sortable: false, width: 250 },
      ],
      holidayName: '',
      holidayDate: '',
      monthlySalaryDate: "",
      registrationNumber: '',
      salaryInspectorName: '',
      salaryOptionDate: '',
      selectedLeaveOption: "",
      clDays: 0,
      slDays: 0,
      plDays: 0,
      closeNoticeDate: '',
      closeNoticeType: 'Rotational',
      closeNoticeTypes: ['Rotational', 'Other'],
      employees: [],
      employeeHolidayAssignments: [],
      userId: '',
      user: {},
      notifications: [],
      holidays: '',
      holidayDateToRetrived: '',
      holidayDateToRetrivedUp: '',
      holidayDateFromRetrivedUp: '',
      holidayDateTo: '',
      holidayDateFrom: '',
      holidayDateFromRetrived: '',
      salary_logic: '0',
      salary_logicRetrived: '',
      salary_structure: '0',
      salary_structureRetrived: '',
      deleteHoliday: '',
      optionTypes: ['success', 'warning', 'danger'],
      form: {
        name: '',
        type: '',
        text: '',
        to_user: '',
        by_user: '',
      },
      selectedWeekOff: [], // Selected weekly off days
      weekOffOptions: [
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' },
        { label: 'Sunday', value: 'Sunday' }
      ],
      newPassword: '',
      updateClient: {},
      showDeleteModal: false,
      minimumWages: {
      unskilled: { basic: '', vda: '', total: '' },
      semiSkilled: { basic: '', vda: '', total: '' },
      skilled: { basic: '', vda: '', total: '' },
      highlySkilled: { basic: '', vda: '', total: '' }
    },
    minimumWagesRetrieved: false,
      // Notice of Hours inputs
      noticeOfHours: {
        workingGeneralStart: '09:00',
        workingGeneralEnd: '18:00',
        shift1Start: '',
        shift1End: '',
        shift2Start: '',
        shift2End: '',
        shift3Start: '',
        shift3End: '',
        lunchGeneralStart: '13:00',
        lunchGeneralEnd: '14:00',
        lunchShift1Start: '',
        lunchShift1End: '',
        lunchShift2Start: '',
        lunchShift2End: '',
        lunchShift3Start: '',
        lunchShift3End: '',
        extraShifts: [],
        extraLunchShifts: []
      },
      visibleWorkingShifts: 0,
      visibleLunchShifts: 0, 
      noticeOfHoursSet: false,
  settingsRetrieved: false,
      search: '',
      entries: 0,
      entriesPerPage: 5,
      entriesPerPageOptions: [5, 10, 15, 20],
      page: 1,
      items: [],
      originalItems: [],
    };
  },

  async created() {
    try {
      await this.getCurrent();
      const res = await axiosClient.get(`/api/v1/holiday/getall/client/${this.user._id}`);
      this.holidays = res.data.data;

      const res_holidayPolicy = await axiosClient.get(
        `/api/v1/settings/holiday/to_from/${this.user._id}`
      );
      this.holidayDateToRetrived = res_holidayPolicy.data.data[0].holidayToDate
        ? res_holidayPolicy.data.data[0].holidayToDate.split('T')[0]
        : '';
      this.holidayDateFromRetrived = res_holidayPolicy.data.data[0].holidayFromDate
        ? res_holidayPolicy.data.data[0].holidayFromDate.split('T')[0]
        : '';
      this.holidayDateToRetrivedUp = res_holidayPolicy.data.data[0].holidayToDate
        ? res_holidayPolicy.data.data[0].holidayToDate.split('T')[0]
        : '';
      this.holidayDateFromRetrivedUp = res_holidayPolicy.data.data[0].holidayFromDate
        ? res_holidayPolicy.data.data[0].holidayFromDate.split('T')[0]
        : '';
      this.salary_logicRetrived = res_holidayPolicy.data.data[0].salary_logic
        ? res_holidayPolicy.data.data[0].salary_logic
        : '';
      if (res_holidayPolicy.data.data[0].salary_logic) {
        this.salary_logic = res_holidayPolicy.data.data[0].salary_logic;
      }
      this.salary_structureRetrived = res_holidayPolicy.data.data[0].salary_structure
        ? res_holidayPolicy.data.data[0].salary_structure
        : '';
      if (res_holidayPolicy.data.data[0].salary_structure) {
        this.salary_structure = res_holidayPolicy.data.data[0].salary_structure;
      }

      this.salaryInspectorName = res_holidayPolicy.data.data[0].salaryInspectorName || '';
      this.salaryOptionDate = res_holidayPolicy.data.data[0].salaryOptionDate 
        ? res_holidayPolicy.data.data[0].salaryOptionDate.split('T')[0] 
        : '';
      
      this.registrationNumber = res_holidayPolicy.data.data[0].registrationNumber || '';
      
      this.monthlySalaryDate = res_holidayPolicy.data.data[0].monthlySalaryDate 
        ? res_holidayPolicy.data.data[0].monthlySalaryDate.split('T')[0] 
        : '';

      this.minimumWages = res_holidayPolicy.data.data[0].minimumWages || {
      unskilled: { basic: '', vda: '', total: '' },
      semiSkilled: { basic: '', vda: '', total: '' },
      skilled: { basic: '', vda: '', total: '' },
      highlySkilled: { basic: '', vda: '', total: '' }
      };

      if (res_holidayPolicy.data.data[0].minimumWages) {
        this.minimumWagesRetrieved = true;
      }

      // Mark that settings document exists for this client
      if (res_holidayPolicy.data && Array.isArray(res_holidayPolicy.data.data) && res_holidayPolicy.data.data.length > 0) {
        this.settingsRetrieved = true;
      }

      // Set noticeOfHoursSet based on whether working hours are set
      const workingHours = res_holidayPolicy.data.data[0].workingHours || {};
      // Use only the extraShifts array if present; do NOT load numbered fields shift4..8 into arrays
      // (to avoid duplication: numbered fields are for saving, arrays are for display/storage)
      const extraShiftsFromArray = workingHours.extraShifts && Array.isArray(workingHours.extraShifts) ? workingHours.extraShifts.slice() : [];

      const extraLunchFromArray = workingHours.extraLunchShifts && Array.isArray(workingHours.extraLunchShifts) ? workingHours.extraLunchShifts.slice() : [];

      this.noticeOfHours = {
        workingGeneralStart: workingHours.workingGeneralStart || '09:00',
        workingGeneralEnd: workingHours.workingGeneralEnd || '18:00',
        shift1Start: workingHours.shift1Start || '',
        shift1End: workingHours.shift1End || '',
        shift2Start: workingHours.shift2Start || '',
        shift2End: workingHours.shift2End || '',
        shift3Start: workingHours.shift3Start || '',
        shift3End: workingHours.shift3End || '',
        lunchGeneralStart: workingHours.lunchGeneralStart || '13:00',
        lunchGeneralEnd: workingHours.lunchGeneralEnd || '14:00',
        lunchShift1Start: workingHours.lunchShift1Start || '',
        lunchShift1End: workingHours.lunchShift1End || '',
        lunchShift2Start: workingHours.lunchShift2Start || '',
        lunchShift2End: workingHours.lunchShift2End || '',
        lunchShift3Start: workingHours.lunchShift3Start || '',
        lunchShift3End: workingHours.lunchShift3End || '',
        extraShifts: extraShiftsFromArray,
        extraLunchShifts: extraLunchFromArray
      };
      // Mark as set if the backend returned any non-empty workingHours field
      this.noticeOfHoursSet = Object.keys(workingHours).length > 0 &&
        Object.values(workingHours).some((val) => val !== undefined && val !== null && String(val).trim() !== '');
      // derive display strings for table
      this.setNoticeDisplayStrings();

      // Load employee holiday assignments if they exist
      const employeeHolidayAssignments = res_holidayPolicy.data.data[0].employeeHolidayAssignments || [];
      if (employeeHolidayAssignments && Array.isArray(employeeHolidayAssignments) && employeeHolidayAssignments.length > 0) {
        this.employeeHolidayAssignments = employeeHolidayAssignments;
      }

    } catch (err) {
      console.log('error: ', err);
    }

    this.fetchWeeklyOffSettings();
    this.retrieveLeaveData();
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

  setup() {
    return {}
  },

  computed: {
  hasCustomLeaves() {
    return this.clDays > 0 || this.slDays > 0 || this.plDays > 0;
  },
  showNoticeDownload() {
    return this.noticeOfHoursSet || this.settingsRetrieved;
  },
  workingShiftsCount() {
    let count = 0;
    if (this.noticeOfHours.shift1Start || this.noticeOfHours.shift1End) count = 1;
    if (this.noticeOfHours.shift2Start || this.noticeOfHours.shift2End) count = 2;
    if (this.noticeOfHours.shift3Start || this.noticeOfHours.shift3End) count = 3;
    return count;
  },
  lunchShiftsCount() {
    let count = 0;
    if (this.noticeOfHours.lunchShift1Start || this.noticeOfHours.lunchShift1End) count = 1;
    if (this.noticeOfHours.lunchShift2Start || this.noticeOfHours.lunchShift2End) count = 2;
    if (this.noticeOfHours.lunchShift3Start || this.noticeOfHours.lunchShift3End) count = 3;
    return count;
  }
  },
  methods: {
    async DeleteHoliday(holiday_id) {
      this.deleteHoliday = holiday_id;
    },
    formatTime(time) {
      if (!time) return '';
      const [hours, minutes] = time.split(':');
      const period = hours >= 12 ? 'pm' : 'am';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes} ${period}`;
    },

    setNoticeDisplayStrings() {
      // workingGeneral and lunchGeneral are display values used in the settings table
      try {
        const w = this.noticeOfHours || {};
        if (w.workingGeneralStart && w.workingGeneralEnd) {
          this.noticeOfHours.workingGeneral = `${this.formatTime(w.workingGeneralStart)} to ${this.formatTime(w.workingGeneralEnd)}`;
        } else {
          this.noticeOfHours.workingGeneral = '';
        }

        if (w.lunchGeneralStart && w.lunchGeneralEnd) {
          this.noticeOfHours.lunchGeneral = `${this.formatTime(w.lunchGeneralStart)} to ${this.formatTime(w.lunchGeneralEnd)}`;
        } else {
          this.noticeOfHours.lunchGeneral = '';
        }
      } catch (e) {
        // ignore
      }
    },

    async saveNoticeOfHours() {
      try {
        // Build payload workingHours mapping extraShifts into numbered shift fields (shift4Start, shift4End, ...)
        const wh = {
          workingGeneralStart: this.noticeOfHours.workingGeneralStart,
          workingGeneralEnd: this.noticeOfHours.workingGeneralEnd,
          shift1Start: this.noticeOfHours.shift1Start,
          shift1End: this.noticeOfHours.shift1End,
          shift2Start: this.noticeOfHours.shift2Start,
          shift2End: this.noticeOfHours.shift2End,
          shift3Start: this.noticeOfHours.shift3Start,
          shift3End: this.noticeOfHours.shift3End,
          lunchGeneralStart: this.noticeOfHours.lunchGeneralStart,
          lunchGeneralEnd: this.noticeOfHours.lunchGeneralEnd,
          lunchShift1Start: this.noticeOfHours.lunchShift1Start,
          lunchShift1End: this.noticeOfHours.lunchShift1End,
          lunchShift2Start: this.noticeOfHours.lunchShift2Start,
          lunchShift2End: this.noticeOfHours.lunchShift2End,
          lunchShift3Start: this.noticeOfHours.lunchShift3Start,
          lunchShift3End: this.noticeOfHours.lunchShift3End,
        };

        // Map dynamic extraShifts to shift4..shiftN
        if (this.noticeOfHours.extraShifts && Array.isArray(this.noticeOfHours.extraShifts)) {
          this.noticeOfHours.extraShifts.forEach((s, i) => {
            const num = 4 + i; // shift number
            wh[`shift${num}Start`] = s.start || '';
            wh[`shift${num}End`] = s.end || '';
          });
        }

        // Map dynamic extraLunchShifts to lunchShift4..lunchShiftN
        if (this.noticeOfHours.extraLunchShifts && Array.isArray(this.noticeOfHours.extraLunchShifts)) {
          this.noticeOfHours.extraLunchShifts.forEach((s, i) => {
            const num = 4 + i;
            wh[`lunchShift${num}Start`] = s.start || '';
            wh[`lunchShift${num}End`] = s.end || '';
          });
        }

        // Also include the array form so backend stores unlimited extras reliably
        wh.extraLunchShifts = Array.isArray(this.noticeOfHours.extraLunchShifts) ? this.noticeOfHours.extraLunchShifts.slice() : [];
        wh.extraShifts = Array.isArray(this.noticeOfHours.extraShifts) ? this.noticeOfHours.extraShifts.slice() : [];

        // Remove empty keys so backend doesn't store empty string fields
        Object.keys(wh).forEach((k) => {
          if (wh[k] === '' || (Array.isArray(wh[k]) && wh[k].length === 0)) delete wh[k];
        });

        const data = {
          clientId: this.user._id,
          workingHours: wh,
        };

        const res = await axiosClient.put(`/api/v1/settings/working-hours/${this.user._id}`, data);

        console.log('saveNoticeOfHours response:', res && res.data);

        if (res.status === 200) {
          // Refresh from server to reflect persisted data
          try {
            const refreshRes = await axiosClient.get(`/api/v1/settings/holiday/to_from/${this.user._id}`);
            const serverSettings = (refreshRes.data && Array.isArray(refreshRes.data.data) && refreshRes.data.data[0]) || null;
            if (serverSettings && serverSettings.workingHours) {
              const whServer = serverSettings.workingHours;
              // Use only the extraShifts and extraLunchShifts arrays (do NOT convert numbered shift4..8 to arrays)
              const extras = Array.isArray(whServer.extraShifts) ? whServer.extraShifts.slice() : [];
              const lunchExtras = Array.isArray(whServer.extraLunchShifts) ? whServer.extraLunchShifts.slice() : [];

              this.noticeOfHours = {
                workingGeneralStart: whServer.workingGeneralStart || '09:00',
                workingGeneralEnd: whServer.workingGeneralEnd || '18:00',
                shift1Start: whServer.shift1Start || '',
                shift1End: whServer.shift1End || '',
                shift2Start: whServer.shift2Start || '',
                shift2End: whServer.shift2End || '',
                shift3Start: whServer.shift3Start || '',
                shift3End: whServer.shift3End || '',
                lunchGeneralStart: whServer.lunchGeneralStart || '13:00',
                lunchGeneralEnd: whServer.lunchGeneralEnd || '14:00',
                lunchShift1Start: whServer.lunchShift1Start || '',
                lunchShift1End: whServer.lunchShift1End || '',
                lunchShift2Start: whServer.lunchShift2Start || '',
                lunchShift2End: whServer.lunchShift2End || '',
                lunchShift3Start: whServer.lunchShift3Start || '',
                lunchShift3End: whServer.lunchShift3End || '',
                extraShifts: extras,
                extraLunchShifts: lunchExtras,
              };
            }

            this.noticeOfHoursSet = true;
            this.settingsRetrieved = true;
            this.setNoticeDisplayStrings();
            toast.success('Working hours updated successfully!', { autoClose: 1000 });
          } catch (refreshErr) {
            console.warn('Failed to refresh settings after save:', refreshErr);
            this.noticeOfHoursSet = true;
            this.settingsRetrieved = true;
            this.setNoticeDisplayStrings();
            toast.success('Working hours updated (refresh failed)', { autoClose: 1000 });
          }
        } else {
          toast.error('Failed to update working hours!', { autoClose: 1000 });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to update working hours!', { autoClose: 1000 });
      }
    },
  addExtraShift() {
    // Always add to extraShifts array (no visibleWorkingShifts logic needed)
    if (!this.noticeOfHours.extraShifts) {
      this.noticeOfHours.extraShifts = [];
    }
    this.noticeOfHours.extraShifts.push({ start: '', end: '' });
  },

  // Remove working shift
  removeShift(number) {
    if (!number || number < 1 || number > 3) return;
    
    this.noticeOfHours[`shift${number}Start`] = '';
    this.noticeOfHours[`shift${number}End`] = '';
  },

  // Remove extra working shift
  removeExtraShift(index) {
    if (!this.noticeOfHours.extraShifts) return;
    this.noticeOfHours.extraShifts.splice(index, 1);
  },

  // Add lunch shift
  addExtraLunchShift() {
    // Always add to extraLunchShifts array
    if (!this.noticeOfHours.extraLunchShifts) {
      this.noticeOfHours.extraLunchShifts = [];
    }
    this.noticeOfHours.extraLunchShifts.push({ start: '', end: '' });
  },

  // Remove lunch shift
  removeLunchShift(number) {
    if (!number || number < 1 || number > 3) return;
    
    this.noticeOfHours[`lunchShift${number}Start`] = '';
    this.noticeOfHours[`lunchShift${number}End`] = '';
  },

  // Remove extra lunch shift
  removeExtraLunchShift(index) {
    if (!this.noticeOfHours.extraLunchShifts) return;
    this.noticeOfHours.extraLunchShifts.splice(index, 1);
  },

    downloadNoticeOfHours() {
      // Build shift entries for working hours and lunch dynamically so empty shifts are omitted
      const shifts = [];
      if (this.noticeOfHours.shift1Start || this.noticeOfHours.shift1End) shifts.push({ start: this.noticeOfHours.shift1Start, end: this.noticeOfHours.shift1End });
      if (this.noticeOfHours.shift2Start || this.noticeOfHours.shift2End) shifts.push({ start: this.noticeOfHours.shift2Start, end: this.noticeOfHours.shift2End });
      if (this.noticeOfHours.shift3Start || this.noticeOfHours.shift3End) shifts.push({ start: this.noticeOfHours.shift3Start, end: this.noticeOfHours.shift3End });
      if (this.noticeOfHours.extraShifts && this.noticeOfHours.extraShifts.length) this.noticeOfHours.extraShifts.forEach(s => shifts.push({ start: s.start, end: s.end }));

      let shiftEntries = '';
      shifts.forEach((s, i) => {
        const num = 1 + i; // start from 1 for the first shift
        shiftEntries += `<div class="shift-entry">${num}. Shift ${String(num).padStart(2, '0')} : ${this.formatTime(s.start)} to ${this.formatTime(s.end)}</div>`;
      });

      // lunch entries
      const lunches = [];
      if (this.noticeOfHours.lunchShift1Start || this.noticeOfHours.lunchShift1End) lunches.push({ start: this.noticeOfHours.lunchShift1Start, end: this.noticeOfHours.lunchShift1End });
      if (this.noticeOfHours.lunchShift2Start || this.noticeOfHours.lunchShift2End) lunches.push({ start: this.noticeOfHours.lunchShift2Start, end: this.noticeOfHours.lunchShift2End });
      if (this.noticeOfHours.lunchShift3Start || this.noticeOfHours.lunchShift3End) lunches.push({ start: this.noticeOfHours.lunchShift3Start, end: this.noticeOfHours.lunchShift3End });
      if (this.noticeOfHours.extraLunchShifts && this.noticeOfHours.extraLunchShifts.length) this.noticeOfHours.extraLunchShifts.forEach(s => lunches.push({ start: s.start, end: s.end }));

      let lunchEntries = '';
      lunches.forEach((s, i) => {
        const num = 1 + i; // start from 1 for the first lunch shift
        lunchEntries += `<div class="shift-entry">${num}. Shift ${String(num).padStart(2, '0')} : ${this.formatTime(s.start)} to ${this.formatTime(s.end)}</div>`;
      });

      // Create Word document HTML with styling similar to the attached screenshots
      const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>Notice of Hours</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; margin: 0; padding: 40px; }
            .page { width: 100%; }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-size: 30px; font-weight: bold; text-decoration: underline; margin-bottom: 6px; }
            .subtitle { font-size: 18px; font-weight: bold; margin: 6px 0; }
            .rule { font-size: 18px; font-weight: bold; margin-bottom: 18px; }
            .section { margin-top: 28px; }
            .section-title { font-size: 18px; font-weight: bold; text-decoration: underline; margin-bottom: 12px; }
            .content { margin-left: 40px; font-size: 15px; }
            .shift-entry { margin: 6px 0; }
            .small { font-size: 14px; }
            /* ensure spacing inside Word */
            p { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="header">
              <div class="title">NOTICE OF HOURS</div>
              <div class="subtitle">FROM XXII</div>
              <div class="rule">RULE 31 (1)</div>
            </div>

            <div class="section">
              <div class="section-title">Working Hours in a day</div>
              <div class="content">
                <div class="shift-entry">1. General shift : ${this.formatTime(this.noticeOfHours.workingGeneralStart) || ''} to ${this.formatTime(this.noticeOfHours.workingGeneralEnd) || ''}</div>
                ${shiftEntries}
              </div>
            </div>

            <div class="section">
              <div class="section-title">Lunch / Break Time</div>
              <div class="content">
                <div class="shift-entry">1. General shift : ${this.formatTime(this.noticeOfHours.lunchGeneralStart) || ''} to ${this.formatTime(this.noticeOfHours.lunchGeneralEnd) || ''}</div>
                ${lunchEntries}
              </div>
            </div>

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
      URL.revokeObjectURL(element.href);
    },
    getHolidayDate(date) {
      const formattedDate = date.split('T')[0];
      return formattedDate;
    },
    // Return ordinal suffix for a day (1st, 2nd, 3rd, 4th...)
    getOrdinalSuffix(n) {
      const j = n % 10;
      const k = n % 100;
      if (j === 1 && k !== 11) return 'st';
      if (j === 2 && k !== 12) return 'nd';
      if (j === 3 && k !== 13) return 'rd';
      return 'th';
    },
    async handleDelete(holiday_id) {
      const res = await axiosClient.put(`/api/v1/holiday/delete/${holiday_id}`);
      if (res.status == 200) {
        toast.success(`Holiday Deleted`, {
          autoClose: 1000,
        });
        const res = await axiosClient.get(`/api/v1/holiday/getall/client/${this.user._id}`);
        this.holidays = res.data.data;
      } else if (res.status == 402) {
        toast.error(`Holiday Not Found!`, {
          autoClose: 1000,
        });
      } else if (res.status == 500) {
        toast.error(`Internal Error!`, {
          autoClose: 1000,
        });
      }
    },

    async handleMonthlySalaryDate() {
      try {
        const data = {
          monthlySalaryDate: this.monthlySalaryDate,
        };

        const res = await axiosClient.put(
          `/api/v1/settings/monthly_salary_date/update/${this.user._id}`,
          data
        );
        
        if (res.status === 200) {
          toast.success('Monthly Salary Date Updated Successfully!', { autoClose: 1000 });
        } else if (res.status === 201) {
          toast.error('Settings Not Found!', { autoClose: 1000 });
        } else if (res.status === 500) {
          toast.error('Internal Error!', { autoClose: 1000 });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to update Monthly Salary Date!', { autoClose: 1000 });
      }
    },

    async handleRegistrationNumber() {
      try {
        if (!this.registrationNumber.trim()) {
          toast.error('Please enter a registration number', { autoClose: 1000 });
          return;
        }

        const data = {
          registrationNumber: this.registrationNumber,
        };

        const res = await axiosClient.put(
          `/api/v1/settings/registration_number/update/${this.user._id}`,
          data
        );
        
        if (res.status === 200) {
          toast.success('Registration Number Updated Successfully!', { autoClose: 1000 });
        } else {
          toast.error('Failed to update Registration Number!', { autoClose: 1000 });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to update Registration Number!', { autoClose: 1000 });
      }
    },

    downloadCloseNotice() {
      try {
        if (!this.closeNoticeDate) {
          toast.error('Please select a date', { autoClose: 1000 });
          return;
        }

        const dateObj = new Date(this.closeNoticeDate);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        // Get shop name and address from client data (or use placeholder)
        const shopName = this.user.name || 'M/s. Day 15 - Unit of...';
        const shopAddress = this.user.address || 'Pune';
        const registrationNo = this.registrationNumber || '456345345565';

        const content = `
          <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
          <head>
            <meta charset="utf-8">
            <title>Notice of Close Day</title>
            <style>
              body { 
                font-family: 'Times New Roman', Times, serif; 
                margin: 60px 80px; 
                line-height: 1.8;
              }
              .container { 
                max-width: 600px; 
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px; 
              }
              .title { 
                font-size: 20px; 
                font-weight: bold; 
                margin-bottom: 8px;
              }
              .subtitle { 
                font-size: 12px; 
                margin-bottom: 15px;
              }
              .form-header { 
                text-align: center; 
                font-size: 18px; 
                font-weight: bold; 
                text-decoration: underline;
                margin-bottom: 30px;
              }
              .form-row { 
                margin-bottom: 20px; 
                line-height: 1.6;
              }
              .signature-area { 
                margin-top: 60px; 
                text-align: right;
                margin-right: 50px;
              }
              .signature-line { 
                border-top: 1px solid black; 
                width: 150px; 
                display: inline-block;
              }
              .signature-label {
                text-align: right;
                font-size: 13px;
                margin-top: 5px;
              }
              .footer-section { 
                margin-top: 40px; 
                font-size: 12px;
                padding-left: 0;
              }
              .footer-line {
                margin: 0;
                padding: 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="title">FORM XXIV</div>
                <div class="subtitle">(See Rule 31 (3) (a) )</div>
              </div>

              <div class="form-header">Notice of close day or a change in close day</div>

              <div class="form-row">
                <span>Name of Shop / Establishment and address : </span><span><strong>${shopName}, ${shopAddress}</strong></span>
              </div>

              <div class="form-row">
                <span>Registration No. </span><span><strong>${registrationNo}</strong></span>
              </div>

              <div class="form-row">
                <span>Notice is hereby given that with effect from (date) </span><span style="font-weight: bold;">${formattedDate}</span><span> .The shop/ Establishment shall Observed </span><span style="font-weight: bold;">${this.closeNoticeType}</span><span> as close day every week. It shall be the Weekly for all Employees.</span>
              </div>

              <div class="signature-area">
                <div class="signature-line"></div>
                <div class="signature-label">Signature of employer</div>
              </div>

              <div class="form-row">
                <span>....................................................</span><br>
                <span>Inspection under the Goa Daman and Diu</span><br>
                <span>Shops and Establishment Act 1973.</span>
              </div>
            </div>
          </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        element.download = 'Notice_of_Close_Day.doc';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        URL.revokeObjectURL(element.href);

        toast.success('Notice of Close Day downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to generate document!', { autoClose: 1000 });
      }
    },

    async handleAddSalaryStructure() {
      try {
        const data = {
          salary_structure: this.salary_structure,
        };

        const res = await axiosClient.post(`/api/v1/settings/salary/struct`, data);
        if (res.status == 200) {
          toast.success(`Salary Structure Added!`, {
            autoClose: 1000,
          });
          this.$router.go(0);
        } else if (res.status == 201) {
          toast.error(`Client Settings Not Found! `, {
            autoClose: 1000,
          });
        } else if (res.status == 500) {
          toast.error(`Internal Error! `, {
            autoClose: 1000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async handleAddSalaryLogic() {
      try {
        const data = {
          salary_logic: this.salary_logic,
        };

        const res = await axiosClient.post(`/api/v1/settings/salary/logic`, data);
        if (res.status == 200) {
          toast.success(`Salary Logic Added!`, {
            autoClose: 1000,
          });
          this.$router.go(0);
        } else if (res.status == 201) {
          toast.error(`Client Settings Not Found! `, {
            autoClose: 1000,
          });
        } else if (res.status == 500) {
          toast.error(`Internal Error! `, {
            autoClose: 1000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async handleSalaryInspector() {
      try {
        const data = {
          salaryInspectorName: this.salaryInspectorName,
          salaryOptionDate: this.salaryOptionDate,
        };

        const res = await axiosClient.put(
          `/api/v1/settings/salary_inspector/update/${this.user._id}`,
          data
        );
        
        if (res.status === 200) {
          toast.success('Area Labour Inspector Updated Successfully!', { autoClose: 1000 });
        } else if (res.status === 201) {
          toast.error('Settings Not Found!', { autoClose: 1000 });
        } else if (res.status === 500) {
          toast.error('Internal Error!', { autoClose: 1000 });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to update Area Labour Inspector!', { autoClose: 1000 });
      }
    },

    async handleAddHoliday() {
      try {
        const data = {
          name: this.holidayName,
          holidayDate: this.holidayDate,
        };

        const res = await axiosClient.post(`/api/v1/holiday/add`, data);
        //console.log('Res: ', res);
        if (res.status == 201) {
          toast.success(`Holiday Added`, {
            autoClose: 1000,
          });
          const res = await axiosClient.get(`/api/v1/holiday/getall/client/${this.user._id}`);
          this.holidays = res.data.data;
          this.holidayName = '';
          this.holidayDate = '';
        } else if (res.status == 200) {
          toast.error(`Holiday already Exists! `, {
            autoClose: 1000,
          });
        } else if (res.status == 500) {
          toast.error(`Internal Error! `, {
            autoClose: 1000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async handleAddHolidayPolicy() {
      try {
        console.log('In Add');
        const data = {
          holidayDateTo: this.holidayDateToRetrived,
          holidayDateFrom: this.holidayDateFromRetrived,
        };

        const res = await axiosClient.post(`/api/v1/settings/holiday/to_from`, data);
        console.log('Res: ', res);
        if (res.status == 201) {
          toast.success(`Holiday Policy Added`, {
            autoClose: 1000,
          });
          //const res = await axiosClient.get(`/api/v1/holiday/getall/client/${this.user._id}`);
          //this.holidays = res.data.data;
          this.$router.go(0);
          this.holidayDateTo = '';
          this.holidayDateFrom = '';
        } else if (res.status == 200) {
          toast.error(`Holiday Policy already Exists! `, {
            autoClose: 1000,
          });
        } else if (res.status == 500) {
          toast.error(`Internal Error! `, {
            autoClose: 1000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    async handleUpdateHolidayPolicy() {
      try {
        const data = {
          holidayToDate: this.holidayDateToRetrived,
          holidayFromDate: this.holidayDateFromRetrived,
        };

        const res = await axiosClient.put(
          `/api/v1/settings/holiday/to_from/update/${this.user._id}`,
          data
        );
        console.log('Res: ', res);
        if (res.status == 200) {
          toast.success(`Holiday Policy Updated Successfully!`, {
            autoClose: 1000,
          });
        } else if (res.status == 201) {
          toast.error(`Holiday Policy Not Found! `, {
            autoClose: 1000,
          });
        } else if (res.status == 500) {
          toast.error(`Internal Error! `, {
            autoClose: 1000,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },

    getFormattedAddress() {
      if (!this.user) return '';
      const parts = [];
      if (this.user.name) parts.push(this.user.name);
      if (this.user.address) parts.push(this.user.address);
      if (this.user.city) parts.push(this.user.city);
      if (this.user.pin_code) parts.push(this.user.pin_code);
      if (this.user.state) parts.push(this.user.state);
      if (this.user.country) parts.push(this.user.country);
      return parts.join(', ');
    },

    // Update downloadSalaryInspectorForm method
    async downloadSalaryInspectorForm() {
      try {
        if (!this.salaryInspectorName || !this.salaryOptionDate) {
          toast.error('Please set Area Labour Inspector details first!', { autoClose: 1000 });
          return;
        }

        const date = new Date(this.salaryOptionDate);
        const formattedDate = `${date.getDate()}${this.getOrdinalSuffix(date.getDate())} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

        // Format the company address
        const companyName = this.user.name || '';
        const companyAddress = `${this.user.address || ''}<br>
                              ${this.user.city || ''} - ${this.user.pin_code || ''}<br>
                              ${this.user.state || ''}, ${this.user.country || ''}`;

        const content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; padding: 50px; }
                .title { font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 20px; }
                .subtitle { font-size: 18px; text-align: center; margin-bottom: 10px; }
                .rule { font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 40px; }
                table { width: 80%; margin: 50px auto; border-collapse: collapse; }
                th, td { border: 2px solid black; padding: 15px; text-align: center; }
                th { background-color: #f0f0f0; font-weight: bold; }
                .footer { position: absolute; bottom: 100px; right: 100px; text-align: right; }
                .company { text-align: center; margin-top: 80px; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="title">FORM VI</div>
              <div class="rule">[Rule 23(1)]</div>
              <div class="subtitle"><strong>Name and Address of Inspectors</strong></div>
              
              <table align="center" style="width:100%; border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <table align="center" style="display: inline-table; width: 80%; margin: 0 auto;">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td><strong>${this.salaryInspectorName}</strong></td>
                    <td>
                    <strong>M/s. ${companyName}</strong><br>
                    ${companyAddress}
                    </td>
                  </tr>
                </tbody>
              </table>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Salary_Inspector_Form_${this.user.name || 'Company'}.doc`;
        link.click();

        toast.success('Form Downloaded Successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download form!', { autoClose: 1000 });
      }
    },

    // Update downloadMonthlySalaryNotice method
    async downloadMonthlySalaryNotice() {
      try {
        if (!this.monthlySalaryDate) {
          toast.error('Please set Monthly Salary Date first!', { autoClose: 1000 });
          return;
        }

        const date = new Date(this.monthlySalaryDate);
        const day = date.getDate();
        
        const dateText = `ON OR BEFORE ${day}${this.getOrdinalSuffix(day)} OF EVERY MONTH`;

        const companyName = this.user.name || 'Bay 15 – A unit of Aqua Resorts & Spa Pvt Ltd';
        const companyAddress = `${this.user.address || 'E6-8, E boshan'}<br>
                              ${this.user.city || 'Boshan Homes'} - ${this.user.pin_code || '403507'}<br>
                              ${this.user.state || 'Goa'}, ${this.user.country || 'India'}`;

        const content = `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                .title { font-size: 48px; font-weight: bold; text-decoration: underline; margin-bottom: 80px; }
                .content { font-size: 24px; margin: 100px 0; }
                .footer { position: absolute; bottom: 40px; right: 40px; text-align: right; }
                .company { font-size: 14px; margin-top: 0; }
              </style>
            </head>
            <body>
              <div class="title">NOTICE</div>
              <div class="content">DATE OF PAYMENT: ${dateText}</div>
              <div class="footer">
                <div class="company"><strong>M/s. ${companyName}</strong><br>${companyAddress}</div>
              </div>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Monthly_Salary_Notice_${this.user.name || 'Company'}.doc`;
        link.click();

        toast.success('Notice Downloaded Successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download notice!', { autoClose: 1000 });
      }
    },

    // Update downloadMinimumWagesForm method
    async downloadMinimumWagesForm() {
      try {
        if (!this.minimumWagesRetrieved) {
          toast.error('Please set Minimum Wages first!', { autoClose: 1000 });
          return;
        }

        const companyName = this.user.name || 'Bay 15 – A unit of Aqua Resorts & Spa Pvt Ltd';
        const companyAddress = `${this.user.address || 'E6-8, E boshan'}<br>
                              ${this.user.city || 'Boshan Homes'} - ${this.user.pin_code || '403507'}<br>
                              ${this.user.state || 'Goa'}, ${this.user.country || 'India'}`;

        const content = `
          <html>
            <head>
              <style>
                html, body { height: 100%; margin: 0; padding: 0; }
                body { font-family: Arial, sans-serif; padding: 40px; position: relative; }
                .title { font-size: 36px; font-weight: bold; text-align: center; margin-bottom: 40px; }
                .subtitle { font-size: 16px; text-align: center; margin-bottom: 40px; }
                /* Make table larger so it fills more of the page */
                table { width: 92%; margin: 0 auto; border-collapse: collapse; table-layout: fixed; font-size: 18px; }
                /* First column wider for category labels */
                th:first-child, td:first-child { width: 50%; text-align: left; padding-left: 20px; }
                /* Remaining three columns share the rest */
                th:nth-child(2), td:nth-child(2),
                th:nth-child(3), td:nth-child(3),
                th:nth-child(4), td:nth-child(4) { width: 16.66%; }
                th, td { border: 3px solid black; padding: 18px; text-align: center; font-size: 18px; font-weight: bold; overflow-wrap: anywhere; }
                th { background-color: #f0f0f0; }
                .footer {
                  position: absolute;
                  right: 40px;
                  bottom: 40px;
                  text-align: right;
                  font-size: 14px;
                  line-height: 1.4;
                }
                .company { font-weight: bold; }
              </style>
            </head>
            <body>
              <div class="title">Form IV</div>
              <div class="subtitle">
                <strong>Notices Showing Minimum Rates of wages required under<br>
                Rule 18 W.e.f 01<sup>st</sup> April 2025</strong>
              </div>

              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>BASIC</th>
                    <th>VDA</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>UNSKILLED</th>
                    <td>${this.minimumWages.unskilled.basic}</td>
                    <td>${this.minimumWages.unskilled.vda}</td>
                    <td>${this.minimumWages.unskilled.total}</td>
                  </tr>
                  <tr>
                    <th>SEMI-SKILLED</th>
                    <td>${this.minimumWages.semiSkilled.basic}</td>
                    <td>${this.minimumWages.semiSkilled.vda}</td>
                    <td>${this.minimumWages.semiSkilled.total}</td>
                  </tr>
                  <tr>
                    <th>SKILLED/ CLERICAL</th>
                    <td>${this.minimumWages.skilled.basic}</td>
                    <td>${this.minimumWages.skilled.vda}</td>
                    <td>${this.minimumWages.skilled.total}</td>
                  </tr>
                  <tr>
                    <th>HIGHLY SKILLED</th>
                    <td>${this.minimumWages.highlySkilled.basic}</td>
                    <td>${this.minimumWages.highlySkilled.vda}</td>
                    <td>${this.minimumWages.highlySkilled.total}</td>
                  </tr>
                </tbody>
                    </table>
                  </td>
                </tr>
              </table>

              <div class="footer">
                <div class="company">M/s. ${companyName}</div>
                <div>${this.user.address || 'E6-8, E boshan'}</div>
                <div>${this.user.city || 'Boshan Homes'} - ${this.user.pin_code || '403507'}</div>
                <div>${this.user.state || 'Goa'}, ${this.user.country || 'India'}</div>
              </div>
            </body>
          </html>
        `;

        const blob = new Blob([content], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Minimum_Wages_Form_${this.user.name || 'Company'}.doc`;
        link.click();

        toast.success('Form Downloaded Successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error(err);
        toast.error('Failed to download form!', { autoClose: 1000 });
      }
    },
    // Handle Minimum Wages Update
    async handleMinimumWages() {
      try {
        const data = {
          minimumWages: this.minimumWages,
        };

        const res = await axiosClient.put(
          `/api/v1/settings/minimum_wages/update/${this.user._id}`,
          data
        );
        
        if (res.status === 200) {
          toast.success('Minimum Wages Updated Successfully!', { autoClose: 1000 });
          this.minimumWagesRetrieved = true;
        } else if (res.status === 201) {
          toast.error('Settings Not Found!', { autoClose: 1000 });
        } else if (res.status === 500) {
          toast.error('Internal Error!', { autoClose: 1000 });
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to update Minimum Wages!', { autoClose: 1000 });
      }
    },
    async fetchWeeklyOffSettings() {
      try {
        //console.warn("Fetching Weekly Off Settings for user:", this.user._id);
        const res = await axiosClient.get(`/api/v1/settings/weekly_off/${this.user._id}`);
        
        if (res.status === 200 && res.data.weeklyOff) {
          // Transform the fetched array of strings into an array of objects
          this.selectedWeekOff = res.data.weeklyOff.map(day => ({
            label: day,
            value: day
          }));
          // Also store the raw data if needed in weeklyOffDays
          this.weeklyOffDays = res.data.weeklyOff;
        } else {
          toast.warning("No weekly off settings found", { autoClose: 3000 });
          this.selectedWeekOff = [{ label: 'Sunday', value: 'Sunday' }];
          this.weeklyOffDays = ['Sunday'];
        }
      } catch (error) {
        console.error("Error fetching weekly off settings:", error);
        toast.error("Failed to fetch weekly off settings. Default to Sunday.", { autoClose: 3000 });
        this.selectedWeekOff = [{ label: 'Sunday', value: 'Sunday' }];
        this.weeklyOffDays = ['Sunday'];
      }
    },

    async saveWeeklyOff() {
      try {
        if (!this.user || !this.user._id) {
          toast.error('User information not available. Please log in again.', { autoClose: 3000 });
          return;
        }

        // If nothing is selected, default to Sunday
        const weeklyOffArray =
          this.selectedWeekOff && this.selectedWeekOff.length > 0
            ? this.selectedWeekOff.map(option => option.value)
            : ['Sunday'];

        const data = {
          weeklyOff: weeklyOffArray
        };

        // Send the PUT request to update the weekly off days for the user.
        const res = await axiosClient.put(
          `/api/v1/settings/weekly_off/update/${this.user._id}`,
          data
        );

        if (res.status === 200) {
          toast.success('Weekly Off Updated Successfully!', { autoClose: 3000 });
          // Refresh the weekly off settings
          await this.fetchWeeklyOffSettings();
        } else if (res.status === 201) {
          toast.error('Weekly Off Not Found!', { autoClose: 3000 });
        } else if (res.status === 500) {
          toast.error('Internal Error!', { autoClose: 3000 });
        }
      } catch (err) {
        console.error('Error saving weekly off:', err);
        const errorMessage = err.response?.data?.message || 'Failed to update weekly off settings';
        toast.error(errorMessage, { autoClose: 3000 });
      }
    },

    async retrieveLeaveData() {
      try {
        const res = await axiosClient.get("/api/v1/settings/get", {
          params: { client_id: this.user._id },
        });

        if (res.status === 200 && res.data.length > 0) {
          const leaveRecord = res.data[0]; // Since only one record will be retrieved

          // Update clDays, slDays, plDays with the first value of each array
          this.clDays = leaveRecord.leaves.cl.length > 0 ? parseInt(leaveRecord.leaves.cl[0]) : 0;
          this.slDays = leaveRecord.leaves.sl.length > 0 ? parseInt(leaveRecord.leaves.sl[0]) : 0;
          this.plDays = leaveRecord.leaves.pl.length > 0 ? parseInt(leaveRecord.leaves.pl[0]) : 0;

          console.log("Updated Leave Days:", { clDays: this.clDays, slDays: this.slDays, plDays: this.plDays });
        } else {
          toast.error("No leave data found!", { autoClose: 1000 });
        }
      } catch (err) {
        console.error("Error retrieving leave data:", err);
        toast.error("Internal Error!", { autoClose: 1000 });
      }
    },

    async submitLeaveDays() {
    try {
      const leaveData = {
        client_id: this.user._id,
        leaves: {
          sl: {
            balance: this.slDays > 0 ? String(this.slDays) : "0",
            absentDates: []  // initially empty; you can update this later as needed
          },
          
          cl: {
            balance: this.clDays > 0 ? String(this.clDays) : "0",
            absentDates: []  
          },
          pl: {
            balance: this.plDays > 0 ? String(this.plDays) : "0",
            absentDates: []  
          },
        },
      };

      console.log("Submitting leaveData:", leaveData);

      const res = await axiosClient.post("/api/v1/settings/add", leaveData);

      if (res.status === 200 || res.status === 201) {
        toast.success("Leave Days Updated Successfully!", { autoClose: 1000 });
      } else {
        toast.error("Failed to Update Leave Days!", { autoClose: 1000 });
      }

    } catch (err) {
      console.error("Error submitting leave days:", err);
      toast.error("Internal Error!", { autoClose: 1000 });
    }
  },

  async loadEmployeesForHolidayAssignment() {
    try {
      const res = await axiosClient.get(`/api/v1/employee/client/${this.user._id}`);
      if (res.data && Array.isArray(res.data.data)) {
        // Get the first weekly off day as default
        const defaultHolidayDay = this.weeklyOffDays && this.weeklyOffDays.length > 0 
          ? this.weeklyOffDays[0] 
          : '';
        
        // Build a map of previously saved assignments for quick lookup
        const savedAssignmentMap = {};
        if (Array.isArray(this.employeeHolidayAssignments)) {
          this.employeeHolidayAssignments.forEach(assign => {
            savedAssignmentMap[assign.employeeId || ''] = assign;
          });
        }
        
        // Prefill employees from previously saved assignments OR default values
        this.employees = res.data.data.map(emp => {
          const savedAssign = savedAssignmentMap[emp._id];
          return {
            ...emp,
            holidayDay: savedAssign ? savedAssign.holidayDay : defaultHolidayDay,
            remarks: savedAssign ? savedAssign.remarks : ''
          };
        });
      }
    } catch (err) {
      console.error('Error loading employees:', err);
      toast.error('Failed to load employees!', { autoClose: 1000 });
    }
  },

  async saveEmployeeHolidayAssignments() {
    try {
      // Filter employees who have been assigned a holiday day
      const assignedEmployees = this.employees.filter(emp => emp.holidayDay);
      
      if (assignedEmployees.length === 0) {
        toast.warning('Please assign at least one holiday!', { autoClose: 1000 });
        return;
      }

      // Prepare the payload for the backend
      const payload = {
        employeeHolidayAssignments: assignedEmployees.map(emp => ({
          employeeId: emp._id || null,
          employeeName: emp.name,
          holidayDay: emp.holidayDay,
          remarks: emp.remarks || '',
        })),
      };

      // Call backend API to save
      const response = await axiosClient.put(
        `api/v1/settings/employee_holiday_assignments/update/${this.user._id}`,
        payload
      );

      if (response.data) {
        // Store locally as well
        this.employeeHolidayAssignments = payload.employeeHolidayAssignments;
        toast.success('Holiday assignments saved successfully!', { autoClose: 1000 });

        // Refresh settings from server to ensure frontend reflects the canonical saved doc
        try {
          const refreshRes = await axiosClient.get(`/api/v1/settings/holiday/to_from/${this.user._id}`);
          if (refreshRes.data && Array.isArray(refreshRes.data.data) && refreshRes.data.data.length > 0) {
            const serverAssignments = refreshRes.data.data[0].employeeHolidayAssignments || [];
            if (Array.isArray(serverAssignments) && serverAssignments.length > 0) {
              this.employeeHolidayAssignments = serverAssignments;
            }
          }
        } catch (refreshErr) {
          console.warn('Failed to refresh settings after save:', refreshErr);
        }
      }
    } catch (err) {
      console.error('Error saving assignments:', err);
      toast.error('Failed to save assignments!', { autoClose: 1000 });
    }
  },

downloadWeeklyHolidayExcel() {
      try {
        if (this.employeeHolidayAssignments.length === 0) {
          toast.error('No assignments to download!', { autoClose: 1000 });
          return;
        }

        const shopName = this.user.name || 'Establishment';
        const shopAddress = this.user.address || ''; // Get address from user
        const registrationNo = this.registrationNumber || '';
        const today = new Date();
        const dateStr = today.toLocaleDateString('en-IN');

        // Create ExcelJS workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Weekly Holiday Notice');

        // Hide gridlines
        worksheet.views = [{ showGridLines: false }];

        // Set margins
        worksheet.margins = {
          left: 0.7,
          right: 0.7,
          top: 0.75,
          bottom: 0.75
        };

        // Set column widths - Column A is blank for left spacing
        worksheet.columns = [
          { width: 3 },   // Column A: blank spacing on left (no gridlines)
          { width: 12 },  // Column B: Sl. No.
          { width: 40 },  // Column C: Name of Employee
          { width: 28 },  // Column D: Holiday Day
          { width: 20 }   // Column E: Remarks
        ];

        // Helper function to apply white background and settings to all cells in a row
        const applyRowStyle = (row, config = {}) => {
          row.eachCell((cell) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
            if (config.font) cell.font = config.font;
            if (config.alignment) cell.alignment = config.alignment;
            if (config.border) cell.border = config.border;
          });
        };

        // Remove borders from column A cells to hide gridlines
        const applyLeftMarginStyle = (row) => {
          const cellA = row.getCell(1);
          cellA.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
          cellA.border = { left: { style: 'none' }, right: { style: 'none' }, top: { style: 'none' }, bottom: { style: 'none' } };
        };

        const thinBorder = {
          left: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } },
          top: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } }
        };

        // Row 1: Empty left margin
        const row1 = worksheet.addRow(['', '', '', '', '']);
        applyLeftMarginStyle(row1);

        // Row 2: FORM XXVI Title
        const titleRow = worksheet.addRow(['', 'FORM XXVI', '', '', '']);
        applyRowStyle(titleRow, {
          font: { bold: true, size: 16 },
          alignment: { horizontal: 'center', vertical: 'center' }
        });
        applyLeftMarginStyle(titleRow);
        worksheet.mergeCells('B2:E2');
        titleRow.height = 25;

        // Row 3: [See Rule 31 (3b)]
        const subtitleRow = worksheet.addRow(['', '[See Rule 31 (3b)]', '', '', '']);
        applyRowStyle(subtitleRow, {
          font: { size: 13 },
          alignment: { horizontal: 'center', vertical: 'center' }
        });
        applyLeftMarginStyle(subtitleRow);
        worksheet.mergeCells('B3:E3');
        subtitleRow.height = 20;

        // Row 4: Notice of weekly holiday
        const noticeRow = worksheet.addRow(['', 'Notice of weekly holiday', '', '', '']);
        applyRowStyle(noticeRow, {
          font: { size: 12, italic: true },
          alignment: { horizontal: 'center', vertical: 'center' }
        });
        applyLeftMarginStyle(noticeRow);
        worksheet.mergeCells('B4:E4');
        noticeRow.height = 20;

        // Row 5: Empty spacing
        const row5 = worksheet.addRow(['', '', '', '', '']);
        applyLeftMarginStyle(row5);

        // Row 6: Establishment name and address (combined on same line)
        const estRow = worksheet.addRow(['', '', '', '', '']);
        const estCell = estRow.getCell(2);
        
        // Create rich text with mixed formatting
        const prefix = 'Name and address of Establishment: ';
        const shopDetails = shopAddress ? `${shopName}, ${shopAddress}` : shopName;
        
        estCell.value = {
          richText: [
            { font: { size: 12 }, text: prefix },
            { font: { bold: true, size: 12 }, text: shopDetails }
          ]
        };
        
        estCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
        estCell.alignment = { horizontal: 'left', vertical: 'top', wrapText: true };
        
        worksheet.mergeCells('B6:E6');
        estRow.height = 35;
        applyLeftMarginStyle(estRow);

        // Row 7: Registration Number
        const regRow = worksheet.addRow(['', '', '', '', '']);
        const regCell = regRow.getCell(2);
        
        regCell.value = {
          richText: [
            { font: { size: 12 }, text: 'Registration No.        ' },
            { font: { bold: true, size: 12 }, text: registrationNo }
          ]
        };
        
        regCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
        regCell.alignment = { horizontal: 'left', vertical: 'center' };
        
        worksheet.mergeCells('B7:E7');
        regRow.height = 20;
        applyLeftMarginStyle(regRow);

        // Row 8: Empty spacing
        const row8 = worksheet.addRow(['', '', '', '', '']);
        applyLeftMarginStyle(row8);

        // Row 9: Intro text
        const introRow = worksheet.addRow(['', 'The person(s) employed in this Establishment shall be given a holiday on the day specified below in the week following the date of this notice and every week until further notice.', '', '', '']);
        applyRowStyle(introRow, {
          font: { size: 12 },
          alignment: { horizontal: 'center', vertical: 'center', wrapText: true }
        });
        applyLeftMarginStyle(introRow);
        worksheet.mergeCells('B9:E9');
        introRow.height = 30;

        // Row 10: Empty spacing
        const row10 = worksheet.addRow(['', '', '', '', '']);
        applyLeftMarginStyle(row10);

        // Row 11: Headers
        const headerRow = worksheet.addRow(['', 'Sl. No.', 'Name of the Employee', 'Day on which holiday is allowed', 'Remarks']);
        applyRowStyle(headerRow, {
          font: { bold: true, size: 12 },
          alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
          border: thinBorder
        });
        applyLeftMarginStyle(headerRow);
        headerRow.height = 28;

        // Add employee data rows
        const minRows = 10;
        this.employeeHolidayAssignments.forEach((emp, idx) => {
          const dataRow = worksheet.addRow(['', idx + 1, emp.employeeName || '', emp.holidayDay || '', emp.remarks || '']);
          applyRowStyle(dataRow, {
            font: { size: 11 },
            border: thinBorder
          });
          applyLeftMarginStyle(dataRow);
          // Center align serial number
          dataRow.getCell(2).alignment = { horizontal: 'center', vertical: 'center' };
          dataRow.height = 20;
        });

        // Add blank rows to match minimum
        const blanksNeeded = Math.max(0, minRows - this.employeeHolidayAssignments.length);
        for (let i = 0; i < blanksNeeded; i++) {
          const blankRow = worksheet.addRow(['', '', '', '', '']);
          applyRowStyle(blankRow, { border: thinBorder });
          applyLeftMarginStyle(blankRow);
          blankRow.height = 20;
        }

        // Add spacing rows
        const spacer1 = worksheet.addRow(['', '', '', '', '']);
        applyLeftMarginStyle(spacer1);
        const spacer2 = worksheet.addRow(['', '', '', '', '']);
        applyLeftMarginStyle(spacer2);

        // Add Date and Signature row
        const sigRow = worksheet.addRow(['', `Date: ${dateStr}`, '', '', 'Signature of Employer']);
        applyRowStyle(sigRow, {
          font: { size: 12 },
          alignment: { horizontal: 'left', vertical: 'center' }
        });
        applyLeftMarginStyle(sigRow);
        sigRow.height = 20;

        // Write workbook to file
        workbook.xlsx.writeBuffer().then(buffer => {
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, 'Weekly_Holiday_Notice_FORM_XXVI.xlsx');
          toast.success('Weekly holiday notice downloaded successfully!', { autoClose: 1000 });
        });
      } catch (err) {
        console.error('Error downloading Excel:', err);
        toast.error('Failed to download document!', { autoClose: 1000 });
      }
    },

    async downloadHolidaysListWord() {
      try {
        if (this.holidays.length === 0) {
          toast.error('No holidays to download!', { autoClose: 1000 });
          return;
        }

        const shopName = this.user.name || 'Establishment';
        const shopAddress = this.user.address || '';
        const registrationNo = this.registrationNumber || '';
        const currentYear = new Date().getFullYear();

        // Build table rows for docx
        const tableRows = [
          // Header row
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: 'Sr. No.', bold: true })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 10, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: 'Name of the Holiday', bold: true })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 40, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: 'Date', bold: true })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 25, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                },
              }),
              new TableCell({
                children: [new Paragraph({
                  children: [new TextRun({ text: 'Remarks', bold: true })],
                  alignment: AlignmentType.CENTER
                })],
                width: { size: 25, type: WidthType.PERCENTAGE },
                borders: {
                  top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                },
              }),
            ],
          }),
          // Data rows
          ...this.holidays.map((holiday, idx) => {
            const holidayDate = holiday.holidayDate 
              ? new Date(holiday.holidayDate).toLocaleDateString('en-IN') 
              : '';
            
            return new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ text: String(idx + 1), alignment: AlignmentType.CENTER })],
                  width: { size: 10, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: holiday.name || '' })],
                  width: { size: 40, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: holidayDate, alignment: AlignmentType.CENTER })],
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ text: '' })],
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    left: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                    right: { style: BorderStyle.SINGLE, size: 1, color: '000000' },
                  },
                }),
              ],
            });
          }),
        ];

        // Create document sections
        const sections = [{
          children: [
            // Header
            new Paragraph({
              children: [
                new TextRun({
                  text: 'FORM XXVIII',
                  bold: true,
                  size: 32,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '[See sub-Rule (7) of Rule 31]',
                  bold: true,
                  size: 22,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `List of Holidays with Wages for the Year ending December ${currentYear}`,
                  bold: true,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            
            // Establishment details
            new Paragraph({
              children: [
                new TextRun({ text: 'Name of the Establishment: ', bold: true }),
                new TextRun(shopName),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Registration No: ', bold: true }),
                new TextRun(registrationNo),
              ],
              spacing: { after: 100 },
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'Address: ', bold: true }),
                new TextRun(shopAddress),
              ],
              spacing: { after: 200 },
            }),
            
            // Table
            new Table({
              rows: tableRows,
              width: { size: 100, type: WidthType.PERCENTAGE },
            }),
            
            // Signature line
            new Paragraph({
              text: '',
              spacing: { after: 600 },
            }),
            new Paragraph({
              text: '______________________',
              alignment: AlignmentType.RIGHT,
            }),
            new Paragraph({
              text: 'Signature of the Employer',
              alignment: AlignmentType.RIGHT,
              size: 22,
            }),

            // Footer
            new Paragraph({
              text: '',
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: 'To,',
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: 'The Inspector,',
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: 'Goa Daman & Diu,',
              spacing: { after: 100 },
            }),
            new Paragraph({
              text: 'Shops & Establishments Act, 1973',
              spacing: { after: 100 },
            }),
          ],
        }];

        const doc = new Document({ sections });
        const blob = await Packer.toBlob(doc);
        
        saveAs(blob, `Holidays_List_${currentYear}.docx`);
        toast.success('Holidays list downloaded successfully!', { autoClose: 1000 });
      } catch (err) {
        console.error('Error downloading Word document:', err);
        toast.error('Failed to download document!', { autoClose: 1000 });
      }
    },

    async getCurrent() {
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);
        if (!token) {
          this.$router.push('/login');
        }
        this.user = token.data.user;
        this.userId = token.data.user._id;
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }

      return;
    }
  }
};
</script>
