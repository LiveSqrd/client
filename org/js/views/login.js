(function() {
    define(['require', 'jquery', 'underscore', 'bb', 'i/client/c','text!/html/login.html'], function(require, $, _, Backbone, Clients) {
        return Backbone.View.extend({
            id: 'login',
            initialize: function(options) {
                var that = this;
                this.fired = true;
                this.___ = options.___;
                this.clients = new Clients(null,{ s: this.___.so});
                var Home = require('text!/html/login.html');
                this.home = _.template(Home);
                this.$el.html(this.home({}));
                that.render();
            },
            events: {
                "submit form": "killSubmit",
                // "click #mainLogin": "login"
            },
            render:function(){
                var that       = this;
                that.sessionTerms = that.___.c.get('states.terms');   
                that.sessionSetup();
                that.$(".login-section").pageLoaded();             
                that.$("article").fadeTo(10,1);


                console.log("logged in ? :: ", that.___.u.loggedIn)
                if (that.___.u.loggedIn == true)
                    that.___.router.navigate("!projects", {trigger:true, replace:true});
            },           
            //@sessionSetup
            //session terms setup 
            sessionSetup : function(){
                var that = this;
            },

            login : function(e){
                e.preventDefault();

                var that = this,
                    email = that.$(".input-email").val(),
                    password = that.$(".input-password").val();

                that.clients.fetch({
                    success: function(){
                        if (that.clients.length > 0){
                            console.log("logged in");
                            that.___.router.navigate("!projects", {trigger:true, replace:true});
                        }
                        else{
                            console.log("fail, not matched");
                        }
                    },
                    data: {
                        'email': email,
                        'states.password':password
                    },
                    limit: 1
                });
            },
            killSubmit : function(){
                return false;
            }
        }); 
    });

$.fn.pageLoaded = function( onAttribute ) {
    var $this   = $(this);       

    var resizer = function () {
        var theWindow = $(window),
            width = theWindow.width(),
            height = theWindow.height();

        $this.css({            
            minHeight: height
        });    

        $this.find(".sectionHeight").css({
            minHeight: height-140
        });
        
        // console.log("window resize : " + theWindow.width());
    };    
            
    resizer();      
    $(window).resize(resizer);
};

}).call(this);

