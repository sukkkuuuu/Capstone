import { useNavigate, useParams } from "react-router-dom";
import Footer from "../base/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Constant from "../../constants/Constant";
import Loading from "../base/Loading";
import styles from "./Meeting.module.css";
import commentLogo from "../../comment.png";
import closeLogo from "../../close.png";

const MeetingDetail = ({isLogin}) => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [memberId, setMemberId] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const dateFomatting = (date) => {
        const [year, month, day] = date.slice(0, 10).split("-");
        const [hour, minute, sec] = date.slice(11, 19).split(":");
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    };
    const deleteHandler = () => {
        if(window.confirm("정말로 삭제하시겠습니까?")){
            axios.delete(Constant.BASE_URL + `/meeting/${post["id"]}`, {
                headers: {
                    'Authorization' : `Baerer ${window.localStorage.getItem("acc_tok")}`
                },

            }).then((res) => {
                alert("게시글이 삭제되었습니다.");
                navigate(`/meeting`);
            }).catch((err) => console.log(err));
        }
    };

    const openCommentModal = () => {
        commentListHandler();
        setShowCommentModal(true);
    }
    const closeCommentModal = () => {
        setShowCommentModal(false);
        setCommentInput('');
    }
    const commentListHandler = () => {
        const fetchComments = async () => {
            try{
                const response = await axios.get(Constant.BASE_URL + `/comment/${id}`);
                console.log(response.data.data);
                setComments(response.data.data);
            }catch(err){
                alert(err);
            }
        }
        fetchComments();
    }
    
    const commentCreateHandler = () => {
        const createComment = async () => {
            try{
                const data = JSON.stringify({
                    content: commentInput
                });
                const response = await axios.post(Constant.BASE_URL + `/comment/${id}`, data, {
                    headers: {
                        'Content-type' : 'application/json; charset=UTF-8',
                        Authorization : `Baerer ${window.localStorage.getItem("acc_tok")}`
                    }
                });
                commentListHandler();
                setCommentInput('');
            }catch(err){
                alert(err);
            }
        }
        createComment();
    }
    
    useEffect(() => {
        const fetchPost = async () => {
            try{
                const response = await axios.get(Constant.BASE_URL + `/meeting/${id}`);
                setPost(response.data.data.data);
            }catch(err) {
                navigate("/meeting");
            }
        };
        const fetchUser = async () => {
            try{
                const response = await axios.get(Constant.BASE_URL + `/member/`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem("acc_tok")}`,
                    }
                });
                setMemberId(response.data)
            }catch(err) {
                alert(err);
            }
        };
        fetchPost();
        if (isLogin) fetchUser();
    }, [id]);
    return !post ? <Loading /> : (
        <>
            <div className={styles.board_container}>
                <h2 style={{textAlign:"center"}}>{post["writer"]["nickname"]}님의 게시글</h2>
                <div class={styles.board_detail_date}>{dateFomatting(post["createdDate"])}</div>
                <h3>제목</h3>
                <div class={`${styles.board_detail_field} ${styles.board_detail_title}`}>{post["title"]}</div>
                <h3>소개</h3>
                <div class={`${styles.board_detail_field} ${styles.board_detail_intro}`}>{post["intro"]}</div>
                <h3>인원</h3>
                <div style={{fontSize: "20px", fontWeight: "600"}}>{post["count"]}</div>
                { (isLogin && memberId == post["writer"]["id"]) && 
                    <div className={styles.btn} onClick={deleteHandler}>게시글 삭제</div>
                }
                <h3>위치</h3>
                <div>kakao map... {post["writer"]["university"]["name"]}</div>
                <div className={styles.comment_box}>
                    <img src={commentLogo} style={{opacity:"0.7", cursor:"pointer"}} width="25px" onClick={openCommentModal}/>
                    <span className={styles.comment_font}>댓글</span>
                </div>
            </div>
            {showCommentModal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <img src={closeLogo} className={styles.modal_close_btn} title="닫기" onClick={closeCommentModal} />
                        <h2>댓글 {`(${comments.length})`}</h2>
                            {comments && Object.keys(comments).map((key) => 
                                <div className={styles.comment_container}>
                                    <div style={{display:"flex", justifyContent:"space-between"}}>
                                        <span className={styles.comment_nickname}>{comments[`${key}`]["member"]["nickname"]}</span>
                                        <span className={styles.comment_date}>{dateFomatting(comments[`${key}`]["createdDate"])}</span>
                                    </div>
                                    <span className={styles.comment_content}>{comments[`${key}`]["content"]}</span>
                                </div>
                            )}
                        {
                            isLogin && (
                                <div style={{display:"flex", flexDirection:"column", paddingTop:"10px"}}>
                                    <input
                                        style={{height: "25px", fontSize:"17px", fontWeight:"600"}}
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)}
                                        placeholder="댓글 내용을 입력하세요..."
                                        />
                                    <div 
                                        className={styles.btn} 
                                        style={{textAlign:"center", marginTop:"14px"}}
                                        onClick={commentCreateHandler}
                                    >제출</div>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            )}
            <Footer active="Meeting" />
        </>

        
    );
}

export default MeetingDetail;