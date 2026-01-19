import React from 'react';
import { Button } from '@/shared/ui';
import { MasterCard } from '@/entities/master';
import { getMasterWord } from '@/shared/lib';
import { useMasterList } from '../model/useMasterList';
import styles from './index.module.scss';

const MasterList: React.FC = () => {
    const {
        filteredMasters,
        visibleMasters,
        hasClickedShowMore,
        currentPage,
        totalPages,
        handleShowMore,
        handlePageChange,
    } = useMasterList();

    return (
        <>
            <div className={`flex ${styles.wrappCards}`}>
                {visibleMasters.map((master) => (
                    <MasterCard
                        key={master.id}
                        name={master.name}
                        specialty={master.specialty}
                        address={master.address}
                        rating={master.rating}
                        reviewsCount={master.reviewsCount}
                    />
                ))}
            </div>

            {!hasClickedShowMore && (
                <div className="flex-center">
                    <Button classNames={{ buttonClass: 'mastersMoreBtn' }} onClick={handleShowMore}>
                        Показать еще мастеров по вашим параметрам
                    </Button>
                </div>
            )}

            {hasClickedShowMore && (
                <div className={`flex-center ${styles.paginationWrap}`}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            classNames={{
                                buttonClass: `${currentPage === page ? 'activePageBtn' : 'pageBtn'}`,
                            }}
                        >
                            {page}
                        </Button>
                    ))}
                </div>
            )}

            {hasClickedShowMore && currentPage < totalPages && (
                <div className="flex-center">
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        classNames={{ buttonClass: 'showMoreMasters' }}
                    >
                        Показать ещё {filteredMasters.length - currentPage * 12}{' '}
                        {getMasterWord(filteredMasters.length - currentPage * 12)}
                    </Button>
                </div>
            )}
        </>
    );
};

export { MasterList };
