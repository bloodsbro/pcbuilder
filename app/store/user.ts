import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    data: {
      id: 0,
      email: '',
    },
    session: '',
  }),
  getters: {

  },
  actions: {
    setUser(data) {
      this.data = data;
    },
    setSession(data) {
      this.session = data;
    }
  },
  persist: true,
})
