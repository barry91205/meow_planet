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
              v-for="(f, i) in product.facilities"
              :key="i"
              class="flex items-center mb-2"
            >
              <span class="material-icons text-primary mr-2">check_circle</span>
              {{ f }}
            </li>
          </ul>
        </div>
        <button
          class="primary-btn w-full py-3 text-lg rounded"
          @click.prevent="addToCart(product.id)"
        >
          預約這個房型
        </button>
      </div>
    </div>
    <div v-else class="text-center py-20 text-gray-400">載入中...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { useCartStore } from "@/stores/cartstore";
const { VITE_URL, VITE_PATH } = import.meta.env;

const cartStore = useCartStore();

const route = useRoute();

const product = ref(null);

const getProduct = async () => {
  const id = route.params.id;
  try {
    const res = await axios.get(
      `${VITE_URL}/v2/api/${VITE_PATH}/product/${id}`,
    );
    if (res.data.success) {
      product.value = res.data.product;
      // 假設設施資料在 product.value.facilities，若沒有可自行調整
      if (!product.value.facilities) {
        product.value.facilities = [
          "免費Wi-Fi",
          "冷氣",
          "獨立衛浴",
          "寵物友善",
        ];
      }
    } else {
      Swal.fire("錯誤", res.data.message, "error");
    }
  } catch (err) {
    Swal.fire("錯誤", "取得資料失敗", "error");
  }
};

const addToCart = async (id, qty = 1) => {
  try {
    // delegate adding to cart to the store, which already handles the API call
    await cartStore.addToCart(id, qty);

    // optionally refresh cart data if needed
    // await cartStore.getCarts();

    Swal.fire("成功", "已加入購物車", "success");
  } catch (err) {
    // you can inspect err.response for more details in devtools
    Swal.fire("錯誤", "加入購物車失敗", "error");
  }
};

onMounted(() => {
  getProduct();
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
    background: darken($primary, 10%);
  }
}
</style>
