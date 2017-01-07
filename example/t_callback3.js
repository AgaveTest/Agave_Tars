var EventProxy= require('eventproxy');

var ep= new EventProxy();

var func1=function(req,res,callback){
        setTimeout(function(){
                console.log('in func1');
                callback(req,res,1);
                ep.emit("v1",1);
        },3000);
}
var func2=function(req,res,callback){
        setTimeout(function(){
                console.log('in func2');
                callback(req,res,2);
                ep.emit("v2",1);
        },5000);
}
var func3=function(req,res,callback){
        setTimeout(function(){
                console.log('in func3');
                callback(req,res,3);
                ep.emit("v3",1);
        },1000);
}



// setTimeout(function(){
//     console.log('in func1');
//     ep.emit("v1",1);
        

//  },3000);

// setTimeout(function(){
//     console.log('in func2');
//     ep.emit("v1",2);
    

//  },5000);


// setTimeout(function(){
//     console.log('in func3');
//     ep.emit("v1",3);
    
//  },1000);
console.log('out');

ep.all("v1","v2","v3",function(data1,data2,data3){

	console.log(data1+data2+data3);
});


