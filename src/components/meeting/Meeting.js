import { useEffect, useState } from "react";
import Footer from "../base/Footer";
import axios from "axios";
import Constant from "../../constants/Constant";
import Loading from "../base/Loading";
import styles from "./Meeting.module.css";
import { Link, useNavigate } from "react-router-dom";

const Meeting = ({ isLogin }) => {
  const [boards, setBoards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const dateFomatting = (date) => {
    const [year, month, day] = date.slice(0, 10).split("-");
    const [hour, minute, _] = date.slice(11, 19).split(":");
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  };
  useEffect(() => {
    setIsLoading(true);
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          Constant.BASE_URL + `/meeting/boards?page=${currentPage}`
        );
        setBoards(response.data.content);
        setIsLoading(false);
      } catch (err) {
        alert(err);
      }
    };
    fetchBoards();
  }, [currentPage]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.board_container}>
          <div>
            <span
              className={`${styles.board_field} ${styles.board_id} ${styles.board_field_title}`}
            >
              번호
            </span>
            <span
              className={`${styles.board_field} ${styles.board_title} ${styles.board_field_title}`}
            >
              제목
            </span>
            <span
              className={`${styles.board_field} ${styles.board_writer} ${styles.board_field_title}`}
            >
              작성자
            </span>
            <span
              className={`${styles.board_field} ${styles.board_date} ${styles.board_field_title}`}
            >
              게시 날짜
            </span>
          </div>
          {Object.keys(boards).map((key, idx) => (
            <div>
              <span className={`${styles.board_field} ${styles.board_id}`}>
                {currentPage * 5 + idx + 1}
              </span>
              <span className={`${styles.board_field} ${styles.board_title}`}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/meeting/${boards[`${key}`]["id"]}`}
                >
                  {boards[`${key}`]["title"]}
                </Link>
              </span>
              <span className={`${styles.board_field} ${styles.board_writer}`}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/profile/${boards[`${key}`]["writer"]["nickname"]}`}
                >
                  {boards[`${key}`]["writer"]["nickname"]}
                </Link>
              </span>
              <span className={`${styles.board_field} ${styles.board_date}`}>
                {dateFomatting(boards[`${key}`]["createdDate"])}
              </span>
            </div>
          ))}
          <div className={styles.page_box}>
            <span
              className={`${styles.page_btn}`}
              onClick={() =>
                currentPage > 0
                  ? setCurrentPage((currentPage) => currentPage - 1)
                  : alert("첫 페이지입니다.")
              }
            >
              &lt;&lt;
            </span>
            <span
              className={`${styles.page_btn}`}
              style={{ cursor: "default" }}
            >
              {currentPage + 1}
            </span>
            <span
              className={`${styles.page_btn}`}
              onClick={() =>
                Object.keys(boards).length == 5
                  ? setCurrentPage((currentPage) => currentPage + 1)
                  : alert("마지막 페이지입니다.")
              }
            >
              &gt;&gt;
            </span>
          </div>
          {isLogin && (
            <div className={styles.btn} onClick={() => navigate("create")}>
              게시글 작성
            </div>
          )}
        </div>
      )}
      <Footer active="Meeting" />
    </>
  );
};

export default Meeting;
