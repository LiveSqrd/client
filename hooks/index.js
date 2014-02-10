(function(exports){

	var  http 		= require('http')
		, _ 	 	= require('underscore')
		, hook 		= {}
		, db;

	exports.run =function(options){
		db = options.db;
	}
	exports.routes = function(app){
	
		app.get("hello",function(req,res){
			res.send("world")
		})

	return app;
	}

return exports;
})(exports)




