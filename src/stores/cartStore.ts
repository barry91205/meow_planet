import { defineStore } from "pinia";
import { ref,computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

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
}

export interface CartItem {
  id: string;
  product_id: number;
  product: Product;
  qty: number;
  title: string;
  price: number;
  final_total: number;
  imageUrl: string;
}

export interface OrderData {
  user?: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  message?: string;
}

const { VITE_URL, VITE_PATH } = import.meta.env;

export const useCartStore = defineStore("cart", () => {
  const carts = ref<CartItem[]>([]);
  const total = ref<number>(0);
  const final_total = ref<number>(0);
  const isLoading = ref<boolean>(false);

  const order = ref<OrderData | null>(null);

  const loadingItem = ref<string>("");

  const getCarts = async () => {
    isLoading.value = true;
    const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
    carts.value = res.data.data.carts;
    total.value = res.data.data.total;
    final_total.value = res.data.data.final_total;
    isLoading.value = false;;
  };

  const addToCart = async (id:string, qty:number = 1) => {
    isLoading.value = true;
    try {
      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, {
        data: {
          product_id: id,
          qty,
        },
      });

      Swal.fire("成功", "已加入購物車", "success");
      await getCarts();
    } catch (err: any) {
      console.log("加入失敗", err.response);
      Swal.fire("錯誤", "加入購物車失敗", "error");
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 調整數量
  const updateCart = async (id:string, qty:number) => {
    isLoading.value = true;
    try {
      const res = await axios.put(
        `${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`,
        {
          data: {
            product_id: id,
            qty,
          },
        },
      );
      console.log("調整數量成功", res);
      Swal.fire("成功", "已調整數量", "success");
    } catch (err: any) {
      console.log("調整數量失敗", err.response);
      throw err;
    } finally {
      await getCarts();
      isLoading.value = false;
    }
  };

  // 刪除購物車項目
  const deleteCart = async (id:string) => {
    isLoading.value = true;
    try {
      const res = await axios.delete(
        `${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`,
      );
      console.log("刪除成功", res);
      Swal.fire("成功", "已刪除購物車項目", "success");
    } catch (err: any) {
      console.log("刪除失敗", err.response);
      throw err;
    } finally {     
      await getCarts();
      isLoading.value = false;
    }
  };

  // navbar 顯示購物車品項數量
  // 增加這段：計算購物車內商品的總數量
  const cartQty = computed<number>(() => {
    // 使用 reduce 累加每一項的 qty
    return carts.value.reduce((sum, item) => sum + item.qty, 0);
  });


  // 設定訂單資料
  const setOrder = (orderData: OrderData) => {
    order.value = orderData;
  };

  // 清除訂單資料
  const clearOrder = () => {
    order.value = null;
  };

  return {
    loadingItem,
    carts,
    cartQty,
    total,
    final_total,
    getCarts,
    addToCart,
    updateCart,
    deleteCart,
    isLoading,
    order,
    setOrder,
    clearOrder,
  };
});
