data = [
    {ProductId : '101',ProductName:'Earphone'},
    {ProductId : '102',ProductName:'Headphone'},
    {ProductId : '103',ProductName:'Shirt'},
    {ProductId : '104',ProductName:'Food'},
    {ProductId : '105',ProductName:'Bike'}
]

const http = require('http')
const server = http.createServer((req,res)=>{
    if(req.method == 'GET'){
        res.writeHead(200,{"Content-type" : "application/json"})
        res.end(JSON.stringify(data));
    }
    else if(req.method == 'POST'){
        let flag = 0
        req.on('data',chunk=>{
            let val = JSON.parse(chunk)
            // console.log(val)
            // console.log("TYPEOF:- " , typeof(val));
            data.forEach(element => {
                if(element.ProductId == val.ProductId){ 
                    flag = 1
                    console.log("Product Id already Exist");
                } 
            });
            // console.log(JSON.parse(chunk));
            // data.push(JSON.parse(chunk))
            // console.log(data)
            if(flag == 0){
                data.push(val)
                res.writeHead(200,{'Content-type' : 'text/html'})
                res.end("Add Product");
            }
            else{
                res.writeHead(400,{'Content-type':'text/html'});
                 res.end("ID Already exist");
             }
        })
        req.on('end',()=>{
            console.log('END')
        })


        // res.end("DONE");
    }
    else if(req.method == 'PUT'){
        let flag = 0
        req.on('data',chunk=>{
            let val = JSON.parse(chunk);
            console.log(val);
            for(let i = 0; i<data.length ; i++){
                if(data[i].ProductId == val.ProductId)
                {
                    try
                    {
                        data[i].ProductId = val.ProductId;
                        data[i].ProductName = val.ProductName;
                        console.log("Updated");
                        res.end("Updated")
                        flag = 1
                    }
                    catch(err)
                    {
                        res.end(`Error occured: ${err}`);
                    }
                }
            }
            if(flag == 0)
            {
                res.end('ID not available');
            }
        })
        req.on('end',()=>{
            console.log("END");
        })
    }
    else if(req.method == 'DELETE'){
        req.on('data' , chunk=>{
            let flag = 0
            let val = JSON.parse(chunk)
            for(let i = 0 ; i < data.length ; i++)
            {
                if(val.ProductId == data[i].ProductId)
                {
                    console.log(data[i]);
                    flag = 1
                    data.splice(i,1);
                    res.end("Product Deleted");
                }
            }
            if(flag == 0)
            {
                res.end("Product Id not found")
            }
        })
    }
})
server.listen(9080,()=>{
    console.log("Listening at port 9080");
})