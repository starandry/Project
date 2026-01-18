export type ExternalLinkClassNames = {
    linkClass?: string;
};

export type ExternalLinkProps = {
    href: string;
    children: React.ReactNode;
    classNames?: ExternalLinkClassNames;
    target?: '_blank' | '_self';
    rel?: string;
};
