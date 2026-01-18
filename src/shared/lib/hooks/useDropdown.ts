import { useState, useRef, useEffect } from 'react';

export const useDropdown = <T extends HTMLElement = HTMLDivElement>() => {
    const [open, setOpen] = useState(false);
    const ref = useRef<T>(null);

    const toggle = () => setOpen((prev) => !prev);
    const close = () => setOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                close();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return { open, toggle, close, ref };
};
