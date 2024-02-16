// custom utility function for connecting to a database.
import mongoose from "mongoose";
const uri = "mongodb://root:password@127.0.0.1/";
const connectDB = async () => {
    try{
        await mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true})
        console.log("MongoDB Connected");

    }
    catch(error){
        console.error(error);
        process.exit(1);
    }
}
export default connectDB;