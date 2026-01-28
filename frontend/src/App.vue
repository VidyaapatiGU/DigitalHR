<script setup>
import SideBar from './components/NavAndSideBar.vue';
</script>

<template>
  <div class="hind-regular main">
    <div class="router h-100">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.main {
  min-height: 100vh;
}
</style>
