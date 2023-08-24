import { createApp } from 'vue';
import App from './App.vue';
import { store } from './store';
import '@/assets/global.css';
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
createApp(App).use(store).use(autoAnimatePlugin).mount('#app');
//# sourceMappingURL=main.js.map