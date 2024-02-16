// Components
// import './Navigation.css'
import React,{useState,useEffect} from 'react';
import imgs from '../styles/Images.module.css';
import CT from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/CTscan.png'
import XRAY from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/xray.png'
import MRI from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/MRI.png'
import { Container } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import React from 'react';
// import { Link } from 'react-router-dom';
import styles from '../styles/Navigation.module.css';
import intro from '../styles/intro.module.css'; // Fixed import path
import Image from 'next/image';
// import React, { useState } from "react";
import Link from 'next/link';

const Images = () => {
// IPFS code here
const [file, setFile] = useState(null);
const [fileName, setFileName] = useState("");
const [result, setResult] = useState("");

useEffect(() => {}, []);
// 
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

                <div className={imgs.images} >
                    <p>IMAGES</p>

                    <div className={imgs.underline}></div>

                    <div className="container-text-center">
                        <div className="row gy-5">
                            <div className="col-md-4">
                                <div className="card h-100">
                                
                                    <Image src={MRI} class="img-thumbnail" alt="..." />
                                    <div className="card-body">
                                        <h5 class="card-title">MRI</h5>
                                        <p className="card-text">Here is the MRI Data.</p>
                                        <a href="#mri" class="btn btn-dark">GOTO MRI DATA</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card h-100">
                                    <Image src={CT} class="img-thumbnail" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">CT - SCAN</h5>
                                        <p class="card-text">Here is the CT - SCAN Data.</p>
                                        <a href="#ct" class="btn btn-dark">GOTO CT - SCAN DATA</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card h-100">
                                    <Image src={XRAY} class="img-thumbnail" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title">X - RAY</h5>
                                        <p class="card-text">Here is the X - RAY Data.</p>
                                        <a href="#xray" class="btn btn-dark">GOTO X - RAY DATA</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="d-grid gap-2">
                        <button class="btn btn-dark" href="#"><h1>Upload</h1></button>
                        <button class="btn btn-dark" href="#"><h1>Download</h1></button>
                    </div>

                    <div id="mri">
                        <h1> MRI</h1>
                    </div>
                    <div className='underline'></div>
                    <div class="container-text-center">
                        <div class="row gy-5">
                            <div class="col-md-4">
                                <Image src={MRI} class="img-thumbnail" alt="..." />
                            </div>
                            <div class="col-md-4">
                                <Image src={MRI} class="img-thumbnail" alt="..." />
                            </div>
                            <div class="col-md-4">
                                <Image src={MRI} class="img-thumbnail" alt="..." />
                            </div>
                        </div>
                    </div>

                    <div id="ct">
                        <h1> CT - SCAN</h1>
                    </div>
                    <div className='underline'></div>
                    <div class="container-text-center">
                        <div class="row gy-5">
                            <div class="col-md-4">
                                <Image src={CT} class="img-thumbnail" alt="..." />
                            </div>
                            <div class="col-md-4">
                                <Image src={CT} class="img-thumbnail" alt="..." />
                            </div>
                            <div class="col-md-4">
                                <Image src={CT} class="img-thumbnail" alt="..." />
                            </div>
                        </div>
                    </div>

                    <div id="xray">
                        <h1>X - RAY</h1>
                    </div>
                    <div className='underline'></div>
                    <div class="container-text-center">
                        <div class="row gy-5">
                            <div class="col-md-4">
                                <Image src={XRAY} class="img-thumbnail" alt="..." />
                            </div>
                            <div class="col-md-4">
                                <Image src={XRAY} class="img-thumbnail" alt="..." />
                            </div>
                            <div class="col-md-4">
                                <Image src={XRAY} class="img-thumbnail" alt="..." />
                            </div>
                        </div>
                    </div>
                    <a href="#back" class="btn btn-dark"><h1>BACK</h1></a>
                </div>

            </section>
        </>
    );


}

export default Images; 