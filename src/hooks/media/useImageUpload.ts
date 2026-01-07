import { useState, useCallback, useRef } from 'react';

interface UseImageUploadOptions {
    maxSize?: number; // в байтах, по умолчанию 5MB
    onError?: (error: string) => void;
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
    const { maxSize = 5 * 1024 * 1024, onError } = options;
    const [preview, setPreview] = useState<string>('');
    const [isHovered, setIsHovered] = useState(false);
    const [error, setError] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            // Проверка размера
            if (file.size > maxSize) {
                const errorMsg = `Размер файла не должен превышать ${maxSize / 1024 / 1024}MB`;
                setError(errorMsg);
                onError?.(errorMsg);
                return;
            }

            // Проверка типа
            if (!file.type.startsWith('image/')) {
                const errorMsg = 'Файл должен быть изображением';
                setError(errorMsg);
                onError?.(errorMsg);
                return;
            }

            setError('');
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        },
        [maxSize, onError]
    );

    const handleRemoveImage = useCallback(() => {
        setPreview('');
        setError('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }, []);

    const triggerUpload = useCallback(() => {
        inputRef.current?.click();
    }, []);

    return {
        preview,
        isHovered,
        inputRef,
        error,
        setIsHovered,
        handleImageUpload,
        handleRemoveImage,
        triggerUpload,
        clearError: () => setError(''),
    };
};
