import { useState, useCallback, useMemo } from 'react';

export type ServiceFormData = {
    name: string;
    desc: string;
    text: string;
    address: string;
    price: string;
    image: string;
    coating?: string;
    design?: string;
};

interface UseServiceFormOptions {
    initialData?: ServiceFormData;
    useDraft?: boolean; // если true - использует tempData паттерн
}

export const useServiceForm = (options: UseServiceFormOptions = {}) => {
    const { initialData, useDraft = false } = options;

    const defaultData: ServiceFormData = useMemo(() => initialData || {
        name: '',
        desc: '',
        text: '',
        address: '',
        price: '',
        image: '',
    }, [initialData]);

    const [data, setData] = useState<ServiceFormData>(defaultData);
    const [tempData, setTempData] = useState<ServiceFormData>(data);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const setter = useDraft ? setTempData : setData;
        setter((prev) => ({ ...prev, [name]: value }));
    }, [useDraft]);

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const setter = useDraft ? setTempData : setData;
            setter((prev) => ({ ...prev, image: reader.result as string }));
        };
        reader.readAsDataURL(file);
    }, [useDraft]);

    const handleSubmit = useCallback(() => {
        if (useDraft) {
            setData(tempData);
        }
    }, [useDraft, tempData]);

    const resetForm = useCallback(() => {
        setData(defaultData);
        setTempData(defaultData);
    }, [defaultData]);

    const handleClear = useCallback(() => {
        const cleared = Object.keys(defaultData).reduce((acc, key) => {
            acc[key as keyof ServiceFormData] = '';
            return acc;
        }, {} as ServiceFormData);
        setData(cleared);
        if (useDraft) setTempData(cleared);
    }, [defaultData, useDraft]);

    return {
        data,
        tempData,
        setData,
        setTempData,
        handleChange,
        handleImageUpload,
        handleSubmit,
        resetForm,
        handleClear,
    };
};
