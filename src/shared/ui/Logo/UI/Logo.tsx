import React from 'react';
import { SvgIcon } from '@/shared/ui';
import type { LogoProps } from '@/shared/ui/Logo/index.model.ts';

export const Logo: React.FC<LogoProps> = ({ icon }) => {
    return <SvgIcon Icon={icon} />;
};
