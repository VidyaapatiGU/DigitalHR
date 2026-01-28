<style scoped>
.main {
  min-height: 5vh;
}

.text_shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>

<template>
  <div class="main bg-dark bg-transparent d-flex align-items-center border">
    <div
      class="container text-dark d-flex justify-content-between align-items-center px-3 px-sm-5 w-100"
    >
      <div class="source-400 text_shadow text-dark footer-text">Digital HR</div>
      <div class="source-400 text_shadow text-dark footer-text">Made In Goa</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
};
</script>
