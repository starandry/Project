# Custom Hooks

Организованная структура всех пользовательских хуков в проекте.

## Структура папок

```
hooks/
├── core/              - Redux и базовые хуки
├── form/              - Хуки для управления формами
├── ui/                - UI компонент хуки
├── media/             - Хуки для работы с медиа
├── data/              - Хуки для управления данными
└── index.ts           - Главный экспорт
```

### `/core` - Базовые хуки

- **`reduxHooks`** - Типизированные Redux хуки
  - `useAppDispatch` - Типизированный dispatch
  - `useAppSelector` - Типизированный selector

### `/form` - Хуки для управления формами

- **`useFormState`** - Базовый хук для управления состоянием формы с валидацией
  - Поддерживает: required, minLength, maxLength, pattern, custom validation
  - Автоматическая обработка ошибок

- **`useServiceForm`** - Специализированный хук для форм сервиса
  - Поддерживает режим черновика (tempData)
  - Управление загрузкой изображений
  - Options: `initialData`, `useDraft`

### `/ui` - UI компонент хуки

- **`useDropdown`** - Базовое управление dropdown
  - Click-outside detection
  - Ref для позиционирования
  - Состояние открытости

- **`useDropdownContainer`** - Обертка для Dropdown компонентов
  - Управление label
  - Callback на выбор элемента

- **`useCountrySelector`** - Хук для выбора страны
  - Список стран (BY, RU, UA, KZ, US)
  - Использует useDropdown внутренне

### `/media` - Медиа хуки

- **`useImageUpload`** - Базовый хук для загрузки изображений
  - Валидация размера и типа файла
  - Preview с проверкой ошибок
  - Пользовательские обработчики ошибок

- **`useImageUploader`** - Компонент-специфичный хук
  - Расширенное управление состоянием загрузки
  - Hover состояние

- **`useScrollButton`** - Управление видимостью кнопки прокрутки
  - Определение позиции прокрутки
  - Обнаружение конца страницы

### `/data` - Хуки для управления данными

- **`useSchedule`** - Управление графиком
  - Выбор дате и недели
  - Управление открытием календаря
  - Mock данные

- **`useCalendar`** - Управление календарем
  - 3 режима просмотра: дни, месяцы, годы
  - Навигация по месяцам/годам
  - Проверка выбранных дат

- **`useEditableList`** - Управление редактируемым списком
  - Generic тип `<T>`
  - Add, remove, edit операции
  - Сохранение изменений

## Соглашения

### Импорт

```typescript
// Прямой импорт из папки
import { useFormState, useServiceForm } from '@/hooks/form';

// Или из главного index
import { useFormState, useServiceForm } from '@/hooks';
```

### Структура возвращаемого объекта

Все хуки возвращают объект с:
- **State**: `data`, `state`, `value` и т.д.
- **Setters**: `setData`, `setState` и т.д. (если нужны)
- **Handlers**: `handleChange`, `handleSubmit` и т.д.
- **Utilities**: `reset`, `validate`, `clear` и т.д.

## Общие практики

1. **Мемоизация**: Используйте `useCallback` для обработчиков
2. **Валидация**: Встраивайте валидацию в хуки
3. **Типизация**: Всегда экспортируйте типы из хуков
4. **Расширяемость**: Используйте options объект для конфигурации

## Старые хуки в компонентах (для перепроверки)

Следующие хуки остаются в папках компонентов (так как тесно связаны с логикой компонента):

> **Примечание**: Рассмотреть возможность перемещения этих хуков в папку hooks в будущем.

- `useMasterEditForm` - `/src/components/forms/MasterEditForm/model`
- `useMasterAboutForm` - `/src/components/forms/MasterAboutForm/model`
- `useMasterEducationForm` - `/src/components/forms/MasterEducationForm/model`
- `useSearchForm` - `/src/components/forms/SearchForm/model`
- `useMasterCard` - `/src/components/master/MasterCard/model`
- `useMasterList` - `/src/components/master/MasterList/model`
- `useBanner` - `/src/components/widgets/Banner/model`
