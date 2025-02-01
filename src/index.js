import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: './env'
})

 
connectDB()// Connect to the database 
 // as asyanc function return a promise so we can use then and catch
.then(()=>
{
    app.listen(process.env.PORT, () => {
    console.log(`App is running on port: ${process.env.PORT}`);
});
})
.catch((err)=>{
    console.log(`MONGODB connection failed !!`,err);
    

})

