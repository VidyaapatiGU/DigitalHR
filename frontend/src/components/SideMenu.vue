<style scoped>
ul {
  list-style-type: none;
}

.profile-image {
  width: 2.3rem;
  height: 2.3rem;
  object-fit: cover;
}

.selected {
  background-color: rgb(43, 57, 106);
}

.offcanvas {
  width: 15rem;
  border: 1px solid black;
}

.footer {
  height: 6rem;
  background-color: #1d2646;
}

.header {
  background-color: #1d2646;
}

.body {
  background-color: #0c1526;
}

.shadow {
  box-shadow: 30 30 0px rgba(0, 0, 0, 0.15);
}

.text_shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.card-body,
.multiCollapseExample1 {
  background: rgba(41, 45, 53, 0.6);
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
  <div class="main font-14px source-400 h-100 rounded-3 bg-dark bg-transaparent overflow-y-hidden">
    <!--   -->
    <div class="d-flex h-100 justify-content-between bg-transaparent flex-column">
      <div class="header py-2">
        <div class="w-100 h-100 d-flex">
          <div class="d-flex justify-content-center align-items-center h-100 px-2">
            <div @click="handleRedirect(`account`)" class="">
              <img
                v-if="profile"
                class="img-account-profile profile-image pointer rounded-circle mb-2"
                :src="profile"
                alt="Profile Picture"
              />
              <img
                v-else
                class="img-account-profile profile-image pointer rounded-circle mb-2"
                src="../assets/profile-circle copy.svg"
                alt="Default Profile Picture"
              />
            </div>
          </div>
          <div class="w-100 overflow-x-hidden pe-2">
            <div class="text-light font-14px source-600 text-capitalize">{{ user.name }}</div>
            <div class="text-secondary font-14px source-500">{{ user.email }}</div>
            <div class="text-secondary font-14px source-500">
              <span @click="handleLogOut" class="pointer">Log out</span>
            </div>
          </div>
        </div>
      </div>
      <div class="body px-2 pt-3 h-100 overflow-y-auto">
        <div class="d-flex flex-column gap-2">
          <div class="w-100">
            <div
              v-if="glowMenuItem == 'dashboard'"
              @click="handleRedirect('dashboard')"
              class="w-100 selected shadow rounded-4 d-flex justify-content-start px-2 pointer py-1"
            >
              <div class="bg-transparent text-light border-0">
                <i
                  class="bi bi-speedometer text-light mx-2 text_shadow"
                  style="font-size: 1rem"
                ></i>
                Dashboard
              </div>
            </div>
            <div
              v-else
              @click="handleRedirect('dashboard')"
              class="w-100 rounded-pill d-flex justify-content-start px-2 pointer py-1"
            >
              <div class="bg-transparent text-light border-0">
                <i class="bi bi-speedometer text-light mx-2" style="font-size: 1rem"></i>
                Dashboard
              </div>
            </div>
          </div>

          <div class="rounded-2 bg overflow-hidden" v-if="role == 'super_admin'">
            <div
              data-bs-toggle="collapse"
              class="text-light pointer py-1 px-2 d-flex justify-content-between"
              href="#multiCollapseUser"
              aria-expanded="false"
              aria-controls="multiCollapseUser"
            >
              <div>
                <i
                  class="bi bi-person-fill text-light mx-2 text_shadow"
                  style="font-size: 1rem"
                ></i>
                Users
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-chevron-down"></i>
              </div>
            </div>

            <div class="w-100 bg-transparent rounded-0">
              <div class="collapse multi-collapse bg-transparent rounded-0" id="multiCollapseUser">
                <div class="card card-body rounded-2 rounded-0 shadow-lg">
                  <div>
                    <div
                      v-if="
                        glowMenuItem == 'manage/users' ||
                        glowMenuItem.match(/^update\/user\/.*/) ||
                        glowMenuItem.match(/^view\/user\/.*/) ||
                        glowMenuItem.match(/^add\/user\/.*/)
                      "
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/users')"
                    >
                      <i
                        class="bi bi-card-list text-light mx-2 text_shadow"
                        style="font-size: 1rem"
                      ></i>
                      Manage Users
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/users')"
                    >
                      <i class="bi bi-card-list text-light mx-2" style="font-size: 1rem"></i>
                      Manage Users
                    </div>
                  </div>

                  <div>
                    <div
                      v-if="glowMenuItem == 'teams'"
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('teams')"
                    >
                      <i
                        class="bi bi-people-fill text-light text_shadow mx-2"
                        style="font-size: 1rem"
                      ></i>
                      Teams
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('teams')"
                    >
                      <i class="bi bi-people-fill text-light mx-2" style="font-size: 1rem"></i>
                      Teams
                    </div>
                  </div>

                  <div>
                    <div
                      v-if="glowMenuItem == 'role'"
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('role')"
                    >
                      <i
                        class="bi bi-award-fill text-light mx-2 text_shadow"
                        style="font-size: 1rem"
                      ></i>
                      Role
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('role')"
                    >
                      <i class="bi bi-award-fill text-light mx-2" style="font-size: 1rem"></i>
                      Role
                    </div>
                  </div>

                  <div>
                    <div
                      v-if="glowMenuItem == 'department'"
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('department')"
                    >
                      <i
                        class="bi bi-building-fill text-light mx-2 text_shadow"
                        style="font-size: 1rem"
                      ></i>
                      Department
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('department')"
                    >
                      <i class="bi bi-building-fill text-light mx-2" style="font-size: 1rem"></i>
                      Department
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ////////////////Clients////////////////// -->
          <div v-if="role == 'super_admin'" class="rounded-2 bg overflow-hidden">
            <div
              data-bs-toggle="collapse"
              class="text-light pointer py-1 px-2 d-flex justify-content-between"
              href="#multiCollapseClient"
              aria-expanded="false"
              aria-controls="multiCollapseClient"
            >
              <div>
                <i
                  class="bi bi-person-fill text-light mx-2 text_shadow"
                  style="font-size: 1rem"
                ></i>
                Clients
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-chevron-down"></i>
              </div>
            </div>

            <div class="w-100 bg-transparent rounded-0">
              <div
                class="collapse multi-collapse bg-transparent rounded-0"
                id="multiCollapseClient"
              >
                <div class="card card-body rounded-2 rounded-0 shadow-lg">
                  <div>
                    <div
                      v-if="
                        glowMenuItem == 'manage/clients' ||
                        glowMenuItem.match(/^update\/client\/.*/) ||
                        glowMenuItem.match(/^view\/client\/.*/)
                      "
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/clients')"
                    >
                      <i
                        class="bi bi-person-rolodex text-light mx-2 text_shadow"
                        style="font-size: 1rem"
                      ></i>
                      Manage Clients
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/clients')"
                    >
                      <i class="bi bi-person-rolodex text-light mx-2" style="font-size: 1rem"></i>
                      Manage Clients
                    </div>
                  </div>

                  <div>
                    <div
                      v-if="glowMenuItem == 'add/client' || glowMenuItem.match(/^add\/client\/.*/)"
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('add/client')"
                    >
                      <i
                        class="bi bi-person-fill-add text-light mx-2 text_shadow"
                        style="font-size: 1.1rem"
                      ></i>
                      Add Client
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('add/client')"
                    >
                      <i
                        class="bi bi-person-fill-add text-light mx-2"
                        style="font-size: 1.1rem"
                      ></i>
                      Add Client
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ////////////////////////////////////////////////Employees/////////////////////////////////////////////////////////// -->
          <div v-if="role == 'client'" class="rounded-2 bg overflow-hidden">
            <div
              data-bs-toggle="collapse"
              class="text-light pointer py-1 px-2 d-flex justify-content-between"
              href="#multiCollapseEmployee"
              aria-expanded="false"
              aria-controls="multiCollapseEmployee"
            >
              <div>
                <i
                  class="bi bi-person-fill text-light mx-2 text_shadow"
                  style="font-size: 1rem"
                ></i>
                Employee
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-chevron-down"></i>
              </div>
            </div>

            <div class="w-100 bg-transparent rounded-0">
              <div
                class="collapse multi-collapse bg-transparent rounded-0"
                id="multiCollapseEmployee"
              >
                <div class="card card-body rounded-2 rounded-0 shadow-lg">
                  <div v-if="role != 'super_admin'">
                    <div
                      v-if="
                        glowMenuItem == 'add/employee' || glowMenuItem.match(/^add\/employee\/.*/)
                      "
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('add/employee')"
                    >
                      <i
                        class="bi bi-person-fill-add text-light mx-2 text_shadow"
                        style="font-size: 1.1rem"
                      ></i>
                      Add Employee
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('add/employee')"
                    >
                      <i
                        class="bi bi-person-fill-add text-light mx-2"
                        style="font-size: 1.1rem"
                      ></i>
                      Add Employee
                    </div>
                  </div>
                  <div>
                    <div
                      v-if="glowMenuItem == 'manage/employees'"
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/employees')"
                    >
                      <i
                        class="bi bi-person-rolodex text-light mx-2 text_shadow"
                        style="font-size: 1rem"
                      ></i>
                      Manage Employees
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/employees')"
                    >
                      <i class="bi bi-person-rolodex text-light mx-2" style="font-size: 1rem"></i>
                      Manage Employees
                    </div>
                  </div>

                  <div v-if="role != 'super_admin'">
                    <div
                      v-if="glowMenuItem == 'manage/attendance'"
                      class="pointer selected text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/attendance')"
                    >
                      <i
                        class="bi bi-table text-light mx-2 text_shadow"
                        style="font-size: 1rem"
                      ></i>
                      Manage Attendance
                    </div>
                    <div
                      v-else
                      class="pointer text-light py-1 px-2 rounded-4 mb-1"
                      @click="handleRedirect('manage/attendance')"
                    >
                      <i class="bi bi-table text-light mx-2" style="font-size: 1rem"></i>
                      Manage Attendance
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <!-- ////////////////////////////////////////////////Reports/////////////////////////////////////////////////////////// -->
            <div class="w-100">
            <div
                v-if="glowMenuItem == 'reports'"
                @click="handleRedirect('reports')"
                class="w-100 selected shadow rounded-4 d-flex justify-content-start px-2 pointer py-1"
              >
                <div class="bg-transparent text-light border-0">
                  <i
                    class="bi bi-bar-chart-fill text-light mx-2 text_shadow"
                    style="font-size: 1rem"
                  ></i>
                  Reports
                </div>
              </div>
              <div
                v-else
                @click="handleRedirect('reports')"
                class="w-100 rounded-pill d-flex justify-content-start px-2 pointer py-1"
              >
                <div class="bg-transparent text-light border-0">
                  <i class="bi bi-bar-chart-fill text-light mx-2" style="font-size: 1rem"></i>
                  Reports
                </div>
              </div>
            </div>
          </div>    
        </div>
      </div>
      <div class="footer p-2">
        <div>
          <div
            class="pointer text-light px-2 font-14px source-400"
            v-if="glowMenuItem == 'manage/attendance'"
            @click="handleRedirect('setting')"
          >
            <i class="bi bi-gear-fill text-light mx-2" style="font-size: 1rem"></i>
            Settings
          </div>
          <div
            class="pointer text-light px-2 font-14px source-400"
            v-else
            @click="handleRedirect('setting')"
          >
            <i class="bi bi-gear-fill text-light mx-2" style="font-size: 1rem"></i>
            Settings
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosClient from '../axiosClient';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  name: 'SideMenu',

  data() {
    return {
      offcanvas: null,
      user: {},
      role: '',
      profile: '',
      glowMenuItem: 'dashboard',
      bootstrap: {
        multiCollapseExample1: false,
      },
    };
  },

  async created() {
    await this.getCurrent();
    const currPage = this.getcurrentPage();

    //const currPage = localStorage.getItem('currPage');
    if (currPage) {
      //this.$router.push(`/${currPage}`);
      this.glowMenuItem = currPage;
    }
  },

  mounted() {},

  methods: {
    getcurrentPage() {
      //console.log('getcurrentPage called');
      const currentPageUrl = window.location.href;
      const currentPageUrlArray = currentPageUrl.split('/');
      let finalPageUrl = '';
      for (let i = 3; i < currentPageUrlArray.length; i++) {
        finalPageUrl = finalPageUrl + currentPageUrlArray[i];
        if (i != currentPageUrlArray.length - 1) finalPageUrl += '/';
      }
      //console.log('finalPageUrl', finalPageUrl);
      //console.log('currentPageUrl: ', currentPageUrlArray);

      return finalPageUrl;
    },

    handleRedirect(link) {
      //console.log('link: ', link);
      this.glowMenuItem = link;

      this.$router.push(`/${link}`);
      localStorage.setItem('currPage', link);
      /* if (link == 'dashboard') {
        this.glowMenuItem = 'dashboard';

       
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }

      if (link == 'manage/users') {
        this.glowMenuItem = 'manage/users';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }
      if (link == 'manage/clients') {
        this.glowMenuItem = 'manage/clients';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }
      if (link == 'teams') {
        this.glowMenuItem = 'teams';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }
      if (link == 'role') {
        this.glowMenuItem = 'role';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }
      if (link == 'department') {
        this.glowMenuItem = 'department';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }
      if (link == 'add/client') {
        this.glowMenuItem = 'add/client';

        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }
      if (link == 'add/employee') {
        this.glowMenuItem = 'add/employee';

        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }
      if (link == 'manage/employees') {
        this.glowMenuItem = 'manage/employees';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }

      if (link == 'upload/xl') {
        this.glowMenuItem = 'upload/xl';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      }

      if (link == 'employee/attandance') {
        this.glowMenuItem = 'employee/attandance';
        this.$router.push(`/${link}`);
        localStorage.setItem('currPage', link);
        return;
      } */
    },

    async getCurrent() {
      try {
        const token = await axiosClient.get(`api/v1/user/getCurrent/`);

        if (!token) {
          this.$router.push('/login');
        }
        this.user = token.data.user;
        //this.role = token.data.user.roleType.name;
        if (token.data.user.industry_type) {
          this.role = 'client';
        } else if (token.data.user.designation) {
          this.role = 'employee';
        } else {
          this.role = this.user.roleType.name;
        }
        //console.log('User : ', this.user, ' role : ', this.role);
      } catch (err) {
        console.log('error: ', err);
        this.$router.push('/login');
      }
    },

    async handleLogOut() {
      //console.log('handleLogOut Called');
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
  },
};
</script>
