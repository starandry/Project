import type { Moment } from 'moment';
import { cn } from '@/utils/UI/cn.ts';
import { WEEK_DAYS_SHORT } from '../model/constants';
import styles from './calendar.module.scss';

interface DaysViewProps {
    calendarDays: (Moment | null)[];
    onDaySelect: (day: Moment) => void;
    isSelectedDay: (day: Moment) => boolean;
    isToday: (day: Moment) => boolean;
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
                <div key={day} className={styles.weekDay}>
                    {day}
                </div>
            ))}
        </div>
        <div className={styles.daysGrid}>
            {calendarDays.map((day, index) => (
                <div key={index} className={styles.dayCell}>
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
