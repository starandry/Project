import type { Moment } from 'moment';

export type ScheduleSlot = {
    time: string;
    status: 'Свободно' | 'Занято';
};

export type ScheduleProps = {
    selectedDate: Moment;
    startOfWeek: Moment;
    schedule: ScheduleSlot[];
    isCalendarOpen: boolean;
    onDateChange: (date: Moment) => void;
    onWeekChange: (direction: 'prev' | 'next') => void;
    onOpenCalendar: () => void;
    onCloseCalendar: () => void;
    onDateSelect: (date: Moment) => void;
};
