Ext.define('B2B.view.Beer_List', {
    extend: 'Ext.dataview.List',
    //extend: 'Ext.ux.bufferedlist.BufferedList',
    xtype: 'beerlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
       // emptyText: '</pre><div class="beer-list-empty-text">'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'><span>{[this.getString(values)]}</span></div>",
        {
        	getClass: function(values){
        		return "beer-list-item-title beerTypeClass"+values.beerstyle+" nation_"+values.nationality;
        	},
            getString: function(values){
                var tpl =   "<img class='avatar_small' src='resources/beer/style"+values.beerstyle+".png'>";
                if(values.beertype){ tpl += "<img class='avatar_small' src='resources/beer/type"+values.beertype+".png'>"}
                else { tpl+= "<img class='avatar_small' src='resources/default_xsmall.png'" }
                tpl += "<span class='title'>"+_.titleize(values.name)+"</span>"+
                       "<span class='subtitle'>"+utils.getBeerStyleFromCode(parseInt(values.beerstyle));
                if(values.beertype) tpl += " - " + utils.getBeerTypeFromCode(parseInt(values.beertype));
                tpl += "</span>";
                return tpl;
            }
        })
	}
});
