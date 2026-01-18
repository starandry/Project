import React from 'react';

export type DropdownClassNames = {
    wrapper?: string;
    button?: string;
    list?: string;
    item?: string;
};

export type DropdownProps = {
    items: string[];
    buttonLabel: string;
    selectedLabel?: string | null;
    onItemClick?: (label: string) => void;
    classNames?: DropdownClassNames;
    icon?: React.ReactNode;
};
