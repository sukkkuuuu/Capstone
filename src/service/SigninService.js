import axios from "axios";
import { createRoot } from 'react-dom/client'
import Constant from "../constants/Constant"
import styles from "../components/signin/Signin.module.css"
class SigninService {
    signin(id, pw, setErrors) {
        const data = JSON.stringify({
            "email": id,
            "password": pw
        });
        axios.post(Constant.BASE_URL + "/member/signin", data, {
            headers: {
                'Content-type' : 'application/json; charset=UTF-8'
            }
        })
        .then((res) => {
            alert("환영합니다.");
            window.localStorage.setItem("acc_tok", res.data["data"]["jwt"])
            window.location.replace("/");
        })
        .catch((res) => {
            setErrors(res.response["data"]["errors"]);
        })

    }
}

export default new SigninService;