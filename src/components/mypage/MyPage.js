import Footer from "../base/Footer";
import styles from "./MyPage.module.css";
import axios from "axios";
import Constant from "../../constants/Constant";
import { useEffect, useState } from "react";
import Loading from "../base/Loading";
import { Link, useNavigate } from "react-router-dom";

const MyPage = ({onLogout}) => {
    const [info, setInfo] =  useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [infopage, setInfopage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [boards, setBoards] = useState({});
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        });
    };
    const deleteHandler = () => {
        if(window.confirm("정말로 삭제하시겠습니까?")){
            axios.delete(Constant.BASE_URL + "/member/profile/delete", {
                headers: {
                    'Authorization' : `Baerer ${window.localStorage.getItem("acc_tok")}`
                },
                params: {
                    email: info["email"],
                },
            }).then((res) => {
                alert("계정이 삭제되었습니다.");
                onLogout();
                navigate(`/`);
            }).catch((err) => console.log(err));
        }
    };

    const updateHandler = () => {
        const data = JSON.stringify({
                        email: info["email"],
                        nickname: info["nickname"],
                        sno: info["sno"],
                        birthDate: info["birthDate"]
                    }); 
        if(window.confirm("정말로 수정하시겠습니까?")){
            axios.patch(Constant.BASE_URL + "/member/profile/update", data, {
                headers: {
                    'Authorization': `Baerer ${window.localStorage.getItem("acc_tok")}`,
                    'Content-type' : 'application/json; charset=UTF-8'
                },
            }).then((res) => {
                alert("계정이 수정되었습니다.");
                navigate(`/mypage`);
            }).catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const mypageLoad = async () => {
            try{
                const info = await axios.get(Constant.BASE_URL + "/member/myinfo", {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem("acc_tok")}`,
                    },
                });
                if(info.status === 200) {
                    setInfo(info.data.data);
                    console.log(info);
                    setIsLoading(false);
                }
            }catch(err) {
                console.log("Mypage error: " + err);
            }
        };
        const myMeetingPostLoad = async () => {
            try{
                const info = await axios.get(Constant.BASE_URL + `/member/mypost/meeting?page=${currentPage}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem("acc_tok")}`,
                    },
                });
                if(info.status === 200) {
                    console.log(info.data);
                    setBoards(info.data.content)
                    setIsLoading(false);
                }
            }catch(err) {
                console.log("Mypage error: " + err);
            }
        }

        const myLearningPostLoad = async () => {
            try{
                const info = await axios.get(Constant.BASE_URL + `/member/mypost/learning?page=${currentPage}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem("acc_tok")}`,
                    },
                });
                if(info.status === 200) {
                    console.log(info.data);
                    setBoards(info.data.content)
                    setIsLoading(false);
                }
            }catch(err) {
                console.log("Mypage error: " + err);
            }
        }
        if(infopage == 0) mypageLoad();
        else if(infopage == 1) myMeetingPostLoad();
        else myLearningPostLoad();
    }, [infopage, currentPage])
    return isLoading ? <Loading />  : (
        <>
            <div className={styles.content_container}>
                { infopage >= 1 && <div className={styles.prev_page} onClick={() => {setInfopage(infopage - 1); setCurrentPage(0)}}>&lt;</div> }
                { infopage < 2 && <div className={styles.next_page} onClick={() => {setInfopage(infopage + 1); setCurrentPage(0)}}>&gt;</div> }
                {
                    infopage == 0 ? (
                        <>
                            <div style={{display:"flex", justifyContent:"center", marginBottom:"30px"}}>
                                <h2>마이페이지</h2>
                            </div>
                            <div className={styles.content}>
                                <span className={styles.content_title}>소속대학교: </span><span className={styles.content_info}>{info["universityName"]}</span>
                            </div>
                            <div className={styles.content}>
                                <span className={styles.content_title}>이메일: </span><span className={styles.content_info}>{info["email"]}</span>
                            </div>
                            <div className={styles.content}>
                                <span className={styles.content_title}>학번: </span><input className={styles.content_info} name="sno" value={info["sno"]} onChange={changeHandler} />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.content_title}>닉네임: </span><input className={styles.content_info} name="nickname" value={info["nickname"]} onChange={changeHandler} />
                            </div>
                            <div className={styles.content}>
                                <span className={styles.content_title}>생년월일: </span><input type="date" className={styles.content_info} name="birthDate" value={info["birthDate"]} onChange={changeHandler} />
                            </div>
                            <div className={styles.btn_container}>
                                <div className={`${styles.btn} ${styles.update_btn}`} onClick={updateHandler}>계정수정</div>
                                <div className={`${styles.btn} ${styles.delete_btn}`} onClick={deleteHandler}>계정삭제</div>
                            </div>
                        </>
                    ) : (
                        infopage == 1 ? (
                        <>
                            <div style={{display:"flex", justifyContent:"center", marginBottom:"30px"}}>
                                <h2>내가 쓴 Meeting post</h2>
                            </div>
                            <div>
                                <span className={`${styles.board_field} ${styles.board_id} ${styles.board_field_title}`}>번호</span>
                                <span className={`${styles.board_field} ${styles.board_title} ${styles.board_field_title}`}>제목</span>
                            </div>
                            {Object.keys(boards).map((key, idx) =>
                                <div>
                                    <span className={`${styles.board_field} ${styles.board_id}`}>{currentPage * 5 + idx + 1}</span>
                                    <span className={`${styles.board_field} ${styles.board_title}`}>
                                        <Link style={{textDecoration:'none'}} to={`/meeting/${boards[`${key}`]["id"]}`}>{boards[`${key}`]["title"]}</Link>
                                    </span>
                            </div>
                            )}
                             <div className={styles.page_box} style={{textAlign: "center"}}>
                                <span className={`${styles.page_btn}`} onClick={() => (currentPage > 0 ? setCurrentPage((currentPage) => currentPage - 1) : alert("첫 페이지입니다."))}>&lt;&lt;</span>
                                <span className={`${styles.page_btn}`} style={{cursor:"default"}}>{currentPage + 1}</span>
                                <span className={`${styles.page_btn}`} onClick={() => (Object.keys(boards).length == 5 ? setCurrentPage((currentPage) => currentPage + 1) : alert("마지막 페이지입니다."))}>&gt;&gt;</span>
                            </div>
                        </>
                        )
                        : (
                            <>
                                <div style={{display:"flex", justifyContent:"center", marginBottom:"30px"}}>
                                    <h2>내가 쓴 Learning post</h2>
                                </div>
                                <div>
                                    <span className={`${styles.board_field} ${styles.board_id} ${styles.board_field_title}`}>번호</span>
                                    <span className={`${styles.board_field} ${styles.board_title} ${styles.board_field_title}`}>제목</span>
                                </div>
                                {Object.keys(boards).map((key, idx) =>
                                    <div>
                                        <span className={`${styles.board_field} ${styles.board_id}`}>{currentPage * 5 + idx + 1}</span>
                                        <span className={`${styles.board_field} ${styles.board_title}`}>
                                            <Link style={{textDecoration:'none'}} to={`/learning/${boards[`${key}`]["id"]}`}>{boards[`${key}`]["title"]}</Link>
                                        </span>
                                </div>
                                )}
                                 <div className={styles.page_box} style={{textAlign: "center"}}>
                                    <span className={`${styles.page_btn}`} onClick={() => (currentPage > 0 ? setCurrentPage((currentPage) => currentPage - 1) : alert("첫 페이지입니다."))}>&lt;&lt;</span>
                                    <span className={`${styles.page_btn}`} style={{cursor:"default"}}>{currentPage + 1}</span>
                                    <span className={`${styles.page_btn}`} onClick={() => (Object.keys(boards).length == 5 ? setCurrentPage((currentPage) => currentPage + 1) : alert("마지막 페이지입니다."))}>&gt;&gt;</span>
                                </div>
                            </>
                            )
                    )
                }
                
            </div>
            <Footer />
        </>
    )
};

export default MyPage;