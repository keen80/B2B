Ext.define('B2B.view.Beer_List_Container', {
	extend: 'Ext.tab.Panel',
	xtype: 'beerlistcontainerpanel',
	require: [
		'Ext.field.Search'
	],
	config: {
		title: i18n.app.LABEL_BEERS,
		iconCls: 'list',
		activeItem: 0,
		layout: {
			animation: 'fade'
		},
		tabBar:{
			ui: 'neutral',
			layout: {
				pack: 'center'
			}
		},
		items: [
			{
				xtype: 'beerlistsearchcomponent'
			},
			{
				title: 'by Type',
				xtype: 'panel',
				id: 'beertypeform',
				iconCls: 'refresh',
				items: [
					{
						xtype: 'beerlistbytypepanel'
					}
				]
			},
			{
				title: 'by State',
				xtype: 'panel',
				id: 'beerstateform',
				iconCls: 'refresh',
				items: [
					{
						xtype: 'beerlistbystatepanel'
					}
				]
			},
			{
				title: 'Alphabetical',
				xtype: 'panel',
				id: 'beeralphabeticalform',
				iconCls: 'refresh',
				items: [
					{
						xtype: 'beerlistbyalphapanel'
					}
				]
			}
	    ] /*,
	 	listeners: {
			show: function(){
				Ext.getCmp('MainTitlebar').setTitle(i18n.app.PANEL_BEER);
			}
		} */
	}
});