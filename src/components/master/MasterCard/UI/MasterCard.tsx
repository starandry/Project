import React from 'react';
import styles from './index.module.scss';
import { Picture, Button, SvgIcon } from '@/components';
import StarOutline from '@/assets/icons/StarOutline.svg?react';
import Message from '@/assets/icons/Message.svg?react';
import HeartOutline from '@/assets/icons/HeartOutline.svg?react';
import { useMasterCard, MasterCardProps } from '@/components/master/MasterCard/index.model';

const MasterCard: React.FC<MasterCardProps> = (props) => {
    const { name, rating, reviewsCount, specialty, address, reviewWord } = useMasterCard(props);

    return (
        <div className={styles.card}>
            <div className={styles.cardTop}>
                <Picture src={'/images/masterPhoto.png'} alt={'фото мастера'} />
                <div className={styles.infoWrapper}>
                    <div className={styles.infoNextWrapper}>
                        <div className={styles.info}>
                            <h2 className={styles.name}>{name}</h2>
                            <div className="flex-col-8">
                                <p className={styles.specialty}>{specialty}</p>
                                <p className={styles.address}>{address}</p>
                            </div>
                        </div>
                        <SvgIcon Icon={HeartOutline} className="heartOutIcon" />
                    </div>
                </div>
            </div>

            <div className={styles.cardBottom}>
                <div className={styles.masterStats}>
                    <div className={styles.ratingBlock}>
                        <SvgIcon Icon={StarOutline} className="starOutIcon" />
                        <span>{rating}</span>
                    </div>
                    <div className={styles.reviewsBlock}>
                        <SvgIcon Icon={Message} className="messageIcon" />
                        <span>
                            {reviewsCount} {reviewWord}
                        </span>
                    </div>
                </div>
                <Button classNames={{ buttonClass: 'bookBtn' }}>Записаться</Button>
            </div>
        </div>
    );
};

export { MasterCard };
