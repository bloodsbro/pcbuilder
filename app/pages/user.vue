<script setup lang="ts">
const token = useCookie('__session');
</script>

<template>
  <div class="user">
    __session: {{ token }}
  </div>
</template>

<style scoped>

</style>
