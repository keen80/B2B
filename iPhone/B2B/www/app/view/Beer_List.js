Ext.define('B2B.view.Beer_List', {
    extend: 'Ext.dataview.List',
    //extend: 'Ext.ux.bufferedlist.BufferedList',
    xtype: 'beerlistcomponent',
    id: 'beerlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
       // emptyText: '</pre><div class="beer-list-empty-text">'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage1URL(values)]}{[this.getImage2URL(values)]}{[this.getString(values)]}</div>",
        {
        	getClass: function(values){
        		return "small-list beer-list-item-title beerTypeClass"+values.beerstyle+" nation_"+values.nationality;
        	},
            getImage1URL: function(values){
                    //resources/beer/style"+values.beerstyle+".png'
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.beerstyle)){
                         str += 'resources/img/default/blank_avatar_32.png';
                     }else{
                        str += 'resources/img/default/blank_avatar_32.png';
                     }
                    str += '" width="32" height="32">';
                    return str;
            },
            getImage2URL: function(values){
                    // resources/beer/style"+values.beertype+".png'
                    /*
                    if(values.beertype){ tpl += "<img class='avatar_small' src='resources/beer/type"+values.beertype+".png'>"}
                    else { tpl+= "<img class='avatar_small' src='resources/default_xsmall.png'" }

                    */
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.beertype)){
                         str += 'resources/img/default/blank_avatar_32.png';
                     }else{
                        str += 'resources/img/default/blank_avatar_32.png';
                     }
                    str += '" width="32" height="32">';
                    return str;
            },
            getString: function(values){
                var tpl = "";
                tpl += "<div class='small-list-text'>"+_.titleize(values.name)+"</div>"+
                       "<div class='small-list-subtext'>"+utils.getBeerStyleFromCode(parseInt(values.beerstyle));
                if(values.beertype) tpl += " - " + utils.getBeerTypeFromCode(parseInt(values.beertype));
                tpl += "</div>";
                return tpl;
            }
        })
	}
});
