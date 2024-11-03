import styles from './wrapper.module.scss';

const Wrapper = ({ className = '', children }) => {
    const computedClassName = styles[className] ? styles[className] : className;

    return  <div className={computedClassName}>
                {children}
            </div>;
};

export { Wrapper };
