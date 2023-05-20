import axios from "axios";
import Constant from "../constants/Constant"
class SigninService {
    signin(id, pw) {
        const data = JSON.stringify({
            "email": id,
            "password": pw
        });
        console.log(Constant.BASE_URL, data)
        axios.post(Constant.BASE_URL + "/member/signin", data, {
            headers: {
                'Content-type' : 'application/json; charset=UTF-8'
            }
        })
        .then((res) => res)
        .catch((res) => console.log(res.response.data["errors"]))

    }
}

export default new SigninService;