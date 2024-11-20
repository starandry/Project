import styles from './subTitle.module.scss';

type SubTitle = {
    text: string;
    className?: string;
};

const SubTitle: React.FC<SubTitle> = ({ text, className }) => {

    return (
        <h2 className={`${className || ''} ${styles.title}`}>{text}</h2>
    );
};

export { SubTitle };