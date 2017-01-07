var log4js = require("./log");
log4js.configure("master");
var log = require("./log").logger("index");
log.info("in master");
