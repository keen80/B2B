Ext.define('B2B.view.DrinkInCheckIn_List', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'drinkincheckinlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
         plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: i18n.app.HINT_PULLDOWN
            }
        ],
        loadMask: true,
        emptyText: '</pre><div class="list-empty-text">'+utils.__(i18n.app.TEXT_NODRINKFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate([
            "<div class='{[this.getClass(values)]}'>",
               "{[this.getTextString(values)]}",
            "</div>"].join(""),
            {
            	getClass: function(values){
            		return "drinkincheckin-list-item small-list";
            	},
            	getImageURL: function(values){
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.image)){
                         str += 'resources/img/default/blank_avatar_32.png';
                     }else{
                        str+=values.image;
                     }
                    str += '" width="32" height="32">';
                	return str;
                },
                getTextString: function(values){
                  /*  var str = '<div class="small-list-text">';
            		str += values.placeName;
                	str += '</div>';
                	str += '<div class="small-list-drinkedin">';
            		if(parseInt(values.drinkedIn) >0) str += values.drinkedIn;
                	str += "</div>";
                    return str;*/
                     var str = [
                        "<div class='list-header'>",
                            "<small class='time'>",
                                utils.getDate(values.insertedOn),
                            "</small>",
                            "<span class='info'>",
                                values.displayName,
                            "</span>",
                        "</div>",
                       // "<div class='list-photo'>",
                            this.getImageURL(values),
                       // "</div>",
                        "<p class='list-text'>",
                          utils.getDrinkString(values),
                       "</p>"
                    ].join("");

                    return str;
                }
            }
   		)
	}
});
