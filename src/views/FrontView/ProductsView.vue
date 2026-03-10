<template>
  <div class="container py-12 mx-auto">
    <h1 class="title mb-10">房型介紹</h1>
    <ul class="flex justify-center gap-6 mb-6 border-b-2 pb-4">
      <li>
        <router-link to="/products" class="room-link">全部房型</router-link>
      </li>
      <li class="room-link" v-for="item in categories" :key="item">
        <RouterLink
          class="py-2 nav-link link-hover"
          :to="`/products?category=${item}`"
          :class="[
            'py-2 nav-link link-hover',
            route.query.category === item
              ? 'text-primary border-primary border-b-2 '
              : '',
          ]"
          >{{ item }}
        </RouterLink>
      </li>
    </ul>
    <div class="product-list grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-item p-4 rounded-lg shadow-md"
      >
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full h-48 object-cover mb-4 rounded"
        />
        <h2 class="text-xl font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-gray-700 mb-4">$ {{ product.price }}</p>
        <div class="flex justify-between gap-2">
          <RouterLink
            :to="`/product/${product.id}`"
            class="details-btn px-4 py-2 rounded"
          >
            <span>查看詳情</span>
          </RouterLink>
          <button
            type="button"
            class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition"
            @click.prevent="addToCart(product.id, 1)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useCartStore } from "@/stores/cartStore";
import { useLoading } from "vue-loading-overlay";
import Swal from "sweetalert2";
const { VITE_URL, VITE_PATH } = import.meta.env;

// Pinia store
import { storeToRefs } from "pinia";
// const store = useYourStore();
const cartStore = useCartStore();
// loading overlay
// const loading = useLoading();

const products = ref([]);
const carts = ref([]);
const categories = ref(["1貓房", "2貓房", "4貓房", "5貓房"]);
const route = useRoute();

const getProducts = async () => {
  // const loader = loading.show();
  const { category = "" } = route.query;
  try {
    const res = await axios.get(
      `${VITE_URL}/v2/api/${VITE_PATH}/products?category=${category}`,
    );
    products.value = res.data.products;
  } catch (err) {
    Swal.fire("錯誤", "取得資料失敗", "error");
  } finally {
    // loader.hide();
  }
};

const addToCart = async (id, qty = 1) => {
  try {
    const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, {
      data: {
        product_id: id,
        qty,
      },
    });
    await cartStore.addToCart(id, qty);
    Swal.fire("成功", "已加入購物車", "success");
  } catch (err) {
    Swal.fire("錯誤", "加入購物車失敗", "error");
  } finally {
    // loader.hide();
  }
};

onMounted(() => {
  getProducts();
  // getCarts();
  cartStore.getCarts();
  console.log("購物車內容：", carts.value);
});

watch(
  () => route.query.category,
  () => {
    getProducts();
  },
);
</script>

<style lang="scss">
.product-item {
  border: 3px solid #e2e8f0;
  background-color: #fff;
  transition: transform 0.3s ease;
  &:hover {
    border: 3px solid #92b7e7;
  }
}

.details-btn {
  position: relative;
  overflow: hidden;
  background: $primary;
  color: #fff;
  transition: color 0.2s;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    background: darken($primary, 10%);
    z-index: 0;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover::before {
    width: 100%;
  }

  /* 讓文字在上層 */
  span,
  & {
    position: relative;
    z-index: 1;
  }
}

.room-link {
  display: block;
  padding: 0.5rem 1.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 999px;
  color: #333;
  transition:
    border-color 0.2s,
    color 0.2s,
    background 0.2s;
  text-align: center;
  font-weight: 500;
  background: #fff;

  &:hover,
  &.router-link-active {
    border-color: $primary;
    color: $primary;
    background: #f7fafc;
    text-decoration: none;
  }
}
</style>
