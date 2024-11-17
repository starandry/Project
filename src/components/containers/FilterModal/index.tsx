import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../stores/slices/filtersSlice.ts';
import styles from './filterModal.module.scss';
import { Input } from '../../UI/Input';
import { SubTitle } from '../../UI/SubTitle';
import { Button } from '../../UI/Button';
import { Wrapper } from "../Wrapper";
import { BigCloseIcon } from "../../UI/Icon/icon.component.tsx";

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    const initialGenres = ['Adventure', 'Drama', 'Documental', 'Thriller'];
    const [selectedSort, setSelectedSort] = useState<'Rating' | 'Year'>('Rating');
    const [genres, setGenres] = useState<string[]>(initialGenres);
    const [movieName, setMovieName] = useState<string>(''); // Состояние для текста поиска
    const [yearFrom, setYearFrom] = useState<string>(''); // Состояние для начала диапазона года
    const [yearTo, setYearTo] = useState<string>(''); // Состояние для конца диапазона года
    const [ratingFrom, setRatingFrom] = useState<string>(''); // Состояние для начала диапазона рейтинга
    const [ratingTo, setRatingTo] = useState<string>(''); // Состояние для конца диапазона рейтинга
    const [country, setCountry] = useState<string>(''); // Состояние для страны

    if (!isOpen) return null;

    const handleSortClick = (sortType: 'Rating' | 'Year') => {
        setSelectedSort(sortType); // Выбор типа сортировки
    };

    const handleGenreRemove = (genre: string) => {
        setGenres(genres.filter(g => g !== genre)); // Удаление жанра из массива
    };

    const handleClearFilter = () => {
        setMovieName('');
        setYearFrom('');
        setYearTo('');
        setRatingFrom('');
        setRatingTo('');
        setCountry('');
        setGenres(initialGenres);
        setSelectedSort('Rating');
    };

    const handleShowResults = () => {
        // Отправка фильтров в Redux
        dispatch(setFilters({
            movieName,
            genres,
            yearFrom,
            yearTo,
            ratingFrom,
            ratingTo,
            country,
            sortBy: selectedSort,
        }));

        onClose(); // Закрытие модального окна
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <Wrapper className={styles.wrappClose}>
                    <SubTitle text="Filters" className={styles.modalTitle} />
                    <Button className={styles.btnClose} onClick={onClose}>
                        <BigCloseIcon width={'16'} height={'16'} />
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
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        className={styles.inputFilterSection}
                    />
                </Wrapper>

                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Genre</span>
                    <div className={styles.genreOptions}>
                        {genres.map((genre) => (
                            <Button key={genre} className={styles.genreButton}>
                                <span className={styles.signGenre}>{genre}</span>
                                <BigCloseIcon onClick={() => handleGenreRemove(genre)} />
                            </Button>
                        ))}
                    </div>
                </Wrapper>

                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Years</span>
                    <Wrapper className={styles.filterYears}>
                        <Input
                            className={styles.inputYears}
                            type="text"
                            placeholder="From"
                            value={yearFrom}
                            onChange={(e) => setYearFrom(e.target.value)}
                        />
                        <Input
                            className={styles.inputYears}
                            type="text"
                            placeholder="To"
                            value={yearTo}
                            onChange={(e) => setYearTo(e.target.value)}
                        />
                    </Wrapper>
                </Wrapper>

                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Rating</span>
                    <Wrapper className={styles.filterYears}>
                        <Input
                            className={styles.inputYears}
                            type="text"
                            placeholder="From"
                            value={ratingFrom}
                            onChange={(e) => setRatingFrom(e.target.value)}
                        />
                        <Input
                            className={styles.inputYears}
                            type="text"
                            placeholder="To"
                            value={ratingTo}
                            onChange={(e) => setRatingTo(e.target.value)}
                        />
                    </Wrapper>
                </Wrapper>

                <Wrapper className={styles.filterSection}>
                    <span className={styles.label}>Country</span>
                    <select
                        className={styles.select}
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">Select country</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                    </select>
                </Wrapper>

                <Wrapper className={styles.actionButtons}>
                    <Button className={styles.clearButton} onClick={handleClearFilter}>Clear filter</Button>
                    <Button className={styles.showButton} onClick={handleShowResults}>Show results</Button>
                </Wrapper>
            </div>
        </div>
    );
};

export { FilterModal };
