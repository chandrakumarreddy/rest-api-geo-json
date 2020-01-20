require("dotenv").config();
const http = require("http");
const app = require("./app");

http.createServer(app).listen(process.env.PORT);
console.log(`server is listening at ${process.env.PORT}`);
