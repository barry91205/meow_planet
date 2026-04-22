<template>
  <div class="container py-12 mx-auto">
    <h1 class="text-3xl font-bold mb-10">房型介紹</h1>
    <ul class="flex justify-center mb-6 border-b-2 pb-4 gap-2 sm:gap-5 md:gap-6 lg:gap-8">
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
          :alt="product.title"
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
            :disabled="cartStore.loadingItem === product.id"
            @click.prevent="cartStore.addToCart(product.id, 1)"
          >
            {{ cartStore.loadingItem === product.id ? '加入中...' : '加入購物車' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted,computed } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const cartStore = useCartStore();

const categories = ref(["1貓房", "2貓房", "4貓房", "5貓房"]);
const route = useRoute();

const products = computed(() => {
  const category = route.query.category;
  if (category) {
    return productStore.products.filter(p => p.category === category);
  }
  return productStore.products;
});

onMounted(() => {
  productStore.getProducts();
  cartStore.getCarts();
  console.log("產品列表：", productStore.products);
});

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
    background: $secondary;
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
  @media (max-width: 768px) {
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
