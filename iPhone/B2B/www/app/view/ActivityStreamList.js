Ext.define('B2B.view.ActivityStreamList', {
    extend: 'Ext.dataview.List',
    xtype: 'activitystreamcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="activity-list-empty-text">'+utils.__(i18n.app.TEXT_NOACTIVITYFOUND)+'</div><pre>',
        itemTpl: '</pre><div class="list-item-title">{type}</div><div class="list-item-narrative">{idUser} {idBeer} {idPlace}</div><pre>'
	}
});
