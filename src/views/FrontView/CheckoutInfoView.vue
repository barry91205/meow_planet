<template>
  <div class="w-full max-w-3xl mx-auto py-8">
    <div class="flex items-center">
      <div v-for="(step, index) in steps" :key="step">
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
      </div>
    </div>
    <div class="bg-white shadow rounded-lg p-6 mt-8">
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
            <h3 class="text-lg font-semibold">{{ item.product.title }}</h3>
            <p class="text-sm text-gray-500">數量: {{ item.qty }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// ===== stepper =====
const currentStep = ref(2);
const steps = ["購物車", "填寫資訊", "確認訂單", "完成"];
</script>
