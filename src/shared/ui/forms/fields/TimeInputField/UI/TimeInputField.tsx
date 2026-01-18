import React, { useCallback } from 'react';
import styles from './index.module.scss';

type TimeInputFieldProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    hint?: string;
};

const TimeInputField: React.FC<TimeInputFieldProps> = ({
    label,
    value,
    onChange,
    placeholder = 'ЧЧ:ММ',
    hint,
}) => {
    const formatTimeInput = (input: string): string => {
        // Удаляем все нецифровые символы
        const digits = input.replace(/\D/g, '');

        if (digits.length === 0) return '';
        if (digits.length <= 2) {
            // Только часы
            const hours = parseInt(digits, 10);
            return hours > 23 ? '23' : digits;
        }

        // Часы и минуты
        let hours = parseInt(digits.substring(0, 2), 10);
        let minutes = parseInt(digits.substring(2, 4), 10);

        // Ограничиваем часы
        if (hours > 23) hours = 23;
        // Ограничиваем минуты
        if (minutes > 59) minutes = 59;

        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');

        return `${hoursStr}:${minutesStr}`;
    };

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;
            const formatted = formatTimeInput(inputValue);
            onChange(formatted);
        },
        [onChange]
    );

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        // Разрешаем: backspace, delete, tab, escape, enter, стрелки
        if (
            [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
            // Разрешаем: Ctrl/Cmd+A, Ctrl/Cmd+C, Ctrl/Cmd+V, Ctrl/Cmd+X
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Разрешаем: стрелки
            (e.keyCode >= 35 && e.keyCode <= 40)
        ) {
            return;
        }
        // Проверяем, что это цифра или двоеточие
        if (
            (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
            (e.keyCode < 96 || e.keyCode > 105) &&
            e.keyCode !== 186 &&
            e.keyCode !== 59
        ) {
            e.preventDefault();
        }
    }, []);

    return (
        <div className={styles.fieldWrapper}>
            <label className={styles.fieldLabel}>{label}</label>
            <input
                type="text"
                className={styles.fieldInput}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                maxLength={5}
            />
            {hint && <span className={styles.fieldHint}>{hint}</span>}
        </div>
    );
};

export { TimeInputField };
