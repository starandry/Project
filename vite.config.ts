import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Базовый путь для проекта при его развертывании
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["legacy-js-api"],// Современный компилятор SCSS
            },
        },
    },
});
