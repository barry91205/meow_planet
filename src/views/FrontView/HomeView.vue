<template>
  <swiper
    :cssMode="true"
    :navigation="{
      nextEl: '.my-swiper-next',
      prevEl: '.my-swiper-prev',
    }"
    :pagination="true"
    :mousewheel="true"
    :keyboard="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide>
      <div class="banner-slide-item">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt=""
        />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="banner-slide-item">
        <img
          src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvdGVsfGVufDB8MHwwfHx8MA%3D%3D"
          alt=""
        />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="banner-slide-item">
        <img
          src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHwwfDB8fHww"
          alt=""
        />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="banner-slide-item">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8MHwwfHx8MA%3D%3D"
          alt=""
        />
      </div> </swiper-slide
    ><swiper-slide>
      <div class="banner-slide-item">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8MHwwfHx8MA%3D%3D"
          alt=""
        />
      </div>
    </swiper-slide>
    <button class="my-swiper-prev banner-swiper-btn" disabled>
      <span class="material-icons">arrow_back</span>
    </button>
    <button class="my-swiper-next banner-swiper-btn" disabled>
      <span class="material-icons">arrow_forward</span>
    </button>
  </swiper>

  <!-- 最新消息 -->
  <section class="news">
    <div class="container mx-auto py-12">
      <h2 class="text-3xl font-bold mb-10 text-center">最新消息</h2>
      <div class="flex flex-col gap-3">
        <swiper
          :direction="'vertical'"
          :modules="modules"
          class="news-swiper w-full"
          :slides-per-view="3"
          :slides-per-group="2"
        >
          <swiper-slide v-for="article in articles" :key="article.id">
            <router-link
              :to="`/article/${article.id}`"
              class="news-item block bg-white p-3 rounded-lg shadow-md"
            >
              <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>

              <div class="border border-gray-200 rounded p-2">
                <span
                  v-for="tag in article.tag"
                  :key="tag"
                  class="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2 text-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>

  <!-- 產品推薦 -->
  <section>
    <div class="container mx-auto py-12">
      <h2 class="text-3xl font-bold mb-10 text-center">產品推薦</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- 限制只放四個 -->
        <div
          v-for="product in products.slice(0, 4)"
          :key="product.id"
          class="product-item bg-white p-4 rounded-lg shadow-md flex flex-col"
        >
          <img
            :src="product.imageUrl"
            alt="Product Image"
            class="w-full h-48 object-cover mb-4 rounded"
          />
          <h3 class="text-xl font-semibold mb-2">
            {{ product.title }}
          </h3>
          <!-- line-clamp-2 限制行數 -->
          <p class="text-gray-700 mb-4 line-clamp-2">
            {{ product.description }}
          </p>
          <!-- 修復按鈕高低不一的情況 -->
          <!-- 在父層放 flex flex-col ，按鈕用 mt-auto 推到底-->
          <router-link
            :to="`/product/${product.id}`"
            class="mt-auto bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition text-center"
          >
            <span>查看詳情</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { onMounted } from "vue";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "axios";
const modules = [Navigation, Pagination, Mousewheel, Keyboard];
const swiperRef = ref(null);

const { VITE_URL, VITE_PATH } = import.meta.env;
const router = useRouter();

// 產品推薦
const products = ref([]);
const getProducts = async () => {
  try {
    const response = await axios.get(`${VITE_URL}/api/${VITE_PATH}/products`);
    products.value = response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// 文章(最新消息)
const articles = ref({});
const fetchArticles = async () => {
  try {
    const response = await axios.get(`${VITE_URL}/api/${VITE_PATH}/articles`);
    articles.value = response.data.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const goToArticle = (id) => {
  router.push(`/article/${id}`);
};

onMounted(() => {
  fetchArticles();
  getProducts();
});
</script>

<style lang="scss">
.mySwiper {
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
  }
  .swiper-pagination-bullet-active {
    background: $primary;
    width: 12px;
  }

  .banner-swiper-btn {
    background: $primary;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin: 0 8px;
    font-size: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
  }
  .my-swiper-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  .my-swiper-next {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 10;
  }
  .banner-swiper-btn:hover {
    background: $primary;
  }
  .banner-swiper-btn:disabled,
  .banner-swiper-btn.disabled {
    background: $primary;
    color: #fff;
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
    pointer-events: none;
    /* 取消 hover 效果 */
    transition: none;
  }
}
.banner-slide-item img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.news-swiper {
  height: 300px; /* 或你想要的高度 */
}

.news-item {
  position: relative;
  transition:
    border-left 0.1s ease,
    background-color 0.1s ease;
}

.news-item:hover {
  border-left: 4px solid #3b82f6; /* Tailwind 的 blue-500 */
  background-color: #f9fafb;
}
</style>
