Ext.define('B2B.view.Beer_List', {
    extend: 'Ext.dataview.List',
    xtype: 'beerlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="beer-list-empty-text">'+utils.__(i18n.app.TEXT_NOBEERFOUND)+'</div><pre>',
        itemTpl: '</pre><div class="beer-list-item-title">{name}</div><pre>',
	}
});
