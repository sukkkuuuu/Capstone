import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css"
import Logo from "../../logo.png"
import { useEffect, useState } from "react";
const Header = ({isLogin, onLogout}) => {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    return (
        <header className={styles.header}>
            <div className={styles.search_box}>
                <form>
                    <input className={styles.search_input} type="search" placeholder="검색할 유저를 입력하세요." value={nickname} onChange={(e) => {
                        setNickname(e.target.value)}
                    } />
                    <input className={styles.search_btn} type="submit" value="검색" onClick={(e) => {
                        e.preventDefault();
                        navigate(`/profile/${nickname}`);
                        setNickname('');
                    }} />
                </form>
            </div>
            <img src={Logo} width="100" />
            <div className={styles.header_btn}>
                {isLogin ?
                    <Link className={styles.upper_btn} to="/mypage">마이페이지</Link> :
                    <Link className={styles.upper_btn} to="/signin">로그인</Link>
                }
                {isLogin ? 
                    <a className={styles.bottom_btn} onClick={onLogout} href="">로그아웃</a> : 
                    <Link className={styles.bottom_btn} to="/signup">회원가입</Link>
                }
            </div>
            
        </header>

    );
};

export default Header;