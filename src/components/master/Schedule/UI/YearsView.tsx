import { cn } from '@/utils/UI/cn.ts';
import styles from './calendar.module.scss';

interface YearsViewProps {
    years: number[];
    onYearSelect: (year: number) => void;
    isSelectedYear: (year: number) => boolean;
}

export const YearsView: React.FC<YearsViewProps> = ({ years, onYearSelect, isSelectedYear }) => (
    <div className={styles.yearsGrid}>
        {years.map((year) => (
            <button
                key={year}
                type="button"
                className={cn(styles, 'yearButton', isSelectedYear(year) && 'yearButtonActive')}
                onClick={() => onYearSelect(year)}
            >
                {year}
            </button>
        ))}
    </div>
);
