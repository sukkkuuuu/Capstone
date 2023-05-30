import Header from './components/base/Header';
import Router from './components/base/Router';
import Footer from './components/base/Footer';
import "./components/base/Base.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Constant from './constants/Constant';
const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const onLogout = () => {
    window.localStorage.removeItem("acc_tok");
    setIsLogin(false);
    alert("로그아웃되었습니다.");
  }
  useEffect(() => {
    const checkTokenVaild = async () => {
      try {
        const response = await axios.get(Constant.BASE_URL + "/member/checkToken", {
          headers: {
            Authorization : `Bearer ${window.localStorage.getItem('acc_tok')}`,
          }
        });
        if(response.status === 200) {
          setIsLogin(true);
        } else {
          onLogout();
        }
      } catch(err) {
        console.log(err);
      }
    }
    checkTokenVaild();
  }, []);
  return (
    <>

      <Header isLogin={isLogin} onLogout={onLogout} />
      <div style={{display: "flex",  height: "80vh",justifyContent: "center", alignItems: "center"}}>
        <Router isLogin={isLogin} onLogout={onLogout} />
      </div>
    </>
  );
}

export default App;
