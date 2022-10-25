import styles from '../../styles/Nav.module.css';
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import Image from 'next/image';


const Nav = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputText, setInputText ] = useState(null);
    const [isInitiliazed, setIsInitialized] = useState(false);
    const router = useRouter();
    const debounced = useDebouncedCallback(
        // function
        (value) => {
            setInputText(value);
        },
        // delay in ms
        1200
    );
    const searchMovie = () => {
        setIsFocused(currentState => !currentState);
    };

    useEffect(() => {
        if (inputText) {
            handleChange(inputText);
        }
    }, [inputText]);

    useEffect(() => {
        showNav();
    }, []);

    const showNav = useDebouncedCallback(
        // function
        (value) => {
            setIsInitialized(true);
        },
        // delay in ms
        1000
    );

    
    function handleChange(value) {
        router.push('/searchMovie/' + value);
    }
    
    return(
        <div className={styles.nav_content}>
            <h2 className={isInitiliazed ? `${styles.nav_brand} ${styles.nav_show}`  : `${styles.nav_brand}`}>TESTFLIX</h2>
            <div className={styles.left_nav}>
                <span className={isInitiliazed ? `${styles.nav_router} ${styles.nav_show}`  : `${styles.nav_router}`}><Link href="/">Home</Link></span>
            </div>

            <div className={styles.right_nav} >
                <form>
                    <label>
                        <input onChange={(e) => debounced(e.target.value)} className={isFocused ? `${styles.search_box} ${styles.search_box_expand}` : `${styles.search_box}`} type="text" name="name" />
                    </label>
                </form>
                <span className={styles.search_icon} onClick={() => searchMovie()}>
                    <IconContext.Provider className value={{ size: "1.5rem" }}>
                        <AiOutlineSearch />
                    </IconContext.Provider>
                </span>
                <span className={styles.notification_bell}>
                    <IconContext.Provider className value={{ size: "1.5rem" }}>
                            <AiOutlineBell />
                    </IconContext.Provider>
                    <span className={styles.notification_count}>
                        1
                    </span>
                </span>

                <span className={styles.notification_bell}>
                    <IconContext.Provider className value={{ size: "1.5rem" }}>
                        <CgProfile />
                    </IconContext.Provider>
                    
                </span>
                <span className={styles.notification_bell}>
                    Login
                </span>




            </div>
        </div>
    );
}

export default Nav;