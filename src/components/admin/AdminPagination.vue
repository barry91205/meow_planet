<template>
  <div class="flex justify-center mt-6">
    <button
      class="px-3 py-1 border"
      :disabled="!pagination.has_pre"
      @click="$emit('change-page', pagination.current_page - 1)"
    >
      上一頁
    </button>

    <span class="px-4">
      {{ pagination.current_page }} / {{ pagination.total_pages }}
    </span>

    <button
      class="px-3 py-1 border"
      :disabled="!pagination.has_next"
      @click="$emit('change-page', pagination.current_page + 1)"
    >
      下一頁
    </button>
  </div>
</template>

<script setup>
defineProps({
  pagination: Object,
});
</script>
