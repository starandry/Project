import type { Dayjs } from 'dayjs';

export type CalendarPickerProps = {
    isOpen: boolean;
    selectedDate: Dayjs;
    onClose: () => void;
    onDateSelect: (date: Dayjs) => void;
};
