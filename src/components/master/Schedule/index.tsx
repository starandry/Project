import React from 'react';
import { Schedule } from './UI/Schedule';
import { useSchedule } from './model/useSchedule';

const ScheduleContainer: React.FC = () => {
    const {
        selectedDate,
        startOfWeek,
        schedule,
        isCalendarOpen,
        onDateChange,
        onWeekChange,
        onOpenCalendar,
        onCloseCalendar,
        onDateSelect,
    } = useSchedule();

    return (
        <Schedule
            selectedDate={selectedDate}
            startOfWeek={startOfWeek}
            schedule={schedule}
            isCalendarOpen={isCalendarOpen}
            onDateChange={onDateChange}
            onWeekChange={onWeekChange}
            onOpenCalendar={onOpenCalendar}
            onCloseCalendar={onCloseCalendar}
            onDateSelect={onDateSelect}
        />
    );
};

export { ScheduleContainer };
