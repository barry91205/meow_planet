<template>
  <!-- checkout確認購物車 -->
  <div class="container mx-auto py-12">
    <h2 class="text-2xl font-bold mb-4">結帳</h2>
    <!-- 步驟進度條 -->
    <div class="w-full max-w-3xl mx-auto py-8">
      <div class="flex items-center">
        <template v-for="(step, index) in steps" :key="step">
          <!-- 步驟1 -->
          <div class="flex flex-col items-center text-center">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition"
              :class="circleClass(index + 1)"
            >
              <!-- <span v-if="index + 1 < currentStep">✓</span> -->
              <span>{{ index + 1 }}</span>
            </div>

            <p class="mt-2 text-sm" :class="textClass(index + 1)">
              {{ step }}
            </p>
          </div>

          <!-- 線 -->
          <div
            v-if="index !== steps.length - 1"
            class="flex-1 h-1 mx-2 transition"
            :class="lineClass(index + 1)"
          />
        </template>
      </div>
    </div>
    <div v-if="carts.length > 0" class="bg-white p-6 rounded-lg shadow-md">
      <ul class="mb-4 max-h-80 overflow-y-auto">
        <li
          v-for="item in carts"
          :key="item.id"
          class="flex items-center justify-between py-2 border-b"
        >
          <div>
            <div class="font-medium">{{ item.product.title }}</div>
            <div class="text-sm text-gray-500">x{{ item.qty }}</div>
          </div>
          <div class="text-primary font-bold">NT$ {{ item.final_total }}</div>
        </li>
      </ul>
      <div class="flex justify-between items-center mb-4">
          <!-- 折扣金額 -->
          <p class="text-red-500">優惠折扣：</p>
          <p v-if="discount > 0" class="text-red-500">
            - ${{ formatPrice(discount) }}
          </p>
      </div>
      
      <div class="flex justify-between items-center mb-4">
        <span class="font-bold">總計</span>
        <span class="text-primary font-bold text-lg"> NT$ {{ total }} </span>
      </div>
      <!-- 填寫資訊 -->
      <div class="mb-4">
        <h3 class="font-bold mb-2">填寫資訊</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- 名字 -->
          <v-form ref="form" v-slot="{ errors }" @submit="createOrder">
            <div class="mb-4">
              <label for="name" class="form-label"
                >收件人姓名<span class="marker">*</span>
              </label>
              <v-field
                id="name"
                name="name"
                v-model="orderForm.user.name"
                label="姓名"
                class="w-full border rounded px-4 py-2 transition"
                :class="
                  errors.name
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                "
                placeholder="請輸入姓名"
                rules="required"
              />
              <error-message
                name="name"
                class="text-red-500 text-sm mt-1 block"
              ></error-message>
            </div>
            <div class="mb-4">
              <!-- 這個套件只能用tel 不能用phone -->
              <label for="tel" class="form-label"
                >電話<span class="marker">*</span>
              </label>
              <v-field
                id="tel"
                name="tel"
                v-model="orderForm.user.tel"
                label="電話"
                class="w-full border rounded px-4 py-2 transition"
                :class="
                  errors.tel
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                "
                placeholder="請輸入電話號碼"
                rules="required"
              />
              <error-message
                name="tel"
                class="text-red-500 text-sm mt-1 block"
              ></error-message>
            </div>
            <!-- 信箱 -->
            <div class="mb-4">
              <label for="email" class="form-label"
                >Email<span class="marker">*</span>
              </label>
              <v-field
                id="email"
                name="email"
                v-model="orderForm.user.email"
                label="Email"
                class="w-full border rounded px-4 py-2 transition"
                :class="
                  errors.email
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                "
                placeholder="請輸入電子郵件地址"
                rules="required|email"
              />
              <error-message
                name="email"
                class="text-red-500 text-sm mt-1 block"
              ></error-message>
            </div>
            <!-- 地址 -->
            <div class="mb-4">
              <label for="address" class="form-label"
                >地址<span class="marker">*</span>
              </label>

              <v-field
                id="address"
                name="address"
                v-model="orderForm.user.address"
                label="地址"
                class="w-full border rounded px-4 py-2 transition"
                :class="
                  errors.address
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                "
                placeholder="請輸入收件地址"
                rules="required"
              />
              <error-message
                name="address"
                class="text-red-500 text-sm mt-1 block"
              ></error-message>
            </div>
            <div class="mb-4">
              <h3 class="font-bold mb-2">選擇結帳方式</h3>
              <div class="flex gap-4">
                <button
                  type="button"
                  @click="checkoutMethod = 'credit_card'"
                  :class="
                    checkoutMethod === 'credit_card'
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300'
                  "
                  class="px-4 py-2 rounded transition"
                >
                  信用卡
                </button>

                <button
                  type="button"
                  @click="checkoutMethod = 'cod'"
                  :class="
                    checkoutMethod === 'cod'
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300'
                  "
                  class="px-4 py-2 rounded transition"
                >
                  貨到付款
                </button>
              </div>
            </div>
            <button
              type="submit"
              :disabled="cartStore.isLoading"
              class="primary-btn w-full p-3 text-lg rounded disabled:opacity-50"
            >
              確認訂單
            </button>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import { Form as VForm, Field as VField, ErrorMessage } from "vee-validate";
