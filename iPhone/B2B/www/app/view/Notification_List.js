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
                pullRefreshText: 'Pull down for more new Tweets!'
            }
        ],
        emptyText: '</pre><div class="friend-list-empty-text">'+utils.__(i18n.app.TEXT_NOFRIENDFOUND)+'</div><pre>',
        itemTpl: '</pre><div class="list-item-title">{username}</div><div class="list-item-narrative">{firstName} {lastName}</div><pre>',
        itemTpl: new Ext.XTemplate("<div class='{[this.getClass(values)]}'>{[this.getString(values)]}</div>",
            {
            	getClass: function(values){
            		return "notification-list-item-title";
            	},
                getString: function(values){
                	switch(values.type){
					case 1:
						return "<span> "+values.type+" "+values.displayName+" "+values.description+" "+values.friendName+"</span>";
						break;
					case 2:
						return "<span> "+values.type+" "+values.displayName+" "+values.description+" "+values.friendName+"</span>";
						break;
					default:
						return "<span> "+values.type+" "+values.displayName+" "+values.description+" "+values.friendName+"</span>";
					}
                }
            })
	}
});