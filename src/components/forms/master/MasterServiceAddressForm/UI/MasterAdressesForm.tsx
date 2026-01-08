import React from 'react';
import styles from './index.module.scss';
import { FormFooter, FormTitle, LabeledInputField } from '@/components';

type MasterServiceAddressFormProps = {
    onClose: () => void;
};

const MasterServiceAddressForm: React.FC<MasterServiceAddressFormProps> = ({ onClose }) => {
    return (
        <div className={styles.addressOverlay}>
            <form className={styles.addressForm}>
                <div className={styles.addressWrapper}>
                    <FormTitle title="Редактировать адрес проведения услуг" onClose={onClose} />
                    <LabeledInputField
                        label="Адрес проведения работ"
                        placeholder="Введите адрес проведения работ"
                        onChange={() => {}}
                    />
                    <FormFooter onCancel={onClose} onSubmit={() => {}} />
                </div>
            </form>
        </div>
    );
};

export { MasterServiceAddressForm };
