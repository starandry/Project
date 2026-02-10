import type { ChangeEvent, FormEvent } from 'react';

export type UseMasterAboutFormProps = {
    profileId: number;
    onSaved?: () => void;
};

export type UseMasterAboutFormReturn = {
    about: string;
    error: string | null;
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};
