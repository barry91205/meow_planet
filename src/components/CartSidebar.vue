<template>
  <div class="cart-sidebar" :class="{ open: show }" @click.self="close">
    <div class="cart-panel">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">購物車</h2>
        <button @click="close">
          <span class="material-icons">close</span>
        </button>
      </div>
      <div class="flex flex-col" v-if="carts.length > 0">
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
        <!-- 置底部 -->
        <div class="flex flex-col justify-between items-center mb-4 mt-auto">
          <span class="text-primary font-bold text-lg mb-4"
            >總計 NT$ {{ total }}
          </span>
          <button class="primary-btn w-full py-2 rounded" @click="goCart">
            去買單
          </button>
        </div>
      </div>
      <div v-else class="text-gray-400 text-center py-12">購物車是空的</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  show: Boolean,
  // carts: Array,
  carts: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["close"]);
const close = () => emit("close");

const total = computed(() =>
  props.carts.reduce((sum, item) => sum + item.final_total, 0),
);

const router = useRouter();
const goCart = () => {
  close();
  router.push("/cart");
};
</script>

<style lang="scss" scoped>
.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
  transition: width 0.3s;
  pointer-events: none;
  &.open {
    width: 100vw;
    pointer-events: auto;
  }
  .cart-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 350px;
    max-width: 90vw;
    height: 100vh;
    background: #fff;
    box-shadow: -2px 0 16px rgba(0, 0, 0, 0.08);
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    transition: transform 0.3s;
    transform: translateX(100%);
  }
  &.open .cart-panel {
    transform: translateX(0);
  }
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
.text-primary {
  color: $primary;
}
</style>
