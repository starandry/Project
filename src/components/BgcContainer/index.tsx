import styles from './bgc-container.module.scss';

const BgcContainer = ( { className = '', children } ) => {
    const computedClassName = styles[className] ? styles[className] : className;

    return <div className={computedClassName}>
        { children }
    </div>
}

export { BgcContainer };