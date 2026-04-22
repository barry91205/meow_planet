import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export interface Product {
  id: string;
  category: string;
  content: string;
  description: string;
  imageUrl: string;
  is_enabled: number;
  num: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  facilities?: string[];
}

const { VITE_URL, VITE_PATH } = import.meta.env;

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([]);
  // 取得產品列表
  const getProducts = async () => {
    try {
      const res = await axios.get<{ success: boolean; products: Product[] }>(`${VITE_URL}/v2/api/${VITE_PATH}/products`);
      products.value = res.data.products || []; 

      
    } catch (err: any) {
      console.error("❌ 取得產品列表失敗", err);
    }
  };

  return {
    products,
    getProducts,
  };
});
