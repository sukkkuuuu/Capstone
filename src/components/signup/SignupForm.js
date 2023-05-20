import React from "react";
import { useState, useEffect } from "react";
import styles from "./Signup.module.css"
import SigniupService from "../../service/SignupService"
const SignupForm = () => {
    const [univList, setUnivList] = useState([])
    const[form, setForm] = useState({
        email: "",
        sno: "",
        univName: "",
        password1: "",
        password2: "",
        nickname: "",
        birthDate: "",
    });
    useEffect(() => {
        SigniupService.univList(setUnivList);
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    };
    
    return (
        <div className={styles.signupForm}>
            <h2>Signup</h2>
            <select name="univName" onChange={handleChange}>
                <option value={null}>University Name</option>
                { univList.map(univ => <option value={univ}>{univ}</option>) }
            </select>
            <input className={styles.field} type="email" placeholder="Email" name="email" onChange={handleChange} />
            <input className={styles.field} type="text" placeholder="Student NO" name="sno" onChange={handleChange} />
            <input className={styles.field} type="password" placeholder="Password1" name="password1" onChange={handleChange} />
            <input className={styles.field} type="password" placeholder="Password2" name="password2" onChange={handleChange} />
            <input className={styles.field} type="text" placeholder="nickname" name="nickname" onChange={handleChange} />
            <input className={styles.field} type="date" placeholder="date" name="birthDate" onChange={handleChange} />
            <button className={styles.btn} type="button" onClick={(e) => SigniupService.signup(form)}>
                Click
            </button>
        </div>
    )
};

export default SignupForm;