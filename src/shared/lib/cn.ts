type Styles = Record<string, string>;

export const cn = (
    styles: Styles,
    ...classes: Array<keyof Styles | string | undefined | false | null>
): string => {
    return classes
        .filter((cls): cls is string | keyof Styles => Boolean(cls))
        .flatMap((cls) => {
            if (typeof cls === 'string') {
                return cls.split(' ').filter(Boolean);
            }
            return [cls];
        })
        .map((cls) => (typeof cls === 'string' && styles[cls]) || cls)
        .join(' ');
};
