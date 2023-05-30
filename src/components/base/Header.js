import { Link } from "react-router-dom";
import styles from "./Header.module.css"
import Logo from "../../logo.png"
const Header = ({isLogin, onLogout}) => {
    return (
        <header className={styles.header}>
            <img src={Logo} width="100" />
            <div className={styles.header_btn}>
                {isLogin ?
                    <Link className={styles.upper_btn} to="/mypage">마이페이지</Link> :
                    <Link className={styles.upper_btn} to="/signin">로그인</Link>
                }
                {isLogin ? 
                    <a className={styles.bottom_btn} onClick={onLogout}>로그아웃</a> : 
                    <Link className={styles.bottom_btn} to="/signup">회원가입</Link>
                }
            </div>
            
        </header>

    );
};

export default Header;