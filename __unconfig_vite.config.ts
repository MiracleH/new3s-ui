
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Markdown from "vite-plugin-md";

// 文档: https://vitejs.dev/config/
const __unconfig_default =  defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
      packages: resolve(__dirname, "../packages"),
    },
  },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    Markdown(),
  ],
});

if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;