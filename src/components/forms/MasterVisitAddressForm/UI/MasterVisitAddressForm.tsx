import React from 'react';
import styles from './index.module.scss';
import { FormFooter, FormTitle, LabeledInputField } from '@/components';

type MasterServiceAddressFormProps = {
    onClose: () => void;
};

const MasterVisitAddressForm: React.FC<MasterServiceAddressFormProps> = ({ onClose }) => {
    return (
        <div className={styles.addressVisitOverlay}>
            <form className={styles.addressVisitForm}>
                <div className={styles.addressVisitWrapper}>
                    <FormTitle title="Редактировать районы выезда к клиенту" onClose={onClose} />
                    <LabeledInputField
                        label="Район выезда"
                        placeholder="Введите район выезда к клиенту"
                        onChange={() => {}}
                    />
                    <FormFooter onCancel={onClose} onSubmit={() => {}} />
                </div>
            </form>
        </div>
    );
};

export { MasterVisitAddressForm };
