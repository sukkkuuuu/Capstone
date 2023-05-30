import { Link } from "react-router-dom";
import styles from "./Footer.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Constant from "../../constants/Constant";

const Footer = ({active}) => {
    const [myInfo,setMyInfo] = useState({
        auth: false,
        universityName: "",
        nickname: "",
        birthDate: "",
        sno: "",
        email: ""
      })
      useEffect(() => {
        if(window.localStorage.getItem("acc_token")){
          const token = window.localStorage.acc_token;
          axios.get(Constant.BASE_URL + "/member/myinfo", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        }
      })
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={ `${styles.container_content} ${active == "Home" && styles.active}` }>
                    <Link to="/">Home</Link>
                </div>
                <div className={ `${styles.container_content} ${active == "Signin" && styles.active}`}>
                    <Link to="/signin">Meeting</Link>
                </div>
                <div className={ `${styles.container_content} ${active == "Signup" && styles.active}`}>
                    <Link to="/signup">Learning</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;