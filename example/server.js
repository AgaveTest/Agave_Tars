var express = require('express') //加载模块  
var app = express() //实例化之  
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var mongoose = require('mongoose');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var map = {"1":{id:1,name:"test"},"2":{id:2,name:"test"}} //定义一个集合资源，key为字符串完全是模仿java MAP<T,E>，否则谁会这么去写个hash啊！  

app.get('/devices',function(req, res){ //Restful Get方法,查找整个集合资源  
    // res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    // res.send(Devices);
    Devices.find(function (err, doc) {
    if (err) return next(err);
    if (!doc) return res.send('<p>User not found. Go back and try again');
    res.set({'Content-Type':'text/json','Encodeing':'utf8'}); 
    res.send(doc);
    }); 
})  
app.get('/devices/:id',function(req, res){ //Restful Get方法,查找一个单一资源  
    //  res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    // res.send(Devices.find(function (err, doc) {
    // if (err) return next(err);
    // if (!doc) return res.send('<p>User not found. Go back and try again');))  
    //console.log(req.param('id')) 
    Devices.findOne({"id":req.param('id')},function (err, doc) {
    // console.log(req.param('id'));
    if (err) return next(err);
    if (!doc) return res.send('<p>User not found. Go back and try again');
    res.set({'Content-Type':'text/json','Encodeing':'utf8'}); 
    res.send(doc);
    }); 
}) 
app.post('/devices/', upload.array(), function(req, res){ //Restful Post方法,创建一个单一资源  
    
    var devices = new Devices(req.body);
    devices.save(function (err) {
    if (err) return next(err);
    // res.redirect('/login/' + user.email);
    res.set({'Content-Type':'text/json','Encodeing':'utf8'});
    res.send({status:"success",url:"/devices/"+req.body.id}) //id 一般由数据库产生  
    });
    console.log("add new devices:"+devices);

    // res.set({'Content-Type':'text/json','Encodeing':'utf8'});
    // console.log(req.body)
    // map[req.body.id] = req.body 
    // res.send({status:"success",url:"/devices/"+req.body.id}) //id 一般由数据库产生  
})  
app.put('/devices/:id', upload.array(), function(req, res){ //Restful Put方法,更新一个单一资源  
    // res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    // map[req.body.id] = req.body  
    // res.send({status:"success",url:"/devices/"+req.param('id'),device:req.body});  
    // console.log("in put");
    // console.log(req.body);
    Devices.update({"id":req.param('id')},req.body,function(err,doc){
    	if(err)return next(err);
    	res.set({'Content-Type':'text/json','Encodeing':'utf8'}); 
    	res.send({status:"success",url:"/devices/"+req.param(id)});
    })
})
app.delete('/devices/:id',function(req, res){ //Restful Delete方法,删除一个单一资源  

	 Devices.remove({"id":req.param('id')},function(err,doc){
    	if(err)return next(err);
    	res.set({'Content-Type':'text/json','Encodeing':'utf8'}); 
    	res.send({status:"success",url:"/devices/"+req.param('id')});
    })
    // res.set({'Content-Type':'text/json','Encodeing':'utf8'});  
    // delete map[req.param('id')]  
    // res.send({status:"success",url:"/devices/"+req.param('id')})  
    // console.log(map)  
}) 
/**
 * Connect to the database.
 */

mongoose.connect('mongodb://127.0.0.1/my-website');

app.listen(8888); //监听8888端口，没办法，总不好抢了tomcat的8080吧！ 

/**
 * Define model.
 */

var Schema = mongoose.Schema

var Devices = mongoose.model('devices', new Schema({
    id: String
  , name: String
}));