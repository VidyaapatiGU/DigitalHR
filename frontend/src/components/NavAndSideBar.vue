<style scoped>
ul {
  list-style-type: none;
}
.offcanvas {
  width: 90%;
}

.custom-dropdown-menu {
  left: 0 !important;
  right: auto !important;
}
</style>

<template>
  <div class="main source-400">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark pe-0 px-sm-5 shadow-lg">
      <div class="container-fluid">
        <div class="navbar-brand d-block d-sm-none">
          <div class="offacanvas-items">
            <button
              class="btn btn-transparent"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasExampleNav"
              aria-controls="offcanvasExampleNav "
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
        <a class="navbar-brand source-400 fs-4" href="#">Hr Management</a>

        <div class="collapse navbar-collapse pe-sm-5" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!--  <li class="nav-item">
              <div class="nav-link active pointer" aria-current="page" @click="handleRedirect('dashboard')">Dashboard</div>
            </li> -->
          </ul>
          <div class="text-light">
            <div v-if="ifLoggedIn" class="nav-item dropdown d-none d-sm-block">
              <button
                class="btn btn-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  v-if="profile"
                  class="img-account-profile rounded-circle"
                  :src="form.profile"
                  alt="Profile Picture"
                  style="width: 33px; height: 33px; object-fit: cover"
                />
                <i v-else class="bi bi-person-circle" style="font-size: 1.3rem"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-dark custom-dropdown-menu">
                <li>
                  <div @click="handleRedirect('account')" class="dropdown-item pointer">
                    My Account
                  </div>
                </li>
                <li @click="handleLogOut"><div class="dropdown-item pointer">Log Out</div></li>
              </ul>
            </div>
            <div v-else>
              <button
                type="button"
                @click="handleRedirect('login')"
                class="btn btn-transparent border-0"
              >
                <i class="bi bi-power text-light" style="font-size: 1.4rem"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div
      class="offcanvas offcanvas-start bg-dark bg-opacity-100 rounded-end-3 text-light"
      data-bs-backdrop="false"
      tabindex="-1"
      id="offcanvasExampleNav"
      aria-labelledby="offcanvasExampleNavLabel"
    >
      <div class="offcanvas-header d-flex justify-content-between">
        <h3 class="offcanvas-title source-400 w-100" id="offcanvasExampleNavLabel">
          Hr Management
        </h3>
        <button
          type="button"
          class="btn bg-transparent border-0 text-light"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i class="bi bi-x-lg text-light"></i>
        </button>
      </div>
      <div class="offcanvas-body w-100">
        <ul class="">
          <li
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="handleRedirect('dashboard')"
          >
            <i class="me-1 bi bi-speedometer text-light" style="font-size: 1.3rem"></i>
            Dashboard
          </li>
          <li
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="handleRedirect('data/table')"
          >
            <i class="me-1 bi bi-table text-light" style="font-size: 1.3rem"></i>
            Data Table
          </li>
          <li
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="handleRedirect('create/user')"
          >
            <i class="me-1 bi bi-person-fill-add text-light" style="font-size: 1.3rem"></i>
            Create User
          </li>
          <li
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="handleRedirect('update/user')"
          >
            <i class="me-1 bi bi-person-fill-gear text-light" style="font-size: 1.3rem"></i>
            Update User
          </li>
          <li
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="handleRedirect('view/user')"
          >
            <i class="me-1 bi bi-person-vcard text-light" style="font-size: 1.3rem"></i>
            View User
          </li>
          <li
            v-if="ifLoggedIn"
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="handleRedirect('account')"
          >
            <i class="me-1 bi bi-person-square"></i>
            My Account
          </li>
          <li
            v-if="ifLoggedIn"
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="ifLoggedIn = false"
          >
            <i class="me-1 bi bi-power text-danger" style="font-size: 1.4rem"></i>
            Log Out
          </li>
          <li
            v-if="!ifLoggedIn"
            class="pointer source-400 fs-5 mt-3"
            data-bs-toggle="offcanvas"
            @click="ifLoggedIn = true"
          >
            <i
              @click="handleRedirect('login')"
              class="me-1 bi bi-power text-light"
              style="font-size: 1.4rem"
            ></i>
            Log In
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../axiosClient';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'SideBar',

  data() {
    return {
      profile: '',
      data: '',
      ifLoggedIn: false,
    };
  },

  async created() {
    this.getCurrent();
    this.ifLoggedIn = true;
  },

  methods: {
    async handleLogOut() {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('You Are Already Logged Out', {
          autoClose: 1500,
        });
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      } else {
        localStorage.removeItem('token');
        toast.info('Log Out Sucessfull', {
          autoClose: 1500,
        });
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      }
    },

    handleRedirect(link) {
      this.$router.push(`/${link}`);
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
