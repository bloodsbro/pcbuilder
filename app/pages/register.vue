<script setup lang="ts">
import type { FormError } from '#ui/types'

const error = ref('');

const fields = [{
  name: 'email',
  type: 'text',
  label: 'Email',
  placeholder: 'Введите свой e-mail',
  autocomplete: 'email',
}, {
  name: 'password',
  label: 'Пароль',
  type: 'password',
  placeholder: 'Введите пароль',
  autocomplete: 'new-password'
}, {
  name: 'username',
  label: 'Логин',
  type: 'text',
  placeholder: 'Введите ваше имя пользователя',
  autocomplete: 'off',
}]

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Поле "Email" обязательное' })
  if (!state.password) errors.push({ path: 'password', message: 'Поле "Пароль" обязательное' })
  if (!state.username) errors.push({ path: 'username', message: 'Поле "Логин" обязательное' })
  return errors
}

const providers = [{
  label: 'Continue with GitHub',
  icon: 'i-simple-icons-github',
  color: 'white' as const,
  click: () => {
    console.log('Redirect to GitHub')
  }
}]

async function onSubmit(data: { email: string; password: string; username: string }) {
  try {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    });
    
    if (res.ok) {
      error.value = '';
      
      userStore.setUser(res.data);
      userStore.setSession(useCookie('__session').value);
      
      location.href = `/user`;
    } else {
      error.value = res.error;
    }
  } catch (error) {
    console.error(error);
    error.value = error.message;
  }
}

</script>

<template>
  <div class="register-page">
    <UCard class="max-w-sm w-full">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        :providers="/*providers*/[]"
        title="Добро пожаловать!"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
        :submitButton="{label: 'Зарегистрироваться'}"
      >
        <template #description>
          Уже есть аккаунт? <NuxtLink to="/auth" class="text-primary font-medium">Авторизация</NuxtLink>.
        </template>
        
        <template #password-hint>
          <NuxtLink to="/forgot" class="text-primary font-medium">Забыли пароль?</NuxtLink>
        </template>
        <template v-if="error" #validation>
          <UAlert color="red" icon="i-heroicons-information-circle-20-solid" :title="error" />
        </template>
        <template #footer>
          Входя в систему, вы соглашаетесь с нашими <NuxtLink to="/agreement" class="text-primary font-medium">Условия предоставления услуг</NuxtLink>.
        </template>
      </UAuthForm>
    </UCard>
  </div>
</template>

<style scoped>
.register-page {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  height: 100vh;
  align-content: center;
}
</style>
