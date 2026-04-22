<template>
  <div class="container py-12">
    <div v-if="product" class="flex flex-col md:flex-row gap-8">
      <!-- 房型圖片 -->
      <div class="md:w-1/2">
        <img
          :src="product.imageUrl"
          :alt="product.title"
          class="w-full h-80 object-cover rounded-lg shadow"
        />
      </div>
      <!-- 房型資訊 -->
      <div class="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>
          <p class="text-xl text-primary font-semibold mb-2">
            NT$ {{ product.price }}
          </p>
          <p class="text-gray-700 mb-6">{{ product.description }}</p>
          <ul class="mb-6">
            <li
              v-for="(facility, index) in facilities"
              :key="index"
              class="flex items-center mb-2"
            >
              <span class="material-icons text-primary mr-2">check_circle</span>
              {{ facility }}
            </li>
          </ul>
        </div>
        <!-- 加入商品數量至購物車 -->
        <div class="flex items-center border rounded overflow-hidden mb-6">
          <button
            type="button"
            @click="decreaseQty"
            class="px-4 py-2 primary-btn transition disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="qty <= 1"
          >
            -
          </button>

          <input
            type="number"
            v-model.number="qty"
            class="w-16 text-center py-2 outline-none appearance-none"
            min="1"
          />

          <button
            type="button"
            @click="increaseQty"
            class="px-4 py-2 primary-btn hover:bg-gray-200 text-gray-600 transition"
          >
            +
          </button>
        </div>
        <!-- 加入購物車按鈕 -->
        <button
          type="button"
          class="primary-btn w-full py-3 text-lg rounded"
          :disabled="cartStore.isLoading"
          @click.prevent.stop="cartStore.addToCart(product.id, qty)"
        >
          {{
            cartStore.isLoading ? '加入中...' : '加入購物車'
          }}
        </button>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400">載入中...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";

const productStore = useProductStore();
const cartStore = useCartStore();

const route = useRoute();

const product = computed(() => {
  const id = route.params.id;
  return productStore.products.find((p) => p.id === id);
});

// 設備介紹渲染
const facilities = computed<string[]>(() => {
  // 使用可選串連 (?.) 會讓語法更簡潔
  // 如果 product.value 存在，且有 facilities，就回傳它；否則回傳預設陣列
  return product.value?.facilities?.length
    ? product.value.facilities
    : ["免費Wi-Fi", "冷氣", "獨立衛浴", "寵物友善", "24小時服務"];
});

// 新增：加入購物車數量功能
const qty = ref<number>(1);
// 寫兩個小函式來控制數量的加減 (防呆：不能小於 1)
const increaseQty = (): void => {
  qty.value++;
};

const decreaseQty = (): void => {
  if (qty.value > 1) {
    qty.value--;
  }
};

onMounted(() => {
  productStore.getProducts();
  cartStore.getCarts();
});
</script>

<style lang="scss">
.text-primary {
  color: $primary;
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
