var express = require('express');

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/posts", require("./routes/postRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/tags", require("./routes/tagsRoutes"));


module.exports = app;
