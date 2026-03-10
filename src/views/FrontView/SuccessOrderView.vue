<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="flex items-center">
      <template v-for="(step, index) in steps" :key="step">
        <!-- 步驟1 -->
        <!-- 圓點 -->
        <div class="flex flex-col items-center text-center">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition"
            :class="circleClass(index + 1)"
          >
            {{ index + 1 }}
          </div>
          <!-- 文字 -->
          <div :class="textClass(index + 1)" class="mt-2 text-sm">
            {{ step }}
          </div>
        </div>

        <!-- 連線 -->
        <div
          v-if="index < steps.length - 1"
          :class="{
            'bg-green-500': index + 1 < currentStep,
            'bg-gray-300': index + 1 >= currentStep,
          }"
          class="flex-1 h-1 mx-4 transition"
        ></div>
      </template>
    </div>
    <div class="bg-white p-6 rounded-lg shadow-md mt-8 text-center">
      <h2 class="text-2xl font-bold mb-4">訂單完成！</h2>
      <p class="mb-4">感謝您的購買，我們已經收到您的訂單。</p>
      <div v-if="isLoading">讀取訂單中...</div>
      <div v-else>
        <p v-if="order" class="text-orange-500">訂單編號：{{ order.id }}</p>
      </div>
      <p class="mb-4">我們會盡快處理您的訂單，並通知您相關資訊。</p>
      <router-link
        to="/"
        class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        返回首頁
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";
import { useRoute, useRouter } from "vue-router";

const { VITE_URL, VITE_PATH } = import.meta.env;
const cartStore = useCartStore();

const route = useRoute();
const orderId = ref(route.params.orderId);
const router = useRouter();
const order = ref(null);
const isLoading = ref(false);

const getOrder = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(
      `${VITE_URL}/v2/api/${VITE_PATH}/order/${route.params.orderId}`,
    );
    console.log("route", route.params.orderId);
    console.log("api", res.data);
    console.log("order", order.value);
    order.value = res.data.order;
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

// ===== stepper =====
const currentStep = ref(4);
const steps = ["購物車", "填寫資訊", "確認訂單", "完成"];

// 圓點
const circleClass = (step) => {
  if (step < currentStep.value)
    return "bg-green-500 text-white border-green-500";

  if (step === currentStep.value)
    return "border-2 border-blue-500 text-blue-500";

  return "border-2 border-gray-300 text-gray-400";
};

// 文字
const textClass = (step) => {
  if (step === currentStep.value) return "text-blue-500 font-medium";
  if (step < currentStep.value) return "text-green-500";
  return "text-gray-400";
};

// 線
const lineClass = (step) => {
  if (step < currentStep.value) return "bg-green-500";
  return "bg-gray-300";
};

onMounted(() => {
  getOrder();
});
</script>
