// require('dotenv').config({path:'./env'});
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

// const app = express();
const port = process.env.port;
connectDB()
  .then(() => {
    app.listen(process.env.port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  
  .catch((err) => {
    console.log(err);
  });