const http = require("http");
const app = require("./app.js");
require("dotenv").config();

const server = http.createServer(app);
const host = '0.0.0.0';
const port = process.env.Port;

server.listen(process.env.Port, (req,res)=>{
	console.log(`server listening on http://localhost:${port}`)
})