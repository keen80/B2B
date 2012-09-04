Ext.define('B2B.view.Place_List', {
    extend: 'Ext.dataview.List',
    xtype: 'placelist',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="beer-list-empty-text">'+utils.__(i18n.app.TEXT_NOPLACEFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate([
                "<div class='{[this.getClass(values)]}'>",
                    "{[this.getTextString(values)]}",
                "</div>",
            ].join(""),
            {
            	getClass: function(values){
            		return "place-list-item small-list";
            	},
            	getImageURL: function(values){
                    var str = '<img class="avatar" src="';
                    if (_.isEmpty(values.image)){
                         str += HH.default_place32;
                     }else{
                        str+=values.image;
                     }
                    str += '" width="32" height="32">';
                	return str;
                },
                getTextString: function(values){

                     var str = [
                        "<div class='list-header-small'>",
                            "<span class='info'>",
                                this.getImageURL(values),
                                values.placeName,
                            "</span>",
                        "</div>",
                        "<div class='list-footer'>",
                            "<span class='location-category'>",
                                utils.getLocationCategoryFromCode(values.category),
                            "</span>",
                            "<span class='drinkins'>",
                                values.drinkedIn,
                            "</span>",
                        "</div>",
                        "<div class='clear'></div>"
                    ].join("");
                    return str;
                }
            }
   		)
	}
});
