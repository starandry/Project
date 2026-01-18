import React, { useState } from 'react';
import { SearchForm } from '../../SearchForm';
import { Input, Button, SvgIcon } from '@/shared/ui';
import Magnifier from '@/shared/assets/icons/Magnifier.svg?react';
import tagClose from '@/shared/assets/icons/tagClose.svg?react';
import type { SearchPanelProps } from '../index.model';
import styles from './index.module.scss';
import { useSearchForm } from '../../SearchForm/model/useSearchForm';

const SearchPanel: React.FC<SearchPanelProps> = ({ title }) => {
    const [isVisible, setIsVisible] = useState(false);

    const {
        district,
        specialty,
        showClearButton,
        handleRemoveDistrict,
        handleRemoveSpecialty,
        handleClearAllFilters,
    } = useSearchForm();

    const handleRadioChange = () => {
        setIsVisible(true);
    };

    return (
        <section className={`flex-col ${styles.searchPanel}`}>
            <h1 className={styles.searchTitle}>{title}</h1>
            <div className={styles.searchBody}>
                <p className={styles.searchHint}>воспользуйтесь строкой поиска</p>
                <div className={`flex-col-16 ${styles.searchPanelBlock}`}>
                    <label className={`flex-between ${styles.searchPanelBar}`}>
                        <Input
                            type="search"
                            onChange={() => {}}
                            className="searchMaster"
                            placeholder={'Введите название услуги или имя специалиста'}
                        />
                        <Button type="submit" classNames={{ buttonClass: 'searchBtn' }}>
                            <span>Найти</span>
                            <SvgIcon Icon={Magnifier} />
                        </Button>
                    </label>
                    <label className={`flex ${styles.searchFilterBody}`}>
                        <span className={styles.searchFilterSign}>Расширенный фильтр</span>
                        <Input type="radio" onChange={handleRadioChange} className="filterMaster" />
                    </label>
                    {isVisible && <SearchForm />}
                </div>
                <div className={`flex ${styles.selectedFilters}`}>
                    {district && (
                        <Button
                            type="button"
                            classNames={{ buttonClass: 'filterTag' }}
                            onClick={handleRemoveDistrict}
                        >
                            {district}
                            <SvgIcon Icon={tagClose} className="tagClose" />
                        </Button>
                    )}

                    {specialty && (
                        <Button
                            type="button"
                            classNames={{ buttonClass: 'filterTag' }}
                            onClick={handleRemoveSpecialty}
                        >
                            {specialty}
                            <SvgIcon Icon={tagClose} className="tagClose" />
                        </Button>
                    )}

                    {showClearButton && (
                        <Button
                            type="button"
                            classNames={{ buttonClass: 'clearFiltersBtn' }}
                            onClick={handleClearAllFilters}
                        >
                            Очистить фильтр
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
};

export { SearchPanel };
