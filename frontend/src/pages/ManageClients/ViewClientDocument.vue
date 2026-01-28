<style scoped>
.main {
  min-height: 100vh;
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
  <div class="main">
    <div class="vh-100">
      <div class="h-100 d-flex justify-content-center align-items-center">
        <div class="w-100 h-100 py-3">
          <embed
            :src="documentUrl"
            type="application/pdf"
            width="100%"
            height="100%"
            class="h-100"
          />
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
  name: 'UpdateClientClient',
  props: {
    docId: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
  },

  components: {
    Multiselect,
  },
  data() {
    return {
      client: '',
      documentUrl: '',
      formPage: 1,
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
        address: '',
        contact_person: {
          name: ' ',
          email: '',
          contact_no: '',
          designation: '',
        },
        incorporation_type: '',
      },
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
    this.getCurrent();
    const clientRes = await axiosClient.get(`/api/v1/client/get/${this.clientId}`);
    const clientData = clientRes.data.data[0];
    console.log('client: ', clientData);
    this.client = clientData;
    this.form = {
      user_id: clientData.user_id,
      name: clientData.name,
      email: clientData.email,
      whatsapp_no: clientData.whatsapp_no,
      password: clientData.password,
      address: clientData.address,
      pan_card: clientData.pan_card,
      adhar_card: clientData.adhar_card,
      gst_no: clientData.gst_no,
      cin_no: clientData.cin_no,
      industry_type: clientData.industry_type,
      employee_count_range: clientData.employee_count_range,
      contact_person: {
        name: clientData.contact_person.name,
        email: clientData.contact_person.email,
        contact_no: clientData.contact_person.contact_no,
        designation: clientData.contact_person.designation,
      },
      incorporation_type: clientData.incorporation_type,
    };

    if (this.docId == 'adhar_proof_url') {
      this.documentUrl = clientData.adhar_proof_url;
    }
    if (this.docId == 'pan_proof_url') {
      this.documentUrl = clientData.pan_proof_url;
    }
    if (this.docId == 'gst_proof_url') {
      this.documentUrl = clientData.gst_proof_url;
    }
    if (this.docId == 'cin_proof_url') {
      this.documentUrl = clientData.cin_proof_url;
    }

    console.log('docId', this.docId, ' ', this.clientId);
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
    async handleUpdateClient(e) {
      this.$router.push(`/update/client/${this.clientId}`);
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

      if (this.form.password === '') {
        toast.info(`Enter Password`, { autoClose: 1000 });
        this.formPage = 1;
        return false;
      }

      if (this.form.address === '') {
        toast.info(`Enter Address`, { autoClose: 1000 });
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
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }
    },
  },
};
</script>
