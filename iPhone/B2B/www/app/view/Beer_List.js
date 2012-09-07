Ext.define('B2B.view.Beer_List', {
    extend: 'Ext.dataview.List',
    xtype: 'beerlist',
	config: {
        cls: 'base_bg',
        loadingText: i18n.app.HINT_LOADING,
        emptyText: [
            '<div class="beer-list-empty-text list-empty-text">',
                '<p>'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</p>',
            '</div>'
        ].join(""),
        //itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage1URL(values)]}{[this.getImage2URL(values)]}{[this.getString(values)]}</div>",
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage1URL(values)]}{[this.getString(values)]}</div>",
        {
        	getClass: function(values){
        		return "small-list beer-list-item-title beerTypeClass"+values.beerstyle;
        	},
            getImage1URL: function(values){
                    //resources/beer/style"+values.beerstyle+".png'
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.beerstyle)){
                         str += 'resources/img/default/blank_beer_32.png';
                     }else{
                        str += 'resources/img/default/blank_beer_32.png';
                     }
                    str += '" width="32" height="32">';
                    return str;
            },
            getImage2URL: function(values){
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.beertype)){
                         str += 'resources/img/default/blank_beer_32.png';
                     }else{
                        str += 'resources/img/default/blank_beer_32.png';
                     }
                    str += '" width="32" height="32">';
                    return str;
            },
            getString: function(values){
                var nationAvatar = (_.isEmpty(values.nationality)) ? "_":(values.nationality).toLowerCase();
                var tpl = [
                    "<div class='small-list-right'>",
                        "<img src='resources/flags/"+nationAvatar+".png'>",
                    "</div>",
                    "<div class='small-list-text'>",
                        _.titleize(values.name),
                    "</div>",
                    "<div class='small-list-subtext'>",
                        utils.getBeerStyleFromCode(parseInt(values.beerstyle)),
                        (values.beertype) ? " - " + utils.getBeerTypeFromCode(parseInt(values.beertype)): "",
                    "</div>"].join("");
                return tpl;
            }
        })
	}
});
