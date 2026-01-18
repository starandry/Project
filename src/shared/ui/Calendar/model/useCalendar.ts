import { useState, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export type ViewMode = 'days' | 'months' | 'years';

interface UseCalendarProps {
    selectedDate: Dayjs;
    onClose: () => void;
    onDateSelect: (date: Dayjs) => void;
}

export const useCalendar = ({ selectedDate, onClose, onDateSelect }: UseCalendarProps) => {
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
        const startOfMonth = dayjs().year(currentYear).month(currentMonth).startOf('month');
        const endOfMonth = dayjs().year(currentYear).month(currentMonth).endOf('month');

        const startDay = startOfMonth.day();
        const daysInMonth = endOfMonth.date();

        const days: (Dayjs | null)[] = [];

        // Добавляем пустые ячейки для дней предыдущего месяца
        const firstDayOffset = startDay === 0 ? 6 : startDay - 1;
        for (let i = 0; i < firstDayOffset; i++) {
            days.push(null);
        }

        // Добавляем дни текущего месяца
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(dayjs().year(currentYear).month(currentMonth).date(i));
        }

        // Добавляем пустые ячейки в конце, чтобы всегда было 42 ячейки (6 рядов)
        while (days.length < 42) {
            days.push(null);
        }

        return days;
    }, [currentMonth, currentYear]);

    const handleDaySelect = useCallback(
        (day: Dayjs) => {
            onDateSelect(day);
            onClose();
        },
        [onDateSelect, onClose]
    );

    const handleMonthSelect = useCallback((monthIndex: number) => {
        setCurrentMonth(monthIndex);
        setViewMode('days');
    }, []);

    const handleYearSelect = useCallback((year: number) => {
        setCurrentYear(year);
        setViewMode('months');
    }, []);

    const handlePrevNavigation = useCallback(() => {
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
    }, [viewMode, currentMonth]);

    const handleNextNavigation = useCallback(() => {
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
    }, [viewMode, currentMonth]);

    const handleMonthYearClick = useCallback(() => {
        setViewMode('months');
    }, []);

    const handleYearClick = useCallback(() => {
        setViewMode('years');
        setBaseYear(Math.floor(currentYear / 9) * 9);
    }, [currentYear]);

    const handleYearsBack = useCallback(() => {
        setViewMode('months');
    }, []);

    const isSelectedDay = useCallback(
        (day: Dayjs | null) => {
            if (!day) return false;
            return day.isSame(selectedDate, 'day');
        },
        [selectedDate]
    );

    const isToday = useCallback((day: Dayjs | null) => {
        if (!day) return false;
        return day.isSame(dayjs(), 'day');
    }, []);

    const isSelectedMonth = useCallback(
        (monthIndex: number) => {
            return monthIndex === currentMonth;
        },
        [currentMonth]
    );

    const isSelectedYear = useCallback(
        (year: number) => {
            return year === currentYear;
        },
        [currentYear]
    );

    return {
        viewMode,
        currentMonth,
        currentYear,
        baseYear,
        years,
        calendarDays,
        handleDaySelect,
        handleMonthSelect,
        handleYearSelect,
        handlePrevNavigation,
        handleNextNavigation,
        handleMonthYearClick,
        handleYearClick,
        handleYearsBack,
        isSelectedDay,
        isToday,
        isSelectedMonth,
        isSelectedYear,
    };
};
