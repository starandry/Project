import type { Dayjs } from 'dayjs';

export type ScheduleSlot = {
    time: string;
    status: 'Свободно' | 'Занято';
};

export type ScheduleProps = {
    selectedDate: Dayjs;
    startOfWeek: Dayjs;
    schedule: ScheduleSlot[];
    isCalendarOpen: boolean;
    onDateChange: (date: Dayjs) => void;
    onWeekChange: (direction: 'prev' | 'next') => void;
    onOpenCalendar: () => void;
    onCloseCalendar: () => void;
    onDateSelect: (date: Dayjs) => void;
};
