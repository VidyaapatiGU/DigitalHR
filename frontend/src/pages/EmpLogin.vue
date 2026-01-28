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
  max-width: 330px;
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
      <h1 class="text-center source-600 text-dark mb-4">Employee Login</h1>
      <div class="form-group">
        <label for="email hind-medium">User Name</label>
        <input
          v-model="form.username"
          type="email"
          class="form-control border"
          id="email"
          placeholder="Enter Username"
        />
      </div>
      <div class="form-group">
        <label for="password hind-medium">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control border"
          id="password"
          placeholder="Password"
        />
      </div>
      <div class="w-100">
        <button
          type="button"
          @click="handleLogin"
          class="btn btn-primary border-0 button_bg hind-medium text-light w-100 mt-4"
        >
          Login
        </button>
      </div>
      <div class="w-100">
        <button
          type="button"
          @click="handleAdminLogin"
          class="btn btn-primary border-0 button_bg hind-medium text-light w-100 mt-4"
        >
          Go to Admin Login
        </button>
      </div>
      <div class="w-100">
        <button
          type="button"
          @click="handleClientLogin"
          class="btn btn-primary border-0 button_bg hind-medium text-light w-100 mt-4"
        >
          Go to Client Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axiosClient from '../axiosClient';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default {
  name: 'Login',
  data() {
    return {
      form: {
        //email: 'rahre49@gmail.com',
        email: '',
        password: '',
      },
    };
  },

  async created() {
    try {
      const token = await axiosClient.get(`api/v1/user/getCurrent/`);
      console.log(token);
      if (token) {
        this.$router.push('/dashboard');
      }
    } catch (err) {
      console.log('error: ', err);
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
    handleClientLogin() {
      this.$router.push('/client/login');
    },
    handleAdminLogin() {
      this.$router.push('/login');
    },
    async handleLogin() {
      console.log('form: ', this.form);

      if (!this.form.username) {
        toast.info(`Enter Username`, {
          autoClose: 1500,
        });
        return;
      }

      if (!this.form.password) {
        toast.info(`Enter password`, {
          autoClose: 1500,
        });
        return;
      }

      try {
        const response = await axiosClient.post(`/api/v1/employee/login`, this.form);
        console.log(response.data);

        localStorage.setItem('token', response.data.token);

        toast.success(`Login successfull`, {
          autoClose: 1500,
        });

        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 2000);
      } catch (err) {
        if (err.response.status == 404) {
          toast.error(`Client dosen't exist`, {
            autoClose: 1500,
          });
        } else if (err.response.status == 401) {
          toast.error(`Incorrect Password`, {
            autoClose: 1500,
          });
        } else {
          console.error('error: ', err);
          toast.error(`something went wrong`, {
            autoClose: 1500,
          });
        }
      }
    },
  },
};
</script>
