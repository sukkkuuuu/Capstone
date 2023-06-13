import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../base/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Constant from "../../constants/Constant";
import Loading from "../base/Loading";
import styles from "./Learning.module.css";
import commentLogo from "../../comment.png";
import closeLogo from "../../close.png";

const API_KEY = "ae71f810872db5e99e115e9e6fee3156";
const { kakao } = window;

const LearningDetail = ({ isLogin }) => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [memberId, setMemberId] = useState(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const dateFomatting = (date) => {
        const [year, month, day] = date.slice(0, 10).split("-");
        const [hour, minute, sec] = date.slice(11, 19).split(":");
        return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
    };
    const deleteHandler = () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            axios
                .delete(Constant.BASE_URL + `/learning/${post["id"]}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem(
                            "acc_tok"
                        )}`,
                    },
                })
                .then((res) => {
                    alert("게시글이 삭제되었습니다.");
                    navigate(`/learning`);
                })
                .catch((err) => console.log(err));
        }
    };

    const deleteCommentHandler = (id) => {
        if (window.confirm("댓글 삭제합니다.")) {
            axios
                .delete(Constant.BASE_URL + `/comment/${id}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem(
                            "acc_tok"
                        )}`,
                    },
                })
                .then((res) => {
                    commentListHandler();
                })
                .catch((err) => console.log(err));
        }
    };

    const openCommentModal = () => {
        commentListHandler();
        setShowCommentModal(true);
    };
    const closeCommentModal = () => {
        setShowCommentModal(false);
        setCommentInput("");
    };
    const commentListHandler = () => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    Constant.BASE_URL + `/comment/${id}`
                );
                setComments(response.data.data);
            } catch (err) {
                alert(err);
            }
        };
        fetchComments();
    };
    const commentCreateHandler = () => {
        const createComment = async () => {
            try {
                const data = JSON.stringify({
                    content: commentInput,
                });
                const response = await axios.post(
                    Constant.BASE_URL + `/comment/${id}`,
                    data,
                    {
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            Authorization: `Baerer ${window.localStorage.getItem(
                                "acc_tok"
                            )}`,
                        },
                    }
                );
                commentListHandler();
                setCommentInput("");
            } catch (err) {
                alert(err);
            }
        };
        createComment();
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(
                    Constant.BASE_URL + `/learning/${id}`
                );
                setPost(response.data.data.data);
            } catch (err) {
                navigate("/learning");
            }
        };

        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    Constant.BASE_URL + `/member/`,
                    {
                        headers: {
                            Authorization: `Baerer ${window.localStorage.getItem(
                                "acc_tok"
                            )}`,
                        },
                    }
                );
                setMemberId(response.data);
            } catch (err) {
                alert(err);
            }
        };
        fetchPost();
        if (isLogin) fetchUser();
    }, [id]);

    useEffect(() => {
        const fetchLagLnt = async () => {
            if (post === undefined) return;
            console.log("post", post.address);
            try {
                const response = await axios
                    .get(
                        `https://dapi.kakao.com/v2/local/search/address.json`,
                        {
                            headers: {
                                Authorization: `KakaoAK ${API_KEY}`,
                            },
                            params: {
                                query: `${post.address}`,
                            },
                        }
                    )
                    .then((res) => {
                        setLongitude(res.data.documents[0].x);
                        setLatitude(res.data.documents[0].y);
                    });
            } catch (err) {
                alert(err);
            }
        };
        fetchLagLnt();
    }, [post]);

    useEffect(() => {
        const fetchMap = async () => {
            if (!latitude || !longitude) return;
            try {
                const container = document.getElementById("map");
                const options = {
                    center: new kakao.maps.LatLng(latitude, longitude),
                    level: 3,
                };
                const marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(latitude, longitude),
                });
                const map = new kakao.maps.Map(container, options);
                marker.setMap(map);
            } catch (err) {
                alert(err);
            }
        };
        fetchMap();
    }, [latitude, longitude]);

    return !post ? (
        <Loading />
    ) : (
        <>
            <div className={styles.board_container}>
                <h2 style={{ textAlign: "center" }}>
                    <Link
                        style={{ textDecoration: "none" }}
                        to={`/profile/${post["writer"]["nickname"]}`}
                    >
                        {post["writer"]["nickname"]}
                    </Link>
                    님의 게시글
                </h2>
                <div class={styles.board_detail_date}>
                    {dateFomatting(post["createdDate"])}
                </div>
                <h3>제목</h3>
                <div
                    class={`${styles.board_detail_field} ${styles.board_detail_title}`}
                >
                    {post["title"]}
                </div>
                <h3>소개</h3>
                <div
                    class={`${styles.board_detail_field} ${styles.board_detail_intro}`}
                >
                    {post["intro"]}
                </div>
                <h3>위치</h3>
                <div id="map" className={styles.kakao_map_size}>
                    {latitude} {longitude}
                </div>
                <div className={styles.comment_font}>
                    {" "}
                    상세주소 : {post.address}{" "}
                </div>

                {isLogin && memberId == post["writer"]["id"] && (
                    <div className={styles.btn} onClick={deleteHandler}>
                        게시글 삭제
                    </div>
                )}
                <div className={styles.comment_box}>
                    <img
                        src={commentLogo}
                        style={{ opacity: "0.7", cursor: "pointer" }}
                        width="25px"
                        onClick={openCommentModal}
                    />
                    <span className={styles.comment_font}>댓글</span>
                </div>
            </div>
            {showCommentModal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <img
                            src={closeLogo}
                            className={styles.modal_close_btn}
                            title="닫기"
                            onClick={closeCommentModal}
                        />
                        {/* 여기에 댓글 리스트들이 생성됨 */}
                        <h2>댓글 {`(${comments.length})`}</h2>
                        {comments &&
                            Object.keys(comments).map((key) => (
                                <div className={styles.comment_container}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/profile/${
                                                comments[`${key}`]["member"][
                                                    "nickname"
                                                ]
                                            }`}
                                        >
                                            <span
                                                className={
                                                    styles.comment_nickname
                                                }
                                            >
                                                {
                                                    comments[`${key}`][
                                                        "member"
                                                    ]["nickname"]
                                                }
                                            </span>
                                        </Link>
                                        <span className={styles.comment_date}>
                                            {dateFomatting(
                                                comments[`${key}`][
                                                    "createdDate"
                                                ]
                                            )}
                                        </span>
                                        {isLogin &&
                                            memberId ==
                                                comments[`${key}`]["member"][
                                                    "id"
                                                ] && (
                                                <input
                                                    // className={
                                                    //     styles.comment_delete_btn
                                                    // }
                                                    type="submit"
                                                    value="댓글삭제"
                                                    onClick={() =>
                                                        deleteCommentHandler(
                                                            comments[`${key}`][
                                                                "id"
                                                            ]
                                                        )
                                                    }
                                                />
                                            )}
                                    </div>
                                    <span className={styles.comment_content}>
                                        {comments[`${key}`]["content"]}
                                    </span>
                                </div>
                                // 여기까지가 댓글 생성 되는 부분임
                            ))}
                        {isLogin && (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingTop: "10px",
                                }}
                            >
                                <input
                                    style={{
                                        height: "25px",
                                        fontSize: "17px",
                                        fontWeight: "600",
                                    }}
                                    value={commentInput}
                                    onChange={(e) =>
                                        setCommentInput(e.target.value)
                                    }
                                    placeholder="댓글 내용을 입력하세요..."
                                />
                                <div
                                    className={styles.btn}
                                    style={{
                                        textAlign: "center",
                                        marginTop: "14px",
                                    }}
                                    onClick={commentCreateHandler}
                                >
                                    제출
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <Footer active="Learning" />
        </>
    );
};

export default LearningDetail;
