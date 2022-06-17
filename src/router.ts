import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";

const routes = [
  {
    title: "波纹圆球",
    name: "CircleWater",
    path: "/components/CircleWater",
    component: () => import(`../packages/CircleWater/docs/README.md`),
  },
];

const routerConfig = {
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to: any, from: any) {
    if (to.path !== from.path) {
      return { top: 0 };
    }
  },
};

const router = createRouter(routerConfig as RouterOptions);

export default router;
