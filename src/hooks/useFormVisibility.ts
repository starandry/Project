import { useState } from 'react';

export const useFormVisibility = (initial = false) => {
    const [isShown, setIsShown] = useState(initial);

    const show = () => setIsShown(true);
    const hide = () => setIsShown(false);
    const toggle = () => setIsShown((prev) => !prev);

    return {
        isShown,
        show,
        hide,
        toggle,
    };
};
