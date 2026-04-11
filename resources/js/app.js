import './api/http.js';

import { createInertiaApp } from '@inertiajs/vue3';
import { createPinia } from 'pinia';
import { createApp, h } from 'vue';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.vue');

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
    resolve: (name) => {
        const path = `./pages/${name}.vue`;
        const loader = pages[path];

        if (!loader) {
            throw new Error(`Page not found: ${name}`);
        }

        return loader();
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) });

        app.use(plugin);
        app.use(createPinia());

        app.mount(el);
    },
});
