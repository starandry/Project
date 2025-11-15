export type ServiceData = {
    name: string;
    desc: string;
    text: string;
    address: string;
    price: string;
    image: string;
};

export type ServiceCardProps = {
    formData: ServiceData;
    tempData: ServiceData;
    hovered: boolean;
    uploadMode: boolean;
    setHovered: (hovered: boolean) => void;
    setUploadMode: (upload: boolean) => void;
    setTempData: (data: ServiceData) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onClear: () => void;
};
