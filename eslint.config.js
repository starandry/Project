import js from '@eslint/js'  //основные настройки и правила ESLint для работы с JavaScript
import globals from 'globals' //список глобальных переменных в различных окружениях (браузер, Node.js и т.д.)
import reactHooks from 'eslint-plugin-react-hooks' //правила правильного использования react хуков
import reactRefresh from 'eslint-plugin-react-refresh' //поддерживает правила для React Refresh — горячей перезагрузки компонентов.
import tseslint from 'typescript-eslint' //интегрирует ESLint с TypeScript с набором инструментов

export default tseslint.config( //вызов метода для создания конфигурации
    { ignores: ['dist'] },  //Игнорирует папку dist (или любую другую, содержащую собранные файлы)
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended], //задаются базовые настройки, кот  можно изменить или расширить
        files: ['**/*.{ts,tsx}'],  //будет проверять только файлы с расширениями .ts и .tsx
        languageOptions: {
            ecmaVersion: 2020, //Устанавливает версию ECMAScript
            globals: globals.browser, //Подключает глобальные переменные (window, document)
        },
        plugins: {
            'react-hooks': reactHooks,  //проверка хуков
            'react-refresh': reactRefresh,  //горячая перезагрузка комп
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn', //Если правило нарушается, ESLint выдаст предупреждение (не ошибку)
                { allowConstantExport: true },
            ],
        },
    },
)
