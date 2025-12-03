import React from 'react';
import ArrowDropDown from '@/assets/icons/ArrowDropDown.svg?react';
import styles from './index.module.scss';
import { Input, SvgIcon } from '@/components';

const YEARS = (() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 60 }, (_, i) => String(currentYear - i));
})();

const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const MasterEducationForm: React.FC = () => {
    return (
        <div className={styles.educationOverlay}>
            <form className={styles.educationForm}>
                <h2 className={styles.educationFormTitle}>Редактировать поле Образование</h2>
                <div className={styles.educationFieldWrapper}>
                    <div className={styles.institutionGroup}>
                        <label className={styles.institutionLabel}>
                            Название учебного заведения
                        </label>

                        <Input
                            type='text'
                            placeholder='Введите название учебного заведения'
                            className='institutionInput'
                            onChange={() => {}}
                        />
                    </div>
                    <div className={styles.specialtyGroup}>
                        <label className={styles.specialtyLabel}>
                            Специальность
                        </label>

                        <Input
                            type='text'
                            placeholder='Введите название специальности'
                            className='specialtyInput'
                            onChange={() => {}}
                        />
                    </div>
                    <div className={styles.startDateGroup}>
                        <span className={styles.dateGroupLabel}>Дата начала обучения</span>
                        <div className={styles.dateGroupRow}>
                            <div className={styles.yearSelectContainer}>
                                <div className={styles.selectYearWrapper}>
                                    <select
                                        className={styles.yearSelect}
                                        defaultValue=''
                                        onChange={() => {}}
                                    >
                                        <option value='' disabled>
                                            Год
                                        </option>
                                        {YEARS.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                    <SvgIcon Icon={ArrowDropDown} className="ArrowDropDown"/>
                                </div>
                            </div>
                            <select
                                className={styles.monthSelect}
                                defaultValue=''
                                onChange={() => {}}
                            >
                                <option value='' disabled>
                                    Месяц
                                </option>
                                {MONTHS.map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export { MasterEducationForm };
