<script setup lang="ts">
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    
    <UContainer class="wrapper">
      <NuxtLayout>
        <NuxtPage class="page" />
      </NuxtLayout>
    </UContainer>
    
    <UNotifications />
  </div>
</template>

<style>
.wrapper {
  margin: auto;
  height: 100vh;
  align-content: center;
}

.page {
  margin: auto;
  align-content: center;
}
</style>
