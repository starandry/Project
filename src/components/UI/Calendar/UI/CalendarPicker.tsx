import styles from './calendar.module.scss';
import type { CalendarPickerProps } from '@/components';
import { useCalendar } from '@/hooks/data';
import { CalendarHeader } from './CalendarHeader';
import { DaysView } from './DaysView';
import { MonthsView } from './MonthsView';
import { YearsView } from './YearsView';

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
                <CalendarHeader
                    viewMode={viewMode}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    baseYear={baseYear}
                    onClose={onClose}
                    onYearClick={handleYearClick}
                    onYearsBack={handleYearsBack}
                    onPrev={handlePrevNavigation}
                    onNext={handleNextNavigation}
                />

                {viewMode === 'days' && (
                    <DaysView
                        calendarDays={calendarDays}
                        onDaySelect={handleDaySelect}
                        isSelectedDay={isSelectedDay}
                        isToday={isToday}
                    />
                )}
                {viewMode === 'months' && (
                    <MonthsView onMonthSelect={handleMonthSelect} isSelectedMonth={isSelectedMonth} />
                )}
                {viewMode === 'years' && (
                    <YearsView
                        years={years}
                        onYearSelect={handleYearSelect}
                        isSelectedYear={isSelectedYear}
                    />
                )}
            </div>
        </>
    );
};
