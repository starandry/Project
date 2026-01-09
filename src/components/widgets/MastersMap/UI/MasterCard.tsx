import React from 'react';
import { SvgIcon } from '@/components';
import StarOutline from '@/assets/icons/StarOutline.svg?react';
import Message from '@/assets/icons/Message.svg?react';
import HeartOutline from '@/assets/icons/HeartOutline.svg?react';
import { MasterMarker } from '../model/mapTypes';
import { getReviewsText } from '../model/mapUtils';
import styles from './index.module.scss';

interface MasterCardProps {
    marker: MasterMarker;
    onBookClick: (masterId: number) => void;
}

export const MasterCard: React.FC<MasterCardProps> = ({ marker, onBookClick }) => {
    return (
        <div className={`flex-col-16 ${styles.masterCard}`}>
            <div className={`flex ${styles.masterCardTop}`}>
                {marker.photo && (
                    <img src={marker.photo} alt={marker.name} className={styles.masterPhoto} />
                )}
                <div className={`flex ${styles.masterInfoWrapper}`}>
                    <div className={`flex-col ${styles.masterInfo}`}>
                        <h3 className={styles.masterName}>{marker.name}</h3>
                        <div className={`flex-col-8 ${styles.masterDetails}`}>
                            {marker.specialty && (
                                <p className={styles.masterSpecialty}>{marker.specialty}</p>
                            )}
                            {marker.address && (
                                <p className={styles.masterAddress}>{marker.address}</p>
                            )}
                        </div>
                    </div>
                    <button className={`flex-center ${styles.favoriteBtn}`} type="button">
                        <SvgIcon Icon={HeartOutline} className="heartOutIcon" />
                    </button>
                </div>
            </div>
            <div className={`flex-between ${styles.masterCardBottom}`}>
                <div className={`flex ${styles.masterStats}`}>
                    {marker.rating !== undefined && (
                        <div className={`flex ${styles.masterRating}`}>
                            <SvgIcon Icon={StarOutline} className="starOutIcon" />
                            <span>{marker.rating.toFixed(1)}</span>
                        </div>
                    )}
                    {marker.reviewsCount !== undefined && (
                        <div className={`flex ${styles.masterReviews}`}>
                            <SvgIcon Icon={Message} className="messageIcon" />
                            <span>
                                {marker.reviewsCount} {getReviewsText(marker.reviewsCount)}
                            </span>
                        </div>
                    )}
                </div>
                <button
                    className={styles.bookButton}
                    type="button"
                    onClick={() => onBookClick(marker.id)}
                >
                    Записаться
                </button>
            </div>
        </div>
    );
};
