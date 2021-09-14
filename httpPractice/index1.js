const http = require('http')
const path = require('path')


data = [];

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    // console.log(req.query.name);
    if(req.method == 'GET')
    {   console.log(req.method)
        res.write(`You requested for method.`);
        res.end();
    }
    else if(req.method == "POST")
    {   
        req.on('data',chunk=>{
            console.log(JSON.parse(chunk));
            data.push(JSON.parse(chunk))
            console.log(data)
        })
        req.on('end',()=>{
            console.log('END')
        })
        res.end();
    }
    else
    {
        console.log(req.method , "Typeof Method:- " , typeof(req.method))
        res.writeHead(404,{'Content-type' : "text/html"});
        res.end('<h1>Invalid Request type...</h1>')
    }
})

server.listen(9080,()=>{
    console.log('Listening at port 9080.')
});