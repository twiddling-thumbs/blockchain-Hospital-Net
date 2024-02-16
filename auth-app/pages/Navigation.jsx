import withAuth from '@/utils/withAuth'
import styles from '../styles/Navigation.module.css';
import intro from '../styles/intro.module.css'; // Fixed import path
import Image from 'next/image';

import React, { useState } from "react";
import Link from 'next/link';

const Navigation = ({ account, setAccount }) => {



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
  <div className={intro.container1}>
    <div className={intro.cube}>
      <div className={intro.front}></div>
      <div className={intro.left}></div>
      <div className={intro.right}></div>
      <div className={intro.back}></div>
      <div className={intro.top}></div>
      <div className={intro.bottom}></div>
    </div>
  </div>
</section>


      <section>
        <div className={intro.intro}>
          <div className={intro.content}>
            <p>HOSPITAL NET.</p>
            <p>
              Wellcome to the Hospital NET,
              Which is a Blockchain based Application which shows the data of a Hospital from the Block chain,
              and helps the users to see the Information related to them.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default withAuth(Navigation);
