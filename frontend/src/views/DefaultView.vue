<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import SideBar from '../components/SideBar.vue';
export default {
  componets: {
    SideBar,
  },
  name: 'Default',
};
</script>
