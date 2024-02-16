import jwt from 'jsonwebtoken';

export default function handler(req,res){
    if (req.method !== 'POST'){
        res.status(405).end();
        return;
    }
    const secretKey = 'mySecretKey';
    const authHeader = req.headers.authorization;
    // jwt ka header is checked herefor formatting and existence
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
      }

    // header of the jwt is splitted here
      const token = authHeader.split(' ')[1];
      try{
        // finally validity is checked
        const decoded = jwt.verify(token,secretKey);
        // time format for jwt token to check if it is expired yet or not
        const currentTime = Math.floor(Date.now()/1000);
        if (decoded.exp<currentTime){
            res.json({message: 'Expired'});
        }else{
            res.json({message:'valid'});
        }
      }
      catch(err){
        console.error(err);
        res.status(401).json({error: 'invalid token'})
      }
}