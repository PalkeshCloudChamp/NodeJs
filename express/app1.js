const express = require('express')
const morgan = require('morgan')
const app =  express()
app.use(morgan('dev'));
app.get('/api/',(req,res)=>{
    console.log(req.method);
    res.send(req.url);
    console.log('Morgan is initiated...')
})
app.post('/',(req,res)=>{
    console.log(req.method);
    res.send(req.url);
    console.log('Morgan is initiated...')
})
app.listen(9080 , ()=>{
    console.log("Started server at Port 9080......")
});