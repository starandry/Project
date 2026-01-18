import React from 'react';
import { Link } from 'react-router-dom';
import { SvgIcon } from '@/shared/ui';
import type { MasterSidebarProps } from '../model/masterSidebarTypes';
import styles from './index.module.scss';

// SVG-иконки
import UserIcon from '@/shared/assets/icons/User.svg?react';
import ChatIcon from '@/shared/assets/icons/Chat.svg?react';
import OrdersIcon from '@/shared/assets/icons/Orders.svg?react';
import NotificationIcon from '@/shared/assets/icons/Notification.svg?react';
import SettingsIcon from '@/shared/assets/icons/Settings.svg?react';

const MasterSidebar: React.FC<MasterSidebarProps> = ({ avatarUrl }) => {
    return (
        <aside className={styles.masterSidebar}>
            <div className={`flex-between ${styles.masterInfoBox}`}>
                {avatarUrl ? (
                    <img src={avatarUrl} alt={'test avatar'} />
                ) : (
                    <div className={styles.wrapperImg} />
                )}
                <p className={styles.userName}>Маргарита Чернышова</p>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link className={styles.item} to="/profile">
                            <span>Мой профиль</span>
                            <SvgIcon Icon={UserIcon} className="icon" />
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.item} to="/messages">
                            <span>Сообщения</span>
                            <SvgIcon Icon={ChatIcon} className="icon" />
                        </Link>
                    </li>
                    <li>
                        <Link className={`${styles.item} ${styles.itemOrder}`} to="/orders">
                            <span>Заказы</span>
                            <SvgIcon Icon={OrdersIcon} className="icon" />
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.item} to="/notifications">
                            <span>Уведомления</span>
                            <SvgIcon Icon={NotificationIcon} className="icon" />
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.item} to="/settings">
                            <span>Настройки</span>
                            <SvgIcon Icon={SettingsIcon} className="icon" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export { MasterSidebar };
