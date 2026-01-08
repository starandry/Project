import React from 'react';
import { FormFooter, FormTitle, LabeledInputField } from '@/components';

type MasterServiceAddressFormProps = {
    onClose: () => void;
};

const MasterVisitAddressForm: React.FC<MasterServiceAddressFormProps> = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <form className="form-container">
                <div className="flex-col-16">
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
