Ext.define('B2B.view.Notification_List', {
    extend: 'Ext.dataview.List',
    requires: [
        'Ext.plugin.PullRefresh'
    ],
    xtype: 'notificationlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        plugins: [
            {
                xclass: 'Ext.plugin.PullRefresh',
                pullRefreshText: 'Pull down for more!'
            }
        ],
        emptyText: '</pre><div class="friend-list-empty-text">'+utils.__(i18n.app.TEXT_NOFRIENDFOUND)+'</div><pre>',
       // itemTpl: '</pre><div class="list-item-title">{username}</div><div class="list-item-narrative">{firstName} {lastName}</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getImage(values)]}{[this.getTextString(values)]}</div>",
            {
            	getClass: function(values){
            		return "notification-list-item small-list notification-type"+values.type;
            	},
                getImage: function(values){
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
                    var str = "<div class='small-list-text'>";
                    str += utils.getNotificationString(values);
                    str += "</div>";
                    return str;
                }
            })
	}
});