import Link from 'next/link';
import styles from '../styles/LoginSignup.module.css';
import LoginSignup from './LoginSignup';
import { useEffect, useState } from 'react';
import {ethers} from 'ethers';
import exp from 'constants';
import hospital_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/hospital-line.png'
import name_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/person.png'
import email_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/email.png'
import password_icon from 'C:/Users/computer/Desktop/logsi/auth-app/pages/Assets/password.png'
import Image from 'next/image'

// See if metamsk is installed
function HomePage(){
  const [isMetamaskinstalled, setIsMetamaskinstalled] = useState(false);

  useEffect(() => {
    setIsMetamaskinstalled(!!window.ethereum);
  } 
  );


  async function handleMetamaskLogin(){
      try{
          if(!isMetamaskinstalled){
            throw new Error('Metamask is not installed');
          }
          // web3 provider connection for ethereum
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send('eth_requestAccounts',[]);

          //get address from user
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          // console.log(address);

          // server generated nonce fetch
          const response = await fetch('/api/nonce',{
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({address})
          });
          if(!response.ok){
            const error= await response.json();
            console.log(error);
          }
          const resp = await response.json();
          const nonce = resp.message;
          // console.log(nonce);

          // sign the nonce from metamask but this is from login
          const signedMessage = await signer.signMessage(nonce);
          const data = {signedMessage,nonce,address};

          // after metamask signed it authentication request to server sent
          const authResponse = await fetch('/api/login',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          //  server side will generate an authentication token and send here
          let token =  await authResponse.json();
          console.log(token);
          // local storage mein save krne k baad yahin se agay authrization mein ye check krega
          localStorage.setItem(address, token.token);
          window.location.href = './Navigation'

      }
      catch(err){
          console.error(err);
          alert('Failed to LogIn with MetaMask');
      }
  }
  const [action, setAction] = useState("Sign Up");
  return(
    <div className={styles.container3}>
      <div className={styles.headerM}>
                <Image className={styles.content} src={hospital_icon} alt=''/>
                <div className={styles.textM}>Login</div>
                <div className={styles.underline}></div>
                <div className={styles.submitContainer}>
                  <button className={styles.submit} onClick={handleMetamaskLogin}> 
                        Login with MetaMask
             </button>
       
           </div> 
           <div>
            <Link href="/LoginSignup" >
              <button className={styles.submit}> 
                  Signup
              </button>
            </Link>
          </div>
      </div>

           {/* <LoginSignup/> */}
          
      
    
    </div>
    // <div className={LoginSignup.container}>
    //   <div>
    //   <h1>Welcome</h1>
    //   <button className={LoginSignup.btn} onClick={handleMetamaskLogin}>Login with meta</button>

    //   <br / >
    //   <br />
    //   </div>

      // <Link href="/signup">
      // <button className={styles.btn}> 
      //     Signup
      // </button>
      // </Link>
    // </div>
  )
  

}
export default HomePage;