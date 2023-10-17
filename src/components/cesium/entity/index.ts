
import entitiesVue from "./entities.vue";

import { App } from "vue";

export default {
    install: (app: App) => {
        app.component("entitiesVue", entitiesVue);
    }
}