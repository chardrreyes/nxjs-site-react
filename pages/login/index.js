import styles from '../../styles/Home.module.css';
export default function Search() {
    return <>
        <div className={styles.no_result}>
            <div className='container' style={{display: 'flex', justifyContent: 'center'}}>
                <div className='login_card'>
                    <div className='login_header'>
                        <h1>LOGIN</h1>
                    </div>
                    <div className='login_body'>
                        <form action="/send-data-here" method="post" style={{display: 'flex', flexDirection: 'column', gap:'1rem'}}>
                            <span style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span><label for="username">Username:</label></span>
                                <span><input type="text" id="username" name="username" /></span>
                            </span>
                            <span style={{display: 'flex', justifyContent: 'space-between'}}>
                                <span><label for="pword">Password:</label></span>
                                <span><input type="password" id="pword" name="pword" /></span>
                            </span>
                            <span>
                                <button type="submit"><span>LOGIN</span></button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}