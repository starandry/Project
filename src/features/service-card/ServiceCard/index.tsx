import React from 'react';
import { ServiceCard } from './UI/ServiceCard';
import { useServiceCard } from './model/useServiceCard';

const ServiceCardContainer: React.FC = () => {
    const {
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
    } = useServiceCard();

    return (
        <ServiceCard
            formData={formData}
            tempData={tempData}
            hovered={hovered}
            uploadMode={uploadMode}
            setHovered={setHovered}
            setUploadMode={setUploadMode}
            setTempData={setTempData}
            onInputChange={handleInputChange}
            onImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
            onClear={handleClearFormData}
        />
    );
};

export { ServiceCardContainer };
