import styles from './sectionTitle.module.scss';

type SectionTitleProps = {
    text: string;
    className?: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ text, className }) => {

    return (
        <h1 className={`${className || ''} ${styles.title}`}>{text}</h1>
    );
};

export { SectionTitle };
