<template>
  <header
    :carts="carts"
    class="header border-b fixed top-0 left-0 w-full bg-white z-50"
  >
    <div class="container mx-auto flex justify-between items-center p-4">
      <!-- Logo -->
      <div class="header_logo">
        <router-link to="/">
          <img
            src="../../public/images/icons8-cat-64.png"
            alt="logo"
            class="w-10 h-10"
          />
        </router-link>
      </div>

      <!-- 桌機版選單 + 購物車 -->
      <nav class="hidden md:flex gap-6 items-center">
        <ul class="flex gap-6">
          <li><router-link to="/">首頁</router-link></li>
          <li><router-link to="/products">旅館</router-link></li>
          <li><router-link to="/articles">文章</router-link></li>
        </ul>
        <button @click="openCart">
          <span class="material-icons text-2xl">shopping_cart</span>
        </button>
      </nav>

      <!-- 手機版購物車 + 漢堡 -->
      <div class="flex items-center gap-4 md:hidden">
        <button>
          <span class="material-icons text-2xl">shopping_cart</span>
        </button>
        <button @click="isOpen = !isOpen">
          <span class="material-icons text-3xl">
            {{ isOpen ? "close" : "menu" }}
          </span>
        </button>
      </div>
    </div>

    <!-- 手機版下拉選單 -->
    <nav class="md:hidden bg-white shadow px-4 py-6" v-if="isOpen">
      <ul class="flex flex-col gap-4">
        <li><router-link to="/" @click="closeMenu">首頁</router-link></li>
        <li>
          <router-link to="/products" @click="closeMenu">旅館</router-link>
        </li>
        <li>
          <router-link to="/contact" @click="closeMenu">文章</router-link>
        </li>
      </ul>
    </nav>
    <CartSidebar :show="showCart" :carts="cartStore.carts" @close="closeCart" />
  </header>
</template>

<script setup>
import { ref } from "vue";
import CartSidebar from "@/components/CartSidebar.vue";
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { carts } = storeToRefs(cartStore);

const isOpen = ref(false);
const closeMenu = () => (isOpen.value = false);

// 假設 carts 資料由父層 props 傳入或用 Pinia/props/emit 取得
const cartIsOpen = ref(false);
const showCart = ref(false);

const openCart = () => (showCart.value = true);
const closeCart = () => (showCart.value = false);
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
