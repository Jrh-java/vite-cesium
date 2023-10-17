import son from './son.vue'
import fatherVue from './father.vue'
import { App } from 'vue';
const comps = [
    son,
    fatherVue

]
function register(app: any) {
    for (let i = 0; i < comps.length; i++) {
        const comp = comps[i];
        app.component(comp.name, comp)
    }
}
export {
    register
}

export default {
    install: (app: App) => {
        app.component("fatherVue", fatherVue);
    }
}