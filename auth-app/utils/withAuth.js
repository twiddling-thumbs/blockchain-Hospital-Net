// HOC higher order component
import { useEffect,useState } from "react";
import {useRouter} from 'next/Router';
import {ethers} from 'ethers';

// HOC declared
const withAuth = (Component) => {
    const Auth = (props) => {
        const router = useRouter();
        const [resp, setresp] = useState('valid');

        useEffect(() => {
            // checking if user's acc is legit metamask registered one
            const checkMetamask = async () => {
                if(window.ethereum){
                    try{
                        // metamask permit to see the accounts
                        await window.ethereum.request({method: 'eth_requestAccounts'});
                        const provider = new ethers.providers.Web3Provider(window.ethereum);
                        const signer = provider.getSigner();
                        const currentAddress = await signer.getAddress();
                        // the token we saved in the local storage from login api is now retrieved here
                        const token = localStorage.getItem(currentAddress);
                        if (token !== ''){
                            // token is checked for by sending it to verify api
                            const response = await fetch ('/api/verify',{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }
                            });
                            // if not valid then sent back to homepage
                            let newResponse = await response.json();
                            setresp(newResponse.message);
                            if (resp !== 'valid') {
                                window.localStorage.removeItem(currentAddress);
                                router.push('/');
                            }
                        }
                        else {
                            router.push('/');
                        }
                    }
                    catch(err){
                        console.error(err);
                    }
                }
            };
            checkMetamask();

        },[resp, router]);
        return <Component {...props}/>;
    };
    return Auth;
}
export default withAuth;