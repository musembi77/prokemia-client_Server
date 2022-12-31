const http = require("http");
const app = require("./app.js");
require("dotenv").config();

const server = http.createServer(app);
const host = '0.0.0.0';
const port = process.env.Port || 5000;

server.listen(port, (req,res)=>{
	console.log(`server listening on http://localhost:${port}`)
})