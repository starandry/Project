import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers';
import { firstNames, lastNames, streets, specialties } from '@/entities/master/model/mastersMock';
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

        const matches = mockMasters.filter((master) => {
            const matchesDistrict = district ? master.address.includes(district) : true;
            const matchesSpecialty = specialty ? master.specialty === specialty : true;
            return matchesDistrict && matchesSpecialty;
        });

        const others = mockMasters.filter((master) => !matches.includes(master));
        return [...matches, ...others];
    }, [mockMasters, district, specialty, searchTriggered]);

    const totalPages = Math.ceil(filteredMasters.length / ITEMS_PER_PAGE);

    const visibleMasters = hasClickedShowMore
        ? filteredMasters.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
        : filteredMasters.slice(0, INITIAL_VISIBLE_COUNT);

    const handleShowMore = () => {
        setHasClickedShowMore(true);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return {
        filteredMasters,
        visibleMasters,
        hasClickedShowMore,
        currentPage,
        totalPages,
        handleShowMore,
        handlePageChange,
    };
};
