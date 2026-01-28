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

.animated_input {
  height: 3rem;
  max-width: 19rem;
}

.customize-table {
  --easy-table-header-font-size: 1.1rem;
  --easy-table-body-row-font-size: 1rem;
}

/* .table-icon:hover {
  transform: translateY(-2px) scale(1.15);
  transition: transform 0.3s ease-out;
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
          <h5 class="modal-title source-400" id="ModalLabel">Update Department</h5>
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
              placeholder="Enter Department Name"
              aria-label="Enter Department Name"
              aria-describedby="addon-wrapping"
              v-model="updateDepartment.name"
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
          <h5 class="modal-title source-400" id="ModalAddLabel">Add Departmennt</h5>
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
              placeholder="Enter Department Name"
              aria-label="Enter Department Name"
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
            @click="handleAddDepartment"
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
            Delete Department {{ updateDepartment.name }}
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
            @click="handleDelete(updateDepartment._id)"
            type="button"
            class="btn text-light border-0 button_bg btn-sm"
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
      <h5 class="source-600 page-title">Departments</h5>
    </div>

    <div class="overflow-y-hidden pb-5 h-100">
      <div class="h-100 overflow-y-auto">
        <div class="container py-3">
          <div class="d-flex justify-content-center">
            <div class="">
              <div class="mt-5 mb-1 d-flex justify-content-between px-2 gap-2">
                <div class="">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Department"
                    aria-label="Search Department"
                    aria-describedby="addon-wrapping"
                    v-model="search"
                  />
                </div>

                <div class="d-flex align-items-center">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#ModalAdd"
                    type="button"
                    class="btn btn-primary border-0 button_bg btn-sm source-400"
                  >
                    Add New
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
                          @click="updateDepartment = item"
                          data-bs-toggle="modal"
                          data-bs-target="#Modal"
                        >
                          <el-tooltip content="Update Role" placement="bottom">
                            <i class="bi bi-pen-fill pointer" style="font-size"></i>
                          </el-tooltip>
                        </div>

                        <div
                          class="table-icon action_icon_color w-100"
                          @click="updateDepartment = item"
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
      updateDepartment: {},
      search: '',
      entries: 0,
      entriesPerPage: 5,
      entriesPerPageOptions: [5, 10, 15, 20],
      page: 1,
      items: [],
      originalItems: [
        {
          _id: '66b5b22079c2f77a96fa6a77',
          name: 'Team A',
          active: true,
          createDate: '2024-08-08T09:06:20.297Z',
          __v: 0,
        },
      ],
    };
  },

  async created() {
    this.getCurrent();

    try {
      const res = await axiosClient.get(`/api/v1/department/getall`);
      this.originalItems = res.data.data;

      console.log(this.originalItems);
    } catch (err) {
      console.log('error: ', err);
    }

    for (let i = 0; i < this.entriesPerPage && i < this.originalItems.length; i++) {
      this.items.push(this.originalItems[i]);
      this.entries++;
    }
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
      if (this.updateDepartment.name == '') {
        toast.info(` Department Name Cannot Be Empty`, {
          autoClose: 1500,
        });
        return;
      }

      try {
        const res = await axiosClient.put(
          `/api/v1/department/update/${this.updateDepartment._id}`,
          {
            name: this.updateDepartment.name,
          }
        );
        if (res) {
          toast.success(`Updated Department `, {
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
        const res = await axiosClient.put(`/api/v1/department/delete/${id}`);
        if (res) {
          toast.success(`Department Deleted`, {
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

    async handleAddDepartment() {
      if (this.form.name == '') {
        toast.info(`Enter Department Name`, {
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
        const res = await axiosClient.post(`/api/v1/department/add/`, this.form);
        if (res) {
          toast.success(`Department Added`, {
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
