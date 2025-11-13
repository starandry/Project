import React from 'react';
import Check from '@/assets/icons/Check.svg?react';
import BadgeChip from '@/assets/icons/BadgeChip.svg?react';
import { SvgIcon, Button, MasterEducationForm } from '@/components';
import styles from './index.module.scss';
import { MasterEducationProps } from '../model/masterEducationTypes';

export const MasterEducation: React.FC<MasterEducationProps> = ({
    education,
    isEditing,
    onEdit,
    onChange,
    onAdd,
    onRemove,
    onSave,
    onCancel,
}) => {
    return (
        <div className={styles.educationCard}>
            <div className={styles.header}>
                <h2 className={styles.title}>Образование</h2>
                {!isEditing && (
                    <Button classNames={{ buttonClass: 'editButton' }} onClick={onEdit}>
                        <SvgIcon Icon={BadgeChip} />
                    </Button>
                )}
            </div>

            {isEditing ? (
                <MasterEducationForm
                    education={education}
                    onChange={onChange}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            ) : (
                <ul>
                    {education.map((item, index) => (
                        <li key={index} className={styles.educationItem}>
                            <SvgIcon Icon={Check} className="check" />
                            <p className={styles.educationText}>{item.title}</p>
                            <div className={styles.educationYearBlock}>
                                <span className={styles.label}>период обучения</span>
                                <p className={styles.wrappYearEducation}>
                                    <span className={styles.year}>{item.year}</span>
                                    <span className={styles.year}>{item.year}</span>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
