export type ServiceItem = {
    title: string;
    description: string;
    price: string;
};

export type MasterServicesProps = {
    services: ServiceItem[];
    isEditing: boolean;
    onEdit: () => void;
    onChange: (index: number, field: keyof ServiceItem, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
    onSave: () => void;
    onCancel: () => void;
};
