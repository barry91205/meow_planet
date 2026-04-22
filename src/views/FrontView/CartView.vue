<template>
  <!-- checkout確認購物車 -->
  <div class="container mx-auto py-12">
    <h2 class="text-2xl font-bold mb-4">購物車</h2>
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
              <span v-if="index + 1 < currentStep">✓</span>
              <span v-else>{{ index + 1 }}</span>
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
    <div v-if="cartStore.isLoading">Loading...</div>
    <!-- 購物車 -->
    <div v-if="carts.length > 0" class="bg-white shadow rounded-lg p-6">
      <div
        v-for="item in carts"
        :key="item.id"
        class="flex items-center justify-between mb-4"
      >
        <div class="flex items-center">
          <img
            :src="item.product.imageUrl"
            alt="Product Image"
            class="w-16 h-16 object-cover rounded mr-4"
          />
          <div>
            <h3 class="text-lg font-semibold">
              {{ item.product.title }}
            </h3>
          </div>
          <!-- 調整數量 -->
          <div class="ml-4 flex items-center gap-2">
            <button
              @click="
                item.qty > 1 && cartStore.updateCart(item.id, item.qty - 1)
              "
              class="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300 transition"
            >
              -
            </button>
            <span>{{ item.qty }}</span>
            <button
              @click="
                item.qty > 1 && cartStore.updateCart(item.id, item.qty + 1)
              "
              class="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">小計</span>
          <span class="text-primary font-bold text-lg">
            <!-- 產品單一價格 乘以 數量 -->
            NT$ {{ formatPrice(item.product.price * item.qty) }}
          </span>
          <!-- 刪除按鈕 -->
          <button
            @click="cartStore.deleteCart(item.id)"
            class="text-red-500 hover:text-red-700 transition"
          >
            <span class="material-icons">delete</span>
          </button>
        </div>
        <!-- 整車價格 -->
      </div>
      <!-- 優惠卷 -->
      <div>
        <div>
          <input
            v-model="couponCode"
            type="text"
            placeholder="輸入優惠卷代碼"
            class="border rounded px-2 py-1 mr-2"
          />
          <button
            @click="useCoupon"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            使用優惠卷
          </button>
          <!-- 顯示優惠卷已套用 -->
          <p v-if="couponApplied" class="text-green-500">
            優惠卷已套用
          </p>
        </div>
        <!-- 折扣價格 -->
        <div class="border-t pt-4 text-right">
          <p>商品總額：${{ formatPrice(cartStore.total) }}</p>

          <p v-if="discount > 0" class="text-red-500">
            優惠折扣：- ${{ formatPrice(discount) }}
          </p>
        </div>
      </div>
      <div class="flex justify-end items-center mb-4">
        <span class="text-primary font-bold text-lg"
          >總計 NT$ {{ formatPrice(total) }}</span
        >
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-8">
      <p>購物車是空的</p>
    </div>

    <!-- 下一步 -->
    <div class="text-center mt-8">
      <button
        @click="goCheckout"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        前往結帳
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

import { formatPrice } from "@/utils/formatPrice";

const { VITE_URL, VITE_PATH } = import.meta.env;
// store
const cartStore = useCartStore();
const router = useRouter();

// ===== cart =====
const carts = computed(() => cartStore.carts);

const total = computed<number>(() =>
  (cartStore.carts || []).reduce((sum: number, item: any) => sum + item.final_total, 0),
);

const discount = computed<number>(() => {
  return cartStore.total - cartStore.final_total;
});

// ===== coupon =====
const couponCode = ref<string>("");

const useCoupon = async (): Promise<void> => {
  try {
    await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/coupon`, {
      data: {
        code: couponCode.value,
      },
    });
    console.log(couponCode.value);
    await cartStore.getCarts();

    Swal.fire("成功", "優惠卷已使用", "success");
  } catch (err: any) {
    Swal.fire("錯誤", "優惠卷無效", "error");
  }
};

// 顯示優惠卷已套用
const couponApplied = computed<boolean>(() => {
  return discount.value > 0;
});

// ===== router =====
const goCheckout = (): void => {
  router.push("/checkout");
};

// ===== stepper =====
const currentStep = ref<number>(1);

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

// ===== checkout method =====
const checkoutMethod = ref<string>("credit_card");
const selectCheckoutMethod = (method: string) => {
  checkoutMethod.value = method;
};

// ===== 數量調整 =====
const updateCart = (id: string, qty: number) => {
  if (qty < 1) return;
  cartStore.updateCart(id, qty);
};
</script>
