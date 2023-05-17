const ApplyMiddleware = require("./middlewares");
const ApplyRoutes = require("./routes");
const express = require("express");

const app = express();

console.log("Connect middlewares");
ApplyMiddleware(app);
console.log("Connect routes");
ApplyRoutes(app);

app.listen(6100);
console.log("Listen 6100");