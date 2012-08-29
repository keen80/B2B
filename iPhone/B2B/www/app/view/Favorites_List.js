Ext.define('B2B.view.Favorites_List', {
    extend: 'Ext.dataview.List',
    xtype: 'favoriteslistcomponent',
 //   id: 'favoriteslistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="favorites-list-empty-text">'+utils.__(i18n.app.TEXT_NOFAVORITEFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getString(values)]}</div>",
        {
        	getClass: function(values){
        		return "favorites-list-item-title";
        	},
            getString: function(values){
                var tpl = "";
                tpl += '<div class="small-list-text">CIPPAAAAAAA'+_.titleize(values.beerName)+'</div>';
                return tpl;
            }
        })
	}
});
