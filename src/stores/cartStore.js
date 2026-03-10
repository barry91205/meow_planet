import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const { VITE_URL, VITE_PATH } = import.meta.env;

export const useCartStore = defineStore("cart", () => {
  const carts = ref([]);
  const total = ref(0);
  const final_total = ref(0);

  const getCarts = async () => {
    const res = await axios.get(`${VITE_URL}/v2/api/${VITE_PATH}/cart`);
    carts.value = res.data.data.carts;
    total.value = res.data.data.total;
    final_total.value = res.data.data.final_total;
  };

  const addToCart = async (id, qty = 1) => {
    try {
      const res = await axios.post(`${VITE_URL}/v2/api/${VITE_PATH}/cart`, {
        data: {
          product_id: id,
          qty,
        },
      });

      console.log("加入成功", res);
      await getCarts();
    } catch (err) {
      console.log("加入失敗", err.response);
      throw err;
    }
  };

  // 調整數量
  const updateCart = async (id, qty) => {
    try {
      const res = await axios.put(
        `${VITE_URL}/v2/api/${VITE_PATH}/cart/${id}`,
        {
          data: {
            qty,
          },
        },
      );
      Swal.fire("成功", "已調整數量", "success");
    } catch (err) {
      console.log("調整數量失敗", err.response);
      throw err;
    } finally {
      await getCarts();
    }
  };

  // 設定訂單資料
  const setOrder = (orderData) => {
    order.value = orderData;
  };

  // 清除訂單資料
  const clearOrder = () => {
    order.value = null;
  };

  const order = ref(null);

  return {
    carts,
    total,
    final_total,
    getCarts,
    addToCart,
    updateCart,
    setOrder,
    clearOrder,
  };
});
