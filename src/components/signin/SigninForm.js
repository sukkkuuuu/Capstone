import React, { useState } from "react";
import styles from "./Signin.module.css"
import SigninService from "../../service/SigninService"
import Footer from "../base/Footer";

const SigninForm = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""    
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };
    
    return (
        <>
            <div className={styles.signinForm}>
                <h2>Signin</h2>
                <form>
                    <input className={`${styles.field} ${styles.emailField}`} type="text" placeholder="Email" name="email" onChange={handleChange} />
                    <input className={`${styles.field} ${styles.passwordField}`} type="password" placeholder="Password" name="password" onChange={handleChange} />
                    <input className={`${styles.btn}`} type="submit" value="Go" onClick={(e) => {
                        e.preventDefault();
                        SigninService.signin(form.email, form.password);
                    }}/>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default SigninForm;