import { useState, useCallback, useMemo } from 'react';
import moment, { Moment } from 'moment';
import type { ScheduleSlot } from '@/components/UI/Calendar/model/scheduleTypes';

const mockSchedule: Record<string, ScheduleSlot[]> = {
    '2025-05-07': [
        { time: '11:30', status: 'Свободно' },
        { time: '13:30', status: 'Занято' },
        { time: '15:00', status: 'Свободно' },
    ],
};

export const useSchedule = () => {
    const [selectedDate, setSelectedDate] = useState<Moment>(moment());
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const startOfWeek = useMemo(() => selectedDate.clone().startOf('week'), [selectedDate]);
    const schedule = useMemo(
        () => mockSchedule[selectedDate.format('YYYY-MM-DD')] || [],
        [selectedDate]
    );

    const handleWeekChange = useCallback((direction: 'prev' | 'next') => {
        setSelectedDate((prev) => prev.clone().add(direction === 'next' ? 7 : -7, 'days'));
    }, []);

    const handleOpenCalendar = useCallback(() => setIsCalendarOpen(true), []);
    const handleCloseCalendar = useCallback(() => setIsCalendarOpen(false), []);

    return {
        selectedDate,
        startOfWeek,
        schedule,
        isCalendarOpen,
        onDateChange: setSelectedDate,
        onWeekChange: handleWeekChange,
        onOpenCalendar: handleOpenCalendar,
        onCloseCalendar: handleCloseCalendar,
        onDateSelect: setSelectedDate,
    };
};
