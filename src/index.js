//require('dotenv').config({path : './env'})

import { configDotenv } from "dotenv";
import connectDB from "./db/index.js";

configDotenv({
    path : './env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`o server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("mongodb connection failed " , err)
})
