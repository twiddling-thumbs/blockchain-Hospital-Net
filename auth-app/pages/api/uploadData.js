import {Web3Storage, getFilesFromPath } from 'web3.storage';
const {ethers} = require('ethers');
import * as Constants from "../constant";
import formidable from 'formidable'; //file uploads handling
import path from 'path'; // file path working

export const config = {
    api: {
        bodyParser: false    // disable built-in body parser
    }
}

// from my pc to the local server
function moveFiletoServer(req) {
    // when the whole upload is finished it returns to promise this promise is from javascript
    return new Promise((resolve, reject) => {
        // upload proces behaviour
        const options = {};
        // yahan upload hogi directory given
        options.uploadDir = path.join(process.cwd(), "/pages/uploads");
        options.filename = (name, ext, path, form) => {
            // ipfs pe save it with the same name
            return path.originalFilename;
        }
        // the defined instance passed to formidabale libbrary for file handling
        const form = formidable(options);

        // retrieve contents of the form defined above for parsing
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                reject("Something went wrong");
                return;
            }
            // things coded with the file goes in the field(non-filedata) userdefined
            const uniqueFileName = fields.filename;
            // actual filename defined on client-side
            const actualFileName = files.file.originalFilename;

            resolve({uniqueFileName, actualFileName});
        })
    })
}

// now store in ipfs
async function storeDataInBlockchain(actualFileName, uniqueFileName) {
    // /provider , signer to excess the account as usual
    const provider = new ethers.providers.JsonRpcProvider(Constants.API_URL);
    const signer = new ethers.Wallet(Constants.PRIVATE_KEY, provider);
    // the contract I deployed on my account is fetchd here
    const StorageContract = new ethers.Contract(Constants.contractAddress, Constants.contractAbi, signer);
// checking if the uniquefilename is stored in the blockchain
    const isStored = await StorageContract.isFileStored(uniqueFileName);

    console.log(isStored);

    if (isStored == false) {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGM5QUU3MkExRTNiODMwMUM2MDZDQkMzMzBBMERlOUM5NGUxNDRFNjYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTQ2MDk2MDc1MTgsIm5hbWUiOiJpcGZzLWJsb2NrY2hhaW4ifQ.IzSU6d50-0K8IulBn1si-_khHVENwpDrZViXrLGFUiI";
        const storage = new Web3Storage({token: token});
        const uploadPath = path.join(process.cwd(), "/pages/uploads");
        const files = await getFilesFromPath(uploadPath, `/${actualFileName}`);
        // content identifier
        // put files on IPFS
        const cid = await storage.put(files);
        // cid to hash string
        let hash = cid.toString();
        console.log("Storing the data in IPFS");
        // sends it to the block
        const tx = await StorageContract.upload(uniqueFileName, hash);
        await tx.wait();
        // call the smart contract func where hash is stored
        const storedhash = await StorageContract.getIPFSHash(uniqueFileName);
        return {message: `IPFS hash is stored in the smart contract: ${storedhash}`}
    }

    else {
        console.log("Data is already stored for this file name");
        const IPFShash = await StorageContract.getIPFSHash(uniqueFileName);
        return {message: `IPFS hash is already stored in the smart contract: ${IPFShash}`}
    }
}
// we are moving files from local pc to this server directoy
// we are going to store file in IPFS
// we are going to store IPFS hash in blockchain
async function handler(req, res) {
    try {
        const {uniqueFileName, actualFileName} = await moveFiletoServer(req)
        console.log("Files are stored in local server");

        await new Promise(resolve => setTimeout(resolve, 2000));  //waiting for 2 seconds

        const resposne = await storeDataInBlockchain(actualFileName, uniqueFileName)
        console.log("Hash stored in smart contract");

        return res.status(200).json(resposne);
    }
    catch (err) {
        console.error(err);
    }
}

export default handler;