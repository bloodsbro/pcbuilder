<script setup lang="ts">
import type { FormError } from '#ui/types'
import {useUserStore} from "~/store/user";

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
  autocomplete: 'current-password',
}, {
  name: 'remember',
  label: 'Запомнить меня',
  type: 'checkbox',
  value: true
}]

const validate = (state: any) => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: 'email', message: 'Поле "Email" обязательное' })
  if (!state.password) errors.push({ path: 'password', message: 'Поле "Пароль" обязательное' })
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

const error = ref('');
const userStore = useUserStore();

async function onSubmit(data: { email: string; password: string; username: string }) {
  try {
    const res = await $fetch('/api/auth', {
      method: 'POST',
      body: {
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
  <div class="auth-page">
    <UCard class="max-w-sm w-full">
      <UAuthForm
        :fields="fields"
        :validate="validate"
        :providers="/*providers*/[]"
        title="С возвращением!"
        align="top"
        icon="i-heroicons-lock-closed"
        :ui="{ base: 'text-center', footer: 'text-center' }"
        @submit="onSubmit"
        :submitButton="{label: 'Войти'}"
      >
        <template #description>
          У вас нет аккаунта? <NuxtLink to="/register" class="text-primary font-medium">Регистрация</NuxtLink>.
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
.auth-page {
  max-width: 400px;
}
</style>
