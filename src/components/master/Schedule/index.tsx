import { Schedule } from './UI/Schedule';
import { useSchedule } from '@/hooks/data';

export const ScheduleContainer = () => {
    const props = useSchedule();
    return <Schedule {...props} />;
};
