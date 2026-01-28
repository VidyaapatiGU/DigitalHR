<style scoped>
.main {
  height: 100vh;
  min-height: 100vh;
}
</style>

<template>
  <div class="main source-400 pt-2 vh-100">
    <h1 class="text-center pt-2 source-500">Table</h1>
    <div class="table vh-50 overflow-y-hidden border scroll">
      <el-table
        class="overflow-x-scroll overflow-x-md-hidden"
        :data="items"
        :default-sort="[
          { prop: 'name', order: 'descending' },
          { prop: 'age', order: 'descending' },
        ]"
        stripe
        border
        highlight-current-row
        style="width: 100%"
        height="350"
      >
        <el-table-column prop="id" label="ID" />

        <el-table-column prop="name" sortable label="Name" />
        <el-table-column prop="age" sortable label="Age" />
        <el-table-column prop="country" label="Country" />
        <el-table-column
          prop="tag"
          label="Tag"
          width="100"
          :filters="tagFilters"
          :filter-method="filterByTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>
              {{ scope.row.tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template #header>
            <input
              v-model="search"
              class="border form-control form-control-sm"
              size="small"
              @change="FilterByName"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <button type="button" class="btn btn-primary">Primary</button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <div class="w-100 d-flex justify-content-center align-items-center">
          <div>
            <button type="button" @click="handlePreviousPage" class="btn btn-light btn-sm">
              <i class="bi bi-chevron-left"></i>
              <i class="bi bi-chevron-left"></i>
            </button>
          </div>
          <div>
            <div class="dropdown">
              <button
                class="btn btn-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ entriesPerPage }}
              </button>
              <ul class="dropdown-menu dropdown-menu-light">
                <li v-for="option in entriesPerPageOptions" :key="option">
                  <div v-if="option == entriesPerPage" class="dropdown-item pointer active">
                    {{ option }}
                  </div>
                  <div v-else class="dropdown-item pointer" @click="handleEntriesPerPage(option)">
                    {{ option }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button @click="handleNextPage" type="button" class="btn btn-light btn-sm">
              <i class="bi bi-chevron-right"></i>
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ref } from 'vue';
import { ElTable, ElPagination } from 'element-plus';
import { computed } from 'vue';

export default {
  name: 'VueDataTable',
  components: {
    ElTable,
    ElPagination,
  },

  data() {
    return {
      search: '',
      entries: 0,
      entriesPerPage: 5,
      entriesPerPageOptions: [5, 10, 15, 20],
      page: 1,
      items: [],
      originalItems: [
        { id: 1, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 2, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 4, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 3, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 5, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 6, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 7, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 8, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 9, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 10, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 11, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 12, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 13, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 14, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 15, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 16, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 17, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 18, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 19, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 20, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 21, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 22, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 23, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 24, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 25, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 26, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 27, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
        { id: 28, name: 'John Doe', age: 25, country: 'USA', tag: 'Office' },
        { id: 29, name: 'Jane Smith', age: 30, country: 'Canada', tag: 'Office' },
        { id: 30, name: 'Sam Green', age: 22, country: 'UK', tag: 'Home' },
      ],
    };
  },

  created() {
    for (let i = 0; i < this.entriesPerPage; i++) {
      this.items.push(this.originalItems[i]);
      this.entries++;
    }
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

  computed: {
    tagFilters() {
      const uniqueTags = [...new Set(this.items.map((item) => item.tag))];
      return uniqueTags.map((tag) => ({ text: tag, value: tag }));
    },
  },

  methods: {
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
  },
};
</script>
