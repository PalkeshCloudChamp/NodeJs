const express = require('express');
const cors = require('cors');
data = [
    {ProductId : '101',ProductName:'Earphone'},
    {ProductId : '102',ProductName:'Headphone'},
    {ProductId : '103',ProductName:'Shirt'},
    {ProductId : '104',ProductName:'Food'},
    {ProductId : '105',ProductName:'Bike'}
]

const app = express()


app.use(cors({
    allowedHeaders : "*",
    origin : '*',
    methods : '*'
}
));



app.get('/api',(req,res)=>{res.json(data)})
app.get('/api/:id',(req,res)=>{
    data.forEach(element => {
        if(req.params.id == undefined)
        res.send(JSON.stringify(data));
        if(element.ProductId  == req.params.id)
        {
            res.send(`Your Data:- ${JSON.stringify(element)}`)
        }
    });
    res.json(JSON.stringify(data))
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/addProduct',(req,res)=>{
    let flag = 1
    data.forEach(element=>{
        if(element.ProductId == req.body.ProductId)
        {
            res.send("Product Id already in use.");
            flag = 0
        }
    })
    if(flag == 1) data.push({ProductId : req.body.ProductId , ProductName : req.body.ProductName});
    res.send(`Data added at Id:- ${req.body.ProductId}`);
})

app.put('/updateProduct',(req, res)=> {
    console.log(req.body);
    data.forEach(element=>{
        if(element.ProductId == req.body.ProductId)
        {
            element.ProductName = req.body.ProductName;
            element.ProductId = req.body.ProductId;
            res.send("Data Updated");
        }
    })
    res.send(`The Id :- ${req.body.ProductId} is not available.`);
})

app.delete('/delete/:id' , (req,res)=>{
    for(let i = 0 ; i < data.length ; i++){
        if(data[i].ProductId == req.params.id)
        {
            data.splice(i,1);
            res.send("Data Deleted");
        }
    }
    res.send("Id not available");
})
app.listen(9080);