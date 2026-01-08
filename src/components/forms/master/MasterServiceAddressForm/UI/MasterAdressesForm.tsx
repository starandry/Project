import React from 'react';
import { FormFooter, FormTitle, LabeledInputField } from '@/components';

type MasterServiceAddressFormProps = {
    onClose: () => void;
};

const MasterServiceAddressForm: React.FC<MasterServiceAddressFormProps> = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <form className="form-container">
                <div className="flex-col-16">
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
