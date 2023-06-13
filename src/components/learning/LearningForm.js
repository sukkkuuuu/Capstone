import { useEffect, useState } from "react";
import Footer from "../base/Footer";
import styles from "./Learning.module.css";
import axios from "axios";
import Constant from "../../constants/Constant";
import { useNavigate } from "react-router-dom";

const API_KEY = "ae71f810872db5e99e115e9e6fee3156";
const { kakao } = window;
const LearningForm = () => {
    const [input, setInput] = useState({
        title: "",
        intro: "",
        address: "",
    });
    const navigate = useNavigate();
    const inputHandler = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value,
        });
    };
    const createHandler = () => {
        const data = JSON.stringify(input);
        axios
            .post(Constant.BASE_URL + "/learning/create", data, {
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: `Baerer ${window.localStorage.getItem(
                        "acc_tok"
                    )}`,
                },
            })
            .then((res) => {
                alert("글작성 완료되었습니다.");
                navigate("/learning");
            })
            .catch((err) => alert(err));
    };
    const findAddress = () => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get(
                    `https://dapi.kakao.com/v2/local/search/keyword.json`,
                    {
                        headers: {
                            Authorization: `KakaoAK ${API_KEY}`,
                        },
                        params: {
                            query: ``,
                        },
                    }
                );
            } catch (err) {
                alert(err);
            }
        };
    };

    return (
        <>
            <div className={styles.board_container}>
                <h2 style={{ textAlign: "center" }}>게시글 작성</h2>
                <form>
                    <h3>제목</h3>
                    <input
                        name="title"
                        value={input["title"]}
                        onChange={inputHandler}
                    />
                    <h3>소개</h3>
                    <textarea
                        name="intro"
                        value={input["intro"]}
                        onChange={inputHandler}
                    ></textarea>
                    <h3>도로명 주소</h3>
                    <input
                        type="text"
                        name="address"
                        value={input["address"]}
                        onChange={inputHandler}
                    />
                    {/* <input type="submit" value="주소 찾기" /> */}
                    <input
                        className={styles.btn}
                        type="submit"
                        value="작성"
                        onClick={(e) => {
                            e.preventDefault();
                            createHandler();
                        }}
                    />
                </form>
            </div>
            <Footer active="Learning" />
        </>
    );
};

export default LearningForm;
