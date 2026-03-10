<template>
  <div class="admin-view">
    <AdminNavbar />
    <main class="p-4 w-full">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

import AdminNavbar from "@/components/admin/AdminNavbar.vue";

const router = useRouter();

const { VITE_URL } = import.meta.env;

const checkLogin = async () => {
  // 取 cookie token
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  if (!token) {
    router.push("/login");
    return;
  }

  axios.defaults.headers.common.Authorization = token;

  try {
    await axios.post(`${VITE_URL}/api/user/check`);
  } catch (err) {
    router.push("/login");
  }
};

onMounted(() => {
  checkLogin();
});
</script>
<style scoped></style>
