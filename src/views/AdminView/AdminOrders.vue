<template>
  <div class="container">
    <div class="admin-orders bg-white shadow-md rounded-lg p-6">
      <h2>管理訂單</h2>
      <!-- 訂單管理內容 -->
      <table class="w-full table-auto mt-4">
        <thead class="bg-gray-200">
          <tr class="text-left">
            <th class="p-2">訂單編號</th>
            <th class="p-2">用戶</th>
            <th class="p-2">商品</th>
            <th class="p-2">金額</th>
            <th class="p-2">訂單日期</th>
            <th class="p-2">付款狀態</th>
            <th class="p-2">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border-t">
            <td class="p-2">{{ order.id }}</td>

            <td class="p-2">
              {{ order.user?.name }}
            </td>

            <td class="p-2">
              <ul>
                <li v-for="item in order.products" :key="item.id">
                  {{ item.product.title }} × {{ item.qty }}
                </li>
              </ul>
            </td>

            <td class="p-2">
              {{ order.total }}
            </td>

            <td class="p-2">
              {{ formatDate(order.create_at) }}
            </td>

            <td class="p-2">
              <input
                type="checkbox"
                :checked="order.is_paid"
                @change="togglePaid(order)"
              />
              <span v-if="order.is_paid">已付款</span>
              <span v-else>未付款</span>
            </td>

            <td class="p-2">
              <button
                class="bg-red-500 text-white px-3 py-1 rounded"
                @click="deleteOrder(order.id)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- pagination -->
      <AdminPagination :pagination="pagination" @change-page="getOrders" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const { VITE_URL, VITE_PATH } = import.meta.env;

import AdminPagination from "@/components/admin/AdminPagination.vue";

const orders = ref([]);
const pagination = ref({});

const getOrders = async () => {
  try {
    const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders`);
    orders.value = res.data.orders;
    console.log((orders.value = res.data.orders));
    pagination.value = res.data.pagination;
    console.log(res.data);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const formatDate = (time) => {
  return new Date(time * 1000).toLocaleDateString();
};

onMounted(() => {
  getOrders();
});
</script>
