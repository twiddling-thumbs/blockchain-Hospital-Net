//API
import {ethers} from 'ethers';
import connectDB from '@/utils/connectDB';
import User from '@/models/schema';

connectDB();

async function handler(req, res ) {
    if (req.method === 'POST'){
        try{
            // naam aur email jo neeche enter hoga
            const {name, email} = req.body;
            const existingUser = await User.findOne({email});
            // check if this user already exist
            if(existingUser){
                return res.status(400).json({message:"Email Already Registered"} )
            }
            // agar nahi hai user to banayeinge 
            const wallet = ethers.Wallet.createRandom(); //ethereum wallet for account creation
            const blockchainAddress = wallet.address;
            const blockchainPrivateKey = wallet.privateKey;

            // create new user in DB
            const newUser = new User({name, email, blockchainAddress});
            await newUser.save();

            res.status(200).json({message:blockchainPrivateKey});
        } catch (error){
            console.error(error);
            // connection issue handler
            res.status(500).json({message:"An error occured"});
        }

    } else  {
        res.status(405).json({message: "Method Not Allowed"});

    }
}

export default handler;
