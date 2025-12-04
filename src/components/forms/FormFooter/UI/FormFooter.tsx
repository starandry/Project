import React from 'react';
import { Button } from '@/components';
import styles from './index.module.scss';

type FormFooterProps = {
    onCancel: () => void;
    onSubmit: () => void;
    cancelText?: string;
    submitText?: string;
    className?: string;
};

const FormFooter: React.FC<FormFooterProps> = ({
                                                   onCancel,
                                                   onSubmit,
                                                   cancelText = 'Отменить',
                                                   submitText = 'Сохранить',
                                                   className,
                                               }) => {
    return (
        <div className={`${styles.formFooter} ${className || ''}`}>
            <div className={styles.formActions}>
                <Button
                    classNames={{ buttonClass: 'cancelButton' }}
                    type="button"
                    onClick={onCancel}
                >
                    {cancelText}
                </Button>

                <Button
                    classNames={{ buttonClass: 'submitButton' }}
                    type="submit"
                    onClick={onSubmit}
                >
                    {submitText}
                </Button>
            </div>
        </div>
    );
};

export { FormFooter };
