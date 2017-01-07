var async=require('async');

var func1=function(req,res,callback){
        setTimeout(function(){
                console.log('in func1');
                callback(req,res,1);
        },3000);
}
var func2=function(req,res,callback){
        setTimeout(function(){
                console.log('in func2');
                callback(req,res,2);
        },5000);
}
var func3=function(req,res,callback){
        setTimeout(function(){
                console.log('in func3');
                callback(req,res,3);
        },1000);
}
// async.parallel({
// 	one: function(callback){
// 		setTimeout(function(){
// 			callback(null,1);
// 			console.log('in func1');
// 		},2000);
// 	},
// 	two: function(callback){
// 		setTimeout(function(){
// 			callback(null,2);
// 			console.log('in func2');
// 		},1000);
// 	}
// },
// function(err,results){

// 	console.log('in func3');

// });

var req=null;
var res=null;
var callback=function(){}

async.series(
[
	function(callback){
		func1(req,res,callback);
	},
	function(callback){
		func2(req,res,callback);
	},
	function(callback){
		func3(req,res,callback);
	}

]);

console.log("out")











