var ContactsView = Backbone.View.extend({
        model: contacts,
        el: $("#contacts"),

        initialize: function () {
         this.render();
         this.$el.find("#filter").append(this.createSelect());
         bus.on("filterChanged", this.filterChanged, this);
         bus.on("startingApp", this.render, this);
        },

        events: {
            "change #filter select": "setFilter"
        },

        filterChanged: function(){
            console.log('filter');
            $("article").remove();
            this.render();
        },

        setFilter: function(e) {
            $("article").remove();
            bus.filterName = e.currentTarget.value;
            bus.trigger("filterSet", this.model);
            this.render();

        },

        render: function() {
            var self = this;
            if (bus.filterName !== "all") {
                var filter = _.where(self.model.toJSON(), {
                    type: bus.filterName
                });
            } else {
                filter = _.where(self.model.toJSON());
            }
            filter.forEach(function(item) {
                var contactView = new ContactView({
                    model: item
                });
                self.$el.append(contactView.render().$el);
            });
            return this;
        },
        getTypes: function () {
            return _.uniq(this.model.pluck("type"));
        },

        createSelect: function () {
            var select = $("<select/>", {
                    html: "<option value='all'>All</option>"
                });

            _.each(this.getTypes(), function (item) {
                var option = $("<option/>", {
                    value: item,
                    text: item
                }).appendTo(select);
            });

            return select;    
    }


});

