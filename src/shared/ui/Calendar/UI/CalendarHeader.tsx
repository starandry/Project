import { Button } from 'antd';
import { SvgIcon } from '@/shared/ui';
import styles from './calendar.module.scss';
import PrevCalendar from '@/shared/assets/icons/PrevCalendar.svg?react';
import NextCalendar from '@/shared/assets/icons/NextCalendar.svg?react';
import ChevronDown from '@/shared/assets/icons/ChevronDown.svg?react';
import Close from '@/shared/assets/icons/CloseIcon.svg?react';
import { MONTHS } from '../model/constants';

const NavigationButtons = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
    <div className={styles.navigationWrapper}>
        <Button
            icon={<SvgIcon Icon={PrevCalendar} />}
            onClick={onPrev}
            className={`flex-center ${styles.btnNav}`}
        />
        <Button
            icon={<SvgIcon Icon={NextCalendar} />}
            onClick={onNext}
            className={`flex-center ${styles.btnNav}`}
        />
    </div>
);

interface CalendarHeaderProps {
    viewMode: 'days' | 'months' | 'years';
    currentMonth: number;
    currentYear: number;
    baseYear: number;
    onClose: () => void;
    onYearClick: () => void;
    onYearsBack: () => void;
    onPrev: () => void;
    onNext: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
    viewMode,
    currentMonth,
    currentYear,
    baseYear,
    onClose,
    onYearClick,
    onYearsBack,
    onPrev,
    onNext,
}) => (
    <div className={`flex-between ${styles.calendarHeader}`}>
        {viewMode === 'days' && (
            <div className={styles.headerLeft}>
                <div className={styles.monthYearWrapper}>
                    <div className={styles.monthTitle}>{MONTHS[currentMonth]}</div>
                    <div className={styles.yearTitle}>{currentYear}</div>
                </div>
                <button
                    type="button"
                    className={`flex-center ${styles.closeButton}`}
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    <SvgIcon Icon={Close} />
                </button>
            </div>
        )}
        {viewMode === 'months' && (
            <button type="button" className={styles.yearDropdown} onClick={onYearClick}>
                {currentYear}
                <SvgIcon Icon={ChevronDown} />
            </button>
        )}
        {viewMode === 'years' && (
            <button type="button" className={styles.yearDropdown} onClick={onYearsBack}>
                {baseYear} - {baseYear + 8}
                <SvgIcon Icon={ChevronDown} />
            </button>
        )}
        <NavigationButtons onPrev={onPrev} onNext={onNext} />
    </div>
);
