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

.table-icon {
}
h1 {
  color: rgb(118, 165, 42);
}

.animated_input {
  height: 3rem;
  max-width: 19rem;
}

.customize-table {
  --easy-table-header-font-size: 1.1rem;
  --easy-table-body-row-font-size: 1rem;
}

/* .table-icon:hover {
  transform: scale(1.15);
  transition: transform 0.3s;
} */

.thumbs-down {
  color: rgb(235, 46, 21);
}

@media (max-width: 576px) {
  .table {
    width: 98vw;
  }
}

@media (min-width: 576px) {
  .table {
    width: 70vw;
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
  <div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title source-400" id="ModalLabel">Update team</h5>
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
              placeholder="Enter Team Name"
              aria-label="Enter Team Name"
              aria-describedby="addon-wrapping"
              v-model="updateRole.name"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="handleUpdate"
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalAdd"
    tabindex="-1"
    aria-labelledby="ModalAddLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title source-400" id="ModalAddLabel">Add Role</h5>
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
              placeholder="Enter Role Name"
              aria-label="Enter Role Name"
              aria-describedby="addon-wrapping"
              v-model="form.name"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="handleAddRole"
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="ModalDelete"
    tabindex="-1"
    aria-labelledby="ModalDeleteLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title source-400 text-capitalize" id="ModalDeleteLabel">
            Delete Role {{ updateRole.name }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button
            @click="handleDelete(updateRole._id)"
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
            data-bs-dismiss="modal"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- /////////////////////////////////////////////////////////////////////////////////////////////////////////// -->
  <div class="main source-400 pt-2 h-100 scroll">
    <div class="border-bottom px-3">
      <h5 class="source-600 page-title">Roles</h5>
    </div>

    <!-- <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3">
          </div>
        </div>
      </div> -->

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3">
          <div class="d-flex justify-content-center">
            <div>
              <div class="mt-5 mb-1 d-flex justify-content-between px-2 gap-2">
                <div class="">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Role"
                    aria-label="Search Role"
                    aria-describedby="addon-wrapping"
                    v-model="search"
                  />
                </div>

                <div class="d-flex align-items-center">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#ModalAdd"
                    type="button"
                    class="btn text-light border-0 button_bg btn-sm source-400"
                  >
                    Add Role
                  </button>
                </div>
              </div>
              <div class="table rounded">
                <div class="w-100">
                  <EasyDataTable
                    table-class-name="customize-table rounded"
                    :headers="headers"
                    :items="items"
                    search-field="name"
                    :search-value="search"
                    :rows-per-page="10"
                    buttons-pagination
                  >
                    <template #item-actions="item">
                      <div class="d-flex justify-content-evenly">
                        <div
                          class="table-icon action_icon_color w-100"
                          @click="updateRole = item"
                          data-bs-toggle="modal"
                          data-bs-target="#Modal"
                        >
                          <el-tooltip content="Update Role" placement="bottom">
                            <i class="bi bi-pen-fill pointer" style="font-size"></i>
                          </el-tooltip>
                        </div>

                        <div
                          class="table-icon action_icon_color w-100"
                          @click="updateRole = item"
                          data-bs-toggle="modal"
                          data-bs-target="#ModalDelete"
                        >
                          <el-tooltip content="Delete Role" placement="bottom">
                            <i class="bi bi-trash-fill pointer" style="font-size"></i>
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
      </div>
    </div>
    <!-- ////////////////////////////////////////Modal////////////////////////////////////////////// -->
  </div>
</template>

<script>
import EasyDataTable from 'vue3-easy-data-table';
import axiosClient from '../../axiosClient';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default {
  name: 'VueDataTable',
  components: { EasyDataTable },

  data() {
    return {
      headers: [
        { text: 'Name', value: 'name', sortable: true },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      form: {
        name: '',
      },
      showDeleteModal: false,
      updateRole: {},
      search: '',
      entries: 0,
      entriesPerPage: 10,
      entriesPerPageOptions: [5, 10, 15, 20],
      page: 1,
      items: [],
      originalItems: [],
    };
  },

  async created() {
    this.getCurrent();

    try {
      const res = await axiosClient.get(`/api/v1/role/getall`);
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
    async handleUpdate() {
      if (this.updateRole.name == '') {
        toast.info(` Role Name Cannot Be Empty`, {
          autoClose: 1500,
        });
        return;
      }

      try {
        const res = await axiosClient.put(`/api/v1/role/update/${this.updateRole._id}`, {
          name: this.updateRole.name,
        });
        if (res) {
          toast.success(`Updated Role `, {
            autoClose: 1500,
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
        }
      } catch (err) {
        console.log('error: ', err);
        toast.error(`Some Thing Went Wrong`);
      }
    },

    async handleDelete(id) {
      try {
        const res = await axiosClient.put(`/api/v1/role/delete/${id}`);
        if (res) {
          toast.success(`Role Deleted`, {
            autoClose: 1500,
          });
          this.items = this.items.filter((item) => item._id != id);
        }
      } catch (err) {
        console.log('error: ', err);
        toast.error(`Some Thing Went Wrong`);
      }
    },

    async handleAddRole() {
      if (this.form.name == '') {
        toast.info(`Enter Role Name`, {
          autoClose: 1500,
        });
        return;
      }
      if (this.form.name.length < 3) {
        toast.info(`Min Length Should be 3!`, {
          autoClose: 1500,
        });
        this.form.name = '';
        return;
      }

      try {
        const res = await axiosClient.post(`/api/v1/role/add/`, this.form);
        if (res) {
          toast.success(`Role Added`, {
            autoClose: 1500,
          });
          setTimeout(() => {
            this.$router.go(0);
          }, 2000);
        }
      } catch (err) {
        console.log('error: ', err);
        toast.error(err.response.data.errors.map((error) => error.msg).join(', '));
      }
    },

    FilterByName() {
      if (!this.search) {
        this.items = [...this.originalItems];
        return;
      }

      this.items = this.items.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },

    hanldeRow(item) {
      console.log('handleRow Called: ', item);
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
