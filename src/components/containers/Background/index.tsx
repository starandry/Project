import React, { ReactNode } from 'react';
import styles from './background.module.scss';

type BackgroundProps = {
    children: ReactNode;
};

const Background: React.FC<BackgroundProps> = ({ children }) => {
    return <div className={styles.background}>{children}</div>;
};

export { Background };
