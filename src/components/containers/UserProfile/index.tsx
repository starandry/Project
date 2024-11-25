import React from 'react';
import styles from './userProfile.module.scss';
import {CloseIcon, Hamburger} from "../../UI/Icon/icon.component.tsx";
import { menuItems } from '../../../routes/menuRoutes.tsx';
import { Link } from "react-router-dom";
import { useActivePath } from '../../../hooks/useActivePath.ts';
import {useSelector} from "react-redux";
import {RootState} from "../../../stores/store.ts";
import { toggleMenu, closeMenu } from '../../../stores/slices/hamburgerSlice.ts';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../../stores/store.ts';
import {Wrapper} from "../Wrapper";

export type UserProfileProps = {
    name: string;
    circleColor: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, circleColor }) => {
    const isHamburgerOpen = useSelector((state: RootState) => state.hamburger.isOpen); // Получаем состояние из Redux
    const { activePath, handleLinkClick } = useActivePath();
    const isDark = useSelector((state: RootState) => state.theme.isDark);
    const dispatch = useDispatch<AppDispatch>();
    let compName, compUserIfo;

    if (isDark) {
        compName = styles.userName;
    } else {
        compName = `${styles.userName} ${styles.lightUserName}`;
    }

    if (isHamburgerOpen) {
        compUserIfo = `${styles.userInfo} ${styles.userInfoHumb}`;
    } else {
        compUserIfo =  styles.userInfo;
    }

    const toggleHamburger = () => {
        dispatch(toggleMenu());
    };

    const closeHamburger = () => {
        dispatch(closeMenu());
    };

    return (
        <div className={styles.userProfile}>
            <div className={compUserIfo}>
                <div
                    className={styles.circle}
                    style={{ backgroundColor: circleColor }}
                    onClick={toggleHamburger}
                >
                    <Hamburger className={styles.hamburger} />
                </div>
                <span className={compName}>{name}</span>
            </div>

            <div className={`${styles.menuItems} ${isHamburgerOpen ? styles.open : ''}`}>
                <div className={styles.closeIcon} onClick={closeHamburger}>
                    <CloseIcon/>
                </div>
                <Wrapper className={styles.wrappHamb}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.menuLink} ${activePath === item.path ? styles.active : ''}`}
                            onClick={() => handleLinkClick(item.path)}
                        >
                            {item.icon}
                            <span className={styles.text}>{item.label}</span>
                        </Link>
                    ))}
                </Wrapper>
            </div>
        </div>
    );
};

export { UserProfile };
