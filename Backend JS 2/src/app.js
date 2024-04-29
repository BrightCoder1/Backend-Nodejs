import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();
// app.use(cors({
//     origin:process.env.CORS_ORIGIN,
//     credentials:true
// }));
app.use(cors());

app.use(express.json({
    limit:"10kb"//limit of json file
}));
// urlencoded use: manage the url let ((BrightCoder.com)=manage) ((BrightCoder.com%20)=with out manage)
app.use(express.urlencoded({extended:false,limit:"16kb"}));
// declear i am use public folder for a file store
app.use(express.static('public'));

app.use(cookieParser());


import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users",userRouter);
// http://localhost:3000/api/v1/users/register
export {app};