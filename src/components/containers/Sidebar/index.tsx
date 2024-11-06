import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styles from './sidebar.module.scss';
import { Home, Trends, Favorites, Settings } from "../../UI/Icon/icon.component.tsx";
import {MovieGallery} from "../MovieGallery";

// Массив с описанием пунктов меню
const menuItems = [
    { path: '/', label: 'Home', icon: <Home /> },
    { path: '/trends', label: 'Trends', icon: <Trends /> },
    { path: '/favorites', label: 'Favorites', icon: <Favorites /> },
    { path: '/settings', label: 'Settings', icon: <Settings /> },
];

const Sidebar: React.FC = () => {
    const [activePath, setActivePath] = useState('/'); // отслеживания активной ссылки

    const handleLinkClick = (path: string) => {
        setActivePath(path); // активный путь при клике
    };

    return (
        <div className={styles.sidebarWrapp}>
            <nav>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index} className={styles.navItem}>
                            <Link
                                to={item.path}
                                className={`${styles.menuLink} ${activePath === item.path ? styles.active : ''}`}
                                onClick={() => handleLinkClick(item.path)}
                            >
                                {item.icon}
                                <span className={styles.text}>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<MovieGallery/>}/>
                {/*<Route path="/trends" element={<Test/>}/>*/}
            </Routes>
        </div>
    );
};

export {Sidebar};
