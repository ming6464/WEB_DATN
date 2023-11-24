import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import VueApexCharts from "vue3-apexcharts";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


createApp(App)
    .use(createPinia())
    .use(router)
    .use(VueApexCharts)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app')
