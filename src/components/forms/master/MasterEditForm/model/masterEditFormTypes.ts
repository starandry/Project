import type { ChangeEvent, FormEvent } from 'react';

export type MasterEditFormData = {
    name: string;
    email: string;
    phone: string;
    photo: File | null;
    photoPreview: string | null;
};

export type MasterEditFormErrors = {
    name: string | null;
    email: string | null;
    phone: string | null;
    photo: string | null;
};

export type UseMasterEditFormProps = {
    onSaved?: () => void;
    onCancel?: () => void;
    initialData?: Partial<MasterEditFormData>;
};

export type UseMasterEditFormReturn = {
    formData: MasterEditFormData;
    errors: MasterEditFormErrors;
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handlePhotoChange: (file: File | null) => void;
    handlePhotoDelete: () => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleCancel: () => void;
};
