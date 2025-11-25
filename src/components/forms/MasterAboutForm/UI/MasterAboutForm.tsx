import React from 'react';
import { Button } from '@/components';

type MasterAboutFormProps = {
    onCancel?: () => void;
    onSaved?: () => void;
};

const MasterAboutForm: React.FC<MasterAboutFormProps> = ({ onCancel, onSaved }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // здесь логика отправки на сервер / в Redux

        // когда всё успешно:
        if (onSaved) {
            onSaved();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <textarea placeholder="Расскажите немного о себе..." />
            </label>

            <Button onClick={onCancel}>Отмена</Button>
            <Button type="submit">Сохранить</Button>
        </form>
    );
};

export { MasterAboutForm };
