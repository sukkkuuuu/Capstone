import Footer from "../base/Footer";
import profile from "../../profile.png";
import git from "../../git.png";
import ins from "../../ins.png";
import phone from "../../phone.png";
import styles from "./Home.module.css";
import React from "react";

import produce from "../../produce.png";

const Home = () => {
    return (
        <>
            <div>
                <div className={styles.column}>
                    <img className={styles.produce} src={produce} />
                </div>

                <div className={styles.row}>
                    <div className={styles.wrapper}>
                        <div className={styles["img-area"]}>
                            <div className={styles["inner-area"]}>
                                <img src={profile} />
                            </div>
                        </div>
                        <div className={styles.people}>KANG DONG HYUN</div>
                        <div className={styles.about}>KyungSung University</div>
                        <div className={styles["social-icons"]}>
                            <a
                                href="https://www.instagram.com/kangc_closet"
                                className={styles.instagram}
                            >
                                <img src={ins} />
                            </a>
                            <a
                                href="https://github.com/swKDH"
                                className={styles.github}
                            >
                                <img src={git} />
                            </a>
                            <a href="#" className={styles.phone}>
                                <img src={phone} />
                            </a>
                        </div>
                        <div className={styles.buttons}>
                            <button>CSLAB</button>
                            <button>Software</button>
                        </div>
                        <div className={styles["social-share"]}>
                            <div className={styles.row}>
                                <span>age: 27</span>
                            </div>
                            <div className={styles.row}>
                                <span>grade: 4</span>
                            </div>
                            <div className={styles.row}>
                                <span>role: Front&CSS</span>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className={styles.wrapper}>
                        <div className={styles["img-area"]}>
                            <div className={styles["inner-area"]}>
                                <img src={profile} />
                            </div>
                        </div>
                        <div className={styles.people}>CHOI HYEON SU</div>
                        <div className={styles.about}>KyungSung University</div>
                        <div className={styles["social-icons"]}>
                            <a
                                href="https://www.instagram.com/hyeonsu5804"
                                className={styles.instagram}
                            >
                                <img src={ins} />
                            </a>
                            <a
                                href="https://github.com/sukkkuuuu"
                                className={styles.github}
                            >
                                <img src={git} />
                            </a>
                            <a href="#" className={styles.phone}>
                                <img src={phone} />
                            </a>
                        </div>
                        <div className={styles.buttons}>
                            <button>CSLAB</button>
                            <button>Software</button>
                        </div>
                        <div className={styles["social-share"]}>
                            <div className={styles.row}>
                                <span>age: 25</span>
                            </div>
                            <div className={styles.row}>
                                <span>grade: 4</span>
                            </div>
                            <div className={styles.row}>
                                <span>role: Front&CSS</span>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className={styles.wrapper}>
                        <div className={styles["img-area"]}>
                            <div className={styles["inner-area"]}>
                                <img src={profile} />
                            </div>
                        </div>
                        <div className={styles.people}>KIM TAE HYUN</div>
                        <div className={styles.about}>KyungSung University</div>
                        <div className={styles["social-icons"]}>
                            <a
                                href="https://www.instagram.com/"
                                className={styles.instagram}
                            >
                                <img src={ins} />
                            </a>
                            <a
                                href="https://github.com/git-kth"
                                className={styles.github}
                            >
                                <img src={git} />
                            </a>
                            <a href="#" className={styles.phone}>
                                <img src={phone} />
                            </a>
                        </div>
                        <div className={styles.buttons}>
                            <button>CSLAB</button>
                            <button>Software</button>
                        </div>
                        <div className={styles["social-share"]}>
                            <div className={styles.row}>
                                <span>age: 25</span>
                            </div>
                            <div className={styles.row}>
                                <span>grade: 4</span>
                            </div>
                            <div className={styles.row}>
                                <span>role: Back&Front</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer active="Home" />
        </>
    );
};

export default Home;
