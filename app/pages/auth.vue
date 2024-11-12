<script setup lang="ts">
const email = ref('');
const password = ref('');

const res = ref(null);

const auth = async () => {
  res.value = await $fetch('/api/auth', {
    method: 'POST',
    body: {
      email: email.value,
      password: password.value,
    },
  });
}
</script>

<template>
  <div class="auth">
    res: {{ res }}
    
    <form @submit.prevent="auth">
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      
      <button type="submit">Auth</button>
    </form>
  </div>
</template>

<style scoped>

</style>
