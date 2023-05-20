import React, { useState } from "react";
import styles from "./Signin.module.css"
import SigninService from "../../service/SigninService"

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
    console.log(form.email)
    return (
        <div className={styles.signinForm}>
            <h2>Signin</h2>
            <input className={`${styles.field} ${styles.emailField}`} type="text" placeholder="Email" name="email" onChange={handleChange} />
            <input className={`${styles.field} ${styles.passwordField}`} type="password" placeholder="Password" name="password" onChange={handleChange} />
            <button className={`${styles.btn}`} type="button" onClick={(e) => SigninService.signin(form.email, form.password)}>Go</button>
        </div>
    );
};

export default SigninForm;