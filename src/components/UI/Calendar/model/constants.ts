export const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
] as const;

export const WEEK_DAYS_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] as const;

export const WEEK_DAYS = [
    { label: 'ПН', offset: 1 },
    { label: 'ВТ', offset: 2 },
    { label: 'СР', offset: 3 },
    { label: 'ЧТ', offset: 4 },
    { label: 'ПТ', offset: 5 },
    { label: 'СБ', offset: 6 },
    { label: 'ВС', offset: 0 },
] as const;
