/**
 * Define model.
 */
var conf=require('../config.json');

var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://'+conf.mongoose.ip+'/'+conf.mongoose.db);

var caselog = mongoose.model('caselog', new Schema({
		id: Schema.Types.ObjectId
  		,name: String 
  		, type: String
 		 , ip: String
  		, port: Number
  		, timestamp: Number
  		,sid:String
		}));

module.exports = function model(data){
	
	if(data)return new caselog(data);
	return caselog;
}
