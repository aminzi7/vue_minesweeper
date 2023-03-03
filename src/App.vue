<script setup lang="ts">
import minHeader from "@/components/minHeader.vue";
import minCentre from "@/components/minCentre.vue";
import useTemeStore from "./stores/theme/theme";
import { storeToRefs } from "pinia";

const useTheme = useTemeStore();
const { isDark } = storeToRefs(useTheme);
</script>

<template>
  <div class="main" :current-theme="isDark ? 'dark' : 'light'">
    <minHeader></minHeader>
    <minCentre></minCentre>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  flex-direction: column;
}
</style>
