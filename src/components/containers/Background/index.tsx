import React, { ReactNode } from 'react';
import styles from './background.module.scss';
import {useLocation} from "react-router-dom";

type BackgroundProps = {
    children: ReactNode;
};

const Background: React.FC<BackgroundProps> = ({ children }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    let compBackground;

    if(currentPath === '/settings') {
        compBackground = `${styles.background} ${styles.backgroundSettings}`;
    } else {
        compBackground = styles.background;
    }

    return <div className={compBackground}>{children}</div>;
};

export { Background };
