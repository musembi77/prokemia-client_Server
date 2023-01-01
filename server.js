const http = require("http");
const app = require("./app.js");
require("dotenv").config();

const server = http.createServer(app);
let port = process.env.PORT || 5000;

server.listen(port, (req,res)=>{
	console.log(`server listening on http://localhost:${port}`)
})