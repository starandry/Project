import styles from './footer.module.scss'

const Footer = ( { children }) => {
    return  <div className={styles.footer}>
        { children }
    </div>
}

export { Footer };