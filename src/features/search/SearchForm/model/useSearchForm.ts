import { useDispatch, useSelector } from 'react-redux';
import { setDistrict, setSpecialty, setSearchTriggered } from '@/features/search';
import { RootState } from '@/app/providers';
import type { UseSearchForm } from '../../SearchPanel/model/searchPanelTypes';

export const useSearchForm = (): UseSearchForm => {
    const dispatch = useDispatch();
    const { district, specialty } = useSelector((state: RootState) => state.filters);

    const handleRemoveDistrict = () => dispatch(setDistrict(null));
    const handleRemoveSpecialty = () => dispatch(setSpecialty(null));

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setSearchTriggered(true));
    };

    const handleClearAllFilters = () => {
        dispatch(setDistrict(null));
        dispatch(setSpecialty(null));
        dispatch(setSearchTriggered(false));
    };

    const showClearButton = district !== null || specialty !== null;

    const setDistrictValue = (label: string) => dispatch(setDistrict(label));
    const setSpecialtyValue = (label: string) => dispatch(setSpecialty(label));

    return {
        district,
        specialty,
        showClearButton,
        handleSearch,
        handleRemoveDistrict,
        handleRemoveSpecialty,
        handleClearAllFilters,
        setDistrictValue,
        setSpecialtyValue,
    };
};
