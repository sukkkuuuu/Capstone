import axios from "axios";
import Constant from "../constants/Constant"
class SignupService {
    signup(form) {
        const data = JSON.stringify({
            email: form.email,
            universityName: form.univName,
            sno: form.sno,
            password1: form.password1,
            password2: form.password2,
            nickname: form.nickname,
            birthDate: form.birthDate
        });
        console.log(Constant.BASE_URL, data)
        axios.post(Constant.BASE_URL + "/member/signup", data, {
            headers: {
                'Content-type' : 'application/json; charset=UTF-8'
            }
        })
        .then((res) => {
            alert("회원가입에 성공하셨습니다.");
            window.location.replace("/");
        })
        .catch((res) => console.log(res.response["data"]["errors"]))
    }

    univList(setUnivList) {
        return axios.get(Constant.BASE_URL + "/univ/list")
        .then(res => setUnivList(res.data["data"]))
    }
}

export default new SignupService;