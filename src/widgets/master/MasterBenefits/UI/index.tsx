import styles from './index.module.scss';
import { SvgIcon } from '@/shared/ui';
import HeartBenefits from '@/shared/assets/icons/HeartBenefits.svg?react';

const benefitsData = [
    'Регистрируйся на портале "Твой мастер маникюра"',
    'Оформляй витрину своего кабинета - загружай лучшие фото работ',
    'Следи за графиком своей работы',
    'Твой клиент найдет тебя и забронирует удобное время для процедуры',
    'Обсуди с клиентом процедуру в Сообщениях',
    'Получай лучшие отзывы и собирай звезды',
];

const MasterBenefits = () => {
    return (
        <section className={styles.benefits}>
            <div className={styles.grid}>
                {benefitsData.map((text, index) => (
                    <article key={index} className={`flex-center ${styles.card}`}>
                        <SvgIcon Icon={HeartBenefits} className={styles.icon} />
                        <p className={styles.text}>{text}</p>
                    </article>
                ))}
            </div>
        </section>
    );
};

export { MasterBenefits };
