import { useEffect, useState } from "react";
import Footer from "./Footer";
import Constant from "../../constants/Constant";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import styles from "./Profile.module.css";
import ProfileError from "./ProfileError";

const Profile = () => {
    const { nickname } = useParams();
    const [member, setMember] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchMember = async () => {
            try{
                const response = await axios.get(Constant.BASE_URL + `/member/profile/${nickname}`);
                setMember(response.data.data);
                setIsLoading(false);
            }catch(err){
                setMember();
                setIsLoading(false);
            }
        }
        fetchMember();
    }, [nickname]);
    return isLoading ? <Loading /> : 
        member ?
        <>
            <div className={styles.content_container}>
                <div style={{display:"flex", justifyContent:"center", marginBottom:"30px"}}>
                    <h2>{member["nickname"]}님의 프로필</h2>
                </div>
                <div className={styles.content}>
                    <span className={styles.content_title}>소속대학교: </span><span className={styles.content_info}>{member["universityName"]}</span>
                </div>
                <div className={styles.content}>
                    <span className={styles.content_title}>이메일: </span><span className={styles.content_info}>{member["email"]}</span>
                </div>
                <div className={styles.content}>
                    <span className={styles.content_title}>학번: </span><span className={styles.content_info}>{member["sno"]}</span>
                </div>
                <div className={styles.content}>
                    <span className={styles.content_title}>생년월일: </span><span className={styles.content_info}>{member["birthDate"]}</span>
                </div>
            </div>
            <Footer />  
        </>
        : <ProfileError />    
};

export default Profile;