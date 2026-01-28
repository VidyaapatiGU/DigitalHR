<style scoped>
.main {
  margin-top: 0px;
}

.edit-button {
  margin-right: 2px;
}

.varify-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 11px rgba(0, 0, 0, 0.5);
  box-shadow: 0 -8px -11px rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
}

.profile-image {
  width: 20vw;
  height: 20vw;
  object-fit: cover;
}
@media (max-width: 1199px) {
  .profile-image {
    width: 30vw;
    height: 30vw;
    object-fit: cover;
  }
}

@media (max-width: 600px) {
  .profile-image {
    width: 40vw;
    height: 40vw;
    object-fit: cover;
  }
}

@media (max-width: 400px) {
  .profile-image {
    width: 60vw;
    height: 60vw;
    object-fit: cover;
  }
}
</style>

<template>
  <div v-auto-animate class="main h-100">
    <div class="border-bottom px-4 d-flex justify-content-between">
      <div>
        <h5 class="pt-2 source-500 page-title">Update Employee</h5>
      </div>
      <div class="d-flex align-items-center capitalize source-400">
        <div v-auto-animate class="border-end px-2">
          <span
            @click="handleUpdateDocuments(false)"
            class="pointer"
            v-if="UpdateDocuments == true"
          >
            Details
          </span>
          <span class="text-secondary opacity-50" v-if="UpdateDocuments == false">Details</span>
        </div>
        <div v-auto-animate class="px-2">
          <span
            @click="handleUpdateDocuments(true)"
            class="pointer"
            v-if="UpdateDocuments == false"
          >
            Documents
          </span>
          <span class="text-secondary opacity-50" v-if="UpdateDocuments == true">Documents</span>
        </div>
      </div>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3">
          <div class="main2">
            <div class="container-xl px-4">
              <div v-if="UpdateDocuments == false" v-auto-animate class="row">
                <!--  <div class="col-xl-4">
                  <div v-auto-animate class="card mb-4 mb-xl-0">
                    <div class="card-header">Profile Picture</div>
                    <div
                      v-auto-animate
                      class="card-body text-center scroll d-flex justify-content-center"
                    >
                      <div>
                        <img
                          v-if="profile"
                          class="img-account-profile profile-image rounded-circle mb-2"
                          :src="profile"
                          alt="Profile Picture"
                        />
                        <img
                          v-else
                          class="img-account-profile rounded-circle mb-2"
                          src="../../assets/profile-circle.svg"
                          alt="Default Profile Picture"
                        />

                        <div class="small font-italic text-muted mb-4">
                          <h5>{{ form.name }}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
                <div class="col-xl-12">
                  <div class="card mb-4 scroll">
                    <div class="card-header">Employee Details</div>
                    <div class="card-body">
                      <div v-auto-animate>
                        <div class="row mb3">
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="name " class="mt-2">Name</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.name"
                              type="text"
                              class="form-control border"
                              id="name"
                              placeholder="Enter Name"
                            />
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="name " class="mt-2">Father/Husbands Name</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.fatherHusband_name"
                              type="text"
                              class="form-control border"
                              id="name"
                              placeholder="Enter Father/Husband Name"
                            />
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label class="small mb-1" for="name">Email</label>
                            <span class="text-danger">*</span>
                            <input
                              disabled
                              class="form-control"
                              id="email"
                              type="text"
                              v-model="form.email"
                            />
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="gender" class="mt-2">Gender</label>
                            <span class="text-danger">*</span>
                            <select v-model="form.gender" class="form-control border" id="gender">
                              <option disabled value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mt-2" for="designation">Designation</label>
                              <span class="text-danger">*</span>
                              <input
                                class="form-control"
                                id="designation"
                                type="text"
                                v-model="form.designation"
                              />
                            </div>
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mb-1" for="mobile_no">WhatsApp Number</label>
                              <span class="text-danger">*</span>
                              <input
                                class="form-control"
                                id="mobile_no"
                                type="text"
                                v-model="form.whatsapp_no"
                              />
                            </div>
                          </div>

                          <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mb-1" for="mobile_no">Date of Joining</label>
                              <span class="text-danger">*</span>
                              <input
                                class="form-control"
                                id="mobile_no"
                                type="date"
                                v-model="formattedDate"
                                @change="handleDateChange"
                              />
                            </div>
                          </div> -->

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mb-1" for="city">City</label>
                              <span class="text-danger">*</span>
                              <input
                                class="form-control"
                                id="city"
                                type="text"
                                v-model="form.city"
                              />
                            </div>
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mb-1" for="address">Address</label>
                              <span class="text-danger">*</span>
                              <textarea
                                class="form-control"
                                id="address"
                                type="text"
                                v-model="form.address"
                              />
                            </div>
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mb-1" for="state">State</label>
                              <span class="text-danger">*</span>
                              <input
                                class="form-control"
                                id="state"
                                type="text"
                                v-model="form.state"
                              />
                            </div>
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mb-1" for="country">Country</label>
                              <span class="text-danger">*</span>
                              <input
                                class="form-control"
                                id="country"
                                type="text"
                                v-model="form.country"
                              />
                            </div>
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="mt-2">
                              <label class="small mb-1" for="pin_code">Pin Code</label>
                              <span class="text-danger">*</span>
                              <input
                                class="form-control"
                                id="pin_code"
                                type="text"
                                v-model="form.pin_code"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-12 col-sm-6 col-md-4">
                          <label for="weekly_off" class="mt-2">Weekly Off</label>
                          <multiselect
                            v-model="form.weeklyOff"
                            :options="weekOffOptions"
                            placeholder="Select Weekly Off"
                            label="label"
                            track-by="value"
                            :multiple="true"
                          ></multiselect>
                        </div>
                        <hr />
                        <!-- ////////////////////////////////////////////////////////////////////////////////////////////////////////// -->

                        <div class="row source-400 mt-3">
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="Adhar " class="mt-2">Adhar No</label>
                            <span class="text-danger">*</span>
                            <input
                              disabled
                              v-model="form.adhar_card"
                              type="number"
                              class="form-control border"
                              id="Adhar"
                              placeholder="Enter ADHAR No"
                            />
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="UAN " class="mt-2">UAN No</label>
                            <input
                              v-model="form.uan_no"
                              type="number"
                              class="form-control border"
                              id="UAN"
                              placeholder="Enter UAN No"
                            />
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="PF" class="mt-2">PF No</label>
                            <input
                              v-model="form.pf_no"
                              type="number"
                              class="form-control border"
                              id="PF"
                              placeholder="Enter  PF No"
                            />
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="ESIC No" class="mt-2">ESIC No</label>
                            <input
                              v-model="form.esic_no"
                              type="number"
                              class="form-control border"
                              id="ESIC No"
                              placeholder="ESIC No"
                            />
                          </div>
                        </div>
                        <hr />
                        <div class="row source-400 mt-3">
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="Bank_name" class="mt-2">Bank Name</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.bank_name"
                              type="text"
                              class="form-control border"
                              id="Bank_name"
                              placeholder="Enter Bank Name"
                            />
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="bankAc" class="mt-2">Bank A/C No</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.bank_ac_no"
                              type="number"
                              class="form-control border"
                              id="bankAc"
                              placeholder="Enter Bank A/C No"
                            />
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="bankIfsc" class="mt-2">Bank IFSC</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.bank_ifsc"
                              type="text"
                              class="form-control border"
                              id="bankIfsc"
                              placeholder="Enter Bank IFSC"
                            />
                          </div>
                        </div>
                        <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for=" PFBasic" class="mt-2">PF Basic</label>
                            <input
                              v-model="form.pf_basic"
                              type="number"
                              class="form-control border"
                              id="PFBasic"
                              placeholder="Enter  PF Basic"
                            />
                          </div> -->
                        <hr />
                        <div class="row source-400 mt-3">
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="">
                              <label for=" number" class="mt-2">Basic</label>
                              <span class="text-danger">*</span>
                              <input
                                v-model="form.basic"
                                type="number"
                                class="form-control border"
                                id="Basic"
                                placeholder="Enter Basic"
                                @change="handleGrossCal"
                              />
                            </div>
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="">
                              <label for="  D.A" class="mt-2">D.A</label>
                              <span class="text-danger">*</span>
                              <input
                                v-model="form.da"
                                type="number"
                                class="form-control border"
                                id=" D.A"
                                placeholder="Enter D.A"
                                @change="handleGrossCal"
                              />
                            </div>
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="HRA  " class="mt-2">HRA</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.hra"
                              type="number"
                              class="form-control border"
                              id="HRA"
                              placeholder="Enter HRA"
                              @change="handleGrossCal"
                            />
                          </div>

                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for=" FoodAllow" class="mt-2">Food Allow</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.food_allow"
                              type="number"
                              class="form-control border"
                              id=" FoodAllow"
                              placeholder="Enter  Food Allow"
                              @change="handleGrossCal"
                            />
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="Conveyance" class="mt-2">Conveyance</label>
                            <span class="text-danger">*</span>
                            <input
                              v-model="form.conveyance"
                              type="number"
                              class="form-control border"
                              id="Conveyance"
                              placeholder="Enter Conveyance"
                              @change="handleGrossCal"
                            />
                          </div>
                          <div class="form-group col-12 col-sm-6 col-md-4">
                            <div class="">
                              <label for=" number" class="mt-2">Gross</label>
                              <span class="text-danger">*</span>
                              <input
                                v-model="form.gross"
                                type="number"
                                class="form-control border"
                                id="Basic"
                                placeholder="Enter Basic"
                              />
                            </div>
                          </div>
                          <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="EPF" class="mt-2">EPF</label>
                            <input
                              v-model="form.epf"
                              type="number"
                              class="form-control border"
                              id="EPF"
                              placeholder="Enter EPF"
                            />
                          </div> -->
                          <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="ESIC" class="mt-2">ESIC</label>
                            <input
                              v-model="form.esic"
                              type="number"
                              class="form-control border"
                              id="ESIC"
                              placeholder="Enter ESIC"
                            />
                          </div> -->

                          <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="E_EPF" class="mt-2">E_EPF</label>
                            <input
                              v-model="form.e_epf"
                              type="number"
                              class="form-control border"
                              id="E_EPF"
                              placeholder="Enter E_EPF"
                            />
                          </div> -->
                          <!-- <div class="form-group col-12 col-sm-6 col-md-4">
                            <label for="E_ESIC" class="mt-2">E_ESIC</label>
                            <input
                              v-model="form.e_esic"
                              type="number"
                              class="form-control border"
                              id="E_ESIC"
                              placeholder="Enter E_ESIC"
                            />
                          </div> -->
                          <div
                            class="form-group col-12 col-sm-6 col-md-4 d-flex align-items-center py-2"
                          >
                            <div class="form-check">
                              <input
                                v-model="form.lwf"
                                type="checkbox"
                                class="form-check-input"
                                id="LWF"
                              />
                              <label class="form-check-label" for="LWF">LWF</label>
                            </div>
                          </div>
                          <div
                            class="form-group col-12 col-sm-6 col-md-4 d-flex align-items-center py-2"
                          >
                            <div class="form-check">
                              <input
                                v-model="form.esi"
                                type="checkbox"
                                class="form-check-input"
                                id="ESIC"
                              />
                              <label class="form-check-label" for="LWF">ESIC</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-center align-items-center">
                    <button
                      @click="handleUpdate"
                      type="button"
                      class="btn-sm d-block d-sm-none btn btn-primary border-0 button_bg source-500 text-light mt-4 px-5"
                    >
                      Update
                    </button>
                    <button
                      @click="handleUpdate"
                      type="button"
                      class="d-none d-sm-block btn btn-primary border-0 button_bg source-500 text-light mt-4 px-5"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="UpdateDocuments == true" v-auto-animate class="h-100 overflow-y-auto">
                <div class="container h-100 py-3">
                  <div class="form-document rounded">
                    <div class="row mb-4">
                      <div class="form-group col-12 col-md-6">
                        <div class="">
                          <label for="incorporation_type" class="">Select Document Type</label>
                          <multiselect
                            class="text-capitalize"
                            v-model="form.document_type"
                            :options="documentOptions"
                            placeholder="Select Document "
                          ></multiselect>
                        </div>
                      </div>
                      <div class="form-group col-12 col-md-6 d-flex justify-content-end">
                        <div class="d-flex gap-4 w-100">
                          <div class="d-flex align-items-end w-100">
                            <label for="formFile" class=""></label>
                            <input
                              class="form-control"
                              accept="image/png, image/jpeg, application/pdf"
                              type="file"
                              id="file"
                              ref="file"
                              v-on:change="handleFile()"
                            />
                          </div>
                          <div class="d-flex align-items-end">
                            <butto @click="uploadFile" type="button" class="btn btn-dark btn-sm">
                              Add
                            </butto>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="">
                      <div
                        class="d-flex justify-content-around capitalize source-600 animate rounded py-1 pointer px-4 mb-2"
                        v-if="form.adhar_proof == true"
                      >
                        <div>adhar proof</div>
                        <div>
                          <button
                            @click="handleDeleteDocument(form.adhar_proof_url_id, 'adhar')"
                            type="button"
                            class="btn btn-outline-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-around capitalize source-600 animate rounded py-1 pointer px-4 mb-2"
                        v-if="form.asci_proof == true"
                      >
                        <div>pan proof</div>
                        <div>
                          <button
                            type="button"
                            @click="handleDeleteDocument(form.asci_proof_url_id, 'pan')"
                            class="btn btn-outline-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div
                        class="d-flex justify-content-around capitalize source-600 animate rounded py-1 pointer px-4 mb-2"
                        v-if="form.bank_proof == true"
                      >
                        <div>cin proof</div>
                        <div>
                          <button
                            type="button"
                            @click="handleDeleteDocument(form.bank_proof_url_id, 'cin')"
                            class="btn btn-outline-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import axiosClient from '../../axiosClient';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import UpdateDocuments from '../ManageClients/UpdateDocuments.vue';

