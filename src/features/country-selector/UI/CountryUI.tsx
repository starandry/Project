import React, { RefObject } from 'react';
import styles from './index.module.scss';
import { SvgIcon } from '@/shared/ui';
import PurpleArrowDown from '@/shared/assets/icons/PurpleArrowDown.svg?react';
import type { Country } from '../model/countryTypes';

type Props = {
    wrapperRef: RefObject<HTMLDivElement>;
    open: boolean;
    current?: Country;
    countries: Country[];
    toggleDropdown: () => void;
    selectCountry: (code: string) => void;
};

export const CountryUI: React.FC<Props> = ({
    wrapperRef,
    open,
    current,
    countries,
    toggleDropdown,
    selectCountry,
}) => {
    return (
        <div className={`flex ${styles.wrapper}`} ref={wrapperRef}>
            {current && (
                <div className={`flex ${styles.currentCountry}`} onClick={toggleDropdown}>
                    <img
                        src={`https://flagcdn.com/w40/${current.code}.png`}
                        alt={current.name}
                        className={styles.flag}
                    />
                    <span>
                        {current.name} — <span className={styles.changeText}>сменить страну</span>
                    </span>
                    <SvgIcon Icon={PurpleArrowDown} className="selectCountry" />
                </div>
            )}
            {open && (
                <ul className={styles.dropdown}>
                    {countries.map((country) => (
                        <li
                            key={country.code}
                            onClick={() => selectCountry(country.code)}
                            className={`flex ${styles.dropdownItem}`}
                        >
                            <img
                                src={`https://flagcdn.com/w40/${country.code}.png`}
                                alt={country.name}
                                className={styles.flag}
                            />
                            {country.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
