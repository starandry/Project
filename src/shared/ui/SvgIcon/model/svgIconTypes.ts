import React from 'react';

export type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

export type SvgIconProps = {
    Icon: SvgComponent;
    className?: string;
};
