import { ethers } from "ethers";
import jwt from 'jsonwebtoken';

// signing JWT so a secret key
const secretKey = 'mySecretKey';
// HTTP req handler
async function handler(req,res){
    // req these from index
    const {signedMessage, nonce , address} = req.body;

    // the signedMessage that metamask just used is verfyed by this func against the nonce that we created, defines the ownership of that ethereum address
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signedMessage);

    if (recoveredAddress !== address){
        return res.status(401).json({message: 'Invalid Signature'});

    }

    // now here jwt signs the address (encoded it) 
    const token =  jwt.sign({address}, secretKey,{expiresIn:'10m'});
    res.status(200).json({token});

}

export default handler;