import analysisIndex from './analysis/index.vue';
import measureIndex from './measure/index.vue';
import { App } from "vue";
export default {
   App.use(analysisIndex),
    App.use(measureIndex)
}