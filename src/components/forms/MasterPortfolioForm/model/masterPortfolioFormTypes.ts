export type PortfolioFormData = {
    title: string;
    description: string;
    image: File | null;
};

export const initialPortfolioFormData: PortfolioFormData = {
    title: '',
    description: '',
    image: null,
};
