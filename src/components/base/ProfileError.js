import Footer from "./Footer";

const ProfileError = ({ nickname }) => {
    return (
        <>
            <span> <b>{nickname}</b>는 존재하지 않는 닉네임입니다.</span>
            <Footer />
        </>
    )
};

export default ProfileError;