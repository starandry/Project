import React, { useState } from 'react';
import styles from './userProfile.module.scss';
import { Hamburger } from "../../UI/Icon/icon.component.tsx";
/*import { menuItems, routes } from '../../../routes/menuRoutes.tsx';
import {Link, Route, Routes} from "react-router-dom";*/

interface UserProfileProps {
    name: string;
    circleColor: string; //  проп для задания цвета круга
}

const UserProfile: React.FC<UserProfileProps> = ({ name, circleColor }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    /*const [activePath, setActivePath] = useState('/');*/ // отслеживания активной ссылки

    /*const handleLinkClick = (path: string) => {
        setActivePath(path); // активный путь при клике
    };
*/
    // Функция для переключения состояния выпадающего меню
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    // Функция для обработки выбора в меню
   /* const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        if (selectedOption === 'Profile') {
            console.log('Profile selected');

        } else if (selectedOption === 'Logout') {
            console.log('Logout selected');
        }
    };*/

    return (
        <div className={styles.userProfile}>
            <div className={styles.userInfo}>
                <div
                    className={styles.circle}
                    style={{ backgroundColor: circleColor }}
                    onClick={toggleHamburger}
                >
                    <Hamburger className={styles.hamburger}/>
                </div>
                <span className={styles.userName}>{name}</span>
                <span className={styles.dropdownIcon} onClick={toggleDropdown}>&#9662;</span> {/* Стрелка вниз */}
            </div>

           {/* {isHamburgerOpen && (
                <div>
                    {menuItems.map((item) => (
                        <Link
                            to={item.path}
                            className={`${styles.menuLink} ${activePath === item.path ? styles.active : ''}`}
                            onClick={() => handleLinkClick(item.path)}
                        >
                            {item.icon}
                            <span className={styles.text}>{item.label}</span>
                        </Link>
                    ))}
                    <Routes>
                        {routes.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </div>
            )}*/}

            {/*{isDropdownOpen && (
                <select className={styles.selectMenu} onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="Profile">Profile</option>
                    <option value="Logout">Logout</option>
                </select>
            )}*/}
        </div>
    );
};

export {UserProfile};
