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
        emptyText: [
            '<div class="activity-list-empty-text list-empty-text">',
                '<p>'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</p>',
                '<p>'+utils.__(i18n.app.TEXT_WHYADDFRIEND)+'</p>',
            '</div>'
        ].join(""),
        itemTpl: new Ext.XTemplate([
                "<div class='{[this.getClass(values)]}'>",
                    "{[this.getTextString(values)]}",
                "</div>"
            ].join(""),
            {
            	getClass: function(values){
            		return "activity-list-item small-list activity-type" + values.type;
            	},
            	getAvatarURL: function(values){
                    var str = '<img class="avatar" src="';
                    if (_.isEmpty(values.avatar)){
                         str += HH.default_user64;
                     }else{
                        str+=values.avatar;
                     }
                    str += '" width="64" height="64">';
                	return str;
                },
                getImageURL: function(values){
                    var str = "";
                    if (!_.isEmpty(values.image)){
                        str= '<img class="photo" src="'+values.image+'">';
                     }
                    return str;
                },
                getTextString: function(values){
                    var str = [
                        "<div class='list-header'>",
                            "<small class='time'>",
                                utils.getDate(values.date),
                            "</small>",
                            "<span class='info'>",
                                this.getAvatarURL(values),
                                values.displayName,
                            "</span>",
                        "</div>",
                       // "<div class='list-photo'>",
                            this.getImageURL(values),
                       // "</div>",
                        "<p class='list-text'>",
            		      utils.getActivityString(values),
                	   "</p>",
                       "<div class='list-footer'>",
                            "<span class='like'>",
                                (_.isEmpty(values.like))?0:values.like,
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
