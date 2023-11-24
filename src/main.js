import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import VueApexCharts from "vue3-apexcharts";

createApp(App)
    .use(createPinia())
    .use(router)
    .use(VueApexCharts)
    .mount('#app')
