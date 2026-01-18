import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { MenuProps } from '@/shared/ui/navigation/Menu/index.model.ts';
import styles from './index.module.scss';
import { cn } from '@/shared/lib';

const defaultItems = [
    { label: 'Главная страница', path: '/' },
    { label: 'Мастрерам', path: '/' },
    { label: 'Клиентам', path: '/' },
];

const Menu: React.FC<MenuProps> = ({ items = defaultItems }) => {
    const [activeItem, setActiveItem] = useState(null);

    return (
        <nav className={`flex-center ${styles.nav}`}>
            {items.map((item) => (
                <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setActiveItem(item.label)}
                    className={cn(styles, 'navLink', activeItem === item.label ? 'active' : '')}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export { Menu };
