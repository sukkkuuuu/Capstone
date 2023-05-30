import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../home/Home";
import SigninForm from "../signin/SigninForm";
import SignupForm from "../signup/SignupForm";
import MyPage from "../mypage/MyPage";

const Router = ({isLogin, onLogout}) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />)
            <Route path="/signin" element={ isLogin ? <Home /> : <SigninForm /> } />
            <Route path="/signup" element={ isLogin ? <Home /> : <SignupForm /> } />
            <Route path="/mypage" element={ isLogin ? <MyPage onLogout={onLogout} /> : <Home /> } />
        </Routes>
    )
}

export default Router;