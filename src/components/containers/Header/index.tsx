import styles from './header.module.scss'

const Header = ( { children }) => {
    return  <div className={styles.header}>
                { children }
            </div>
}

export { Header };