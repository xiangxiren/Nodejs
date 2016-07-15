var http = require("http");

http.createServer(function(req,res){
	res.writeHead(200,{'Content-type': 'text/html'});
	res.write('<head><meta charset="utf-8"/></head>');  
	res.write('<h1>Node.js</h1>');
	res.write('<h1>你好吗？</h1>');
	res.end('<p>Hello World!</p>');
}).listen(3000);

console.log("HTTP server is listening at port 3000.");