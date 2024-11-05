import React from 'react';
import styles from './searchInput.module.scss';
import {Button} from "../Button";
import {Input} from "../Input";
import {SortIcon} from "../Icon/icon.component.tsx";


interface SearchInputProps {
    placeholder?: string;
    onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "Search", onChange }) => {
    return (
        <div className={styles.searchInputContainer}>
            <Input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button className={styles.searchButton}>
                <SortIcon/>
            </Button>
        </div>
    );
};

export {SearchInput};
