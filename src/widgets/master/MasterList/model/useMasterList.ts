import { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers';
import { firstNames, lastNames, streets, specialties } from '@/entities/master/model/mastersMock';
import { getMasterWord } from '@/shared/lib';
import type { Master } from './masterListTypes';

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomFloat = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(1);

const INITIAL_VISIBLE_COUNT = 6;
const ITEMS_PER_PAGE = 12;

export const useMasterList = () => {
    const { district, specialty, searchTriggered } = useSelector(
        (state: RootState) => state.filters
    );

    const [hasClickedShowMore, setHasClickedShowMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const mockMasters: Master[] = useMemo(
        () =>
            Array.from({ length: 48 }, (_, index) => ({
                id: index + 1,
                name: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
                specialty: getRandom(specialties),
                address: `г. Минск, ул. ${getRandom(streets)}, ${50 + index}`,
                rating: parseFloat(getRandomFloat(4.2, 5.0)),
                reviewsCount: Math.floor(Math.random() * 20 + 1),
            })),
        []
    );

    const filteredMasters = useMemo(() => {
        if (!searchTriggered) return mockMasters;

        const matches: Master[] = [];
        const others: Master[] = [];

        for (const master of mockMasters) {
            const matchesDistrict = district ? master.address.includes(district) : true;
            const matchesSpecialty = specialty ? master.specialty === specialty : true;
            if (matchesDistrict && matchesSpecialty) {
                matches.push(master);
            } else {
                others.push(master);
            }
        }

        return matches.concat(others);
    }, [mockMasters, district, specialty, searchTriggered]);

    const totalPages = useMemo(
        () => Math.ceil(filteredMasters.length / ITEMS_PER_PAGE),
        [filteredMasters.length]
    );

    const visibleMasters = useMemo(() => {
        if (!hasClickedShowMore) {
            return filteredMasters.slice(0, INITIAL_VISIBLE_COUNT);
        }
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredMasters.slice(start, start + ITEMS_PER_PAGE);
    }, [filteredMasters, hasClickedShowMore, currentPage]);

    const pageNumbers = useMemo(
        () => Array.from({ length: totalPages }, (_, i) => i + 1),
        [totalPages]
    );

    const remainingCount = useMemo(
        () => Math.max(filteredMasters.length - currentPage * ITEMS_PER_PAGE, 0),
        [filteredMasters.length, currentPage]
    );

    const remainingWord = useMemo(() => getMasterWord(remainingCount), [remainingCount]);

    const handleShowMore = useCallback(() => {
        setHasClickedShowMore(true);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    return {
        filteredMasters,
        visibleMasters,
        hasClickedShowMore,
        currentPage,
        totalPages,
        pageNumbers,
        remainingCount,
        remainingWord,
        handleShowMore,
        handlePageChange,
    };
};
