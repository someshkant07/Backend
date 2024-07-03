//require('dotenv').config({path : './env'})

import { configDotenv } from "dotenv";
import connectDB from "./db/index.js";

configDotenv({
    path : './env'
})

connectDB()
