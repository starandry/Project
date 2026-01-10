import React from 'react';
import styles from './index.module.scss';
import { LocalLink } from '@/components';
import { SupportInfo } from '@/layouts';

const FooterNav: React.FC = () => {
    return (
        <div className={`flex ${styles.footerNav}`}>
            <div className={styles.wrappClients}>
                <h4 className={styles.titleFooterNav}>Клиент</h4>
                <ul>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Услуги
                        </LocalLink>
                    </li>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Отзывы
                        </LocalLink>
                    </li>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Условия использования
                        </LocalLink>
                    </li>
                </ul>
            </div>
            <div className={styles.wrappMasters}>
                <h4 className={styles.titleFooterNav}>Мастер </h4>
                <ul>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Вход для специалистов
                        </LocalLink>
                    </li>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Партнёрская программа
                        </LocalLink>
                    </li>
                </ul>
            </div>
            <div className={styles.wrappAbout}>
                <h4 className={styles.titleFooterNav}>О нас </h4>
                <ul>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Контакты
                        </LocalLink>
                    </li>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Вопросы
                        </LocalLink>
                    </li>
                    <li className={styles.wrappItemFooter}>
                        <LocalLink to={'#'} classNames={{ linkClass: 'itemFooterNav' }}>
                            Наша команда
                        </LocalLink>
                    </li>
                </ul>
            </div>
            <SupportInfo />
        </div>
    );
};

export { FooterNav };
