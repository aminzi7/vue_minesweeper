<template>
  <div class="minesweeper-header">
    <!-- <button @click="useTheme.setTheme">{{ comTheme }}</button> -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import useThemeStore from "@/stores/theme/theme";

const useTheme = useThemeStore();
const comTheme = computed(() => {
  return useTheme.isDark ? "dark" : "light";
});

onMounted(() => {
  // handelTheme();
});
</script>

<style scoped lang="less">
.minesweeper-header {
  button {
    background-color: var(--Theme-light-color);
    border: none;
    text-align: center;
  }
}
</style>
