import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

const { VITE_URL, VITE_PATH } = import.meta.env;

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  // 取得產品列表
  const getProducts = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/products`);
      products.value = res.data.products || []; // API 結構：data.products
    } catch (err) {
      console.error("❌ 取得產品列表失敗", err);
    }
  };

  return {
    products,
    getProducts,
  };
});
