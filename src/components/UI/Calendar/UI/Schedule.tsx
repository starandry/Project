import { Button, Typography } from 'antd';
import { SvgIcon } from '@/components';
import { cn } from '@/utils/UI/cn.ts';
import styles from './index.module.scss';
import PrevCalendar from '@/assets/icons/PrevCalendar.svg?react';
import NextCalendar from '@/assets/icons/NextCalendar.svg?react';
import FreeIcon from '@/assets/icons/FreeIcon.svg?react';
import BusyIcon from '@/assets/icons/BusyIcon.svg?react';
import { CalendarPicker } from '@/components';
import type { ScheduleProps } from '../model/scheduleTypes';
import { WEEK_DAYS } from '../model/constants';

const { Title } = Typography;

export const Schedule: React.FC<ScheduleProps> = ({
    selectedDate,
    startOfWeek,
    schedule,
    isCalendarOpen,
    onDateChange,
    onWeekChange,
    onOpenCalendar,
    onCloseCalendar,
    onDateSelect,
}) => {
    return (
        <div className={styles.wrappShedule}>
            <div className={styles.headShedule}>
                <Title level={3} className={styles.title}>
                    Мой график
                </Title>
                <Button type="link" className={styles.btnCalendar} onClick={onOpenCalendar}>
                    Смотреть Календарь
                </Button>
            </div>

            <div className={styles.weekDaysRow}>
                <div className={styles.wrappBtnPrev}>
                    <Button
                        icon={<SvgIcon Icon={PrevCalendar} />}
                        onClick={() => onWeekChange('prev')}
                        className={styles.btnPrev}
                    />
                </div>

                {WEEK_DAYS.map(({ label, offset }) => {
                    const day = startOfWeek.clone().add(offset, 'days');
                    const isSelected = day.isSame(selectedDate, 'day');

                    return (
                        <div className={styles.wrappBtnDay} key={offset}>
                            <button
                                type="button"
                                className={cn(
                                    styles,
                                    'btnDay',
                                    isSelected ? 'selected' : undefined
                                )}
                                onClick={() => onDateChange(day)}
                            >
                                <div className={styles.dayLabel}>{label}</div>
                                <div className={styles.dayNumber}>{day.date()}</div>
                            </button>
                        </div>
                    );
                })}

                <div className={styles.wrappBtnNext}>
                    <Button
                        icon={<SvgIcon Icon={NextCalendar} />}
                        onClick={() => onWeekChange('next')}
                        className={styles.btnNext}
                    />
                </div>
            </div>

            <div className={styles.scheduleList}>
                {schedule.length > 0 ? (
                    schedule.map((slot, index) => {
                        const isBusy = slot.status === 'Занято';
                        const isLast = index === schedule.length - 1;

                        return (
                            <div
                                key={index}
                                className={cn(
                                    styles,
                                    'card',
                                    isBusy ? 'cardBusy' : 'cardFree',
                                    isLast ? 'lastCard' : undefined
                                )}
                            >
                                <div className={styles.slotRow}>
                                    <div className={styles.iconCol}>
                                        <SvgIcon Icon={isBusy ? BusyIcon : FreeIcon} />
                                    </div>
                                    <div className={styles.statusCol}>
                                        <div className={cn(styles, 'status', isBusy ? 'statusBusy' : undefined)}>
                                            {slot.status}
                                        </div>
                                        <div className={cn(styles, 'address', isBusy ? 'addressBusy' : undefined)}>
                                            Адрес: адрес салона или клиента
                                        </div>
                                    </div>
                                    <div className={styles.timeCol}>
                                        <div className={cn(styles, 'time', isBusy ? 'timeBusy' : undefined)}>
                                            {slot.time}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className={styles.emptyState}>Нет слотов на выбранную дату.</div>
                )}
            </div>

            <CalendarPicker
                isOpen={isCalendarOpen}
                selectedDate={selectedDate}
                onClose={onCloseCalendar}
                onDateSelect={onDateSelect}
            />
        </div>
    );
};
