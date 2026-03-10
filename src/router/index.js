import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    // name: "home",
    component: () => import("@/views/FrontView/FrontView.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/FrontView/HomeView.vue"),
      },
      {
        path: "products",
        name: "products",
        component: () => import("@/views/FrontView/ProductsView.vue"),
      },
      {
        path: "product/:id",
        name: "product",
        component: () => import("@/views/FrontView/ProductView.vue"),
      },
      {
        path: "articles",
        name: "articles",
        component: () => import("@/views/FrontView/ArticlesView.vue"),
      },
      {
        path: "article/:id",
        name: "article",
        component: () => import("@/views/FrontView/ArticleView.vue"),
      },
      {
        path: "cart",
        name: "cart",
        component: () => import("@/views/FrontView/CartView.vue"),
      },
      {
        path: "checkout",
        name: "checkout",
        component: () => import("@/views/FrontView/CheckoutView.vue"),
      },
      {
        path: "order/:orderId",
        name: "order",
        component: () => import("@/views/FrontView/ConfirmOrderView.vue"),
      },
      {
        path: "/success/:orderId",
        name: "success",
        component: () => import("@/views/FrontView/SuccessOrderView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFoundView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("@/views/AdminView/AdminLayoutView.vue"),
    children: [
      {
        path: "products",
        component: () => import("@/views/AdminView/AdminProducts.vue"),
      },
      {
        path: "orders",
        component: () => import("@/views/AdminView/AdminOrders.vue"),
      },
      {
        path: "coupons",
        component: () => import("@/views/AdminView/AdminCoupons.vue"),
      },
      {
        path: "articles",
        component: () => import("@/views/AdminView/AdminArticles.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
