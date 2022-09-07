import { App, Plugin } from "vue";

import { CircleWaterPlugin } from "./CircleWater";

import { DefectHandalPlugin } from "./DefectHandal";

const New3sPlugin: Plugin = {
  install(app: App) {
    CircleWaterPlugin.install?.(app);
    DefectHandalPlugin.install?.(app);
  },
};

export default New3sPlugin;

export * from "./CircleWater";
