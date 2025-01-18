import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
dotenv.config({
    path: './env'
})

 const app =express();


connectDB(); // Connect to the database

app.listen(process.env.PORT, () => {
    console.log(`App is running on port: ${process.env.PORT}`);
});
