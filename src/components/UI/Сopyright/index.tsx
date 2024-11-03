import React from 'react';
import styles from './copyright.module.scss';

const Copyright: React.FC = () => {
    return (
        <div className={styles.copyrightContainer}>
            <p className={styles.copyright}>
                © All Rights Reserved
            </p>
        </div>
    );
};

export { Copyright };
