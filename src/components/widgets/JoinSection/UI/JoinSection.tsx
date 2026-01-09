import React from 'react';
import { Picture, Button } from '@/components';
import styles from './index.module.scss';

const JoinSection: React.FC = () => {
    return (
        <section className={`flex-between ${styles.joinSection}`}>
            <div className={`flex-col ${styles.content}`}>
                <h2 className={styles.title}>Бесплатный сервис для поиска клиентов</h2>
                <p className={styles.text}>
                    Ты мастер ногтевого сервиса или владелец бизнеса? Присоединяйся к нашей единой
                    системе бронирования.
                    <br />
                    Прозрачные условия сотрудничества, удобный кабинет, уникальное
                    <br />
                    сообщество и самые лояльные клиенты.
                </p>
                <p className={styles.subtext}>Расширяй свой бизнес с нами!</p>
                <Button classNames={{ buttonClass: 'joinServBtn' }}>
                    Присоединиться к сервису бесплатно
                </Button>
            </div>
            <div className={styles.imageWrapper}>
                <Picture src={'./images/joinUsVisual.png'} alt={'присоединяйся к сервису'} />
            </div>
        </section>
    );
};

export { JoinSection };
