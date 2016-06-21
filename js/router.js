var ContactsRouter = Backbone.Router.extend({
    routes: {
        "filter/:type": "urlFilter",
        "":"homepage"

    },

    initialize: function(){
    	bus.on('filterSet', this.setFilter, this);
    },

    homepage: function(){
    	console.log('homepage');
    	bus.filterName = 'all';
    	bus.trigger('startingApp', this.model);
    },

    setFilter: function(e){
    	console.log(bus.filterName);
    	this.navigate("filter/" + bus.filterName);
    },

    urlFilter: function(e){
    	if(e!== bus.filterName){
    		bus.filterName = e;
    		bus.trigger("filterChanged", this.model);
    	}
    	console.log(bus.filterName);
    	
    }
 
});