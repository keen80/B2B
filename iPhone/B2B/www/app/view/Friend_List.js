Ext.define('B2B.view.Friend_List', {
    extend: 'Ext.dataview.List',
    xtype: 'friendlistcomponent',
	config: {
        loadingText: i18n.app.HINT_LOADING,
        emptyText: '</pre><div class="friend-list-empty-text">'+utils.__(i18n.app.TEXT_NOFRIENDFOUND)+'</div><pre>',
        itemTpl: '</pre><div class="list-item-title">{username}</div><div class="list-item-narrative">{firstName} {lastName}</div><pre>',
       // onItemDisclosure: function(){}
	}
});
