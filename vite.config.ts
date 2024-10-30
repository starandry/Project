import { defineConfig } from 'vite'; //поддержка TypeScript, автодополнение

export default defineConfig({
    base: './', //базовый путь для проекта при его развертывании
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // современный компилятор
            },
        },
    },
});
