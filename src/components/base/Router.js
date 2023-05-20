import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../home/Home";
import SigninForm from "../signin/SigninForm";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SigninForm />} />
        </Routes>
    )
}

export default Router;