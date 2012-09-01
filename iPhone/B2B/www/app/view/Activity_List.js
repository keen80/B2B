Ext.define('B2B.view.Activity_List', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'activitylist',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: i18n.app.HINT_PULLDOWN
            }
        ],
        loadMask: true,
        emptyText: '</pre><div class="list-empty-text">'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</div><pre>',
        itemTpl: new Ext.XTemplate([
                "<div class='{[this.getClass(values)]}'>",
                "{[this.getImageURL(values)]}",
                "{[this.getTextString(values)]}",
                "{[this.getWhenString()]}",
                "</div>"
            ].join(""),
            {
            	getClass: function(values){
            		return "activity-list-item small-list activity-type" + values.type;
            	},
            	getImageURL: function(values){
                    var str = '<img class="avatar_small" src="';
                    if (_.isEmpty(values.image)){
                         str += HH.default_place32;
                     }else{
                        str+=values.image;
                     }
                    str += '" width="32" height="32">';
                	return str;
                },
                getWhenString: function(values){
                    var str = "<div class='small-list-when'>";
                    str += utils.getDate(values);
                    str += "</div>";
                    return str;
                },
                getTextString: function(values){
                    var str = "<div class='small-list-text'>";
            		str += utils.getActivityString(values);
                	str += "</div>";
                    return str;
                }
            }
   		)
	}
});
