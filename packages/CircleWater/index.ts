import { App, Plugin } from "vue";
import CircleWater from "./src/index.vue";

export const CircleWaterPlugin: Plugin = {
  install(app: App) {
    app.component("ns-circle-water", CircleWater);
  },
};

export { CircleWater };
