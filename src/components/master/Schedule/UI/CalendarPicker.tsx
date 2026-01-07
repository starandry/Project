import { Button } from 'antd';
import { SvgIcon } from '@/components';
import { cn } from '@/utils/UI/cn.ts';
import styles from './calendar.module.scss';
import PrevCalendar from '@/assets/icons/PrevCalendar.svg?react';
import NextCalendar from '@/assets/icons/NextCalendar.svg?react';
import ChevronDown from '@/assets/icons/ChevronDown.svg?react';
import Close from '@/assets/icons/CloseIcon.svg?react';
import type { CalendarPickerProps } from '../model/calendarTypes';
import { MONTHS, WEEK_DAYS_SHORT } from '../model/constants';
import { useCalendar } from '@/hooks/data';

const NavigationButtons = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => (
    <div className={styles.navigationWrapper}>
        <Button icon={<SvgIcon Icon={PrevCalendar} />} onClick={onPrev} className={styles.btnNav} />
        <Button icon={<SvgIcon Icon={NextCalendar} />} onClick={onNext} className={styles.btnNav} />
    </div>
);

export const CalendarPicker: React.FC<CalendarPickerProps> = ({
    isOpen,
    selectedDate,
    onClose,
    onDateSelect,
}) => {
    const {
        viewMode,
        currentMonth,
        currentYear,
        baseYear,
        years,
        calendarDays,
        handleDaySelect,
        handleMonthSelect,
        handleYearSelect,
        handlePrevNavigation,
        handleNextNavigation,
        handleMonthYearClick,
        handleYearClick,
        handleYearsBack,
        isSelectedDay,
        isToday,
        isSelectedMonth,
        isSelectedYear,
    } = useCalendar({ selectedDate, onClose, onDateSelect });

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose} />
            <div className={styles.calendarWrapper}>
                <div className={styles.calendarHeader}>
                    {viewMode === 'days' && (
                        <div className={styles.headerLeft}>
                            <button
                                type="button"
                                className={styles.monthYearTitle}
                                onClick={handleMonthYearClick}
                            >
                                {MONTHS[currentMonth]} {currentYear}
                            </button>
                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={onClose}
                                aria-label="Закрыть"
                            >
                                <SvgIcon Icon={Close} />
                            </button>
                        </div>
                    )}
                    {viewMode === 'months' && (
                        <button type="button" className={styles.yearDropdown} onClick={handleYearClick}>
                            {currentYear}
                            <SvgIcon Icon={ChevronDown} />
                        </button>
                    )}
                    {viewMode === 'years' && (
                        <button type="button" className={styles.yearDropdown} onClick={handleYearsBack}>
                            {baseYear} - {baseYear + 8}
                            <SvgIcon Icon={ChevronDown} />
                        </button>
                    )}
                    <NavigationButtons onPrev={handlePrevNavigation} onNext={handleNextNavigation} />
                </div>

                {viewMode === 'days' ? (
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
                                    {day ? (
                                        <button
                                            type="button"
                                            className={cn(
                                                styles,
                                                'dayButton',
                                                isSelectedDay(day) ? 'dayButtonActive' : undefined,
                                                isToday(day) ? 'dayButtonToday' : undefined
                                            )}
                                            onClick={() => handleDaySelect(day)}
                                        >
                                            {day.date()}
                                        </button>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </>
                ) : viewMode === 'months' ? (
                    <div className={styles.monthsGrid}>
                        {MONTHS.map((month, index) => (
                            <button
                                key={month}
                                type="button"
                                className={cn(
                                    styles,
                                    'monthButton',
                                    isSelectedMonth(index) ? 'monthButtonActive' : undefined
                                )}
                                onClick={() => handleMonthSelect(index)}
                            >
                                {month}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className={styles.yearsGrid}>
                        {years.map((year) => (
                            <button
                                key={year}
                                type="button"
                                className={cn(
                                    styles,
                                    'yearButton',
                                    isSelectedYear(year) ? 'yearButtonActive' : undefined
                                )}
                                onClick={() => handleYearSelect(year)}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};
