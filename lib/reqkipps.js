var conf=require('../config.json');
var request = require('request-json');


/**
 *  log configure
 **/
var logger = require('./log.js').logger();

/**
 * kipp 调度方法，暴露给tars
 * @param senddata 
 * @returns {}
 */

module.exports.ask= function dis(data,fn) {

 
 var url='http://'+data.ip+':'+data.port+'/';
 var client = request.createClient(url);
	client.post('isReady', data, function(err, res, body) {
    	//logger.debug(res);
    	logger.debug(body);
		fn(err,body);
    });
}

module.exports.runTask= function dis(kipp,senddata,fn) {

	var url='http://'+kipp.ip+':'+kipp.port+'/';
	logger.debug("kipp url is:",url);
    var client = request.createClient(url);
	client.post('task', senddata, function(err, res, body) {
    	//logger.debug(res);
    	logger.debug(body);
    	if(err){
    		fn(err,null);
    	}else{
    		fn(null,body);
    	}
		
    });

}

