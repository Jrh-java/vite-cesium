import skylineVue from "./skyline.vue";
import test from "./test.vue";

import { App } from "vue";

export default {
    install: (app: App) => {
        app.component("skylineVue", skylineVue);
        app.component("test", test);
    }
}