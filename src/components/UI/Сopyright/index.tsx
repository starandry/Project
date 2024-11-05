import React from 'react';
import styles from './copyright.module.scss';

interface CopyrightProps {
    className?: keyof typeof styles; // className — это ключ из объекта styles
}

const Copyright: React.FC<CopyrightProps> = ({ className }) => {
    return (
        <p className={`${styles.copyright} ${className ? styles[className] : ''}`}>
            © All Rights Reserved
        </p>
    );
};

export { Copyright };

