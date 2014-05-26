(function(exports){

	var  http 		= require('http')
		, _ 	 	= require('underscore')
		, hook 		= {}
		, db;

	exports.run = function(options){
		db = options.db;
	}
	exports.login = function(session,callback){
		
		callback({})
	}
	exports.app = function(session,callback){
		
		callback({})
	}
return exports;
})(exports)