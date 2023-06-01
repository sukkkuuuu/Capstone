import { useEffect, useState } from "react";
import Footer from "../base/Footer";
import styles from "./Meeting.module.css";
import axios from "axios";
import Constant from "../../constants/Constant";
import { useNavigate } from "react-router-dom";

const MeetingForm = () => {
    const [input, setInput] = useState({
        title: "",
        intro: "",
        count: 2
    });
    const navigate = useNavigate();
    const inputHandler = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
    }
    const createHandler = () => {
        const data = JSON.stringify(input);
        axios.post(Constant.BASE_URL + "/meeting/create", data, {
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
                Authorization : `Baerer ${window.localStorage.getItem("acc_tok")}`
            }
        }).then((res) => {
            alert("글작성 완료되었습니다.");
            navigate("/meeting");
        }).catch((err) => alert(err));
    }

    useEffect(() => {
        if(input["count"] < 1) setInput({...input, count: 1});
        if(input["count"] > 10) setInput({...input, count: 10});
    }, [input]);
    return (
        <>
            <div className={styles.board_container}>
                <h2 style={{textAlign:"center"}}>게시글 작성</h2>
                <form>
                    <h3>제목</h3>
                    <input name="title" value={input["title"]} onChange={inputHandler} />
                    <h3>소개</h3>
                    <textarea name="intro" value={input["intro"]} onChange={inputHandler}></textarea>
                    <h3>인원</h3>
                    <input type="number" name="count" value={input["count"]} onChange={inputHandler} />
                    <input className={styles.btn} type="submit" value="작성" onClick={(e) => {
                        e.preventDefault();
                        createHandler();
                    }} />
                </form>
            </div>
            <Footer active="Meeting" />    
        </>
    );
};

export default MeetingForm;