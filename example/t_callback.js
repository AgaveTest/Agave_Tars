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
var req=null;
var res=null;
var callback=function(){}
// console.log('内容混乱的输出：')
// func1(req,res,callback);
// func2(req,res,callback);
// func3(req,res,callback);


// console.log('同步方法一 深度嵌套不推荐：')
// func1(req,res,function(){
//         func2(req,res,function(){
//                 func3(req,res,function(){
//                         process.exit(0);
//                 })
//         })
// })

// console.log('同步方法二 递归嵌套 不推荐')
// function executeFunc(funcs,count,sum,req,res){
//         if(count==sum){
//           return;
//         }
//         else{
//                 funcs[count](req,req,function(){
//                         count ++;
//                         executeFunc(funcs,count,sum,req,res);
//                 });
//         }
// }
// var funcs=[func1,func2,func3];
// var len=funcs.length;
// executeFunc(funcs,0,len,req,res);

console.log('同步方法三：step 调用')

// step.Assem(
//          func1(req,res,callback);
       
//         func2(req,res,callback);
        
//         func3(req,res,callback);
      
// );










