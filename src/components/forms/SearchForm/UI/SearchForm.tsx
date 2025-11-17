import React from 'react';
import { Dropdown, Button, SvgIcon } from '@/components';
import { useSearchForm } from '../model/useSearchForm';
import { streets, specialties } from '@/data/masters';
import tagClose from '@/assets/icons/tagClose.svg?react';
import PurpleArrowUp from '@/assets/icons/PurpleArrowUp.svg?react';
import styles from './index.module.scss';

const SearchForm: React.FC = () => {
    const {
        district,
        specialty,
        showClearButton,
        handleSearch,
        handleRemoveDistrict,
        handleRemoveSpecialty,
        handleClearAllFilters,
        setDistrictValue,
        setSpecialtyValue,
    } = useSearchForm();

    return (
        <form onSubmit={handleSearch} className={styles.wrapperSearchForm}>
            <span className={styles.searchFormLabel}>Выберите</span>
            <div className={styles.searchForm}>
                <Dropdown
                    buttonLabel="Район"
                    items={streets}
                    selectedLabel={district}
                    onItemClick={setDistrictValue}
                    classNames={{
                        wrapper: 'searchWrap',
                        button: 'searchPanelBtn',
                    }}
                    icon={<SvgIcon Icon={PurpleArrowUp} className="searchFormIcon" />}
                />

                <Dropdown
                    buttonLabel="Услугу"
                    items={specialties}
                    selectedLabel={specialty}
                    onItemClick={setSpecialtyValue}
                    classNames={{
                        wrapper: 'searchWrap',
                        button: 'searchPanelBtn',
                    }}
                    icon={<SvgIcon Icon={PurpleArrowUp} className="searchFormIcon" />}
                />

                <Dropdown
                    buttonLabel="Дату"
                    items={['Пункт 1', 'Пункт 2', 'Пункт 3']}
                    classNames={{
                        wrapper: 'searchWrap',
                        button: 'searchPanelBtn',
                    }}
                    icon={<SvgIcon Icon={PurpleArrowUp} className="searchFormIcon" />}
                />

                <Dropdown
                    buttonLabel="Стоимость"
                    items={['Пункт 1', 'Пункт 2', 'Пункт 3']}
                    classNames={{
                        wrapper: 'searchWrap',
                        button: 'searchPanelBtn',
                    }}
                    icon={<SvgIcon Icon={PurpleArrowUp} className="searchFormIcon" />}
                />
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
        </form>
    );
};

export { SearchForm };
