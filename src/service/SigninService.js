import axios from "axios";
import Constant from "../constants/Constant"
class SigninService {
    signin(id, pw) {
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
            console.log(res.data["data"]["jwt"]);
            window.localStorage.setItem("acc_tok", res.data["data"]["jwt"])
            window.location.replace("/");
        })
        .catch((res) => console.log(res.response["data"]["errors"]))

    }
}

export default new SigninService;