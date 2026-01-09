import { useState, useCallback } from 'react';
import type { DiplomasFormData } from './diplomasFormTypes';
import { initialDiplomasFormData } from './diplomasFormTypes';

export const useMasterDiplomasForm = (initialData?: Partial<DiplomasFormData>) => {
    const [formData, setFormData] = useState<DiplomasFormData>({
        ...initialDiplomasFormData,
        ...initialData,
    });

    const handleInputChange = useCallback(
        (field: keyof DiplomasFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const handleSelectChange = useCallback(
        (field: keyof DiplomasFormData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const handleImageChange = useCallback((file: File | null) => {
        setFormData((prev) => ({ ...prev, image: file }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData({ ...initialDiplomasFormData, ...initialData });
    }, [initialData]);

    const isFormValid = useCallback(() => {
        return (
            formData.certificateName.trim() !== '' &&
            formData.organization.trim() !== '' &&
            formData.year !== '' &&
            formData.month !== ''
        );
    }, [formData]);

    return {
        formData,
        setFormData,
        handleInputChange,
        handleSelectChange,
        handleImageChange,
        resetForm,
        isFormValid,
    };
};
