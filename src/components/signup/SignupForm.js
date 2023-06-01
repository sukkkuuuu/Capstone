import React from "react";
import { useState, useEffect } from "react";
import styles from "./Signup.module.css"
import SigniupService from "../../service/SignupService"
import Footer from "../base/Footer";

const date = new Date();
const now = `${date.getFullYear()}-${(date.getMonth() < 10 ? '0' : '' )+ date.getMonth() }-${date.getDate()}`;
const SignupForm = () => {
    const [univList, setUnivList] = useState([]);
    const [errors, setErrors] = useState();
    const[form, setForm] = useState({
        email: "",
        sno: "",
        univName: "",
        password1: "",
        password2: "",
        nickname: "",
        birthDate: now,
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
        <>
            <div className={styles.signupForm}>
                <h2>Signup</h2>
                <form method="post" style={{display: "flex", flexDirection: "column"}}>
                    <select className={`${styles.univSelectField} ${styles.field}`} name="univName" onChange={handleChange}>
                        <option value={null}>University Name</option>
                        { univList.map(univ => <option value={univ}>{univ}</option>) }
                    </select>
                    <input className={styles.field} type="email" placeholder="Email" name="email" onChange={handleChange} />
                    <input className={styles.field} type="text" placeholder="Student NO" name="sno" onChange={handleChange} />
                    <input className={styles.field} type="password" placeholder="Password1" name="password1" onChange={handleChange} />
                    <input className={styles.field} type="password" placeholder="Password2" name="password2" onChange={handleChange} />
                    <input className={styles.field} type="text" placeholder="Nickname" name="nickname" onChange={handleChange} />
                    <span style={{fontSize:"16px", textAlign:"center"}}>Birth Date</span>
                    <input className={styles.field} type="date" value={form["birthDate"]} max={now} min="1900-01-01" name="birthDate" onChange={handleChange} />
                    <input className={styles.btn} type="submit" value="Go" onClick={(e) => {e.preventDefault(); SigniupService.signup(form, setErrors);}} />
                        
                </form>
                {
                errors && 
                    <div className={styles.error_box}>
                        {errors.map((err, idx) => <li key={idx}>{err}</li>)}
                    </div>
                }
            </div>
            <Footer />
        </>
    )
};

export default SignupForm;