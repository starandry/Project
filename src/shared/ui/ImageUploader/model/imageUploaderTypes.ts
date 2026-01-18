import React from 'react';

export interface ImageUploaderProps {
    preview: string | null;
    onTriggerUpload: (e: React.MouseEvent) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
