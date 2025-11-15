import { useState } from 'react';

export type ServiceFormData = {
    name: string;
    desc: string;
    text: string;
    address: string;
    price: string;
    image: string;
};

export const useServiceCardForm = (initialData?: ServiceFormData) => {
    const [data, setData] = useState<ServiceFormData>(
        initialData || {
            name: '',
            desc: '',
            text: '',
            address: '',
            price: '',
            image: '',
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setData((prev) => ({ ...prev, image: reader.result as string }));
        reader.readAsDataURL(file);
    };

    const resetForm = () =>
        setData(
            initialData || {
                name: '',
                desc: '',
                text: '',
                address: '',
                price: '',
                image: '',
            }
        );

    return { data, setData, handleChange, handleImageUpload, resetForm };
};
