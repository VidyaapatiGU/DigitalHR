<style scoped>
.main h-100 {
}

.form-container {
  width: 100%;
  max-width: 1000px;
  padding: 15px;
  margin: auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
}

.form-document {
  width: 100%;
  max-width: 1000px;
  padding: 15px;
  margin: auto;
  background-color: #fff;

  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
}

.form-container2 {
  width: 100%;
  max-width: 700px;
  padding: 15px;
  margin: auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
}

.form-control {
  background-color: #f8f9fa;

  color: #333;
}

.form-control:focus {
  box-shadow: inset 2px 2px 5px #e9ecef, inset -2px -2px 5px #ffffff, 0 0 10px #007bff;
}

@media (max-width: 576px) {
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
  .form-container {
    padding: 30px;
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>

<template>
  <div class="main h-100">
    <div class="border-bottom px-4 d-flex justify-content-between">
      <div>
        <h5 class="pt-2 hind-medium source-500 page-title">Update Client</h5>
      </div>
      <div class="d-flex align-items-center capitalize source-400">
        <div v-auto-animate class="border-end px-2">
          <span
            @click="handleUpdateDocuments(false)"
            class="pointer"
            v-if="UpdateDocuments == true"
          >
            details
          </span>
          <span class="text-secondary opacity-50" v-if="UpdateDocuments == false">details</span>
        </div>
        <div v-auto-animate class="px-2">
          <span
            @click="handleUpdateDocuments(true)"
            class="pointer"
            v-if="UpdateDocuments == false"
          >
            documents
          </span>
          <span class="text-secondary opacity-50" v-if="UpdateDocuments == true">documents</span>
        </div>
      </div>
    </div>

    <div v-auto-animate class="overflow-y-hidden pb-5 h-100">
      <div v-if="UpdateDocuments == false" v-auto-animate class="h-100 overflow-y-auto">
        <div
          v-auto-animate
          class="container h-100 py-3 d-flex justify-content-center align-items-start align-items-sm-center"
        >
          <form v-if="formPage == 1" v-auto-animate class="form-container border rounded-3">
            <div class="d-flex justify-content-center">
              <div class="w-100">
                <h4 class="text-center source-600 text-dark mb-4">Client Information</h4>
              </div>
            </div>
            <div class="row source-400">
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="name source-500" class="">
                  Name
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control border"
                  id="name"
                  placeholder="Enter Name"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="email" class="mt-2 mt-sm-0">
                  Company Email
                  <span class="text-danger">*</span>
                </label>
                <input
                  disabled
                  v-model="form.email"
                  type="email"
                  class="form-control border"
                  id="email"
                  placeholder="Enter Company Email"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="phone_number source-500" class="mt-2 mt-sm-0">
                  WhatsApp Number
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.whatsapp_no"
                  type="number"
                  class="form-control border"
                  id="phone_number"
                  placeholder="Enter WhatsApp Number"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="city" class="mt-2">
                  City
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.city"
                  type="text"
                  class="form-control border"
                  id="city"
                  placeholder="Enter city"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="state" class="mt-2">
                  State
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.state"
                  type="text"
                  class="form-control border"
                  id="state"
                  placeholder="Enter state"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="country" class="mt-2">
                  Country
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.country"
                  type="text"
                  class="form-control border"
                  id="country"
                  placeholder="Enter country"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="address" class="mt-2">
                  Address
                  <span class="text-danger">*</span>
                </label>
                <textarea
                  v-model="form.address"
                  type="text"
                  class="form-control border"
                  id="address"
                  placeholder="Enter address"
                />
              </div>
              <div class="form-group col-12 col-sm-6 col-lg-4">
                <label for="pin_code" class="mt-2">
                  Pin Code
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.pin_code"
                  @input="validatePinCode"
                  type="text"
                  class="form-control border"
                  id="pin_code"
                  placeholder="Enter pin code"
                />
              </div>
            </div>

            <div class="w-100 d-flex justify-content-center align-items-center gap-2">
              <button
                v-if="formPage == 1"
                @click="validateFormPage1"
                type="button"
                class="btn btn-primary border-0 button_bg source-500 text-light mt-4 px-5"
              >
                Next
              </button>
            </div>
          </form>
          <!-- /////////////////////////////////////////////////////////////////////// -->
          <form v-if="formPage == 2" v-auto-animate class="form-container2 border rounded-3">
            <div class="d-flex justify-content-center">
              <div class="ps-3">
                <i @click="formPage = 1" class="bi bi-arrow-left icon-font-2 pointer"></i>
              </div>
              <div class="w-100 pe-3">
                <h4 class="text-center source-600 text-dark mb-4">Client Details</h4>
              </div>
            </div>

            <div class="row source-400">
              <div class="form-group col-12 col-sm-6">
                <div class="mt-3">
                  <label for="incorporation_type" class="">
                    Incorporation Type
                    <span class="text-danger">*</span>
                  </label>
                  <multiselect
                    class=""
                    v-model="form.incorporation_type"
                    :options="incorporation_typeOptions"
                    placeholder="Select Incorporation Type"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group col-12 col-sm-6">
                <div class="mt-3">
                  <label for="industry_type" class="">
                    Industry Type
                    <span class="text-danger">*</span>
                  </label>
                  <multiselect
                    v-model="form.industry_type"
                    :options="industry_typeOptions"
                    placeholder="Select Industry Type"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group col-12 col-sm-6">
                <label for="pan_card" class="mt-2">
                  Pan Card
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.pan_card"
                  type="text"
                  class="form-control border"
                  id="pan_card"
                  placeholder="Enter Pan Number"
                />
              </div>
              <!-- <div class="form-group col-12 col-sm-6">
                <label for="adhar_card" class="mt-2">
                  Adhar Card
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.adhar_card"
                  type="text"
                  class="form-control border"
                  id="adhar_card"
                  placeholder="Enter Adhar Number"
                />
              </div> -->
              <div class="form-group col-12 col-sm-6">
                <label for="pan_card" class="mt-2">
                  Number Of Employees
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.employee_count_range"
                  type="text"
                  class="form-control border"
                  id="pan_card"
                  placeholder="Enter Number Of Employees"
                />
              </div>
              <div class="form-group col-12 col-sm-6">
                <label for="gst_no" class="mt-2">GST Number</label>
                <input
                  v-model="form.gst_no"
                  type="text"
                  class="form-control border"
                  id="gst_no"
                  placeholder="Enter GST Number"
                />
              </div>

              <div class="form-group col-12 col-sm-6">
                <label for="cin_no" class="mt-2">CIN Number</label>
                <input
                  v-model="form.cin_no"
                  type="text"
                  class="form-control border"
                  id="cin_no"
                  placeholder="Enter CIN Number"
                />
              </div>
              <div class="form-group col-12 col-sm-6">
                <div class="form-check">
                  <input
                    v-model="form.pf_enable"
                    type="checkbox"
                    class="form-check-input"
                    id="pf_enable"
                  />
                  <label class="form-check-label" for="pf_enable">PF Enabled?</label>
                </div>
              </div>
              <div class="form-group col-12 col-sm-6">
                <div class="form-check">
                  <input
                    v-model="form.esic_enable"
                    type="checkbox"
                    class="form-check-input"
                    id="esic_enable"
                  />
                  <label class="form-check-label" for="esic_enable">ESCI Enabled?</label>
                </div>
              </div>
            </div>

            <div class="w-100 d-flex justify-content-center align-items-center">
              <button
                v-if="formPage == 2"
                @click="validateFormPage2"
                type="button"
                class="btn btn-primary border-0 button_bg source-500 text-light mt-4 px-5"
              >
                Next
              </button>
            </div>
          </form>
          <!-- /////////////////////////////////////////////////////////////////////// -->
          <form v-if="formPage == 3" v-auto-animate class="form-container2 border rounded-3">
            <div class="d-flex justify-content-center">
              <div class="ps-3">
                <i @click="formPage = 2" class="bi bi-arrow-left icon-font-2 pointer"></i>
              </div>
              <div class="w-100 pe-3">
                <h4 class="text-center source-600 text-dark mb-4">Update Contact</h4>
              </div>
            </div>

            <div class="row source-400">
              <div class="form-group col-12 col-md-6">
                <label for="contact_person.name" class="mt-2">
                  Conatact Name
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.contact_person.name"
                  type="text"
                  class="form-control border"
                  id="contact_person.name"
                  placeholder="Enter Contact Name"
                />
                <label for="contact_person.contact_no" class="mt-2">
                  Conatct Number
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model.number="form.contact_person.contact_no"
                  type="number"
                  class="form-control border"
                  id="contact_person.contact_no"
                  placeholder="Enter Conatct Number"
                />
              </div>
              <div class="form-group col-12 col-md-6">
                <label for="contact_person.email" class="mt-2">
                  Conatct Email
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.contact_person.email"
                  type="email"
                  class="form-control border"
                  id="contact_person.email"
                  placeholder="Enter Conatct Email "
                />
                <label for="contact_person.designation" class="mt-2">
                  Contact Designation
                  <span class="text-danger">*</span>
                </label>
                <input
                  v-model="form.contact_person.designation"
                  type="text"
                  class="form-control border"
                  id="contact_person.designation"
                  placeholder="Enter Pan Number"
                />
              </div>
            </div>

            <div class="w-100 d-flex justify-content-center align-items-center">
              <button
                v-if="formPage == 3"
                @click="handleUpadateClient"
                type="button"
                class="btn btn-primary border-0 button_bg source-500 text-light mt-4 px-5"
              >
                Update Client
              </button>
            </div>
          </form>
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
                    <butto @click="uploadFile" type="button" class="btn btn-dark btn-sm">Add</butto>
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <div
                class="d-flex justify-content-around capitalize source-600 animate rounded py-1 pointer px-4 mb-2"
                v-if="client.adhar_proof == true"
              >
                <div>adhar proof</div>
                <div>
                  <button
                    @click="handleDeleteDocument(client.adhar_proof_url_id, 'adhar')"
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                class="d-flex justify-content-around capitalize source-600 animate rounded py-1 pointer px-4 mb-2"
                v-if="client.pan_proof == true"
              >
                <div>pan proof</div>
                <div>
                  <button
                    type="button"
                    @click="handleDeleteDocument(client.pan_proof_url_id, 'pan')"
                    class="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                class="d-flex justify-content-around capitalize source-600 animate rounded py-1 pointer px-4 mb-2"
                v-if="client.cin_proof == true"
              >
                <div>cin proof</div>
                <div>
                  <button
                    type="button"
                    @click="handleDeleteDocument(client.cin_proof_url_id, 'cin')"
                    class="btn btn-outline-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div
                class="d-flex justify-content-around capitalize source-600 animate rounded py-1 pointer px-4 mb-2"
                v-if="client.gst_proof == true"
              >
                <div>gst proof</div>
                <div>
                  <button
                    type="button"
                    @click="handleDeleteDocument(client.gst_proof_url_id, 'gst')"
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
</template>

<script>
import axiosClient from '../../axiosClient';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import UpdateDocuments from './UpdateDocuments.vue';

export default {
  name: 'SignUp',
  components: {
    Multiselect,
  },
  props: {
    clientId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formPage: 1,
      isLoading: false,
      UpdateDocuments: false,
      client: '',
      form: {
        user_id: '66d7f425ad326a6f50ef00d5',
        name: '',
        email: '',
        whatsapp_no: '',
        password: '',
        address: '',
        pan_card: '',
        adhar_card: '',
        gst_no: '',
        cin_no: '',
        team: '',
        city: '',
        state: '',
        country: '',
        pin_code: '',
        department: '',
        roleType: '',
        industry_type: '',
        employee_count_range: '',
        incorporation_type: '',
        document_type: '',
        doc_url: '',
        contact_person: {
          name: '',
          email: '',
          contact_no: '',
          designation: '',
        },
      },
      selected_roleType: '',
      selected_team: '',
      selected_department: '',
      departments: [],
      roles: [],
      teams: [],
      /*  documentOptions: ['pan', 'adhar', 'gst', 'cin'], */
      documentOptions: [],
      industry_typeOptions: ['Factories', 'Restaurants', 'Hotels', 'IT Company'],
      incorporation_typeOptions: [
        'Proprietory Firm',
        'Partnership Firm',
        'LLP',
        'Private Limited',
        'Public Limited',
        'Local Bodies / Municipal Corporations',
        'State Govt. Controlled',
        'State Govt. Department',
        'Co-Operative Society',
        'Registered Society',
        'Firms Run by Trust',
      ],
      submitedDocuments: [
        { document_typ: 'pan', uploaded: false },
        { document_typ: 'adhar', uploaded: false },
        { document_typ: 'gst', uploaded: false },
        { document_typ: 'cin', uploaded: false },
      ],
    };
  },

  async created() {
    const UpdateDocuments = localStorage.getItem('UpdateDocuments');
    if (UpdateDocuments) {
      this.UpdateDocuments = JSON.parse(UpdateDocuments);
    }
    this.getCurrent();
    try {
      try {
        const clientRes = await axiosClient.get(`/api/v1/client/get/${this.clientId}`);
        const clientData = clientRes.data.data[0];
        this.client = clientRes.data.data[0];
        console.log('res: ', clientData);

        this.client = clientData;
        console.log('client: ', this.client);

        console.log('form: ', this.form);
        this.form = {
          user_id: clientData.user_id || '',
          pf_enable: clientData.pf_enable,
          esic_enable: clientData.esic_enable,
          name: clientData.name || '',
          email: clientData.email || '',
          whatsapp_no: clientData.whatsapp_no || '',
          pin_code: clientData.pin_code || '',
          country: clientData.country || '',
          state: clientData.state || '',
          city: clientData.city || '',
          address: clientData.address || '',
          /*  pan_card: clientData.pan_card || '',
          adhar_card: clientData.adhar_card || '',
          gst_no: clientData.gst_no || '',
          cin_no: clientData.cin_no || '',
          industry_type: clientData.industry_type || '',
          employee_count_range: clientData.employee_count_range || '',
          contact_person: {
            name: clientData.contact_person.name || '',
            email: clientData.contact_person.email || '',
            contact_no: clientData.contact_person.contact_no || '',
            designation: clientData.contact_person.designation || '',
          },
          incorporation_type: clientData.incorporation_type || '', */
        };

        if (clientData.pan_card) this.form.pan_card = clientData.pan_card;
        /* if (clientData.adhar_card) this.form.adhar_card = clientData.adhar_card; */
        if (clientData.gst_no) this.form.gst_no = clientData.gst_no;
        if (clientData.cin_no) this.form.cin_no = clientData.cin_no;

        if (clientData.incorporation_type) {
          this.form.incorporation_type = clientData.incorporation_type;
        }
        if (clientData.industry_type) {
          this.form.industry_type = clientData.industry_type;
        }
        if (clientData.employee_count_range) {
          this.form.employee_count_range = clientData.employee_count_range;
        }

        if (clientData.contact_person) {
          console.log('clientData.contact_person: ', clientData.contact_person);
          if (clientData.contact_person.name) {
            this.form.contact_person.name = clientData.contact_person.name;
          }
          if (clientData.contact_person.email) {
            this.form.contact_person.email = clientData.contact_person.email;
          }
          if (clientData.contact_person.contact_no) {
            this.form.contact_person.contact_no = clientData.contact_person.contact_no;
          }
          if (clientData.contact_person.designation) {
            this.form.contact_person.designation = clientData.contact_person.designation;
          }
        }

        this.$nextTick(() => {
          console.log('Form Updated:', this.form);
        });
        console.log('form: ', this.form.name);
        const userRes = await axiosClient.get(`/api/v1/user/get/${clientData.user_id}`);

        const userData = userRes.data.data[0];
        this.form.address = userData.address;
      } catch (err) {}

      const departments = await axiosClient.get(`/api/v1/department/getall`);
      this.departments = departments.data.data;

      const roles = await axiosClient.get(`/api/v1/role/getall`);
      this.roles = roles.data.data;

      const teams = await axiosClient.get(`/api/v1/team/getall`);
      this.teams = teams.data.data;

      if (this.client.adhar_proof == false) this.documentOptions.push('adhar');
      if (this.client.gst_proof == false) this.documentOptions.push('gst');
      if (this.client.pan_proof == false) this.documentOptions.push('pan');
      if (this.client.cin_proof == false) this.documentOptions.push('cin');
    } catch (err) {}
  },

  mounted() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.form-container', {
      opacity: 0,
      y: 50,
      duration: 0.5,
      scrollTrigger: {
        trigger: '.form-container',
        delay: 0.5,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });
  },

  methods: {
    async handleDeleteDocument(document_proof_url, document_type) {
      console.log('delete document: ', document_proof_url, document_type);
      try {
        const res = await axiosClient.delete(
          `/api/v1/document/delete/${this.client.user_id}/${document_proof_url}/${document_type}`
        );
        this.documentOptions.push(document_type);
        console.log('res: ', res);
        toast.success('Document deleted successfully', {
          autoClose: 1500,
        });

        setTimeout(() => {
          this.$router.go(0);
        }, 2000);
        return;
      } catch (err) {
        console.log('error: ', err);
        toast.error('Failed to delete document', {
          autoClose: 1500,
        });
        return;
      }
    },

    handleUpdateDocuments(e) {
      this.UpdateDocuments = e;
      localStorage.setItem('UpdateDocuments', e);
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
          `/api/v1/document/upload/${this.form.document_type}/${this.client.user_id}`,
          formData
        );
        console.log(documentRes);
        this.form.document_url = documentRes.data.location.Location;
        this.form.document_url_id = documentRes.data.file_id;
        console.log('form', this.form);
        const res = await axiosClient.put(
          `/api/v1/client/update/document/${this.client.user_id}`,
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

    handleFile() {
      this.file = this.$refs.file.files[0];
      console.log(this.file);
    },

    async validatePinCode() {
      /* if (this.form.pin_code.length >= 6) {
        try {
          const res = await axiosClient.get(`https://dev.apiman.in/pincode/${this.form.pin_code}`);
          console.log('res: ', res);
          if (res.data[0]) {
            // this.form.city = res.data[0].PostOffice[0].name;
            this.form.state = res.data.PostOffice[0].State;
            this.form.country = res.data.PostOffice[0].Country;
          }
        } catch (err) {
          console.log('error: ', err);
        }
      } */
    },

    async handleUpadateClient() {
      console.log('form: ', this.form);
      if (this.validateFormPage3() == false) {
        return;
      }

      this.isLoading = true;

      try {
        const res = await axiosClient.put(`/api/v1/client/update/${this.clientId}`, this.form);
        console.log(res);

        if (res) {
          toast.success(`Client Updated Successfully`, {
            autoClose: 1500,
          });
        }

        setTimeout(() => {
          this.$router.push(`/manage/clients`);
        }, 2000);
      } catch (err) {
        console.log('error: ', err);
        if (err.response.status == 409) {
          toast.error(`User Already Exist`, {
            autoClose: 1500,
          });
        } else {
          toast.error(`Something Went Wrong`, {
            autoClose: 1500,
          });
        }
      }

      this.isLoading = false;
    },

    validateFormPage1() {
      console.log('validateForm');
      if (this.form.name == '') {
        toast.info(`Enter Name`, { autoClose: 1000 });
        return false;
      }
      if (this.form.whatsapp_no == '') {
        toast.info(`Enter Number`, { autoClose: 1000 });
        return false;
      }

      if (this.form.whatsapp_no.length < 10) {
        toast.info(`Enter valid Whatsapp Number`, { autoClose: 1000 });
        return false;
      }

      if (this.form.pin_code == '') {
        toast.info(`Enter Pin Code`, { autoClose: 1000 });
        return false;
      }
      if (this.form.city == '') {
        toast.info(`Enter city`, { autoClose: 1000 });
        return false;
      }
      if (this.form.state == '') {
        toast.info(`Enter state`, { autoClose: 1000 });
        return false;
      }
      if (this.form.country == '') {
        toast.info(`Enter country`, { autoClose: 1000 });
        return false;
      }
      if (this.form.address == '' || this.form.address.length < 10) {
        toast.info(`Enter address properly`, { autoClose: 1000 });
        return false;
      }

      this.formPage = 2;
    },

    validateFormPage2() {
      console.log('validateForm2');

      if (!this.form.pan_card || this.form.pan_card.length < 10) {
        toast.info(`Enter Valid Pan Id`, { autoClose: 1000 });
        return;
      }

      /* if (!this.form.adhar_card || this.form.adhar_card.length < 12) {
        toast.info(`Enter Valid Aadhar Number`, { autoClose: 1000 });
        return;
      } */

      /* if (!this.form.cin_no || this.form.cin_no === '') {
        toast.info(`Enter CIN Number`, { autoClose: 1000 });
        return;
      }

      if (!this.form.gst_no || this.form.gst_no === '') {
        toast.info(`Enter GST Number`, { autoClose: 1000 });
        return;
      } */

      if (!this.form.incorporation_type || this.form.incorporation_type === '') {
        toast.info(`Enter Incorporation Type`, { autoClose: 1000 });
        return;
      }

      if (!this.form.industry_type || this.form.industry_type === '') {
        toast.info(`Enter Industry Type`, { autoClose: 1000 });
        return;
      }

      if (!this.form.contact_person) {
        this.form.contact_person = {
          name: '',
          email: '',
          contact_no: '',
          designation: '',
        };
      }

      if (this.client.contact_person) {
        this.form.contact_person.name = this.client.contact_person.name;
        this.form.contact_person.email = this.client.contact_person.email;
        this.form.contact_person.contact_no = this.client.contact_person.contact_no;
        this.form.contact_person.designation = this.client.contact_person.designation;
      }
      console.log(this.form.contact_person);

      this.formPage = 3;
      console.log('validateForm2 successful', this.formPage);
    },

    validateFormPage3() {
      console.log('validateForm3');
      if (this.form.contact_person.name == '') {
        toast.info(`Enter Contact Person Name`, { autoClose: 1000 });
        return false;
      }
      if (this.form.contact_person.email == '') {
        toast.info(`Enter Contact Person Email`, { autoClose: 1000 });
        return false;
      }
      let re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(this.form.contact_person.email)) {
        toast.info(`Enter Valid Contact Person Email`, { autoClose: 1000 });
        return false;
      }
      if (this.form.contact_person.contact_no == '') {
        toast.info(`Enter Contact Person Number`, { autoClose: 1000 });
        return false;
      }
      if (this.form.contact_person.designation == '') {
        toast.info(`Enter Contact Person Designation`, { autoClose: 1000 });
        return false;
      }

      return true;
    },

    nameWithLang({ name }) {
      console.log(name);
      return `${name} `;
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
