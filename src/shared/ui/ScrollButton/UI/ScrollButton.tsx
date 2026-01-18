import React from 'react';
import styles from './index.module.scss';
import type { ScrollButtonProps } from '../model/scrollButtonTypes';
import { useScrollButton } from '../model/useScrollButton';

export const ScrollButton: React.FC<ScrollButtonProps> = ({
    threshold = 50,
    offset = 10,
    upLabel = '⬆ Наверх',
    downLabel = '⬇ Вниз',
}) => {
    const { visible, isAtBottom, scrollTo } = useScrollButton(threshold, offset);

    if (!visible) return null;

    return (
        <button onClick={scrollTo} className={styles.scrollBtn}>
            {isAtBottom ? upLabel : downLabel}
        </button>
    );
};