export default {
  name: 'UpdateEmployee',
  components: {
    Multiselect,
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
      name: 'xyz',
      mobile_no: '11111111',
      email: 'xyz@gmail.com',
      UpdateDocuments: false,
      documentUploaded: false,
      profile_url: '',
      form: {
        _id: '',
        user_id: '',
        name: '',
        fatherHusband_name: '',
        gender: '',
        email: '',
        whatsapp_no: '',
        password: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pin_code: '',
        designation: '',
        date_of_joining: '',

        adhar_card: '',
        uan_no: '',
        pf_no: '',
        esic_no: '',
        bank_name: '',
        bank_ac_no: '',
        bank_ifsc: '',
        pf_basic: '',
        basic: '',
        gross: '',
        da: '',
        hra: '',
        food_allow: '',
        conveyance: '',
        epf: '',
        esic: '',
        lwf: '',
        e_epf: '',
        e_esic: '',
        document_type: '',

        adhar_proof: false,
        gst_proof: false,
        cin_proof: false,
        pan_proof: false,
        adhar_proof_url: '',
        gst_proof_url: '',
        cin_proof_url: '',
        pan_proof_url: '',
        weeklyOff: [],
      },
      file: '',
      documentOptions: [],
      placeholderTeam: '',
      placeholderDepartment: '',
      placeholderRoleType: '',
      token: '',
      selected_roleType: '',
      selected_team: '',
      selected_department: '',
      departments: [],
      roles: [],
      teams: [],
      weekOffOptions: [
        { label: 'Sunday', value: 'Sunday' },
        { label: 'Monday', value: 'Monday' },
        { label: 'Tuesday', value: 'Tuesday' },
        { label: 'Wednesday', value: 'Wednesday' },
        { label: 'Thursday', value: 'Thursday' },
        { label: 'Friday', value: 'Friday' },
        { label: 'Saturday', value: 'Saturday' }
      ],
    };
  },

  async created() {
    this.getCurrent();

    const UpdateDocuments = localStorage.getItem('UpdateDocuments');
    if (UpdateDocuments) {
      this.UpdateDocuments = JSON.parse(UpdateDocuments);
    }

    try {
      console.log('employeeId: ', this.employeeId);
      const employeeRes = await axiosClient.get(`/api/v1/employee/get/${this.employeeId}`);
      console.log('res1: ', employeeRes);
      const employeeData = employeeRes.data.data;

      if (employeeData) {
        this.form = {
          _id: employeeData._id,
          user_id: employeeData.user_id,
          name: employeeData.name,
          fatherHusband_name: employeeData.fatherHusband_name,
          gender: employeeData.gender || '',
          email: employeeData.email,
          whatsapp_no: employeeData.whatsapp_no,
          address: employeeData.address,
          city: employeeData.city,
          state: employeeData.state,
          country: employeeData.country,
          pin_code: employeeData.pin_code,
          designation: employeeData.designation,
          date_of_joining: employeeData.date_of_joining,
          adhar_card: employeeData.adhar_card,
          uan_no: employeeData.uan_no,
          pf_no: employeeData.pf_no,
          esic_no: employeeData.esic_no,
          bank_name: employeeData.bank_name,
          bank_ac_no: employeeData.bank_ac_no,
          bank_ifsc: employeeData.bank_ifsc,
          pf_basic: employeeData.pf_basic,
          basic: employeeData.basic,
          gross: employeeData.gross,
          da: employeeData.da,
          hra: employeeData.hra,
          food_allow: employeeData.food_allow,
          conveyance: employeeData.conveyance,
          epf: employeeData.epf,
          esic: employeeData.esic,
          lwf: employeeData.lwf,
          esi: employeeData.esi,
          e_epf: employeeData.e_epf,
          e_esic: employeeData.e_esic,
          adhar_proof: employeeData.adhar_proof,
          adhar_proof_url: employeeData.adhar_proof_url,
          adhar_proof_id: employeeData.adhar_proof_id,
          asci_proof: employeeData.asci_proof,
          asci_proof_url: employeeData.asci_proof_url,
          asci_proof_id: employeeData.asci_proof_id,
          bank_proof: employeeData.bank_proof,
          bank_proof_url: employeeData.bank_proof_url,
          bank_proof_id: employeeData.bank_proof_id,
          weeklyOff: employeeData.weeklyOff.map(day => {
            // Find the corresponding object from weekOffOptions
            return this.weekOffOptions.find(option => option.value === day) || { label: day, value: day };
          }),
        };
      }

      console.log('form: ', this.form);
      const departments = await axiosClient.get(`/api/v1/department/getall`);
      this.departments = departments.data.data;

      const roles = await axiosClient.get(`/api/v1/role/getall`);
      this.roles = roles.data.data;

      const teams = await axiosClient.get(`/api/v1/team/getall`);
      this.teams = teams.data.data;
      console.log('departments : ', this.departments);
      console.log('roles : ', this.roles);
      console.log('teams : ', this.teams);
      if (this.form.adhar_proof == false) this.documentOptions.push('adhar');
      if (this.form.asci_proof == false) this.documentOptions.push('asci');
      if (this.form.bank_proof == false) this.documentOptions.push('bank');
    } catch (err) {}
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.scroll', {
      opacity: 0,
      y: 50,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.scroll',
        delay: 0.5,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  },

  computed: {
    formattedDate() {
      //this.form.date_of_joining = this.form.date_of_joining.split('T')[0];
      return this.form.date_of_joining.split('T')[0]; // Converts to 'YYYY-MM-DD'
    },
  },

  methods: {
    handleGrossCal() {
      const gross = this.form.gross;
      const food_allow = this.form.food_allow;
      const basic = this.form.basic;
      const da = this.form.da;
      const hra = this.form.hra;
      const conveyance = this.form.conveyance;

      this.form.gross = food_allow + basic + da + hra + conveyance;
    },
    handleDateChange() {
      console.log('In handle Date Change');
      console.log(this.form.date_of_joining);
      this.form.date_of_joining = this.formattedDate;
      console.log(this.form.date_of_joining);
    },
    handleFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },
    async uploadFile() {
      if (this.form.document_type == '') {
        toast.error(`Please select document type`, {
          autoClose: 1500,
        });
        return;
      }
      if (this.file == undefined) {
        toast.error(`Please select file`, {
          autoClose: 1500,
        });
        return;
      }

      const formData = new FormData();
      formData.append('file', this.file);

      try {
        const documentRes = await axiosClient.post(
          `/api/v1/document/upload/${this.form.document_type}/${this.form.user_id}`,
          formData
        );
        console.log(documentRes);
        this.form.document_url = documentRes.data.location.Location;
        this.form.document_url_id = documentRes.data.file_id;
        console.log('form', this.form);
        const res = await axiosClient.put(
          `/api/v1/employee/update/document/${this.form.user_id}`,
          this.form
        );

        toast.success(`File uploaded successfully`, {
          autoClose: 1500,
        });

        setTimeout(() => {
          this.$router.go(0);
        }, 2000);

        for (let i = 0; i < this.submitedDocuments.length; i++) {
          if (this.submitedDocuments[i].document_typ == this.form.document_type) {
            this.submitedDocuments[i].uploaded = true;
          }
        }
        this.documentOoptions = this.documentOoptions.filter(
          (option) => option != this.form.document_type
        );
        this.documentUploaded = true;
        this.file = null;
        this.form.document_type = '';

        console.log('this.submitedDocuments: ', this.submitedDocuments);
      } catch (err) {
        console.log('error: ', err);
      }
    },

    async handleUpdate() {
      const UpdateDocuments = localStorage.getItem('UpdateDocuments');
      if (UpdateDocuments) {
        this.UpdateDocuments = JSON.parse(UpdateDocuments);
      }

      if (this.validateForm() == false) {
        return;
      }

      this.form.roleType = this.selected_roleType._id;
      this.form.department = this.selected_department._id;
      this.form.team = this.selected_team._id;
      
      this.form.weeklyOff = this.form.weeklyOff.map(option => option.value);

      try {
        const res = await axiosClient.put(`api/v1/employee/update/${this.form._id}`, this.form);

        if (res) {
          toast.success(`Employee Updated successfully`, {
            autoClose: 1500,
          });

          setTimeout(() => {
            this.$router.push('/manage/employees');
          }, 2000);
        }
      } catch (err) {
        console.log('error: ', err);
        if (err.response.status == 404) {
          toast.error(`User Does Not Exist`, {
            autoClose: 1500,
          });
        } else {
          toast.error(`Something Went Wrong`, {
            autoClose: 1500,
          });
        }
      }

      console.log(this.form);
    },

    handleUpdateDocuments(e) {
      this.UpdateDocuments = e;
      localStorage.setItem('UpdateDocuments', e);
    },

    validateForm() {
      if (this.form.name == '') {
        toast.info(`Enter Name`, { autoClose: 1000 });
        return false;
      }

      if (this.form.fatherHusband_name == '') {
        toast.info(`Enter Father/Husband Name`, { autoClose: 1000 });
        return false;
      }

      if (this.form.number == '') {
        toast.info(`Enter Number`, { autoClose: 1000 });
        return false;
      }
      if (this.form.email == '') {
        toast.info(`Enter Email`, { autoClose: 1000 });
        return false;
      }

      let re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.form.email)) {
        toast.info(`Enter Valid Email`, { autoClose: 1000 });
        return false;
      }

      if (this.form.designation == '') {
        toast.info(`Enter Designation`, { autoClose: 1000 });
        return false;
      }

      if (this.form.date_of_joining == '') {
        toast.info(`Enter Date of Joining`, { autoClose: 1000 });
        return false;
      }
      if (this.form.pin_code == '') {
        toast.info(`Enter Pin Code`, { autoClose: 1000 });
        return false;
      }

      if (this.form.city == '') {
        toast.info(`Enter City`, { autoClose: 1000 });
        return false;
      }

      if (this.form.state == '') {
        toast.info(`Enter State`, { autoClose: 1000 });
        return false;
      }

      if (this.form.country == '') {
        toast.info(`Enter Country`, { autoClose: 1000 });
        return false;
      }
      if (this.form.address == '') {
        toast.info(`Enter Address`, { autoClose: 1000 });
        return false;
      }

      return true;
    },

    async getCurrent() {
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);
        console.log('Token : ', token);
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
