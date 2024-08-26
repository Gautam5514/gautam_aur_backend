import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express(); // it is a method and trasfer the all property on that

app.use(cors({
    origin: process.env.CORS_ORIGIN, // put the origin on there for not all the way to detect
    credentials: true
}))

// this is for the user send the json folder then take only 16 kb not more then
app.use(express.json({limit: "16kb"}))
// This is for if user send the data in the string form then we read that on the basis of urlencoded
app.use(express.urlencoded({extended : true}))
// This is for if i want to save the data in the public form then we use this 
app.use(express.static("public"))

// for cookie from server Access and set cookie basically CRUD function
app.use(cookieParser());



// Routes import
import userRouter from './routes/user.routes.js';

// Routes Declration
app.use("/api/v1/users", userRouter)

// using the URL 
// https://localhost:8000/api/v1/users/register


export { app };