// require('dotenv').config({path: './env'})


import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})




connectDB()
























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