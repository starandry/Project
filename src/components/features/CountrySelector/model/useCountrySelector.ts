import React from 'react';
import { useDropdown } from '@/hooks/ui';
import type { Country } from './countryTypes';

export const useCountrySelector = () => {
    const [selected, setSelected] = React.useState<string>('by');
    const { open, toggle, ref } = useDropdown<HTMLDivElement>();

    const countries: Country[] = [
        { code: 'by', name: 'Беларусь' },
        { code: 'ru', name: 'Россия' },
        { code: 'ua', name: 'Украина' },
        { code: 'kz', name: 'Казахстан' },
        { code: 'us', name: 'США' },
    ];

    const current = countries.find((c) => c.code === selected);

    const selectCountry = (code: string): void => {
        setSelected(code);
        toggle();
    };

    return {
        countries,
        current,
        open,
        ref,
        toggle,
        selectCountry,
    };
};
