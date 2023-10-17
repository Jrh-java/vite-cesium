
import testClick from "./testClick.vue";

import { App } from "vue";

export default {
    install: (app: App) => {
        app.component("testClick", testClick);
    }
}