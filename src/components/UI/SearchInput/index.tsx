import React, {useState} from 'react';
import styles from './searchInput.module.scss';
import { Button } from "../Button";
import { Input } from "../Input";
import { SortIcon } from "../Icon/icon.component.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import {FilterModal} from "../../containers/FilterModal";

interface SearchInputProps {
    placeholder?: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search", onChange }) => {
    const [isModalOpen, setModalOpen] = useState(false); // Состояние для модального окна
    const compSearchInput = styles.searchInput;
    const compsearchButton = styles.searchButton;
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    let compWrapp;

    if (isDark) {
        compWrapp = styles.searchInputContainer;
    } else {
        compWrapp = `${styles.searchInputContainer} ${styles.lightSearchInputContainer}`;
    }

    const handleButtonClick = () => {
        setModalOpen(true); // Открываем модальное окно
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Закрываем модальное окно
    };

    return (
        <div className={compWrapp}>
            <Input
                type="text"
                className={compSearchInput}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button className={compsearchButton} onClick={handleButtonClick}>
                <SortIcon />
            </Button>
            <FilterModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export { SearchInput };
