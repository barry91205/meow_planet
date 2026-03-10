<template>
  <HeaderView></HeaderView>
  <main class="main-content">
    <router-view />
  </main>
  <FooterView></FooterView>
</template>

<script>
import { onMounted } from "vue";
import HeaderView from "@/components/HeaderView.vue";
import FooterView from "@/components/FooterView.vue";
import { useCartStore } from "@/stores/cartStore";

export default {
  components: {
    HeaderView,
    FooterView,
  },
  setup() {
    const cartStore = useCartStore();
    
    onMounted(() => {
      // 應用初始化時載入購物車
      cartStore.getCarts();
    });
  },
};
</script>

<style>
.main-content {
  padding-top: 72px;
}
</style>
