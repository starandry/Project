import React, { useState, useMemo } from 'react';
import { Button } from 'antd';
import moment, { Moment } from 'moment';
import { SvgIcon } from '@/components';
import { cn } from '@/utils/UI/cn.ts';
import styles from './calendar.module.scss';
import PrevCalendar from '@/assets/icons/PrevCalendar.svg?react';
import NextCalendar from '@/assets/icons/NextCalendar.svg?react';
import type { CalendarPickerProps } from '../model/calendarTypes';

const months = [
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

const weekDaysShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

type ViewMode = 'days' | 'months' | 'years';

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
    isOpen,
    selectedDate,
    onClose,
    onDateSelect,
}) => {
    const [viewMode, setViewMode] = useState<ViewMode>('days');
    const [currentMonth, setCurrentMonth] = useState(selectedDate.month());
    const [currentYear, setCurrentYear] = useState(selectedDate.year());
    const [baseYear, setBaseYear] = useState(() => {
        const year = selectedDate.year();
        return Math.floor(year / 9) * 9;
    });

    const years = useMemo(() => {
        const result = [];
        for (let i = 0; i < 9; i++) {
            result.push(baseYear + i);
        }
        return result;
    }, [baseYear]);

    const calendarDays = useMemo(() => {
        const startOfMonth = moment().year(currentYear).month(currentMonth).startOf('month');
        const endOfMonth = moment().year(currentYear).month(currentMonth).endOf('month');

        const startDay = startOfMonth.day();
        const daysInMonth = endOfMonth.date();

        const days: (Moment | null)[] = [];

        // Добавляем пустые ячейки для дней предыдущего месяца
        const firstDayOffset = startDay === 0 ? 6 : startDay - 1;
        for (let i = 0; i < firstDayOffset; i++) {
            days.push(null);
        }

        // Добавляем дни текущего месяца
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(moment().year(currentYear).month(currentMonth).date(i));
        }

        // Добавляем пустые ячейки в конце, чтобы всегда было 42 ячейки (6 рядов)
        while (days.length < 42) {
            days.push(null);
        }

        return days;
    }, [currentMonth, currentYear]);

    if (!isOpen) return null;

    const handleDaySelect = (day: Moment) => {
        onDateSelect(day);
        onClose();
    };

    const handleMonthSelect = (monthIndex: number) => {
        setCurrentMonth(monthIndex);
        setViewMode('days');
    };

    const handleYearSelect = (year: number) => {
        setCurrentYear(year);
        setViewMode('months');
    };

    const handlePrevNavigation = () => {
        if (viewMode === 'days') {
            if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear((prev) => prev - 1);
            } else {
                setCurrentMonth((prev) => prev - 1);
            }
        } else if (viewMode === 'months') {
            setCurrentYear((prev) => prev - 1);
        } else {
            setBaseYear((prev) => prev - 9);
        }
    };

    const handleNextNavigation = () => {
        if (viewMode === 'days') {
            if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear((prev) => prev + 1);
            } else {
                setCurrentMonth((prev) => prev + 1);
            }
        } else if (viewMode === 'months') {
            setCurrentYear((prev) => prev + 1);
        } else {
            setBaseYear((prev) => prev + 9);
        }
    };

    const handleMonthYearClick = () => {
        setViewMode('months');
    };

    const handleYearClick = () => {
        setViewMode('years');
        setBaseYear(Math.floor(currentYear / 9) * 9);
    };

    const isSelectedDay = (day: Moment | null) => {
        if (!day) return false;
        return day.isSame(selectedDate, 'day');
    };

    const isToday = (day: Moment | null) => {
        if (!day) return false;
        return day.isSame(moment(), 'day');
    };

    const isSelectedMonth = (monthIndex: number) => {
        return monthIndex === currentMonth;
    };

    const isSelectedYear = (year: number) => {
        return year === currentYear;
    };

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.calendarWrapper}>
                <div className={styles.calendarHeader}>
                    {viewMode === 'days' ? (
                        <>
                            <div className={styles.headerLeft}>
                                <button
                                    type="button"
                                    className={styles.monthYearTitle}
                                    onClick={handleMonthYearClick}
                                >
                                    {months[currentMonth]} {currentYear}
                                </button>
                                <button
                                    type="button"
                                    className={styles.closeButton}
                                    onClick={onClose}
                                    aria-label="Закрыть"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6 6L14 14M14 6L6 14"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.navigationWrapper}>
                                <Button
                                    icon={<SvgIcon Icon={PrevCalendar} />}
                                    onClick={handlePrevNavigation}
                                    className={styles.btnNav}
                                />
                                <Button
                                    icon={<SvgIcon Icon={NextCalendar} />}
                                    onClick={handleNextNavigation}
                                    className={styles.btnNav}
                                />
                            </div>
                        </>
                    ) : viewMode === 'months' ? (
                        <>
                            <button
                                type="button"
                                className={styles.yearDropdown}
                                onClick={handleYearClick}
                            >
                                {currentYear}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 6L8 10L12 6"
                                        stroke="#7f207b"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <div className={styles.navigationWrapper}>
                                <Button
                                    icon={<SvgIcon Icon={PrevCalendar} />}
                                    onClick={handlePrevNavigation}
                                    className={styles.btnNav}
                                />
                                <Button
                                    icon={<SvgIcon Icon={NextCalendar} />}
                                    onClick={handleNextNavigation}
                                    className={styles.btnNav}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className={styles.yearDropdown}
                                onClick={() => setViewMode('months')}
                            >
                                {baseYear} - {baseYear + 8}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4 6L8 10L12 6"
                                        stroke="#7f207b"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <div className={styles.navigationWrapper}>
                                <Button
                                    icon={<SvgIcon Icon={PrevCalendar} />}
                                    onClick={handlePrevNavigation}
                                    className={styles.btnNav}
                                />
                                <Button
                                    icon={<SvgIcon Icon={NextCalendar} />}
                                    onClick={handleNextNavigation}
                                    className={styles.btnNav}
                                />
                            </div>
                        </>
                    )}
                </div>

                {viewMode === 'days' ? (
                    <>
                        <div className={styles.weekDaysRow}>
                            {weekDaysShort.map((day) => (
                                <div key={day} className={styles.weekDay}>
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className={styles.daysGrid}>
                            {calendarDays.map((day, index) => (
                                <div key={index} className={styles.dayCell}>
                                    {day ? (
                                        <button
                                            type="button"
                                            className={cn(
                                                styles,
                                                'dayButton',
                                                isSelectedDay(day) ? 'dayButtonActive' : undefined,
                                                isToday(day) ? 'dayButtonToday' : undefined
                                            )}
                                            onClick={() => handleDaySelect(day)}
                                        >
                                            {day.date()}
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </>
                ) : viewMode === 'months' ? (
                    <div className={styles.monthsGrid}>
                        {months.map((month, index) => (
                            <button
                                key={month}
                                type="button"
                                className={cn(
                                    styles,
                                    'monthButton',
                                    isSelectedMonth(index) ? 'monthButtonActive' : undefined
                                )}
                                onClick={() => handleMonthSelect(index)}
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className={styles.yearsGrid}>
                        {years.map((year) => (
                            <button
                                key={year}
                                type="button"
                                className={cn(
                                    styles,
                                    'yearButton',
                                    isSelectedYear(year) ? 'yearButtonActive' : undefined
                                )}
                                onClick={() => handleYearSelect(year)}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
