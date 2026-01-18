export type LocalLinkClassNames = {
    linkClass?: string;
};

export type LocalLinkProps = {
    to: string;
    children: React.ReactNode;
    classNames?: LocalLinkClassNames;
};
