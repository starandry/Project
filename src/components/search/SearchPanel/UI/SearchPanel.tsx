import React, { useState } from 'react';
import { SearchForm, Input, Button, SvgIcon } from '@/components';
import Magnifier from '@/assets/icons/Magnifier.svg?react';
import tagClose from '@/assets/icons/tagClose.svg?react';
import type { SearchPanelProps } from '@/components/search/SearchPanel/index.model.ts';
import styles from './index.module.scss';
import { useSearchForm } from '@/components/forms/SearchForm/model/useSearchForm.ts';

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
        <section className={styles.searchPanel}>
            <h1 className={styles.searchTitle}>{title}</h1>
            <div className={styles.searchBody}>
                <p className={styles.searchHint}>воспользуйтесь строкой поиска</p>
                <div className={styles.searchPanelBlock}>
                    <label className={styles.searchPanelBar}>
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
                    <label className={styles.searchFilterBody}>
                        <span className={styles.searchFilterSign}>Расширенный фильтр</span>
                        <Input type="radio" onChange={handleRadioChange} className="filterMaster" />
                    </label>
                    {isVisible && <SearchForm />}
                </div>
                <div className={styles.selectedFilters}>
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
