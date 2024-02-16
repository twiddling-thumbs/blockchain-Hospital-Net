import React, {useState} from 'react';
// import './LoginSignup.css'
import styles from '../styles/LoginSignup.module.css';
import hospital_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/hospital-line.png'
import name_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/person.png'
import email_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/email.png'
import password_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/password.png'
import Image from 'next/image'
// import {Link} from "react-router-dom";

const LoginSignup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [action, setAction] = useState("Sign Up");
    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch('/api/signup',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({name,email})
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            
          } else {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            setErrorMessage(errorMessage); // Set the error message state
          }
    }
    return (
        <form className={styles.container3} onSubmit={handleSubmit}>
            <div className={styles.headerM}>
                <Image className={styles.content} src={hospital_icon} alt=''/>
                <div className={styles.textM}>{action}</div>
                <div className={styles.underline}></div>
            </div>

           <div className={styles.inputsM}>
            {action==="Login"?<div></div>:                <div className={styles.inputM}>
                    <Image className={styles.content} src={name_icon} alt=''/>
                    <input className={styles.inputM} type='text' value={name} onChange={(event) => setName(event.target.value)} placeholder='Hospital Name'/>
                </div>}



                <div className={styles.inputM}>
                    <Image className={styles.content} src={email_icon} alt=''/>
                    <input className={styles.inputM} type='email' value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Email Address'/>
                </div>

                {/* <div className={styles.input}>
                 <Image className={styles.content} src={password_icon} alt=''/>
                    <input className={styles.input} type='password' placeholder='Password'/>
                </div> */}

           </div>
           {/* {action==="Sign Up"?<div></div>:<div className={styles.forgotPasswordd}>Lost Password? <span className={styles.forgotPassword}>Click Here!</span></div>} */}

           {/* <div className="forgot-password">Lost Password? <span>Click Here!</span></div> */}
           {/* <div className={styles.submitContainer}>
            <div className={action ==="Login"?styles.gray : styles.submit}onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            <Link href="/Navigation"><div className={action==="Sign Up"?styles.gray : styles.submit}onClick={()=>{setAction("Login")}}>Login</div></Link>
           </div> */}
           <div className={styles.submitContainer}>
           <button className={styles.submit} type='submit'> 
               Submit
             </button>
             <div className={styles["error-message"]}>{errorMessage}</div>
           </div> 
        </form>
    )
}
// styles.gray : styles.submit
export default LoginSignup

