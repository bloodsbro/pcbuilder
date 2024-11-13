<script setup lang="ts">
import {useUserStore} from "~/store/user";

const token = useCookie('__session');

const userStore = useUserStore();
</script>

<template>
  <ULandingGrid class="user-page">
    <ULandingCard
      title="user"
      class="col-span-6 row-span-6"
      icon="i-heroicons-computer-desktop"
      :description="userStore.data"
      color="primary"
    />
    <ULandingCard
      title="__session"
      class="col-span-6 row-span-6"
      icon="i-heroicons-wrench-screwdriver"
      :description="userStore.session"
      color="primary"
    />
  </ULandingGrid>
</template>

<style scoped>
.user-page {
  margin: auto;
  padding: 20px;
  height: 100vh;
  align-content: center;
}
</style>
