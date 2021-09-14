const express = require('express');
// const { url } = require('inspector');
const fs = require('fs')
const app = express();

app.get('/api/:name' , (req,res)=>{
    console.log(req.url);
    res.send(`${fs.readFileSync(req.params.name).toString().split('\n')}`);
})

app.listen(9080);