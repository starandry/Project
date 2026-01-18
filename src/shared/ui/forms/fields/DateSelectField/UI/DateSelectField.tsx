import React from 'react';
import ArrowDropDown from '@/shared/assets/icons/ArrowDropDown.svg?react';
import { SvgIcon } from '@/shared/ui';
import styles from './index.module.scss';

const YEARS = (() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 60 }, (_, i) => String(currentYear - i));
})();

const MONTHS = [
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
];

type DateSelectFieldProps = {
    onYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    label?: string;
    yearValue?: string;
    monthValue?: string;
};

const DateSelectField: React.FC<DateSelectFieldProps> = ({
    onYearChange,
    onMonthChange,
    label,
    yearValue = '',
    monthValue = '',
}) => {
    return (
        <div className={styles.dateSelectGroup}>
            <span className={styles.dateSelectLabel}>{label}</span>

            <div className={styles.dateSelectRow}>
                <div className={styles.yearSelectContainer}>
                    <div className={styles.selectYearWrapper}>
                        <select
                            className={styles.yearSelect}
                            value={yearValue}
                            onChange={onYearChange}
                        >
                            <option value="" disabled>
                                Год
                            </option>
                            {YEARS.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <SvgIcon Icon={ArrowDropDown} className="ArrowDropDown" />
                    </div>
                </div>

                <div className={styles.monthSelectContainer}>
                    <div className={styles.selectMonthWrapper}>
                        <select
                            className={styles.monthSelect}
                            value={monthValue}
                            onChange={onMonthChange}
                        >
                            <option value="" disabled>
                                Месяц
                            </option>
                            {MONTHS.map((month) => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <SvgIcon Icon={ArrowDropDown} className="ArrowDropDown" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { DateSelectField };
