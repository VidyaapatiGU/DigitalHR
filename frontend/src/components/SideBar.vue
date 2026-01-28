<style scoped>
ul {
  list-style-type: none;
}

.offcanvas {
  width: 15rem;
  border: 1px solid black;
}

@media (max-width: 576px) {
  .side_bar {
    display: none;
  }
}

@media (min-width: 576px) {
  .side_bar {
    display: block;
  }
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>

<template>
  <div class="main source-400 mt-3 min-vh-100" @mouseenter="openOffcanvas">
    <!--   -->
    <div
      @click="openOffcanvas"
      @mouseenter="openOffcanvas"
      class="offacanvas-items d-flex justify-content-center"
    >
      <button
        class="btn btn-transparent"
        type="button"
        @mouseenter="toggleOffcanvas"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample "
      >
        <i class="bi bi-menu-button-wide-fill text-light"></i>
      </button>
    </div>
    <div class="d-flex flex-column h-100 mt-3 gap-3" @mouseenter="openOffcanvas">
      <div @click="handleRedirect('dashboard')" class="w-100 d-flex justify-content-center">
        <button class="btn btn-transparent" type="button">
          <i class="bi bi-speedometer text-light" style="font-size: 1.3rem"></i>
        </button>
      </div>
      <div @click="handleRedirect('data/table')" class="w-100 d-flex justify-content-center">
        <button class="btn btn-transparent" type="button">
          <i class="bi bi-person-fill text-light" style="font-size: 1.3rem"></i>
        </button>
      </div>
    </div>

    <div
      class="offcanvas offcanvas-start bg-dark rounded-3 text-light shadow-lg `"
      @mouseleave="closeOffcanvas"
      data-bs-backdrop="false"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div class="offcanvas-header d-flex justify-content-between">
        <h5 class="offcanvas-title source-400 w-100 fs-4" id="offcanvasExampleLabel">
          Hr Management
        </h5>
        <!-- <button
          type="button"
          class="btn bg-transparent border-0 text-light"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i class="bi bi-x-lg text-light"></i>
        </button> -->
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
          <li class="pointer source-400 fs-5 mt-3">
            <div class="dropdown">
              <div
                class="dropdown-toggle text-light border-0"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-fill text-light" style="font-size: 1.3rem"></i>
                User
              </div>
              <ul class="dropdown-menu">
                <li>
                  <div class="dropdown-item" @click="handleRedirect('manage/users')">
                    Manage Users
                  </div>
                </li>
                <li>
                  <div class="dropdown-item" @click="handleRedirect('teams')">Teams</div>
                </li>
                <li><div class="dropdown-item" @click="handleRedirect('role')">Role</div></li>
                <li>
                  <div class="dropdown-item" @click="handleRedirect('department')">Department</div>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Offcanvas } from 'bootstrap';

export default {
  name: 'SideBar',

  data() {
    return {
      offcanvas: null,
    };
  },

  created() {
    window.addEventListener('resize', this.handleResize);
  },

  mounted() {
    try {
      this.offcanvas = new Offcanvas(document.getElementById('offcanvasExample'));
    } catch (error) {
      console.error('Error creating Offcanvas instance:', error);
    }
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  methods: {
    openOffcanvas() {
      try {
        if (this.offcanvas) {
          this.offcanvas.show();
        }
      } catch (error) {
        console.error('Error opening Offcanvas:', error);
      }
    },
    closeOffcanvas() {
      try {
        if (this.offcanvas) {
          this.offcanvas.hide();
        }
      } catch (error) {
        console.error('Error closing Offcanvas:', error);
      }
    },

    handleRedirect(link) {
      this.$router.push(`/${link}`);
    },

    handleResize() {
      // This method is no longer needed and can be removed
    },
  },
};
</script>
