import React from 'react';
import { ImageUploader } from './UI/ImageUploader';
import { useImageUploader } from '@/hooks/media';

const ImageUploaderContainer: React.FC = () => {
    const {
        preview,
        inputRef,
        handleImageUpload,
        triggerUpload,
    } = useImageUploader();

    return (
        <ImageUploader
            preview={preview}
            onTriggerUpload={triggerUpload}
            inputRef={inputRef}
            onImageUpload={handleImageUpload}
        />
    );
};

export { ImageUploaderContainer };
