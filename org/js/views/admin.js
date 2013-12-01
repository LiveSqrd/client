(function() {
    define(['require', 'jquery', 'underscore', 'bb', 'i/item/c','text!/html/admin.html'], function(require, $, _, Backbone, Items) {
        return Backbone.View.extend({
            id: 'login',
            initialize: function(options) {
                var that = this;
                this.___ = options.___;
                this.items = new Items(null,{ s: this.___.so});
                this.items.on('change:states.last', this.updateNotify,this)
                this.items.on('change:states.refresh', this.refreshMe,this)
                var Home = require('text!/html/admin.html');
                this.home = _.template(Home);

                that.render();
            },
            events: {
                "click .show-hide": "showHide"
                ,"click .go": "saveUpdate"
                ,"click .preview":"preview"
                ,"click .refresh":"refresh"
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
            showHide:function () {
                var that = this;
                var m = that.items.first();
                if (m.get("body.show"))
                    m.save({"body.show":false,"states.last":(new Date()).getTime()})
                else
                    m.save({"body.show":true,"states.last":(new Date()).getTime()})
                
            },
            saveUpdate:function () {
                var that = this;
                var m = that.items.first();
                m.save({"body":{"text":that.$el.find(".admin .text").val(),"image":that.$el.find(".admin .image").val(),"show":m.get("body.show")},"states.last":(new Date()).getTime()})
                
            },
            preview:function(){
                var that= this;
                var m = that.items.first();
                that.$el.html(that.home(
                    {_id:m.id
                    , body:{
                        text:that.$el.find(".admin .text").val()
                        ,image:that.$el.find(".admin .image").val()
                        ,show:m.get("body.show")
                        }
                    }
                ));
            },
            refresh:function(){
                var that= this;
                var m = that.items.first();
                m.save({"states.refresh":(new Date().getTime())});
            },
            refreshMe:function(){
                window.location.reload();

            },updateNotify:function(m){
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

