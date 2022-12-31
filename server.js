const http = require("http");
const app = require("./app.js");
require("dotenv").config();

const server = http.createServer(app);
let port = process.env.Port || 8080;

server.listen(port, (req,res)=>{
	console.log(`server listening on http://localhost:${port}`)
})