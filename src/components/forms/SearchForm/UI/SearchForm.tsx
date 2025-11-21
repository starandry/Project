import React from 'react';
import { Dropdown, SvgIcon } from '@/components';
import { streets, specialties } from '@/data/masters';
import PurpleArrowUp from '@/assets/icons/PurpleArrowUp.svg?react';
import styles from './index.module.scss';
import { useSearchForm } from '@/components/forms/SearchForm/model/useSearchForm.ts';

const SearchForm: React.FC = () => {
    const { district, specialty, handleSearch, setDistrictValue, setSpecialtyValue } =
        useSearchForm();

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
        </form>
    );
};

export { SearchForm };
