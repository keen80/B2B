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
        emptyText: [
            '<div class="activity-list-empty-text list-empty-text">',
                '<p>'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</p>',
                '<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
            '</div>'
        ].join(""),
        itemTpl: new Ext.XTemplate([
            "<div class='{[this.getClass(values)]}'>",
               "{[this.getTextString(values)]}",
            "</div>"].join(""),
            {
            	getClass: function(values){
            		return "drinkincheckin-list-item small-list";
            	},
            	getImageURL: function(values){
                    var str = '<img class="avatar" src="';
                    if (_.isEmpty(values.image)){
                         str += HH.default_user48;
                     }else{
                        str+=values.image;
                     }
                    str += '" width="48" height="48">';
                	return str;
                },
                getTextString: function(values){
                     var str = [
                        "<div class='list-header'>",
                            "<small class='time'>",
                                utils.getDate(values),
                            "</small>",
                            "<span class='info'>",
                                this.getImageURL(values),
                                values.displayName,
                            "</span>",
                        "</div>",
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
