<style scoped>
.main h-100 {
}

.form-container {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: auto;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
}

.form-group label {
  color: #333;
}

.form-control {
  background-color: #f8f9fa;
  border: none;
  border-radius: 10px;
  box-shadow: inset 2px 2px 5px #e9ecef, inset -2px -2px 5px #ffffff;
  color: #333;
}

.form-control:focus {
  box-shadow: inset 2px 2px 5px #e9ecef, inset -2px -2px 5px #ffffff, 0 0 10px #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  box-shadow: 2px 2px 5px #e9ecef, -2px -2px 5px #ffffff, 0 0 10px #0056b3;
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
    <div class="border-bottom px-4">
      <h5 class="pt-2 hind-medium source-500 page-title">Add Client</h5>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto d-flex justify-content-center align-items-center">
        <div class="container py-3">
          <form v-auto-animate class="form-container border shadow-lg rounded-3">
            <h5 v-if="formPage == 1" class="text-center source-600 text-dark mb-2">Add Details</h5>

            <div v-if="formPage == 1" class="row">
              <div class="form-group col-12 col-md-6">
                <label for="pan_card" class="source-500 mt-2">Pan Card</label>
                <input
                  v-model="form.pan_card"
                  type="text"
                  class="form-control border"
                  id="pan_card"
                  placeholder="Enter Pan Number"
                />

                <label for="gst_no" class="source-500 mt-2">GST Number</label>
                <input
                  v-model="form.gst_no"
                  type="number"
                  class="form-control border"
                  id="gst_no"
                  placeholder="Enter GST Number"
                />

                <div class="mt-3">
                  <label for="incorporation_type" class="source-500">Incorporation Type</label>
                  <multiselect
                    class=""
                    v-model="form.incorporation_type"
                    :options="incorporation_typeOptions"
                    placeholder="Select Incorporation Type"
                  ></multiselect>
                </div>
                <label for="employee_count_range" class="source-500 mt-2">
                  Number Of Employees
                </label>
                <input
                  v-model="form.employee_count_range"
                  type="number"
                  class="form-control border"
                  id="employee_count_range"
                  placeholder="Enter whatsapp number"
                />
              </div>
              <!-- /////////////////////////////////////////////////////////////////////////////////////////////////// -->
              <div class="form-group col-12 col-md-6">
                <label for="adhar_card" class="source-500 mt-2">Adhar Card</label>
                <input
                  v-model="form.adhar_card"
                  type="number"
                  class="form-control border"
                  id="adhar_card"
                  placeholder="Enter Adhar Number"
                />

                <label for="cin_no" class="source-500 mt-2">CIN Number</label>
                <input
                  v-model="form.cin_no"
                  type="number"
                  class="form-control border"
                  id="cin_no"
                  placeholder="Enter CIN Number"
                />
                <div class="mt-3">
                  <label for="industry_type" class="source-500">Industry Type</label>
                  <multiselect
                    v-model="form.industry_type"
                    :options="industry_typeOptions"
                    placeholder="Select Industry Type"
                  ></multiselect>
                </div>
              </div>
            </div>
            <div v-if="formPage == 2" class="mt-3 mb-2 source-600 d-flex gap-2">
              <div v-if="formPage == 2" @click="formPage = 1" class="pointer pb-2">
                <i class="bi bi-arrow-left icon-font-2"></i>
              </div>
              <div class="w-100 text-center">
                <h5>Contact Person Information</h5>
              </div>
            </div>

            <div v-if="formPage == 2" class="row">
              <div class="form-group col-12 col-md-6">
                <label for="contact_person.name" class="source-500 mt-2">Conatact Name</label>
                <input
                  v-model="form.contact_person.name"
                  type="text"
                  class="form-control border"
                  id="contact_person.name"
                  placeholder="Enter Contact Name"
                />
                <label for="contact_person.contact_no" class="source-500 mt-2">
                  Conatct Number
                </label>
                <input
                  v-model="form.contact_person.contact_no"
                  type="number"
                  class="form-control border"
                  id="contact_person.contact_no"
                  placeholder="Enter Conatct Number"
                />
              </div>
              <div class="form-group col-12 col-md-6">
                <label for="contact_person.email" class="source-500 mt-2">Conatct Email</label>
                <input
                  v-model="form.contact_person.email"
                  type="email"
                  class="form-control border"
                  id="contact_person.email"
                  placeholder="Enter Conatct Email "
                />
                <label for="contact_person.designation" class="source-500 mt-2">
                  Contact Designation
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

            <div v-if="formPage == 3" class="mt-3 mb-2 source-600 d-flex gap-2">
              <div class="w-100 text-center">
                <h5>Add Proof</h5>
              </div>
            </div>

            <div v-if="formPage == 3" class="row">
              <div class="form-group col-12 col-md-6">
                <div class="">
                  <label for="incorporation_type" class="source-500">Select Document</label>
                  <multiselect
                    class="text-capitalize"
                    v-model="form.document_type"
                    :options="documentOoptions"
                    placeholder="Select Document Type"
                  ></multiselect>
                </div>
              </div>
              <div class="form-group col-12 col-md-6">
                <div class="mb-3">
                  <!-- <label for="formFile" class="source-500">Small file input example</label> -->
                  <input
                    class="form-control mt-4"
                    accept="image/png, image/jpeg, application/pdf"
                    type="file"
                    id="file"
                    ref="file"
                    v-on:change="handleFile()"
                  />
                </div>
              </div>
            </div>
            <!-- //////////////////////////////////////////--Buttons--///////////////////////////////////////////// -->
            <div class="w-100 d-flex justify-content-center align-items-center">
              <button
                v-if="formPage == 1"
                @click="changeFormPage"
                type="button"
                class="btn bg-dark bg-gradient source-500 text-light mt-4 w-50"
              >
                Next
              </button>
              <button
                v-if="formPage == 2"
                @click="handleAddClientDetails"
                type="button"
                class="btn bg-dark bg-gradient source-500 text-light mt-4 w-50"
              >
                Add Details
              </button>
              <div
                v-if="formPage == 3"
                class="w-100 d-flex justify-content-center align-items-center gap-2"
              >
                <button
                  @click="uploadFile"
                  type="button"
                  class="btn bg-dark bg-gradient source-500 text-light mt-4 px-3"
                >
                  <span v-if="documentUploaded == false">Update Document</span>
                  <span v-else>Add Another</span>
                </button>
                <router-link to="/manage/clients" v-if="documentUploaded == false">
                  <button
                    type="button"
                    class="btn bg-dark bg-gradient source-500 text-light mt-4 px-3"
                  >
                    <span>Skip</span>
                  </button>
                </router-link>
                <router-link to="/manage/clients" v-if="documentUploaded == true">
                  <button
                    type="button"
                    class="btn bg-dark bg-gradient source-500 text-light mt-4 px-3"
                  >
                    <span>Done</span>
                  </button>
                </router-link>
              </div>
            </div>

            <div v-auto-animate class="mt-3 rounded p-3 shadow-lg" v-if="documentUploaded == true">
              <div class="w-100 source-700 text-center">
                <div>Uploaded Documents</div>
              </div>
              <div
                v-for="document in submitedDocuments"
                :key="document"
                v-if="formPage == 3"
                class="w-100 mt-3"
                v-auto-animate
              >
                <div v-if="document.uploaded == true" class="d-flex justify-content-between">
                  <di v class="row px-3 w-100">
                    <div class="col-6 d-flex justify-content-center capitalize">
                      <h6>{{ document.document_typ }}</h6>
                    </div>
                    <div class="col-6 d-flex justify-content-center">
                      <div><i class="bi bi-check-circle icon-font-2 text-success"></i></div>
                    </div>
                  </di>
                </div>
              </div>
            </div>
          </form>
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
export default {
  name: 'AddClientDetails',
  components: {
    Multiselect,
  },
  props: {
    userId: {
      type: String,
    },
  },
  data() {
    return {
      formPage: 3,
      documentUploaded: false,
      user: '',
      /*  form: {
        user_id: '1234567890',
        name: 'John Doe',
        email: 'johndoe@example.com',
        whatsapp_no: '1234567890',
        password: 'password123',
        address: '123 Main St, Anytown, USA',
        pan_card: 'ABCDE1234F',
        adhar_card: '123456789012',
        gst_no: '213233',
        cin_no: '121212',
        industry_type: 'Technology',
        employee_count_range: '50',
        contact_person: {
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          contact_no: '0987654321',
          designation: 'CEO',
        },
        incorporation_type: 'Private Limited',
      }, */
      submitedDocuments: [
        { document_typ: 'pan', uploaded: false },
        { document_typ: 'adhar', uploaded: false },
        { document_typ: 'gst', uploaded: false },
        { document_typ: 'cin', uploaded: false },
      ],
      form: {
        user_id: '',
        name: '',
        email: '',
        whatsapp_no: '',
        password: '',
        address: '',
        pan_card: '',
        adhar_card: '',
        gst_no: '',
        cin_no: '',
        industry_type: '',
        employee_count_range: '',
        incorporation_type: '',

        document_type: '',
        document_url_id: '',
        document_url: '',
        contact_person: {
          name: '',
          email: '',
          contact_no: '',
          designation: '',
        },
      },
      documentOoptions: ['pan', 'adhar', 'gst', 'cin'],
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
    };
  },

  async created() {
    await this.getCurrent();
    console.log('after current');
    console.log(this.userId);
    if (this.userId) {
      try {
        console.log('created after current');
        const userRes = await axiosClient.get(`/api/v1/user/get/${this.form.user_id}`);
        console.log(userRes);
        this.user = userRes.data.data[0];
        console.log('res: ', this.user);
        this.form.user_id = this.user._id;
        this.form.name = this.user.name;
        this.form.email = this.user.email;
        this.form.whatsapp_no = this.user.whatsapp_no;
        console.log('end current');
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/manage/users');
      }
    } else {
      this.$router.push('/manage/clients');
    }
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
    async uploadFile() {
      if (this.form.document_type == '') {
        toast.error(`Please Select Document Type!`, {
          autoClose: 1500,
        });
        return;
      }
      if (this.file == undefined) {
        toast.error(`Please Select Document Type!`, {
          autoClose: 1500,
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        const documentRes = await axiosClient.post(
          `/api/v1/document/upload/${this.form.document_type}/${this.userId}`,
          formData
        );
        //console.log(documentRes);
        this.form.document_url = documentRes.data.location.Location;
        this.form.document_url_id = documentRes.data.file_id;
        //console.log('form', this.form);
        const res = await axiosClient.put(
          `/api/v1/client/update/document/${this.userId}`,
          this.form
        );
        toast.success(`File uploaded successfully`, {
          autoClose: 1500,
        });

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
      //console.log(this.file);
    },

    async handleAddClientDetails() {
      console.log('form: ', this.form);
      if (this.validateForm() == false) {
        return;
      }

      try {
        const res = await axiosClient.put(`/api/v1/client/add/details/${this.userId}`, this.form);
        console.log(res);

        if (res) {
          toast.success(`Client Added`, {
            autoClose: 1500,
          });
        }
        this.formPage = 3;
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
    },

    nameWithLang({ name }) {
      console.log(name);
      return `${name} `;
    },
    changeFormPage() {
      console.log('changeFormPage');
      this.formPage = 2;
    },

    validateForm() {
      console.log('validateForm');

      if (this.form.name === '') {
        toast.info(`Enter Name`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.whatsapp_no === '') {
        toast.info(`Enter WhatsApp Number`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.email === '') {
        toast.info(`Enter Email`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.pan_card === '') {
        toast.info(`Enter PAN Card Number`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.adhar_card === '') {
        toast.info(`Enter Aadhar Card Number`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.gst_no === '') {
        toast.info(`Enter GST Number`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.cin_no === '') {
        toast.info(`Enter CIN Number`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.industry_type === '') {
        toast.info(`Enter Industry Type`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.employee_count_range === '') {
        toast.info(`Enter Employee Count Range`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }
      if (this.form.incorporation_type === '') {
        toast.info(`Enter Incorporation Type`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }
      if (this.form.contact_person.name === '') {
        toast.info(`Enter Contact Person Name`, { autoClose: 1000 });
        this.formPage = 2;
        return false;
      }

      if (this.form.contact_person.email === '') {
        toast.info(`Enter Contact Person Email`, { autoClose: 1000 });
        this.formPage = 2;
        return false;
      }

      if (this.form.contact_person.contact_no === '') {
        toast.info(`Enter Contact Person Contact Number`, { autoClose: 1000 });
        this.formPage = 2;
        return false;
      }

      if (this.form.contact_person.designation === '') {
        toast.info(`Enter Contact Person Designation`, { autoClose: 1000 });
        this.formPage = 2;
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
        this.form.user_id = token.data.user._id;
        console.log('User is: ', this.form.user_id);
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }
    },
  },
};
</script>
