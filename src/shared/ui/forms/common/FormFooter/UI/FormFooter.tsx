import React from 'react';
import { Button } from '@/shared/ui';

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
        <div className={`flex-end ${className || ''}`}>
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
    );
};

export { FormFooter };
