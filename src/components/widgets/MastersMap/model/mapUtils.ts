export const getReviewsText = (count: number): string => {
    if (count === 1) return 'отзыв';
    if (count >= 2 && count <= 4) return 'отзыва';
    return 'отзывов';
};
