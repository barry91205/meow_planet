<template>
  <div class="container mx-auto py-8">
    <h1 class="text-3xl font-bold mb-6">文章列表</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="article in articles"
        :key="article.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="article.imageUrl"
          alt="Article Image"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ article.title }}</h2>
          <p class="text-gray-600 mb-4">{{ article.summary }}</p>
          <button
            @click="goToArticle(article.id)"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            閱讀更多
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  setup() {
    const articles = ref([]);
    const router = useRouter();

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
    });

    return {
      articles,
      goToArticle,
    };
  },
};
</script>
