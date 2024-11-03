import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Базовый путь для проекта при его развертывании
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // Современный компилятор SCSS
            },
        },
    },
});
