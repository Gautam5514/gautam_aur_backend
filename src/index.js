// require('dotenv').config({path: './env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"

dotenv.config({
    path: './env'
})


connectDB()

.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    }) // Basically the (process.env.PORT) -> it is the variable
    
})
.catch((err) => { // Its all are the callback property
    console.log("MongoDB connection failed !!! ", err);
})

// after completion the asynchronous statement it return the promises






















// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
/*
import express from "express";
const app = express()

// It is the if else to use the connection of database and also Async
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error("ERRR", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listining on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("ERROR", error)
        throw err
    }
}) ()
*/