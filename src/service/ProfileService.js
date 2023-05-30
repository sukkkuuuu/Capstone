import axios from "axios";
import Constant from "../constants/Constant";

class ProfileService {
    mypage() {
        let info = null;
        axios.get(Constant.BASE_URL + "/member/myinfo", {
            headers: {
                Authorization : `Baerer ${window.localStorage.getItem('acc_tok')}`,
                "Content-type" : 'application/json; charset=UTF-8'
            },
        }).then((res) => info = res.data.data)
        .catch((err) => console.log(err));
        return info;
    }
}

export default new ProfileService;