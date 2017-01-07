var log4js=require('log4js');
log4js.configure('./log4js.json');
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

logger.trace('trace log');
logger.debug('trace debug');
logger.info('trace info');
logger.warn('trace warn');
logger.error('trace error');
logger.fatal('trace fatal');

// // 配置显示express 日志
// ....
// app.use(log4js.connectLogger(this.logger('normal'), {level:'auto', format:':method :url'}));
// ....

// exports.logger=function(name){
//   var logger = log4js.getLogger(name);
//   logger.setLevel('INFO');
//   return logger;
// }
