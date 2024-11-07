import React, { useState } from 'react';
import {Routes, Route, Link, Outlet} from 'react-router-dom';
import styles from './sidebar.module.scss';
import { menuItems } from '../../../routes/menuRoutes.tsx';
import {MovieGallery} from "../MovieGallery";

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
            <Outlet />
            <Routes>
                <Route path="/" element={<MovieGallery/>}>
                    <Route index element={<MovieGallery/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export {Sidebar};
