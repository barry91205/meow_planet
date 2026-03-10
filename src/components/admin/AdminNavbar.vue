<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">管理後台</h1>
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">歡迎來到管理後台！</h2>
      <p class="text-gray-700 mb-4">
        這裡是管理員專用的後台介面，您可以在這裡管理產品、訂單和用戶等資訊。
      </p>
      <div class="space-x-4">
        <router-link
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          to="/admin/products"
        >
          商品管理
        </router-link>

        <router-link
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          to="/admin/orders"
        >
          訂單管理
        </router-link>

        <router-link
          class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          to="/admin/coupons"
        >
          優惠券管理
        </router-link>
      </div>
    </div>
  </div>
</template>
