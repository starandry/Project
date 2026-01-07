import type { Moment } from 'moment';

export type CalendarPickerProps = {
    isOpen: boolean;
    selectedDate: Moment;
    onClose: () => void;
    onDateSelect: (date: Moment) => void;
};
