const http = require('http')
http.createServer((req,res)=>{
    res.end("Hello World from NodeJS");
}).listen(9080);