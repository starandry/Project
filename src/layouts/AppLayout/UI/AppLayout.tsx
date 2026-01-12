import React from 'react';
import { CountrySelector, LinkButton, Logo, Menu, ScrollButton, SvgIcon } from '@/components';
import { Header, Footer, FooterNav, FooterLegal } from '@/layouts';
import logoIcon from '@/assets/icons/Logo.svg?react';
import LogoFooter from '@/assets/icons/LogoFooter.svg?react';
import LoginIcon from '@/assets/icons/LoginRounded.svg?react';
import LogoutIcon from '@/assets/icons/LogoutIcon.svg?react';
import MasterSign from '@/assets/icons/MasterSign.svg?react';
import ClientSign from '@/assets/icons/ClientSign.svg?react';
import MainPage from '@/assets/icons/MainPage.svg?react';
import AssignmentIcon from '@/assets/icons/AssignmentIndRounded.svg?react';
import styles from './index.module.scss';
import type { AppLayoutProps } from '@/layouts/AppLayout/index.model.ts';
import { cn } from '@/utils';

const AppLayout: React.FC<AppLayoutProps> = ({ children, showAuthButtons }) => {
    return (
        <>
            <ScrollButton />

            <Header>
                <div className={cn(styles, 'bg-light-pink', 'wrapper')}>
                    <div className="container">
                        <div className={`flex-between ${styles.headerWrapp}`}>
                            <Logo icon={logoIcon} />
                            <div className={`flex ${styles.navbarMenu}`}>
                                <Menu />
                            </div>
                            <nav className={`flex-between ${styles.btnWrapp}`}>
                                {(showAuthButtons && (
                                    <>
                                        <LinkButton to="/login" className="linkButton-login">
                                            Вход
                                            <SvgIcon Icon={LoginIcon} />
                                        </LinkButton>
                                        <LinkButton
                                            to="/register/master"
                                            className="linkButton-reg"
                                        >
                                            Регистрация
                                            <SvgIcon Icon={AssignmentIcon} />
                                        </LinkButton>
                                    </>
                                )) || (
                                    <>
                                        <span className={styles.masterCapture}>
                                            Кабинет мастера
                                        </span>
                                        <SvgIcon Icon={MasterSign} />
                                        <LinkButton to="#" className="linkButton-login">
                                            Выход
                                            <SvgIcon Icon={LogoutIcon} />
                                        </LinkButton>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
            </Header>

            {children}

            <Footer>
                <div className="bg-light-pink">
                    <div className="container">
                        <div className={styles.wrappFooter}>
                            <SvgIcon Icon={LogoFooter} className="logoFooter" />
                            <nav className={`flex ${styles.footerNavigation}`}>
                                <LinkButton to="#" className="linkFooterNav">
                                    <SvgIcon Icon={MainPage} />
                                    Главная страница
                                </LinkButton>
                                <LinkButton to="/login" className="linkFooterNav">
                                    <SvgIcon Icon={ClientSign} />
                                    Вход для клиента
                                </LinkButton>
                                <LinkButton to="/login" className="linkFooterNav">
                                    <SvgIcon Icon={MasterSign} />
                                    Вход для мастера
                                </LinkButton>
                            </nav>
                            <div className={styles.wrappFooterNav}>
                                <FooterNav />
                            </div>
                            <hr className={styles.footerSeparator} />
                            <div className={`flex-between ${styles.basement}`}>
                                <FooterLegal companyName="LOGO" years="2011–2024" />
                                <CountrySelector />
                            </div>
                        </div>
                    </div>
                </div>
            </Footer>
        </>
    );
};

export { AppLayout };
