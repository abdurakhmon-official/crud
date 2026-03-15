type AuthStoreShape = {
  token: string | null;
  user: any | null;
};

export const useAuthStore = defineStore("authStore", {
  state: (): AuthStoreShape => ({
    token: null,
    user: null,
  }),
  actions: {
    async setData(token: string, user: any) {
      this.token = token;
      this.user = user;
    },
  },
  getters: {
    isLoggedIn: (state) => {
      return state.token !== null && state.user !== null;
    },
  },

  persist: true,
});
