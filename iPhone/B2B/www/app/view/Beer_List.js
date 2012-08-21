Ext.define('B2B.view.Beer_List', {
    extend: 'Ext.dataview.List',
    xtype: 'beerlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="beer-list-empty-text">'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'><span>{[this.getString(values)]}</span></div>",
        {
        	getClass: function(values){
        		return "beer-list-item-title";
        	},
            getString: function(values){
            	return _.titleize(values.name);
            }
        })
	}
});
