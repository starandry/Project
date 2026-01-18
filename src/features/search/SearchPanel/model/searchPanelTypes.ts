export type SearchPanelProps = {
    title: string;
};

export type UseSearchForm = {
    district: string | null;
    specialty: string | null;
    showClearButton: boolean;
    handleSearch: (e: React.FormEvent) => void;
    handleRemoveDistrict: () => void;
    handleRemoveSpecialty: () => void;
    handleClearAllFilters: () => void;
    setDistrictValue: (label: string) => void;
    setSpecialtyValue: (label: string) => void;
};
