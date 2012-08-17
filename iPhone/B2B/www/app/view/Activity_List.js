Ext.define('B2B.view.Activity_List', {
    extend: 'Ext.dataview.List',
    xtype: 'activitylistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="activity-list-empty-text">'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</div><pre>',
        itemTpl: '</pre><div class="activity-list-item-title">{type}</div><pre>'
	}
});
