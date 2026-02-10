import React from 'react';
import { Button } from '@/shared/ui';
import { useMasterAboutForm } from '../model/useMasterAboutForm';
import styles from './index.module.scss';

type MasterAboutFormProps = {
    profileId: number;
    onCancel?: () => void;
    onSaved?: () => void;
};

const MasterAboutForm: React.FC<MasterAboutFormProps> = ({ profileId, onCancel, onSaved }) => {
    const { about, error, handleChange, handleSubmit } = useMasterAboutForm({ profileId, onSaved });

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

            <div className={styles.masterAboutFormActions}>
                <div className={styles.masterAboutErrorContainer}>
                    {error && <p className={styles.masterAboutError}>{error}</p>}
                </div>
                <div className="flex-end">
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
            </div>
        </form>
    );
};

export { MasterAboutForm };
