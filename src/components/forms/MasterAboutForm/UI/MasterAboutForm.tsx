import React from 'react';
import { Button } from '@/components';
import { useMasterAboutForm } from '../model/useMasterAboutForm';
import styles from './index.module.scss';

type MasterAboutFormProps = {
    onCancel?: () => void;
    onSaved?: () => void;
};

const MasterAboutForm: React.FC<MasterAboutFormProps> = ({ onCancel, onSaved }) => {
    const { about, error, handleChange, handleSubmit } = useMasterAboutForm({ onSaved });

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <textarea
                    className={styles.masterAboutTextarea}
                    placeholder="Расскажите немного о себе..."
                    value={about}
                    onChange={handleChange}
                />
            </label>

            {error && <p className={styles.masterAboutError}>{error}</p>}

            <div className={styles.formActions}>
                <Button
                    classNames={{ buttonClass: 'cancelButton ' }}
                    onClick={onCancel}
                    type="button"
                >
                    Отменить
                </Button>
                <Button classNames={{ buttonClass: 'submitButton ' }} type="submit">
                    Сохранить
                </Button>
            </div>
        </form>
    );
};

export { MasterAboutForm };
