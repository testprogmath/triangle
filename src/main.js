import { createApp } from 'vue'
import App from './App.vue'
import TriangleForm from "@/components/TriangleForm";
import { plugin, defaultConfig } from '@formkit/vue'
import '@formkit/themes/genesis'
import {ru, en, nl} from "@formkit/i18n";

const app = createApp(App);
app.use(plugin, defaultConfig({
    locales: { ru, en, nl },
    locale: 'ru',
})).mount('#app');
app.component('TriangleForm', TriangleForm);
