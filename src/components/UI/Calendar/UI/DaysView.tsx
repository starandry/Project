import type { Dayjs } from 'dayjs';
import { cn } from '@/utils/UI/cn.ts';
import { WEEK_DAYS_SHORT } from '../model/constants';
import styles from './calendar.module.scss';

interface DaysViewProps {
    calendarDays: (Dayjs | null)[];
    onDaySelect: (day: Dayjs) => void;
    isSelectedDay: (day: Dayjs) => boolean;
    isToday: (day: Dayjs) => boolean;
}

export const DaysView: React.FC<DaysViewProps> = ({
    calendarDays,
    onDaySelect,
    isSelectedDay,
    isToday,
}) => (
    <>
        <div className={styles.weekDaysRow}>
            {WEEK_DAYS_SHORT.map((day) => (
                <div key={day} className={`flex-center ${styles.weekDay}`}>
                    {day}
                </div>
            ))}
        </div>
        <div className={styles.daysGrid}>
            {calendarDays.map((day, index) => (
                <div key={index} className={`flex-center ${styles.dayCell}`}>
                    {day && (
                        <button
                            type="button"
                            className={cn(
                                styles,
                                'dayButton',
                                isSelectedDay(day) && 'dayButtonActive',
                                isToday(day) && 'dayButtonToday'
                            )}
                            onClick={() => onDaySelect(day)}
                        >
                            {day.date()}
                        </button>
                    )}
                </div>
            ))}
        </div>
    </>
);
