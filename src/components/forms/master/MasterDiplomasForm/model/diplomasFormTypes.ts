export type DiplomasFormData = {
    certificateName: string;
    organization: string;
    year: string;
    month: string;
    image?: File | null;
};

export const initialDiplomasFormData: DiplomasFormData = {
    certificateName: '',
    organization: '',
    year: '',
    month: '',
    image: null,
};
