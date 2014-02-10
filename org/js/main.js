(function() {
	window.startTime = new Date()
	console.log("start",(new Date()).getTime() ,(new Date()).getTime() -  window.startTime)
	require.config({
		baseUrl: '/js/',
		paths: {
			socket: '/socket.io/socket.io',
			bsend: '/libs/bsend',
			jquery: '/libs/jquery/jquery-1.11.1.min',
			jqueryUi: '/libs/jquery/jquery-ui-1.10.3.custom',
			jqueryTinySort : '/libs/jquery/jquery.tinysort',
			underscore: '/libs/backbone/underscore',
			backbone: '/libs/backbone/backbone',
			bb: '/libs/bb.extend',
			text: '/libs/requirejs/text',
			async: '/libs/requirejs/async',
			goog: '/libs/requirejs/goog',
			propertyParser: '/libs/requirejs/propertyParser',
			depend: '/libs/requirejs/depend',
			font: '/libs/requirejs/font',
			noext: '/libs/requirejs/noext',
			modernizr: '/libs/modernizr',
			swfobject: '/libs/swfobject',
			conf:'conf',
			ga: '/libs/ga',
			i: '/i',
			views: '/js/views',
		},
		shim: {
			backbone: {
				deps: ['underscore', 'jquery']
			},
			jqueryTinySort: {
				deps: ['jquery']
			},
			jqueryUi: {
				deps: ['jquery']
			},
		}
	});


require(['require','socket', 'jquery', 'underscore', 'backbone', 'i/client/c', 'i/instance/c', 'i/profile/c', 'bsend', 'modernizr'], function(require,io, $, _, backbone, Clients, Instances, Profiles, Bsend) {
		console.log("main ",(new Date()).getTime() ,(new Date()).getTime() -  window.startTime)
		var ready;
		 var me, so, touch;
			so = io.connect();
			touch = Modernizr.touch ? true : false;
			me = {
				width: window.innerWidth,
				height: window.innerHeight,
				touch: touch,
				timezone:-(new Date()).getTimezoneOffset()/120
			};
			so.emit('connect', Bsend.je(me), function(err, data) {
				if (err) 
					return console.log('Unable to connect.');
				
				return ready(Bsend.jd(data), so);
			});

		return ready = function(data, so) {
			console.log("in ready ",(new Date()).getTime() ,(new Date()).getTime() -  window.startTime)
			window.___ = data.i;
			window.__l = data.loggedIn.loggedIn;
			var checkVisablity, clients, instances, profiles;
			checkVisablity = true;
			if (_.isString(document.webkitVisibilityState)) {
				if (document.webkitVisibilityState === 'prerender') {
					checkVisablity = false;
				} else if (document.webkitVisibilityState === 'preview') {
					checkVisablity = false;
				}
			}
			clients = new Clients(null, {s: so});
			instances = new Instances(null, {s: so});
			profiles = new Profiles(null, { s: so});
			
			function getRouter(obj){
				require(['router'], function(Router) {
						console.log("go to rounter ",(new Date()).getTime() ,(new Date()).getTime() -  window.startTime)
						Router.initialize(obj);
				});
			}
			return instances.fetch({
					success: function() {
				return clients.fetch({
					success: function() {
						if(clients.first().has('profile')){
							return profiles.fetch({
								success: function() {
									var p = profiles.length > 0 ? profiles.first() : null;
									return getRouter({
										___: {
											 so: so
											,u: data.loggedIn
											,conf: data.conf
											,api: data.api
											,c: clients.first()
											,i: instances.first()
											,p: p
										}
									}) 
								},error:function  (err, err2) {
								 	console.log('error profiles',err,err2)
								},data: {'_id': clients.first().get('profile')}});
						}else
							return getRouter({
								___: {
									 so: so
									,u: data.loggedIn
									,conf: data.conf
									,api: data.api
									,c: clients.first()
									,i: instances.first()
									,p: null
								}})
					},error:function  (err, err2) {
						console.log('error clients',err,err2)
					},data: {'_id': instances.first().get('client')}});
			 },error:function  (err, err2) {
				console.log('error instances',err,err2)
			},data: {'_id': data.i}});
		};
	});

}).call(this);
