import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../home/Home";
import SigninForm from "../signin/SigninForm";
import SignupForm from "../signup/SignupForm";
import MyPage from "../mypage/MyPage";
import Meeting from "../meeting/Meeting";
import MeetingForm from "../meeting/MeetingForm";
import MeetingDetail from "../meeting/MeetingDetail";
import Learning from "../learning/Learning";
import LearningForm from "../learning/LearningForm";
import LearningDetail from "../learning/LearningDetail";
import Profile from "./Profile";

const Router = ({ isLogin, onLogout }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/signin"
                element={isLogin ? <Home /> : <SigninForm />}
            />
            <Route
                path="/signup"
                element={isLogin ? <Home /> : <SignupForm />}
            />
            <Route
                path="/mypage"
                element={isLogin ? <MyPage onLogout={onLogout} /> : <Home />}
            />
            <Route path="/profile/:nickname" element={<Profile />} />
            <Route path="/meeting" element={<Meeting isLogin={isLogin} />} />
            <Route
                path="/meeting/create"
                element={isLogin ? <MeetingForm /> : <Meeting />}
            />
            <Route
                path="/meeting/:id"
                element={<MeetingDetail isLogin={isLogin} />}
            />
            <Route path="/learning" element={<Learning isLogin={isLogin} />} />
            <Route
                path="/learning/create"
                element={isLogin ? <LearningForm /> : <Learning />}
            />
            <Route
                path="/learning/:id"
                element={<LearningDetail isLogin={isLogin} />}
            />
        </Routes>
    );
};

export default Router;
