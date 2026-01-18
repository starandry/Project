import React from 'react';

export type InputProps = {
    type: string;
    name?: string;
    value?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
