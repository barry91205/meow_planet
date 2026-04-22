<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  // 在 App.vue 中載入 HeaderView，確保它在所有頁面都可見
  // 這裡使用了 Vue 的 onMounted 生命週期鉤子來確保 HeaderView 在組件掛載後被渲染
  
});
</script>
