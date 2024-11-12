import React from "react";
import {Routes, Route, Link, useLocation} from 'react-router-dom';
import styles from './sidebar.module.scss';
import { menuItems, routes } from '../../../routes/menuRoutes.tsx';
import {useActivePath} from "../../../hooks/useActivePath.ts";

const Sidebar: React.FC = () => {
    const { activePath, handleLinkClick } = useActivePath();
    const location = useLocation();
    const currentPath = location.pathname;
    let sidebarClass;

    if (currentPath === '/trends' || currentPath === '/favorites') {
        sidebarClass = `${styles.sidebarWrapp}   ${styles.trendsSidebar}`;
    } else if (currentPath === '/settings') {
        sidebarClass = `${styles.sidebarWrapp}  ${styles.trendsSidebar} ${styles.settingsSidebar}`;
    } else {
        sidebarClass =  styles.sidebarWrapp;
    }

    return (
        <div className={sidebarClass}>
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
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </div>
    );
};

export {Sidebar};
