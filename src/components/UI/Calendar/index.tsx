import { Schedule } from '@/components';
import { useSchedule } from '@/hooks/data';

export const ScheduleContainer = () => {
    const props = useSchedule();
    return <Schedule {...props} />;
};

export { Schedule } from './UI/Schedule';
export { CalendarPicker } from './UI/CalendarPicker';
export type { CalendarPickerProps } from './model/calendarTypes';
