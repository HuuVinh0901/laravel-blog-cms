import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/client/main.jsx',
                'resources/js/admin/main.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
                autoprefixer(),
            ],
        },
    },
    optimizeDeps: {
        include: ['react-toastify'],
    },
});