import React, { useState } from 'react';
import styles from './filterModal.module.scss';
import { Input } from '../../UI/Input';
import { SubTitle } from '../../UI/SubTitle';
import { Button } from '../../UI/Button';
import {Wrapper} from "../Wrapper";
import {BigCloseIcon} from "../../UI/Icon/icon.component.tsx";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
    const [selectedSort, setSelectedSort] = useState<'Rating' | 'Year' | null>('Rating'); // Состояние для выбранного типа сортировки

    if (!isOpen) return null;

    const handleSortClick = (sortType: 'Rating' | 'Year') => {
        setSelectedSort(sortType); // выбранный тип сортировки
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <Wrapper className={styles.wrappClose}>
                    <SubTitle text="Filters" className={styles.modalTitle} />
                    <Button className={styles.btnClose}>
                        <BigCloseIcon width={'16'} height={'16'}/>
                    </Button>
                </Wrapper>
                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Sort by</span>
                    <div className={styles.sortOptions}>
                        <Button
                            className={`${styles.sortButton} ${selectedSort === 'Rating' ? styles.activeSortButton : ''}`}
                            onClick={() => handleSortClick('Rating')}
                        >
                            Rating
                        </Button>
                        <Button
                            className={`${styles.sortButton} ${selectedSort === 'Year' ? styles.activeSortButton : ''}`}
                            onClick={() => handleSortClick('Year')}
                        >
                            Year
                        </Button>
                    </div>
                </Wrapper>
                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Full or short movie name</span>
                    <Input
                        type="text"
                        placeholder="Your text"
                        onChange={() => {
                        }}
                        className={styles.inputFilterSection}/>
                </Wrapper>
                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Genre</span>
                    <div className={styles.genreOptions}>
                        <Button className={styles.genreButton}>
                            <span className={styles.signGenre}>Adventure</span>
                            <BigCloseIcon/>
                        </Button>
                        <Button className={styles.genreButton}>
                            <span className={styles.signGenre}>Drama</span>
                            <BigCloseIcon/>
                        </Button>
                        <Button className={styles.genreButton}>
                            <span className={styles.signGenre}>Documental</span>
                            <BigCloseIcon/>
                        </Button>
                        <Button className={styles.genreButton}>
                            <span className={styles.signGenre}>Thriller</span>
                            <BigCloseIcon/>
                        </Button>
                    </div>
                </Wrapper>
                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Years</span>
                    <Wrapper className={styles.filterYears}>
                        <Input className={styles.inputYears} type="text" placeholder="From" onChange={() => {}}/>
                        <Input className={styles.inputYears} type="text" placeholder="To" onChange={() => {}}/>
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Ratig</span>
                    <Wrapper className={styles.filterYears}>
                        <Input className={styles.inputYears} type="text" placeholder="From" onChange={() => {}}/>
                        <Input className={styles.inputYears} type="text" placeholder="To" onChange={() => {}}/>
                    </Wrapper>
                </Wrapper>
                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Country</span>
                    <select className={styles.select}>
                        <option>Select country</option>
                        <option>USA</option>
                        <option>UK</option>
                        <option>France</option>
                        <option>Germany</option>
                    </select>
                </Wrapper>
                <Wrapper className={styles.actionButtons}>
                    <Button className={styles.clearButton} onClick={() => {}}>Clear filter</Button>
                    <Button className={styles.showButton} onClick={onClose}>Show results</Button>
                </Wrapper>
            </div>
        </div>
    );
};

export { FilterModal };
