import React from 'react';
import { SvgIcon, Button } from '@/shared/ui';
import CloseSuccess from '@/shared/assets/icons/close-success.svg?react';
import styles from './index.module.scss';

type SuccessModalProps = {
    message: string;
    onClose: () => void;
};

export const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className={styles.modalSuccess}>
                <Button classNames={{ buttonClass: 'closeFormBtn' }} onClick={onClose}>
                    <SvgIcon Icon={CloseSuccess} />
                </Button>
                <p className={styles.message}>{message}</p>
                <button className={styles.button} onClick={onClose}>
                    Понятно
                </button>
            </div>
        </div>
    );
};
