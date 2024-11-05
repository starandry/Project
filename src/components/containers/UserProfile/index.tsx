import React, { useState } from 'react';
import styles from './userProfile.module.scss'; // Импорт стилей

interface UserProfileProps {
    name: string;
    circleColor: string; // Добавил проп для задания цвета круга
}

const UserProfile: React.FC<UserProfileProps> = ({ name, circleColor }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Функция для переключения состояния выпадающего меню
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                    style={{ backgroundColor: circleColor }} // Устанавливаем цвет круга
                ></div>
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
