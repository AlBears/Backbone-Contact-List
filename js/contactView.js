var ContactView = Backbone.View.extend({
        tagName: "article",
        className: "contact-container",
        template: $("#contactTemplate").html(),


        render: function () {
        	
            var tmpl = _.template(this.template);
            
            this.$el.html(tmpl(this.model));
            return this;
        
        }
    });