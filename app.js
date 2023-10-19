const http = require('http')
http.createServer((req,res)=>{

	res.write("I'm a fullstack dev")
	res.end()

}).listen(3000)
console.log("server is running")
