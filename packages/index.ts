import { App, Plugin } from "vue";

import { CircleWaterPlugin } from "./CircleWater";

const New3sPlugin: Plugin = {
  install(app: App) {
    CircleWaterPlugin.install?.(app);
  },
};

export default New3sPlugin;

export * from "./CircleWater";
