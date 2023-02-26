import { defineStore } from "pinia";

interface ITheme {
  isDark: boolean;
}
const useTemeStore = defineStore("theme", {
  state: (): ITheme => ({
    isDark: true,
  }),
  actions: {
    setTheme() {
      this.isDark = !this.isDark;
    },
  },
});

export default useTemeStore;
