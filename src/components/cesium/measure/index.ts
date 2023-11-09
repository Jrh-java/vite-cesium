import measure from "./measure.vue";

import { App } from "vue";

export default {
    install: (app: App) => {
        app.component("measureVue", measure);
    }
}