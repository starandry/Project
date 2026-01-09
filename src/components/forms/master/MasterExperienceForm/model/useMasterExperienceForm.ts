import { useState, useCallback } from 'react';
import type { ExperienceFormData } from './experienceFormTypes';
import { initialExperienceFormData } from './experienceFormTypes';

export const useMasterExperienceForm = (initialData?: Partial<ExperienceFormData>) => {
    const [formData, setFormData] = useState<ExperienceFormData>({
        ...initialExperienceFormData,
        ...initialData,
    });

    const handleInputChange = useCallback(
        (field: keyof ExperienceFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const handleTextAreaChange = useCallback(
        (field: keyof ExperienceFormData) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const handleSelectChange = useCallback(
        (field: keyof ExperienceFormData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
            setFormData((prev) => ({ ...prev, [field]: e.target.value }));
        },
        []
    );

    const resetForm = useCallback(() => {
        setFormData({ ...initialExperienceFormData, ...initialData });
    }, [initialData]);

    const isFormValid = useCallback(() => {
        return (
            formData.companyName.trim() !== '' &&
            formData.position.trim() !== '' &&
            formData.description.trim() !== '' &&
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
        handleTextAreaChange,
        handleSelectChange,
        resetForm,
        isFormValid,
    };
};
