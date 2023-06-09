import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as Cesium from 'cesium'
import { createPinia } from "pinia";
import  './style/main.scss';
import router from './router'
import { register } from './components/widgets'
import map from 'ol/map'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import skyline from './components/cesium/analysis/index'

const pinia = createPinia();
const app = createApp(App)
app.use(ElementPlus)
app.use(skyline)
register(app);
app.config.globalProperties.$Cesium = Cesium;
app.config.globalProperties.$Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiNzFiMGRlNi04YjBmLTRmMWMtYjk5Ny1iZTMwZGJmNWQzN2IiLCJpZCI6NTA0MDgsImlhdCI6MTY1Nzk0NzIyNH0.s-VNwxFn26XgStOLVV-pd_ft88yOwpRtpVPGgB6v9UQ'
app.use(pinia).use(router).mount('#app');

