var express = require("express");
// 这个是我们上面自定义的模块
var log4js = require("./log");

var app = express();
log4js.configure("worker");

app.use(log4js.useLog());
var log = require("./log").logger("log_worker");

log.info("in worker");