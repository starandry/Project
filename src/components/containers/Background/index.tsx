import styles from './background.module.scss';

const Background = ({ path, desc = '', className = '' }) => {
    const computedClassName = styles[className] ? styles[className] : className;

    return <img src={path} alt={desc} className={computedClassName} />;
};

export { Background };
