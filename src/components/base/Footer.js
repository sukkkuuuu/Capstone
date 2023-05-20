import { Link } from "react-router-dom";
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.container_content}>
                    <Link to="/">Path</Link>
                </div>
                <div className={styles.container_content}>
                    <Link to="/signin">Signin</Link>
                </div>
                <div className={styles.container_content}>
                    3
                </div>
                <div className={styles.container_content}>
                    4
                </div>
            </div>
        </footer>
    );
};

export default Footer;