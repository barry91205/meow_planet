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
  </div>
  <!-- 確認訂單資訊 -->
  <div class="container" v-if="orderForm">
    <div class="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 class="text-xl font-bold mb-4">確認訂單資訊</h2>

      <p class="mb-2">姓名: {{ orderForm.user.name }}</p>
      <p class="mb-2">電話: {{ orderForm.user.tel }}</p>
      <p class="mb-2">地址: {{ orderForm.user.address }}</p>
      <p class="mb-4">付款方式: {{ orderForm.user.payment }}</p>

      <!-- 商品列表 -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold mb-4">商品內容</h3>

        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
              <th class="py-2">商品</th>
              <th class="py-2">數量</th>
              <th class="py-2">單價</th>
              <th class="py-2 text-right">小計</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in order.products" :key="item.id" class="border-b">
              <td class="py-3 flex items-center gap-3">
                <img
                  :src="item.product.imageUrl"
                  class="w-16 h-16 object-cover rounded"
                />
                {{ item.product.title }}
              </td>

              <td>{{ item.qty }}</td>

              <td>NT$ {{ item.product.price }}</td>

              <td class="text-right">NT$ {{ item.total }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">總計</span>
        <span class="text-primary font-bold text-lg">
          NT$ {{ orderForm.total }}
        </span>
      </div>

      <button
        @click="payOrder"
        class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
      >
        立即付款
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cartStore";

const { VITE_URL, VITE_PATH } = import.meta.env;
const cartStore = useCartStore();

// 訂單產品資訊
const order = ref({
  products: [],
});

const orderForm = ref({
  user: {
    name: "",
    tel: "",
    address: "",
    payment: "",
  },
});
const router = useRouter();
const route = useRoute();
const orderId = ref(route.params.orderId);

const getOrder = async () => {
  try {
    const res = await axios.get(
      `${VITE_URL}/v2/api/${VITE_PATH}/order/${route.params.orderId}`,
    );
    orderForm.value = res.data.order;
    order.value = res.data.order;
  } catch (error) {
    console.error(error);
  }
};

const payOrder = async () => {
  try {
    await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/pay/${order.value.id}`);

    Swal.fire({
      icon: "success",
      title: "付款成功",
    });

    router.push({
      name: "success",
      params: { orderId: orderId.value },
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "付款失敗",
    });
  }
};

onMounted(() => {
  getOrder();
});

// ===== stepper =====
const currentStep = ref(3);
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
</script>
