import React from 'react';
import styles from './copyright.module.scss';
import {useLocation} from "react-router-dom";

interface CopyrightProps {
    className?: keyof typeof styles; // className — это ключ из объекта styles
}

const Copyright: React.FC<CopyrightProps> = ({ className }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    let compCopyright;

    if (currentPath === '/settings') {
        compCopyright = styles.settCopyright;
    } else {
        compCopyright = styles.copyright;
    }

    return (
        <p className={`${compCopyright} ${className ? styles[className] : ''}`}>
            © All Rights Reserved
        </p>
    );
};

export { Copyright };

