//API endpoint for generating a nonce for a user based on their blockchain address
import crypto from 'crypto';
import connectDB from '@/utils/connectDB';
import User from '@/models/schema';

connectDB();

async function handler(req, res) {
  // request handle
  if (req.method === 'POST') {
    // address fetched from the api is then matched here with the database MONGO
    const {address} = req.body;
    const stringAddress = address.toString();
    try {
        const addressExists = await User.findOne({ blockchainAddress: stringAddress });
        console.log(addressExists)
        if (!addressExists) {
          return res.status(400).json({ message: 'Please register first' });
        } 
        // nonce generation 
      const nonce = crypto.randomBytes(32).toString('hex');

      // client request fetch for the nonce sent from here
      res.status(200).json({ message: nonce });
    } catch (error) {
      console.error(error);
      // if nonce generation has an error
      res.status(500).json({ message: 'An error occurred' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}


export default handler;