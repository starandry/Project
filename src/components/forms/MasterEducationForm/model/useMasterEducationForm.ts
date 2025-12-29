import { useState, useCallback } from 'react';
import type { EducationFormData } from '@/components';
import { initialEducationFormData } from '@/components';

export const useMasterEducationForm = (initialData?: Partial<EducationFormData>) => {
    const [formData, setFormData] = useState<EducationFormData>({
        ...initialEducationFormData,
        ...initialData,
    });

    const handleInputChange = useCallback(
        (field: keyof EducationFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const handleSelectChange = useCallback(
        (field: keyof EducationFormData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const resetForm = useCallback(() => {
        setFormData({ ...initialEducationFormData, ...initialData });
    }, [initialData]);

    const isFormValid = useCallback(() => {
        return (
            formData.institutionName.trim() !== '' &&
            formData.specialty.trim() !== '' &&
            formData.startYear !== '' &&
            formData.startMonth !== '' &&
            formData.endYear !== '' &&
            formData.endMonth !== ''
        );
    }, [formData]);

    return {
        formData,
        setFormData,
        handleInputChange,
        handleSelectChange,
        resetForm,
        isFormValid,
    };
};
