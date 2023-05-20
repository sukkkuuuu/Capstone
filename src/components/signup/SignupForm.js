import React from "react";
import { useState, useEffect } from "react";
import styles from "./Signup.module.css"
import SigniupService from "../../service/SignupService"
const SignupForm = () => {
    const[form, setForm] = useState({
        email: "",
        password1: "",
        password2: "",
        nickname: "",
    });

    const handle = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    };
    
    return (
        <div className={styles.signupForm}>
            <h2>Signup</h2>
            <input className={styles.field} type= "text" placeholder="Email" name = "email" onChange={handle} />
            <input className={styles.field} type= "password" placeholder="Password1" name = "password1" onChange={handle} />
            <input className={styles.field} type= "password" placeholder="Password2" name = "password1" onChange={handle} />
            <input className={styles.field} type= "text" placeholder="nickname" name = "nickname" onChange={handle} />
            <button className={styles.btn} type="button" onClick={(e) => SigniupService.signup(form)}>
                Click
            </button>
        </div>
    )
};

export default SignupForm;