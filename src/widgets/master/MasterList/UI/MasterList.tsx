import React from 'react';
import { Button } from '@/shared/ui';
import { MasterCard } from '@/entities/master';
import { useMasterList } from '../model/useMasterList';
import styles from './index.module.scss';

const MasterList: React.FC = () => {
    const {
        visibleMasters,
        hasClickedShowMore,
        currentPage,
        totalPages,
        pageNumbers,
        remainingCount,
        remainingWord,
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
                    {pageNumbers.map((page) => (
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
                        Показать ещё {remainingCount} {remainingWord}
                    </Button>
                </div>
            )}
        </>
    );
};

export { MasterList };
