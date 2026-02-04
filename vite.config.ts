import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig(({ mode }) => {
    loadEnv(mode, process.cwd(), '');
    return {
        base: './',

        css: {
            preprocessorOptions: {
                scss: { silenceDeprecations: ['legacy-js-api'] },
            },
        },

        plugins: [react(), svgr()],

        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        react: ['react', 'react-dom', 'react-router-dom'],
                        redux: ['@reduxjs/toolkit', 'react-redux'],
                        leaflet: ['leaflet', 'react-leaflet'],
                        swiper: ['swiper'],
                        antd: ['antd'],
                    },
                },
            },
        },

        server: {
            port: 8080,
            open: true,
        },
    };
});
