/**
 * Define model.
 */
var conf=require('../config.json');

var mongoose = require('mongoose');
var Schema = mongoose.Schema
mongoose.connect('mongodb://'+conf.mongoose.ip+'/'+conf.mongoose.db);

var dialog = mongoose.model('dialog', new Schema({
		id: Schema.Types.ObjectId
  		,name: String 
  		, timestamp: Number
  		,sid:String
		}));

module.exports = function model(data){
	
	if(data)return new dialog(data);
	return dialog;
}
