import { useState } from 'react';
import moment, { Moment } from 'moment';
import type { ScheduleSlot } from './scheduleTypes';

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

    const startOfWeek = selectedDate.clone().startOf('week');
    const schedule = mockSchedule[selectedDate.format('YYYY-MM-DD')] || [];

    const handleWeekChange = (direction: 'prev' | 'next') => {
        setSelectedDate((prev) => prev.clone().add(direction === 'next' ? 7 : -7, 'days'));
    };

    const handleOpenCalendar = () => {
        setIsCalendarOpen(true);
    };

    const handleCloseCalendar = () => {
        setIsCalendarOpen(false);
    };

    const handleDateSelect = (date: Moment) => {
        setSelectedDate(date);
    };

    return {
        selectedDate,
        startOfWeek,
        schedule,
        isCalendarOpen,
        onDateChange: setSelectedDate,
        onWeekChange: handleWeekChange,
        onOpenCalendar: handleOpenCalendar,
        onCloseCalendar: handleCloseCalendar,
        onDateSelect: handleDateSelect,
    };
};
