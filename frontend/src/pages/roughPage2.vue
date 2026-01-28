<style scoped>
/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */

::-webkit-scrollbar {
  width: 10px; /* Set the width of the scrollbar */
  height: 90vh; /* Set the height of the scrollbar */
}
::-webkit-scrollbar-track {
  margin-top: 1rem;
  margin-bottom: 1rem;

  background: #c9c9c9;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(#000000, #5e5e5e);
  border-radius: 5px;
}

.customize-table {
  --easy-table-header-font-size: 1.1rem;
  --easy-table-body-row-font-size: 1rem;
}

.buttons-pagination .item.button.active[data-v-4c681fa2] {
  background-color: rgb(179, 104, 120);
}

.button-pagination {
  background-color: rgb(25, 26, 25);
}

.button-pagination div {
  background-color: rgb(25, 26, 25);
}

.item {
  background-color: rgb(25, 26, 25);
}

.main {
}
.table-icon {
  color: rgb(118, 165, 42);
}
h1 {
  color: rgb(118, 165, 42);
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
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 mooli text-capitalize" id="exampleModalLabel">
            Update Password For {{ updateUser.name }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="">
            <input
              type="text"
              class="form-control"
              placeholder="Enter New Password"
              aria-label="Enter New Password"
              aria-describedby="addon-wrapping"
              v-model="newPassword"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="handleChangePassword" type="button" class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <div class="hind-regular pt-2 h-100 scroll">
    <div class="border-bottom">
      <h5 class="text-center pt-2 hind-medium source-500">Manage Users</h5>
    </div>
    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3">
          <div class="mt-5 mb-1 d-flex justify-content-start gap-2">
            <div class="d-flex">
              <input
                v-model="search"
                class="border form-control form-control-sm"
                size="small"
                placeholder="Type to search"
              />
            </div>
            <div>
              <router-link to="/add/user" class="d-flex align-items-center text-decoration-none">
                <button type="button" class="btn btn-dark btn-sm mooli">Add User</button>
              </router-link>
            </div>
          </div>
          <div class="table border rounded">
            <div class="w-100">
              <EasyDataTable
                table-class-name="customize-table"
                :headers="headers"
                :items="items"
                search-field="name"
                :search-value="search"
                :rows-per-page="10"
                border-cell
                buttons-pagination
                show-index
              >
                <template #item-actions="item">
                  <div class="d-flex justify-content-evenly">
                    <div class="table-icon" @click="handleUserUpdate(item._id)">
                      <el-tooltip content="Update User" placement="bottom">
                        <i class="bi bi-pen-fill pointer" style="font-size"></i>
                      </el-tooltip>
                    </div>

                    <div class="table-icon" @click="handleViewUser(item._id)">
                      <el-tooltip content="View User" placement="bottom">
                        <i class="bi bi-eye-fill pointer" style="font-size"></i>
                      </el-tooltip>
                    </div>

                    <div class="table-icon" @click="handleDelete(item._id)">
                      <el-tooltip content="Delete User" placement="bottom">
                        <i class="bi bi-trash-fill pointer" style="font-size"></i>
                      </el-tooltip>
                    </div>
                    <div class="table-icon">
                      <i class="bi bi-bell-fill pointer" style="font-size"></i>
                    </div>
                    <div
                      @click="updateUser = JSON.parse(JSON.stringify(item))"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      class="table-icon"
                    >
                      <el-tooltip content="Change Password" placement="bottom">
                        <i class="bi bi-key-fill pointer" style="font-size"></i>
                      </el-tooltip>
                    </div>

                    <div
                      @click="toggleUserApproved(item._id)"
                      v-if="!item.approved"
                      class="thumbs-down"
                    >
                      <el-tooltip content="Approve User" placement="bottom">
                        <i class="bi bi-hand-thumbs-down-fill pointer" style="font-size"></i>
                      </el-tooltip>
                    </div>

                    <div
                      @click="toggleUserApproved(item._id)"
                      v-if="item.approved"
                      class="table-icon"
                    >
                      <el-tooltip content="Disapprove User" placement="bottom">
                        <i class="bi bi-hand-thumbs-up-fill pointer" style="font-size"></i>
                      </el-tooltip>
                    </div>
                  </div>
                </template>
              </EasyDataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ////////////////////////////////////////Modal////////////////////////////////////////////// -->
  </div>
</template>

<script>
import EasyDataTable from 'vue3-easy-data-table';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axiosClient from '../axiosClient';

export default {
  name: 'VueDataTable',
  components: {
    EasyDataTable,
  },

  data() {
    return {
      columns: [
        { title: 'Name', field: 'name', sortable: true },
        { title: 'Actions', field: 'actions', sortable: false, slot: 'actions' },
      ],
      form: {
        name: '',
      },
      newPassword: '',
      updateUser: {},
      showDeleteModal: false,

      search: '',
      entries: 0,
      entriesPerPage: 5,
      entriesPerPageOptions: [5, 10, 15, 20],
      page: 1,
      items: [],
      originalItems: [],

      /*   headers: [
        { text: 'PLAYER', value: 'player', sortable: true },
        { text: 'TEAM', value: 'team' },
        { text: 'NUMBER', value: 'number' },
        { text: 'POSITION', value: 'position' },
        { text: 'HEIGHT', value: 'indicator.height' },
        { text: 'WEIGHT (lbs)', value: 'indicator.weight', sortable: true },
        { text: 'LAST ATTENDED', value: 'lastAttended', width: 200 },
        { text: 'COUNTRY', value: 'country' },
        { text: 'Actions', value: 'actions', sortable: false },
      ], */

      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Email', value: 'email' },
        { text: 'Department', value: 'department.name' },
        { text: 'Team', value: 'team.name' },
        { text: 'Role', value: 'roleType.name' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },

  async created() {
    this.getCurrent();

    try {
      const res = await axiosClient.get(`/api/v1/user/getall`);
      this.originalItems = res.data.data;
      console.log(this.originalItems);
    } catch (err) {
      console.log('error: ', err);
    }

    this.items = this.originalItems;

    console.log(this.items);
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

  setup() {},

  methods: {
    async toggleUserApproved(id) {
      try {
        const res = await axiosClient.put(`/api/v1/user/app_dis/${id}`);
        if (res) {
          toast.success(`Updated User `, {
            autoClose: 1000,
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 1500);
        }
      } catch (err) {
        console.log('error: ', err);
        toast.error(`Some Thing Went Wrong`);
      }
    },

    async deleteUser(id) {
      try {
        const res = await axiosClient.put(`/api/v1/user/app_dis/${id}`);
        if (res) {
          toast.success(`Updated User `, {
            autoClose: 1000,
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 1500);
        }
      } catch (err) {
        console.log('error: ', err);
        toast.error(`Some Thing Went Wrong`);
      }
    },

    async handleChangePassword() {
      if (this.newPassword == '') {
        toast.info(`Enter Password`, {
          autoClose: 1500,
        });
        return;
      }

      if (this.newPassword.length < 6) {
        toast.info(`Password Must Contain At Least Characters`, {
          autoClose: 1500,
        });
        return;
      }

      try {
        const res = await axiosClient.put(`/api/v1/user/change/pass/${this.updateUser._id}`, {
          password: this.newPassword,
        });
        if (res) {
          toast.success(`Updated Role `, {
            autoClose: 1000,
          });
        }
      } catch (err) {
        console.log('error: ', err);
        toast.error(`Some Thing Went Wrong`);
      }
    },

    async handleDelete(id) {
      try {
        const res = await axiosClient.put(`/api/v1/user/delete/${id}`);
        if (res) {
          toast.success(`User Deleted`, {
            autoClose: 1000,
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 1500);
        }
      } catch (err) {
        console.log('error: ', err);
        toast.error(`Some Thing Went Wrong`);
      }
    },

    handleEntriesPerPage(option) {
      console.log(
        'option: ',
        option,
        ' entriesPerPage: ',
        this.entriesPerPage,
        ' this.entries:  ',
        this.entries,
        ' option + this.entries: ',
        option + this.entries,
        ' option - this.entries: ',
        option - this.entriesPerPage
      );
      let tempEntries = this.entries;
      if (option < this.entriesPerPage) {
        let tempItems = [];
        for (let i = 0; i < option; i++) {
          tempItems.push(this.items[i]);
          console.log(' this.items[i]: ', this.items[i]);
        }

        this.items = tempItems;
        this.entries -= tempEntries - option;
      } else {
        let tempEntriesPerPage = option - this.entriesPerPage;
        for (
          let i = this.entries;
          i < this.entries + tempEntriesPerPage && i < this.originalItems.length;
          i++
        ) {
          this.items.push(this.originalItems[i]);
          tempEntries++;
          console.log('this.originalItems[i]: ', this.originalItems[i]);
        }
        this.entries = tempEntries;
      }
      console.log('this.entries:  ', this.entries);
      this.entriesPerPage = option;
    },

    handleNextPage() {
      let tempItems = [];
      for (
        let i = this.entries;
        i < this.entriesPerPage + this.entries && i < this.originalItems.length;
        i++
      ) {
        tempItems.push(this.originalItems[i]);
        this.entries++;
        console.log('i: ', i, '  this.originalItems[i]: ', this.originalItems[i]);
      }
      if (tempItems.length > 0) {
        this.items = tempItems;
        //this.entries += this.entriesPerPage;
        console.log('this.entries: ', this.entries);
      }
    },

    handlePreviousPage() {
      let tempItems = [];

      for (
        let i = this.entries - this.entriesPerPage - 1;
        i > this.entries - 1 - this.entriesPerPage * 2 && i >= 0;
        i--
      ) {
        tempItems.push(this.originalItems[i]);
        console.log('i: ', i, '  this.originalItems[i]: ', this.originalItems[i]);
      }
      if (tempItems.length > 0) {
        this.items = tempItems;
        this.items.reverse();
        this.entries -= this.entriesPerPage;
        console.log('entries: ', this.entries);
        if (this.entries < 0) this.entries = 0;
      }
    },

    filterByTag(value, row, column) {
      return row.tag === value;
    },

    FilterByName() {
      console.log('Called FilterByName');

      if (!this.search) {
        this.items = [...this.originalItems];
        return;
      }

      this.items = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    handleUserUpdate(id) {
      this.$router.push(`/update/user/${id}`);
    },

    handleViewUser(id) {
      this.$router.push(`/view/user/${id}`);
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
