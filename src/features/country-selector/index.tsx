import React from 'react';
import { useCountrySelector } from './model/useCountrySelector';
import { CountryUI } from './UI/CountryUI';

const CountrySelector: React.FC = () => {
    const { countries, current, open, ref, toggle, selectCountry } = useCountrySelector();

    return (
        <CountryUI
            wrapperRef={ref}
            open={open}
            current={current}
            countries={countries}
            toggleDropdown={toggle}
            selectCountry={selectCountry}
        />
    );
};

export { CountrySelector };
