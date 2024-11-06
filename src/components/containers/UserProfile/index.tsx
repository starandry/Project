import React, { useState } from 'react';
import styles from './userProfile.module.scss';
import { Hamburger } from "../../UI/Icon/icon.component.tsx";

interface UserProfileProps {
    name: string;
    circleColor: string; //  проп для задания цвета круга
}

const UserProfile: React.FC<UserProfileProps> = ({ name, circleColor }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    // Функция для переключения состояния выпадающего меню
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen);
    };

    // Функция для обработки выбора в меню
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        if (selectedOption === 'Profile') {
            console.log('Profile selected');

        } else if (selectedOption === 'Logout') {
            console.log('Logout selected');
        }
    };

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

            {isDropdownOpen && (
                <select className={styles.selectMenu} onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="Profile">Profile</option>
                    <option value="Logout">Logout</option>
                </select>
            )}
        </div>
    );
};

export {UserProfile};
