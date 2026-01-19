import React from 'react';
import { Dropdown, SvgIcon } from '@/shared/ui';
import { streets, specialties } from '@/entities/master/model/mastersMock';
import PurpleArrowUp from '@/shared/assets/icons/PurpleArrowUp.svg?react';
import styles from './index.module.scss';
import { useSearchForm } from '../model/useSearchForm';

const SearchForm: React.FC = () => {
    const { district, specialty, handleSearch, setDistrictValue, setSpecialtyValue } =
        useSearchForm();

    return (
        <form onSubmit={handleSearch} className={styles.wrapperSearchForm}>
            <span className={styles.searchFormLabel}>Выберите</span>
            <div className={`flex-between ${styles.searchForm}`}>
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
