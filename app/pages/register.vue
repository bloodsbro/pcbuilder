<script setup lang="ts">
const email = ref('');
const password = ref('');
const username = ref('');

const res = ref(null);

const register = async () => {
  res.value = await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      email: email.value,
      username: username.value,
      password: password.value,
    },
  });
}
</script>

<template>
  <div class="register">
    res: {{ res }}
    
    <form @submit.prevent="register">
      <input type="text" placeholder="Email" v-model="email" />
      <input type="text" placeholder="Username" v-model="username" />
      <input type="password" placeholder="Password" v-model="password" />
      
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>

</style>
