import React, { useState } from 'react';
import { SearchForm, Input, Button, SvgIcon } from '@/components';
import Magnifier from '@/assets/icons/Magnifier.svg?react';
import type { SearchPanelProps } from '@/components/search/SearchPanel/index.model.ts';
import styles from './index.module.scss';

const SearchPanel: React.FC<SearchPanelProps> = ({ title }) => {
    const [isVisible/*, setIsVisible*/] = useState(false);

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
                        <Input
                            type="radio"
                            onChange={() => {}}
                        />
                    </label>
                </div>
                {isVisible && <SearchForm />}
            </div>
        </section>
    );
};

export { SearchPanel };
