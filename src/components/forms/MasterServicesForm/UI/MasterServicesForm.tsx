import React from 'react';
import styles from './index.module.scss';
import { FormTitle, SelectField } from '@/components';

type MasterServicesFormProps = {
    onClose: () => void;
};

const MasterServicesForm: React.FC<MasterServicesFormProps> = ({ onClose }) => {
    return (
        <div className={styles.servicesOverlay}>
            <form className={styles.servicesForm}>
                <div className={styles.servicesWrapper}>
                    <FormTitle title="Редактировать поле Услуги  и цены " onClose={onClose} />
                    <SelectField label="Услуга"/>
                </div>
            </form>
        </div>
    );
};

export { MasterServicesForm };
