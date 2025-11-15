import { useState } from 'react';
import type { ServiceData } from './serviceCardTypes';

export const useServiceCard = () => {
    const [uploadMode, setUploadMode] = useState(false);
    const [hovered, setHovered] = useState(false);

    const [formData, setFormData] = useState<ServiceData>({
        name: 'Название работы',
        desc: 'Описание работы:',
        text: 'здесь будет описание вашей работы.',
        address: 'ул. Жудро, 61',
        price: '40 руб.',
        image: '',
    });

    const [tempData, setTempData] = useState<ServiceData>(formData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempData({ ...tempData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempData({ ...tempData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        setFormData(tempData);
        setUploadMode(false);
    };

    const handleClearFormData = () => {
        const cleared = Object.keys(formData).reduce((acc, key) => {
            acc[key as keyof ServiceData] = '';
            return acc;
        }, {} as ServiceData);
        setFormData(cleared);
    };

    return {
        formData,
        tempData,
        hovered,
        uploadMode,
        setHovered,
        setUploadMode,
        setTempData,
        handleInputChange,
        handleImageUpload,
        handleSubmit,
        handleClearFormData,
    };
};
