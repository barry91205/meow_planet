<template>
  <div
    class="notfound-container min-h-screen flex flex-col items-center justify-center bg-gray-50"
  >
    <h1 class="notfound-title text-7xl font-bold text-primary mb-4">404</h1>
    <p class="notfound-text text-2xl text-gray-700 mb-6">找不到您要的頁面</p>
    <router-link to="/" class="primary-btn px-6 py-2 rounded text-lg">
      回到首頁
    </router-link>
  </div>
</template>

<style lang="scss">
.notfound-container {
  background: #f8fafc;
}
.notfound-title {
  color: $primary;
  letter-spacing: 0.1em;
}
.primary-btn {
  background: $primary;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  transition: background 0.2s;
  font-weight: 600;
  &:hover {
    background: $secondary;
  }
}
</style>
<script setup></script>
