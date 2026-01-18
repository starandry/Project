import { cn } from '@/shared/lib';
import { MONTHS } from '../model/constants';
import styles from './calendar.module.scss';

interface MonthsViewProps {
    onMonthSelect: (index: number) => void;
    isSelectedMonth: (index: number) => boolean;
}

export const MonthsView: React.FC<MonthsViewProps> = ({ onMonthSelect, isSelectedMonth }) => (
    <div className={styles.monthsGrid}>
        {MONTHS.map((month, index) => (
            <button
                key={month}
                type="button"
                className={cn(
                    styles,
                    'monthButton',
                    isSelectedMonth(index) && 'monthButtonActive'
                )}
                onClick={() => onMonthSelect(index)}
            >
                {month}
            </button>
        ))}
    </div>
);
