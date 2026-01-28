<style scoped>
.main {
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
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
  <div class="main py-5 d-flex justify-content-center align-items-center">
    <form class="form-container border shadow-lg rounded-3">
      <h1 class="text-center source-600 text-dark mb-4">Sign up</h1>
      <div class="row">
        <div class="form-group col-12 col-md-6">
          <label for="email source-500" class="hind-medium">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control border"
            id="email"
            placeholder="Enter name"
          />
          <label for="email" class="hind-medium mt-2">Email address</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control border"
            id="email"
            placeholder="Enter email"
          />
          <div class="mt-2">
            <input
              type="checkbox"
              id="checkbox"
              class="checkbox border me-2"
              v-model="form.check"
            />
            <label for="checkbox" class="">Check</label>
          </div>
          <div>Selected: {{ form.select }}</div>

          <Multiselect
            v-model="form.select"
            :options="options"
            placeholder="Search and select..."
          ></Multiselect>
        </div>
        <div class="form-group col-12 col-md-6">
          <label for="email source-500" class="hind-medium">Phone Number</label>
          <input
            v-model="form.number"
            type="number"
            class="form-control border"
            id="email"
            placeholder="Enter phone number"
          />

          <label for="password" class="hind-medium mt-2">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control border"
            id="password"
            placeholder="Password"
          />
          <div class="mt-2 d-flex justify-content-evenly align-items-center">
            <div>
              <input type="radio" id="one" class="me-1" value="One" v-model="form.radio" />
              <label for="one " class="">One</label>
            </div>
            <div>
              <input type="radio" id="two" class="me-1" value="Two" v-model="form.radio" />
              <label for="two " class="">two</label>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 d-flex justify-content-center align-items-center">
        <button
          @click="handleSignup"
          type="button"
          class="btn bg-dark bg-gradient source-500 text-light mt-4 w-50"
        >
          Sign Up
        </button>
      </div>
      <div class="w-100 d-flex justify-content-center align-items-center mt-2">
        <router-link to="/login">
          <p>Allready have a account ?</p>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default {
  name: 'SignUp',
  components: {
    Multiselect,
  },
  data() {
    return {
      options: ['option1', 'option2', 'option3', 'option4', 'option5'],
      form: {
        name: '',
        email: '',
        password: '',
        number: '',
        check: false,
        radio: '',
        select: '',
      },
    };
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
    async handleSignup(e) {
      console.log('form: ', this.form);
      toast.success(`Signup successfull`, {
        autoClose: 1500,
      });

      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
    },
  },
};
</script>