import axios from "axios";
import Swal from "sweetalert2";

import { formatPrice } from "@/utils/formatPrice";

const { VITE_URL, VITE_PATH } = import.meta.env;

const cartStore = useCartStore();
const router = useRouter();

const carts = computed(() => cartStore.carts);
const total = computed<number>(() =>
  (cartStore.carts || []).reduce((sum, item) => sum + item.final_total, 0),
);

interface OrderForm {
  user: {
    name: string;
    email: string;
    tel: string;
    address: string;
  };
  message: string;
}

const orderForm = ref<OrderForm>({
  user: {
    name: "",
    email: "",
    tel: "",
    address: "",
  },
  message: "",
});

const formRef = ref<InstanceType<typeof VForm> | null>(null);
const orderId = ref("");
const checkoutMethod = ref("");

// 提交訂單
const createOrder = async () => {
  // 檢查購物車是否有東西，避免送出空訂單
  if (cartStore.carts.length === 0) {
    Swal.fire({ icon: "warning", title: "購物車是空的喔！" });
    return;
  }
  const url = `${VITE_URL}/v2/api/${VITE_PATH}/order`;
  const order = {
    user: {
      ...orderForm.value.user,
      payment: checkoutMethod.value,
    },
    message: orderForm.value.message,
  };

  try {
    const res = await axios.post(url, {
      data: order,
    });
    console.log("購物車內容：", cartStore.carts);
    await Swal.fire({
      icon: "success",
      title: "訂單成立",
    });

    formRef.value?.resetForm();

    orderId.value = res.data.orderId;
    console.log("訂單ID:", orderId.value);
    router.push({
      name: "order",
      params: { orderId: orderId.value },
    });

    localStorage.setItem("orderId", res.data.orderId);

    await cartStore.getCarts();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "訂單失敗",
    });
  }
};

// 優惠卷折扣金額
const discount = computed<number>(() => {
  return cartStore.total - cartStore.final_total;
});


onMounted(() => {
  cartStore.getCarts();
});

// ===== stepper =====
const currentStep = ref(2);

const steps = ["購物車", "填寫資訊", "確認訂單", "完成"];

// 圓點
const circleClass = (step: number) => {
  if (step < currentStep.value)
    return "bg-green-500 text-white border-green-500";

  if (step === currentStep.value)
    return "border-2 border-blue-500 text-blue-500";

  return "border-2 border-gray-300 text-gray-400";
};

// 文字
const textClass = (step: number) => {
  if (step === currentStep.value) return "text-blue-500 font-medium";
  if (step < currentStep.value) return "text-green-500";
  return "text-gray-400";
};

// 線
const lineClass = (step: number) => {
  if (step < currentStep.value) return "bg-green-500";
  return "bg-gray-300";
};
</script>
