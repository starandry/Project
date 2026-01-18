import { useEffect, useState } from 'react';

export const useScrollButton = (threshold: number = 50, offset: number = 10) => {
    const [visible, setVisible] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > threshold;
            const atBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;

            setVisible(scrolled);
            setIsAtBottom(atBottom);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold, offset]);

    const scrollTo = () => {
        if (isAtBottom) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    return { visible, isAtBottom, scrollTo };
};
