// import './ML.css'

// import './Images.css'
// import CT from '../Assets/CTscan.png'
// import XRAY from '../Assets/xray.png'
// import MRI from '../Assets/MRI.png'
// import React from 'react';
// import { Link } from 'react-router-dom';
// import React, { useState } from "react";
import React, {useState, useEffect} from "react";
// import styles from "./page.module.css";
import { setRequestMeta } from "next/dist/server/request-meta";
import logi from '../styles/LoginSignup.module.css';

import styles from '../styles/Navigation.module.css';
import ml from '../styles/ML.module.css'; // Fixed import path
import Image from 'next/image';

// import React, { useState } from "react";
import Link from 'next/link';

const ML = () => {
//IPFS
const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {}, []);

  const handleChange = (e) => {
    if(e.target.name === "filename") {
      setFileName(e.target.value);
    }
    if(e.target.name === "file") {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      var formData = new FormData();
      formData.append("filename", fileName);
      formData.append("file", file);

      const res = await fetch("/api/uploadData", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Network response is not ok");
      }
      const data = await res.json();    
      setResult(data.message);

    } catch (err) {
      console.error(err);
    }
  }
// ipfs

    const [active, setActive] = useState(styles.nav__menu); // Updated initial class names
    const [icon, setIcon] = useState(styles.nav__toggler); // Updated initial class names
  
    const navToggle = () => {
      if (active === styles.nav__menu) {
        setActive(`${styles.nav__menu} ${styles.nav__active}`);
      } else setActive(styles.nav__menu);
  
      // Icon Toggler
      if (icon === styles.nav__toggler) {
        setIcon(`${styles.nav__toggler} ${styles.toggle}`);
      } else setIcon(styles.nav__toggler);
    };
  
    return (
      
    <> 
    <nav className="nav">
      <Link  href="/Navigation" passHref>
        HOSPITAL NET
      </Link>
      <ul className={styles.nav__menu}>
        <li className={styles.nav__item}>
          <Link href="/Images" passHref>
            <div className={styles.nav__link}>Images</div>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/ML" passHref>
            <div className={styles.nav__link}>ML Models</div>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/Networks" passHref>
            <div className={styles.nav__link}>Network Status</div>
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link href="/" passHref>
            <div className={styles.nav__link}>LOG OUT</div>
          </Link>
        </li>
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
    </nav>
    <section>
      <div className={ml["ml-heading"]}>
        <form className={logi.container3} onSubmit={handleSubmit}>
            <div className={logi.headerM}>
                <div className={logi.textM}>IPFS System</div>
                <div className={logi.underline}></div>
            </div>

           <div className={logi.inputsM}>
                    <div className={logi.inputM}>
                    <input className={logi.inputM} type='text' name="filename" value={fileName} onChange={handleChange}  placeholder='Enter Unique File Name'/>
                </div>



                <div className={logi.inputM}>
                    <input className={logi.inputM} type="file" name="file" onChange={handleChange}/>
                </div>

           </div>
           <div className={logi.submitContainer}>
           <button className={logi.submit} type='submit'> 
               Submit
             </button>
           </div> 
           {result && <p className={ml.result}>{result}</p>}
        </form>
        </div>
 
{/* //ipfs entry: */}
        {/* <div className={styles.container}>
      <header className={styles.header}>
        <h1>⁂<span>Store IPFS hash on blockchain</span>⁂</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label className={styles.lable}>Enter Unique Filename: </label>
        <input type="text" name="filename" value={fileName} onChange={handleChange} className={styles.input}></input>
        <br />
        <input type="file" name="file" onChange={handleChange} className={styles.input}></input>
        <br />
        <input type="Submit" className={styles.button}></input>
      </form>

      {result && <p className={styles.result}>{result}</p>}
    </div> */}
    </section>
        </>
    );

}

export default ML; 