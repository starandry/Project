import React from 'react';
import BadgeChip from '@/assets/icons/BadgeChip.svg?react';
import Check from '@/assets/icons/Check.svg?react';
import { SvgIcon, Button, MasterExperienceForm } from '@/components';
import styles from './index.module.scss';
import { MasterExperienceProps } from '../model/masterExperienceTypes';

export const MasterExperience: React.FC<MasterExperienceProps> = ({
    experience,
    isEditing,
    onEdit,
    onChange,
    onAdd,
    onRemove,
    onSave,
    onCancel,
}) => {
    return (
        <div className={styles.experienceCard}>
            <div className={styles.header}>
                <h2 className={styles.title}>Опыт</h2>
                {!isEditing && (
                    <Button onClick={onEdit} classNames={{ buttonClass: 'editButton' }}>
                        <SvgIcon Icon={BadgeChip} />
                    </Button>
                )}
            </div>

            {isEditing ? (
                <MasterExperienceForm
                    experience={experience}
                    onChange={onChange}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            ) : (
                <ul>
                    {experience.map((item, index) => (
                        <li key={index} className={styles.experienceItem}>
                            <SvgIcon Icon={Check} className="check" />
                            <p className={styles.text}>{item.title}</p>
                            <div className={styles.experienceYearBlock}>
                                <span className={styles.label}>период работы</span>
                                <p className={styles.years}>
                                    <span className={styles.year}>{item.yearStart}</span>
                                    <span className={styles.year}>{item.yearEnd}</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
