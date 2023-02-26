<script setup lang="ts">
import minHeader from "@/components/minHeader.vue";
import minCentre from "@/components/minCentre.vue";
</script>

<template>
  <div class="main" :current-theme="true ? 'dark' : 'light'">
    <minHeader></minHeader>
    <minCentre></minCentre>
  </div>
</template>

<style lang="less" scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
</style>
