(function() {
    define(['require', 'jquery', 'underscore', 'bb', 'i/item/c','text!/html/notify.html'], function(require, $, _, Backbone, Items) {
        return Backbone.View.extend({
            id: 'login',
            initialize: function(options) {
                var that = this;
                this.___ = options.___;
                this.items = new Items(null,{ s: this.___.so});
                this.items.on('change:states.last', this.updateNotify,this)
                this.items.on('change:states.refresh', this.refreshMe,this)
                var Home = require('text!/html/notify.html');
                this.home = _.template(Home);

                that.render();
            },
            events: {
                //"submit form": "killSubmit",
                // "click #mainLogin": "login"
            },
            render:function(){
                var that       = this;
                that.items.fetch({
                    success:function(){
                         that.updateNotify(that.items.first()) 
                    },data:{"group":"notify"}
                })
            
            },
            newNotify:function(){      
                 var that = this;                
                var title = "first"; //from input form
                that.items.create({ title : title,body:{text:"hello"}, group:"notify"}, {
                    callback: function(ItemObject, ItemModel){
                        console.log("ItemObject ID: ", ItemObject._id);
            
                    }
                });

            },
             refreshMe:function(){
                window.location.reload();

            }, 
            updateNotify:function(m){
                var that= this;
                that.$el.html(that.home(m.toJSON())); 

                if(m.get("body.show")== false)
                    that.$el.find("article").hide()
                else
                    that.$el.find("article").show()
            }  
   
    });
});

}).call(this);

