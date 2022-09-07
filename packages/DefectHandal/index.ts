import { App, Plugin } from "vue";
import DefectHandal from "./src/index";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faVectorSquare,
  faSquare,
  faArrowPointer,
  faHand,
  faPause,
  faListUl,
  faMagnifyingGlass,
  faEye,
  faEyeSlash,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faVectorSquare,
  faSquare,
  faMagnifyingGlass,
  faArrowPointer,
  faHand,
  faPause,
  faListUl,
  faEye,
  faEyeSlash,
  faScrewdriverWrench
);

import VueKonva from "vue-konva";

export const DefectHandalPlugin: Plugin = {
  install(app: App) {
    app
      .component("font-awesome-icon", FontAwesomeIcon)
      .use(VueKonva)
      .component("ns-defect-handal", DefectHandal);
  },
};

export { DefectHandal };
