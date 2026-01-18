export type ButtonClassNames = {
    buttonClass?: string;
};

export type ButtonProps = {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    classNames?: ButtonClassNames;
};
