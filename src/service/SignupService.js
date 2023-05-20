import axios from "axios";
import Constant from "../constants/Constant"
class SignupService {
    signup(form) {
        const data = JSON.stringify({
            email: form.email,
            password1: form.pw1,
            password2: form.pw2,
            nickname: form.nickname
        });
        console.log(Constant.BASE_URL, data)
        axios.post(Constant.BASE_URL + "/member/signup", data, {
            headers: {
                'Content-type' : 'application/json; charset=UTF-8'
            }
        })
        .then((res) => res)
        .catch((res) => console.log(res.response.data["errors"]))

    }
}

export default new SignupService;