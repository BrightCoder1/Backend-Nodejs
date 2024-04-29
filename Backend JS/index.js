require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.port;

app.get("/",(req,res) => {
    res.send("HOME Page");
})

app.get("/get",(req,res) => {
    res.send("GEt Page");
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})