import React from 'react';
import styles from './searchInput.module.scss';
import { Button } from "../Button";
import { Input } from "../Input";
import { SortIcon } from "../Icon/icon.component.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";

interface SearchInputProps {
    placeholder?: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search", onChange }) => {
    const compSearchInput = styles.searchInput;
    const compsearchButton = styles.searchButton;
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    let compWrapp;

    if (isDark) {
        compWrapp = styles.searchInputContainer;
    } else {
        compWrapp = `${styles.searchInputContainer} ${styles.lightSearchInputContainer}`;
    }

    return (
        <div className={compWrapp}>
            <Input
                type="text"
                className={compSearchInput}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button className={compsearchButton}>
                <SortIcon />
            </Button>
        </div>
    );
};

export { SearchInput };
