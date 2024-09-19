import mongoose from "mongoose";
import colors from "colors";
import env from "dotenv";

env.config();

const connectDB = async ()=>{
    try{
        console.log('CONNECTED'.bgCyan.white);
        const url = process.env.URI;
        const conn = await mongoose.connect(url,{
            useUnifiedTopology: true
        });
        console.log(`Mongodb Database Connected!`.bgGreen.white);
    }
    catch(err){
            console.log(`Error : ${err.message}`.bgRed.white);
    }
}

export default connectDB