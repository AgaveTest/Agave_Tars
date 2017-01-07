var express = require('express') //加载模块  
var app = express() //实例化之  
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var kipps = require('./model/kipp');
var dialog = require('./model/dialog');
var conf=require('./config.json');
var session_interval=0;//毫秒间隔
var dispatch=require('./lib/dispatch.js');
var res_head={'Content-Type':'text/json','Encodeing':'utf8'};
var domain=require('domain');

/**
 *  log configure
 **/
var logger = require('./lib/log.js').logger();

const d = domain.create();

/**
 * Configuration
 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.set('view options', { layout: false });
app.use(function (req,res,next){

    

    d.on('error',function(err){
        logger.error(err);
        res.statusCode=500;
        res.json({result:false,message:'TARS ERROR! '});
        d.dispose();
    });

    d.add(req);
    d.add(res);
    d.run(next);

});

/**
 * Routes index
 */
app.get('/', function (req, res) {

    kipps().find(function (err, doc) {

    if (err) return next(err);
    if (!doc) return res.render('index',{ title: 'Hey', message: 'Hello TARS Server:',data:'no kipps'});
    res.render('index',{ title: 'Hey', message: 'Hello TARS Server:',data:doc});
    });
})
//say hello and get timestamp for all restful session
app.post('/hello',function(req,res){

    //暂时先不分类型，后续改进，目前部读取body中内容
    logger.info("Say hello:",req.body.name);
    var time=new Date();
    var timestamp=time.getTime();
    var number=Math.floor(Math.random()*100)
    req.body.timestamp=timestamp;
    //req.body.sid="none";

    req.body.sid="tars_"+timestamp+"_"+number;


//     if (req.body.type=="kipp") {
       
//         req.body.sid="kipp_"+timestamp+"_"+number;
// //后续加随机数
//     }
//     if(req.body.type=="case"){

//         req.body.sid="case_"+timestamp+"_"+number;
//     }
    logger.debug("timestamp is ",timestamp);
    //创建会话对象
    var dia=dialog(req.body);
    res.set(res_head); 
    dia.save(function(err){
        if(err) {
            logger.error(err.message);
            res.send({"result":"false","msg":err.message});
        }else{
            
        logger.debug("save dialog:"+dia);
        res.send({"result":"success","answer":"I'm TARS your time is:"+time,"timestamp":dia.timestamp,"sid":dia.sid});
       }
        
    });
    
})
/*
 *  Status Report 
 */
 app.post('/kippstatus/', function(req, res){ //Restful Post method  
    //update timestamp;
    var date=new Date();
    req.body.timestamp=date.getTime();
    //name mast different！
    try{

        kipps().findOne({"name":req.body.name},function (err, doc) {
    res.set(res_head);
    if (err) {
        logger.debug('Find kipp error:',err.message);
        res.send({result:'false',describe:'Find kipp error',errmsg:err.message});
        }
    logger.info('Find kipp :',doc);
    if (doc) {    
        res.send({result:'false',describe:'Your name is already in TARS. Please change name and try again'});
     	}else{
        kipp = kipps(req.body);
        kipp.save(function (err) {
        if (err){
            res.send({result:"false",msg:err.message});
        } else{
            // res.redirect('/login/' + user.email);
        res.send({result:"success",id:kipp._id,name:req.body.name,status:req.body.status,timestamp: req.body.timestamp}) //id 一般由数据库产生  
        }  
        });
        logger.info("add new devices:"+req.body.name+"Type is:"+req.body.type);
         }
    });
    }catch(e){
        logger.error(e.message)
    }


}) 
app.get('/kippstatus',function(req, res){ //Restful Get方法,查找整个集合资源  
        kipps().find(function (err, doc) {
    if (err) return next(err);
    if (!doc) return res.send({result:"false",describe:'kipp not found. Go back and try again'});
    res.set(res_head); 
    res.send(doc);
    }); 
})  
app.get('/kippstatus/:name',function(req, res){ //Get kippsstatus
        kipps().findOne({"name":req.param('name')},function (err, doc) {
    if (err) return next(err);
    if (!doc) return res.send({result:'false',describe:'kipp not found. Go back and try again'});
    res.set(res_head); 
    res.send(doc);
    }); 
})
app.put('/kippstatus/:name', function(req, res){ //update kippstatus
    
    kipps().update({"name":req.param('name')},req.body,function(err,doc){
    	if(err)return next(err);
    	res.set(res_head); 
    	res.send({result:"success",name:req.body.name,status:req.body.status,timestamp: req.body.timestamp});
    })
})
app.delete('/kippstatus/:name',function(req, res){ //delete kippstatus

	 kipps().remove({"name":req.param('name')},function(err,doc){
    	if(err)return next(err);
    	res.set(res_head); 
    	res.send({result:"success",kipps:req.param('name')});
    })
}) 
/**
 * send data to romate `
 **/
app.post('/talk',function(req,res){

  logger.debug("sljfsldfljsldfjsldflsjflsfsfsfsd");
  logger.info('tars talk start:',req.body);

  dispatch(req.body,function(err,data){
     logger.debug('tars receive talk message:',data);
    //if(err) res.send({result:"success","message":err});  无论对错都只返回data
    
    var smsg={}
    if(err){
        
        smsg["result"]="false";
        smsg["errmsg"]=err.message;

    }else{
        smsg["result"]="success";
    }

    logger.debug("message type is:",typeof(data));
    smsg["body"]=data
    logger.debug("smsg:",smsg);
    res.set(res_head); 
    res.send(smsg);

  });
  logger.info('tars talk end!');

})

/**
 * Connect to the database.
 */

app.listen(conf.host.port); //监听8888端口，没办法，总不好抢了tomcat的8080吧！ 


