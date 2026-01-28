<style scoped>
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

.side_bar {
  width: 18.5rem;
}

.shadow {
  box-shadow: 0 0 10px rgba(56, 56, 56, 0.15);
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
  <div>
    <div class="d-flex vh-100 overflow-hidden">
      <div class="side_bar vh-100 d-none d-sm-block bg-transaparent py-2 px-2">
        <SideMenu class="shadow" />
      </div>
      <div class="w-100 h-100 overflow-y-hidden pe-2 py-2">
        <div class="rounded-3 h-100 border shadow">
          <div class="h-100">
            <router-view class="h-100" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue';
import Reports from '../pages/Reports/Reports.vue';
import SideMenu from '../components/SideMenu.vue';
import NavAndSideBar from '../components/NavAndSideBar.vue';
import Footer from '../components/Footer.vue';
</script>
