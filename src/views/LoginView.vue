<template>
  <div class="container min-h-screen flex items-center justify-center">
    <div class="login-card bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-primary mb-6 text-center">會員登入</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-700 mb-2" for="username">用戶名</label>
          <input
            v-model="user.username"
            id="username"
            type="text"
            class="input"
            placeholder="請輸入用戶名"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 mb-2" for="password">密碼</label>
          <input
            v-model="user.password"
            id="password"
            type="password"
            class="input"
            placeholder="請輸入密碼"
            required
          />
        </div>
        <div v-if="errorMsg" class="text-red-500 mb-4 text-center">
          {{ errorMsg }}
        </div>
        <button type="submit" class="primary-btn w-full py-2 text-lg rounded">
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const router = useRouter();

const { VITE_URL, VITE_PATH } = import.meta.env;

const user = ref({
  username: "",
  password: "",
});

const errorMsg = ref("");

const handleLogin = async () => {
  const { username, password } = user.value;
  if (!username || !password) {
    errorMsg.value = "請填寫用戶名和密碼";
    return;
  }
  try {
    const res = await axios.post(`${VITE_URL}/v2/admin/signin`, user.value);
    const { token, expired } = res.data;

    Swal.fire({
      title: "成功登入",
      icon: "success",
      position: "top-end",
      timer: 1000,
      showConfirmButton: false,
    });
    // 設定 axios 預設 header
    axios.defaults.headers.common.Authorization = token;
    document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
    router.push("/admin");
    // 模擬登入成功
    Swal.fire({
      title: "成功登入",
      icon: "success",
      position: "top-end",
      timer: 1000,
      showConfirmButton: false,
    });
    // 在這裡可以進行實際的登入邏輯，例如呼叫 API 進行驗證
  } catch (err) {
    console.log("登入失敗", err.response);
    Swal.fire("錯誤", "登入失敗，請檢查您的帳號和密碼。", "error");
  }
};
</script>

<style lang="scss">
.login-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition:
    border 0.2s,
    box-shadow 0.2s;
  outline: none;
  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba($primary, 0.15);
  }
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
.text-primary {
  color: $primary;
}
</style>
