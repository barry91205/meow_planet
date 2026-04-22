<template>
  <div class="container mx-auto py-8">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        v-if="article"
        :src="article.imageUrl"
        alt="Article Image"
        class="w-full h-[400px] object-cover"
      />
      <div class="p-6">
        <h1 v-if="article" class="text-3xl font-bold mb-4">
          {{ article.title }}
        </h1>
        <!-- <p v-if="article" class="text-gray-700 mb-6">{{ article.content }}</p> -->
        <h5 v-if="article" class="mt-4 mb-4" v-html="article.content"></h5>
        <button
          @click="$router.back()"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          返回上一頁
        </button>
      </div>
    </div>
  </div>
</template>
\

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const VITE_URL = import.meta.env.VITE_URL as string;
const VITE_PATH = import.meta.env.VITE_PATH as string;

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

const article = ref<Article | null>(null);
const route = useRoute();

const fetchArticle = async () => {
  try {
    const response = await axios.get<{ article: Article }>(
      `${VITE_URL}/api/${VITE_PATH}/article/${route.params.id}`,
    );
    article.value = response.data.article;
  } catch (error: any) {
    console.error("Error fetching article:", error);
  }
};

onMounted(() => {
  fetchArticle();
});
</script>
