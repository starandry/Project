import { Schedule } from './UI/Schedule';
import { useSchedule } from './model/useSchedule';

export const ScheduleContainer = () => {
    const props = useSchedule();
    return <Schedule {...props} />;
};
