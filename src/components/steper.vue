<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const currentStep = computed(() => {
  const map = {
    "/cart": 1,
    "/checkout": 2,
    "/confirm": 3,
    "/success": 4,
  };

  return map[route.path] ?? 1;
});
</script>
