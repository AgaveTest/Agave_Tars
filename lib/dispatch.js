
var kipps = require('../model/kipp');
var dialog = require('../model/dialog');
var require_kipp = require('./reqkipps');
var async = require('async');


/**
 *  log configure
 **/
var logger = require('./log.js').logger();


/**
 * kipp 调度方法，暴露给tars
 * @param senddata 
 * @returns {} 
 */
module.exports= function dis(senddata,callback) {

    send(senddata,function(err,msg){
    	callback(err,msg);
    });
	// return send(senddata);
}

function send(data,callback){

	logger.debug("begin senddata,sid is：",data.sid,'type is :',data.type);
	// logger.debug(data.sid);
	//check data and save info
	if(!data) return null;
	
	var tsid=getOneKippSid(data); //获取sid
	async.parallel({
    istrue:function(cb) { 
    	checksid({"sid":data.sid},cb);
    	// t.fire('a400', cb, 200) 
    },
    hasSid:function(cb) { 

    	isSid({"sid":tsid},cb);
    	
    	// t.fire('b200', cb, 200) 
    },
    hasType:function(cb) { 
    	isType({"type":data.Caseinfo.type,"status":"online"},cb);
    	logger.debug('data.type: ', data.Caseinfo.type);
    	// t.fire('c100', cb, 100) 
    }
    
	},function(err, results) {
    	logger.debug('1.5 err: ', err);
    	logger.debug('1.5 results: ', results);

    	//sid right
    if(results.istrue&&results.hassid){
		logger.debug('is already have kipp before this check!');
		kipps().findOne({"sid":tsid},function (err, doc) {
        		if (err) {
        			logger.debug("err message:",err.message);
        			callback(err,"Did not find kipp:"+{"sid":data.sid});
        			
        		} 
        		if(!doc) {
        			var err={};
					err["message"]="Find kipps error:"+{"sid":data.sid};
        			callback(err,null);
        		}
        		var kipp=doc;
        		logger.debug("find kipp:",kipp);
        		require_kipp.runTask(kipp,data,function(err,data){

        			if(err){
        				callback(err,"send message to kipp("+kipp.name+") error!");
        			}else{
        				callback(null,data); //正常情况下的数据返回
        			}

        		});
        	})


	}
	if(results.istrue&&results.hasType&&!results.hassid){
		logger.debug('Will git kipp to run!');
		kipps().findOne({"type":data.Caseinfo.type,"status":"online"},function (err, doc) {
        		if (err) {
        			logger.debug("err message:",err.message);
        			callback(err,"Did not find kipp:"+{"type":data.Caseinfo.type,"status":"online"});
        			
        		} 
        		if(!doc) {
        			var err={};
					err["message"]="Find kipps error:"+{"type":data.Caseinfo.type,"status":"online"};
        			callback(err,null);
        		}
        			 
        		var kipp=doc;
        		logger.debug("find kipp:",kipp);
        		require_kipp.runTask(kipp,data,function(err,data){
        			logger.debug("kipp return message:",data);
        			if(err){
        				callback(err,"send message to kipp("+kipp.name+") error!");
        			}else{
        				callback(null,data);  //正常情况下的数据返回
        			}
        		});
        	})
	}
	if(!results.istrue){
		var err={};
		err["message"]="limited authority use tras!";
		callback(err,null);  //完全没有匹配上的数据返回
	}
	if(results.istrue&&!results.hassid&&!results.hasType){
	var err={};
	err["message"]="can not find kipps! Please check kipps or wait for monent!";
	callback(err,null);  //完全没有匹配上的数据返回
	}
});



}

function checksid(data,callback){
	dialog().find(data,function(err,doc){

		if (err) callback(err,false) ;
        if (doc){
        	callback(null,true);

        }else{
        	callback(null,false);
        }
    });
}
function  isSid(data,callback){
	kipps().findOne(data,function (err, doc) {

				logger.debug("check sid in tars！（hasSid）");

        		if (err)    callback(err,false);
        		if(!doc){
        			 logger.debug("check sid in tars！（hasSid：false）");
        			 return callback(null,false);
        		}else{
        			//如果sid 存在kipp=doc；
        			 logger.debug("check sid in tars！（hasSid：true）");
        			return callback(null,true);
        			
        		};
        	})
}
function isType(data,callback){

	kipps().findOne(data,function (err, doc) {

		        logger.debug("check sid in tars！（hasType）");
        		if (err)  callback(err,false)
        		if(!doc){
        			 logger.debug("check sid in tars！（hasType：false）");
        			return callback(null,false);
        		}else{
        			//如果sid 存在kipp=doc；
        			logger.debug("check sid in tars！（hasType：true）");
        		    return callback(null,true);
        		};
        	})

}

function findkipp(data,callback){
	kipps().findOne(data,function (err, doc) {
        		if (err) callback(err,null);
        		if(!doc) callback(null,null);
        			callback(null,doc);
        	})
}
//更新相关kipp状态
function updatekipp(query,data,callback){

	 kipps().update(query,data,function(err,doc){
    	if(err) callback(err,null);
    	callback(null,doc);
    })
	}
function getOneKippSid(data){

	var result="";
	var type=data.Caseinfo.type;
	var kippdata=data.Commondata.KIPPDATA
	var ksids=null;
	for(d in kippdata){
		
		if(kippdata[d].type==type){
			//console.log("d:",result[d]);
			ksids=kippdata[d]
		}
	}
	if(ksids){
		result=ksids.kippsid[0];
	}
	//console.log(result);
	logger.debug("result",result);
	return result;
   }









