import { defineStore } from "pinia";

interface ITheme {
  isFlag: boolean;
}
const useTemeStore = defineStore("theme", {
  state: (): ITheme => ({
    isFlag: false,
  }),
  actions: {
    setTheme() {
      document.documentElement.setAttribute("current-theme", "dark");
    },
    removeTheme() {
      document.documentElement.removeAttribute("current-theme");
    },
    handelTheme() {
      this.isFlag = !this.isFlag;
      this.isFlag ? this.setTheme() : this.removeTheme();
    },
  },
});

export default useTemeStore;
