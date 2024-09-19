import mongoose from "mongoose";
import env from "dotenv";
import colors from 'colors';
import pizzaModel from './model/pizzaModel.js';
import data from './data/pizza-data.js';
import connectDb from './config/config.js';

//config
env.config();
connectDb();

//import data
const importData = async() =>{
    try{
        await pizzaModel.deleteMany()
        const sample = data.map((pizza) => {return{...pizza}})
        await pizzaModel.insertMany(sample)
        console.log(`Data Import Successful...`.bgGreen.white)
        process.exit()
    }
    catch(err){
        console.log(`Error : ${err}`.bgRed.white);
        process.exit(1)
    }
}

const dataDestroy =() => {};

if(process.argv[2]==='-d'){
    dataDestroy();
}
else{
    importData();
}