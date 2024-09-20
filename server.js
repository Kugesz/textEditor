const express = require("express");
const fs = require("fs")
const path = require("path")

const app = express();

const PORT = 3000;
app.get('/', (req, res) =>{
    res.send(`<h1>Szerbusz!</h1>`)
})

app.listen(PORT, () =>{
    console.log("200")
})