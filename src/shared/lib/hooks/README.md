# Custom Hooks

Организованная структура пользовательских хуков с привязкой к FSD-слоям.

## Структура

```
shared/lib/hooks/            - общие хуки (useDropdown)
shared/ui/<Component>/model  - UI-специфичные хуки (useDropdownContainer, useImageUploader, useScrollButton, useCalendar, useSchedule)
features/<slice>/model       - хуки фич (useCountrySelector, useMaster*Form)
widgets/<slice>/model        - хуки виджетов
entities/<slice>/model       - хуки сущностей (useMasterCard)
```

## Примеры импорта

```typescript
import { useDropdown } from '@/shared/lib';
import { useDropdownContainer } from '@/shared/ui/Dropdown/model/useDropdownContainer';
import { useCountrySelector } from '@/features/country-selector/model/useCountrySelector';
```

## Структура возвращаемого объекта

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

## Примеры колокации

- `useMasterEditForm` - `/src/features/master-forms/MasterEditForm/model`
- `useMasterAboutForm` - `/src/features/master-forms/MasterAboutForm/model`
- `useMasterEducationForm` - `/src/features/master-forms/MasterEducationForm/model`
- `useMasterCard` - `/src/entities/master/MasterCard/model`
