export const getCookieValue = (name: string): string | null => {
    if (typeof document === 'undefined') {
        return null;
    }

    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const pair = cookies.find((cookie) => cookie.startsWith(`${name}=`));

    if (!pair) {
        return null;
    }

    const value = pair.slice(name.length + 1);
    return value ? decodeURIComponent(value) : null;
};
