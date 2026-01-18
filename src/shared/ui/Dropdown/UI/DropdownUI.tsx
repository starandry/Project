import React from 'react';
import { cn } from '@/shared/lib';
import styles from './index.module.scss';
import type { DropdownClassNames } from '@/shared/ui/Dropdown/index.model.ts';

type DropdownUIProps = {
    open: boolean;
    menuRef: React.RefObject<HTMLDivElement>;
    items: string[];
    buttonLabel: string;
    onItemClick: (label: string) => void;
    toggleDropdown: () => void;
    classNames?: DropdownClassNames;
    icon?: React.ReactNode;
};

export const DropdownUI: React.FC<DropdownUIProps> = ({
    open,
    menuRef,
    items,
    buttonLabel,
    onItemClick,
    toggleDropdown,
    classNames = {},
    icon,
}) => {
    return (
        <div ref={menuRef} className={cn(styles, 'dropMenuWrap', classNames.wrapper)}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={cn(styles, 'dropMenuBtn', classNames.button)}
            >
                <span>{buttonLabel}</span>
                {icon}
            </button>

            {open && (
                <ul className={cn(styles, 'dropMenuList', classNames.list)}>
                    {items.map((label, index) => (
                        <li
                            key={index}
                            className={cn(styles, 'dropMenuItem', classNames.item)}
                            onClick={() => onItemClick(label)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
