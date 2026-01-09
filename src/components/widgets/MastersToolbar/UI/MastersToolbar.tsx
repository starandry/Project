import React from 'react';
import { Button, Dropdown, SvgIcon } from '@/components';
import type { MastersToolbarProps } from '@/components';
import PlusIcon from '@/assets/icons/PlusIcon.svg?react';
import styles from './index.module.scss';

const MastersToolbar: React.FC<MastersToolbarProps> = ({
    onSortSelect,
    viewMode = 'list',
    onViewModeChange,
}) => {
    const handleSelect = (label: string) => {
        if (onSortSelect) {
            onSortSelect(label);
        } else {
            alert(`Вы выбрали: ${label}`);
        }
    };

    const handleViewModeChange = (mode: 'list' | 'map') => {
        if (onViewModeChange) {
            onViewModeChange(mode);
        }
    };

    return (
        <div className={`flex-between ${styles.wrapToolbar}`}>
            <div className={`flex ${styles.wrapBtnsToolbar}`}>
                <Button
                    classNames={{ buttonClass: viewMode === 'list' ? 'listBtn' : 'mapBtn' }}
                    onClick={() => handleViewModeChange('list')}
                >
                    <span>списком</span>
                </Button>
                <Button
                    classNames={{ buttonClass: viewMode === 'map' ? 'listBtn' : 'mapBtn' }}
                    onClick={() => handleViewModeChange('map')}
                >
                    <span>на карте</span>
                </Button>
            </div>

            <Dropdown
                buttonLabel="Сортировать по"
                items={['По рейтингу', 'По отзывам', 'По новизне']}
                icon={<SvgIcon Icon={PlusIcon} className="toolbarIcon" />}
                classNames={{
                    button: 'sortBtn',
                    wrapper: 'toolbarWrapper',
                }}
                onItemClick={handleSelect}
            />
        </div>
    );
};

export { MastersToolbar };
