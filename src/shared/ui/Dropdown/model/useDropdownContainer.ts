import { useState, useEffect } from 'react';
import { useDropdown } from '@/shared/lib';
import type { DropdownProps } from '../index.model';

export const useDropdownContainer = ({
    buttonLabel,
    selectedLabel,
    onItemClick,
}: Pick<DropdownProps, 'buttonLabel' | 'selectedLabel' | 'onItemClick'>) => {
    const { open, toggle, ref } = useDropdown<HTMLDivElement>();
    const [label, setLabel] = useState(buttonLabel);

    useEffect(() => {
        setLabel(selectedLabel || buttonLabel);
    }, [selectedLabel, buttonLabel]);

    const handleItemClick = (itemLabel: string) => {
        setLabel(itemLabel);
        onItemClick?.(itemLabel);
        toggle();
    };

    return {
        open,
        ref,
        label,
        toggle,
        handleItemClick,
    };
};
