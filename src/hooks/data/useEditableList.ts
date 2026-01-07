import { useState } from 'react';

type UseEditableListParams<T> = {
    initialList: T[];
    emptyItem: T;
    onSave?: (items: T[]) => void;
};

export function useEditableList<T>({ initialList, emptyItem, onSave }: UseEditableListParams<T>) {
    const [items, setItems] = useState<T[]>(initialList);
    const [originalItems, setOriginalItems] = useState<T[]>(initialList);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setOriginalItems(items);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setItems(originalItems);
        setIsEditing(false);
    };

    const handleChange = (index: number, field: keyof T, value: string) => {
        setItems((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        );
    };

    const handleAdd = () => {
        setItems((prev) => [...prev, { ...emptyItem }]);
    };

    const handleRemove = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave?.(items);
        setIsEditing(false);
    };

    return {
        items,
        isEditing,
        handleEdit,
        handleCancel,
        handleChange,
        handleAdd,
        handleRemove,
        handleSave,
    };
}
