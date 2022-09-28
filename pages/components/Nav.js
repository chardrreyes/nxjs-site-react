import styles from '../../styles/Nav.module.css';
import { AiOutlineSearch } from "react-icons/ai";
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
            console.log(isInitiliazed);
        },
        // delay in ms
        1500
    );

    
    function handleChange(value) {
        router.push('/searchMovie/' + value);
    }
    
    return(
        <div className={styles.nav_content}>
            <h2>TESTFLIX</h2>
            <div className={styles.left_nav}>
                <span className={`${isInitiliazed} ? ${styles.nav_router} ${styles.nav_show}  : ${styles.nav_router} `}><Link href="/">Home</Link></span>
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

            </div>
        </div>
    );
}

export default Nav;